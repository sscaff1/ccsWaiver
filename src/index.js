import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import rest from 'feathers-rest/client';
import superagent from 'superagent';
import Loading from './components/Loading';
import LoginScene from './scenes/LoginScene';
import ProfileScene from './scenes/ProfileScene';

export default class App extends Component {
  state = {
    isAuthenticated: false,
    isInitialized: false,
    gameCard: null,
  };

  componentWillMount() {
    this.app = feathers()
      .configure(hooks())
      .configure(rest('http://localhost:3000').superagent(superagent))
      .configure(authentication({ storage: AsyncStorage }));
    this.authenticate();
    this.user = null;
  }

  authenticate = token => {
    const options = token ? { strategy: 'jwt', accessToken: token } : undefined;
    this.app
      .authenticate(options)
      .then(resp => {
        return this.app.passport.verifyJWT(resp.accessToken);
      })
      .then(payload => {
        return this.app.service('users').get(payload.userId);
      })
      .then(user => {
        this.user = user;
        this.setState({ isAuthenticated: true, isInitialized: true });
      })
      .catch(this.logout);
  };

  logout = () => {
    this.app.logout();
    this.setState({ isAuthenticated: false, isInitialized: true });
  };

  render() {
    const { isAuthenticated, isInitialized } = this.state;
    if (!isInitialized) {
      return <Loading />;
    }
    return isAuthenticated
      ? <ProfileScene user={this.user} />
      : <LoginScene authenticate={this.authenticate} />;
  }
}
