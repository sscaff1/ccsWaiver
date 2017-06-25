import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, View, Text, WebView, Modal, Image } from 'react-native';
import CookieManager from 'react-native-cookies';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Button from '../components/Button';
import PlayerCard from '../components/PlayerCard';
import { ENDPOINT } from '../constants';
const LOGO = require('../logo.jpg');

export default class LoginScene extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    card: PropTypes.object,
  };

  state = {
    authUrl: '',
    webViewVisible: false,
    cardVisible: false,
  };

  setAuthUrl = () => {
    this.setState({
      authUrl: `${ENDPOINT}/auth/facebook`,
      webViewVisible: true,
    });
  };

  handleWebViewChange = url => {
    if (url.url.indexOf('/waivers') > -1) {
      CookieManager.get(`${ENDPOINT}/waivers`, (error, cookie) => {
        this.props.authenticate(cookie['feathers-jwt']);
        this.setState({ webViewVisible: false });
      });
    }
  };

  renderWebView = () => {
    const { webViewVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        visible={webViewVisible}
        onRequestClose={() => this.setState({ webViewVisible: false })}
      >
        <View style={styles.container}>
          <Header
            title="Facebook Login"
            icon="close"
            iconAction={() => this.setState({ webViewVisible: false })}
          />
          <WebView
            startInLoadingState
            onNavigationStateChange={this.handleWebViewChange}
            source={{ uri: this.state.authUrl }}
            renderLoading={() => <Loading />}
          />
        </View>
      </Modal>
    );
  };

  render() {
    const { card } = this.props;
    return (
      <View style={styles.wrap}>
        <Image source={LOGO} style={styles.image} />
        <Text style={styles.subheading}>
          Waiver App
        </Text>
        <Button onPress={this.setAuthUrl} title="Login with Facebook" />
        {this.props.card &&
          <Button
            onPress={() => this.setState({ cardVisible: true })}
            title="View Player Card"
          />}
        {this.renderWebView()}
        {card &&
          <PlayerCard
            visible={this.state.cardVisible}
            closeCard={() => this.setState({ cardVisible: false })}
            card={card}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  container: {
    flex: 1,
  },
  subheading: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
