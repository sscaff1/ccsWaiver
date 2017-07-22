import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  WebView,
  Image,
  ScrollView,
} from 'react-native';
import CookieManager from 'react-native-cookies';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Button from '../components/Button';
import Modal from '../components/Modal';
import PlayerCard from '../components/PlayerCard';
import Deal from '../components/Deal';
import { ENDPOINT } from '../constants';
const LOGO = require('../logo.jpg');

export default class LoginScene extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    card: PropTypes.object,
    onShowDeals: PropTypes.func.isRequired,
    dealsLoading: PropTypes.bool.isRequired,
    deals: PropTypes.array.isRequired,
  };

  state = {
    authUrl: '',
    webViewVisible: false,
    cardVisible: false,
    dealsVisible: false,
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
        visible={webViewVisible}
        onRequestClose={() => this.setState({ webViewVisible: false })}
        title="Facebook Login"
      >
        <WebView
          startInLoadingState
          onNavigationStateChange={this.handleWebViewChange}
          source={{ uri: this.state.authUrl }}
          renderLoading={() => <Loading />}
        />
      </Modal>
    );
  };

  renderDeals = () => {
    const { dealsLoading, deals } = this.props;
    if (dealsLoading) {
      return <Loading />;
    }
    if (deals.length < 1) {
      return <Text style={styles.noDeals}>No Deals at this time</Text>;
    }
    return (
      <ScrollView contentContainerStyle={styles.deals}>
        {deals.map((deal, i) =>
          <Deal key={deal._id} deal={deal} isFirst={i === 0} />
        )}
      </ScrollView>
    );
  };

  render() {
    const { card } = this.props;
    return (
      <View style={styles.wrap}>
        <Image source={LOGO} style={styles.image} />
        <Text style={styles.subheading}>Waiver App</Text>
        <Button onPress={this.setAuthUrl} title="Login with Facebook" />
        <Button
          onPress={() => this.setState({ dealsVisible: true })}
          title="View Deals"
        />
        {this.props.card &&
          <Button
            onPress={() => this.setState({ cardVisible: true })}
            title="View Player Card"
          />}
        {this.renderWebView()}
        <Modal
          startInLoadingState
          visible={this.state.dealsVisible}
          onRequestClose={() => this.setState({ dealsVisible: false })}
          onShow={this.props.onShowDeals}
          title="Deals"
        >
          {this.renderDeals()}
        </Modal>
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
  deals: {
    paddingTop: 20,
  },
  noDeals: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
