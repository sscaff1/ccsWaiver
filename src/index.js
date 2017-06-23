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

    this.app
      .authenticate()
      .then(({ accessToken }) => feathers.passport.verifyJWT(accessToken))
      .then(payload => feathers.service('users').get(payload.userId))
      .then(user => {
        feathers.set('user', user);
        this.setState({ isAuthenticated: true, isInitialized: true });
      })
      .catch(this.logout);
  }

  logout = () => {
    this.setState({ isAuthenticated: false, isInitialized: true });
  };

  render() {
    const { isAuthenticated, isInitialized } = this.state;
    if (!isInitialized) {
      return <Loading />;
    }
    return isAuthenticated ? <ProfileScene /> : <LoginScene />;
  }
}
