import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Button,
  WebView,
  Modal,
  Image,
} from 'react-native';
import CookieManager from 'react-native-cookies';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { ENDPOINT } from '../constants';

export default class LoginScene extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
  };

  state = {
    authUrl: '',
    webViewVisible: false,
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
        onRequestClose={() => this.setState({ webViewVisible: false })}>
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
    return (
      <View style={styles.wrap}>
        <Text style={styles.header}>
          Crescent City Soccer
        </Text>
        <Text style={styles.subheading}>
          Waiver App
        </Text>
        <Button onPress={this.setAuthUrl} title="Login with Facebook" />
        {this.renderWebView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    fontSize: 26,
  },
  subheading: {
    fontSize: 14,
  },
});
