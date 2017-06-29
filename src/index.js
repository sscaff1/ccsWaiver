import React, { Component } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import rest from 'feathers-rest/client';
import superagent from 'superagent';
import { isMobilePhone, isEmail } from 'validator';
import { ENDPOINT } from './constants';
import Loading from './components/Loading';
import LoginScene from './scenes/LoginScene';
import ProfileScene from './scenes/ProfileScene';

const getItem = key =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

const setItem = (key, toSet) =>
  new Promise((resolve, reject) => {
    AsyncStorage.setItem(key, toSet, err => {
      if (err) {
        reject(err);
      } else {
        resolve(null);
      }
    });
  });

export default class App extends Component {
  state = {
    isAuthenticated: false,
    isInitialized: false,
    name: undefined,
    photo: undefined,
    email: undefined,
    phone: undefined,
    gender: undefined,
    teams: undefined,
    card: null,
  };

  componentWillMount() {
    this.app = feathers()
      .configure(hooks())
      .configure(rest(ENDPOINT).superagent(superagent))
      .configure(authentication({ storage: AsyncStorage }));
    const promises = [this.authenticate(), getItem('playerCard')];
    Promise.all(promises).then(([user, playerCard]) => {
      if (playerCard) {
        const card = JSON.parse(playerCard);
        this.setState({ card });
      }
    });
    this.userId = null;
  }

  authenticate = token => {
    console.log(token);
    const options = token ? { strategy: 'jwt', accessToken: token } : undefined;
    return this.app
      .authenticate(options)
      .then(resp => {
        return this.app.passport.verifyJWT(resp.accessToken);
      })
      .then(payload => {
        return this.app.service('users').get(payload.userId);
      })
      .then(user => {
        const { _id, name, photo, email, phone, gender, teams } = user;
        this.userId = _id;
        const teamString = teams && teams.length > 0
          ? teams.join(', ')
          : undefined;
        this.setState({
          isAuthenticated: true,
          isInitialized: true,
          name,
          photo,
          email,
          phone,
          gender,
          teams: teamString,
        });
      })
      .catch(this.logout);
  };

  logout = err => {
    console.log(err);
    this.app.logout();
    this.setState({ isAuthenticated: false, isInitialized: true });
  };

  validate({ name, photo, email, phone, gender, teams }) {
    const errorMessages = [];
    if (!name) {
      errorMessages.push('You must supply a name');
    }
    if (!photo) {
      errorMessages.push('You must supply a photo');
    }
    if (!email || !isEmail(email)) {
      errorMessages.push('You must supply a valid email');
    }
    if (!phone) {
      errorMessages.push('You must supply a phone number');
    }
    if (!gender || (gender !== 'male' && gender !== 'female')) {
      errorMessages.push('You must indicate your gender');
    }
    if (!teams) {
      errorMessages.push('You must indicate which teams you play on');
    }
    return errorMessages;
  }

  agree = () => {
    const { isAuthenticated, isInitialized, card, ...user } = this.state;
    const errorMessages = this.validate(user);
    if (errorMessages.length) {
      return Alert.alert('Error', errorMessages.join('\n'));
    }
    const playerCard = Object.assign({}, user);
    const teams = user.teams.split(',').map(v => v.trim());
    user.teams = teams;

    this.setState({ isInitialized: false, card: playerCard }, () => {
      const promises = [
        setItem('playerCard', JSON.stringify(playerCard)),
        this.app.service('users').patch(this.userId, user),
      ];
      Promise.all(promises)
        .then(([updatedPlayerCard, newUser]) => {
          const { name, photo, email, phone, gender, teams } = newUser;
          const teamString = teams && teams.length > 0
            ? teams.join(', ')
            : undefined;
          this.setState({
            isAuthenticated: true,
            isInitialized: true,
            name,
            photo,
            email,
            phone,
            gender,
            teams: teamString,
          });
        })
        .catch(err => console.log(err));
    });
  };

  selectPhoto = () => {
    const options = {
      quality: 0.8,
      maxWidth: 600,
      maxHeight: 600,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          photo: `data:image/jpeg;base64,${response.data}`,
        });
      }
    });
  };

  onChangeInput = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { isAuthenticated, isInitialized, card, ...user } = this.state;
    if (!isInitialized) {
      return <Loading />;
    }
    return isAuthenticated
      ? <ProfileScene
          user={user}
          logout={() =>
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              { text: 'Cancel', onPress: () => null },
              { text: 'OK', onPress: this.logout },
            ])}
          agree={this.agree}
          selectPhoto={this.selectPhoto}
          onChangeInput={this.onChangeInput}
          card={card}
        />
      : <LoginScene authenticate={this.authenticate} card={card} />;
  }
}
