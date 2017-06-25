import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { SegmentedControls } from 'react-native-radio-buttons';
import Button from '../components/Button';
import Input from '../components/Input';
import Header from '../components/Header';
import PlayerCard from '../components/PlayerCard';
import { AGREEMENT } from '../constants';

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

function getGenderIndex(gender) {
  switch (gender) {
    case 'male':
      return 0;
    case 'female':
      return 1;
    default:
      return;
  }
}

export default class ProfileScene extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    selectPhoto: PropTypes.func.isRequired,
    agree: PropTypes.func.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    card: PropTypes.object,
  };

  state = {
    cardVisible: false,
  };

  render() {
    const {
      user,
      logout,
      selectPhoto,
      agree,
      onChangeInput,
      card,
    } = this.props;
    return (
      <View>
        <Header title="Player Info" icon="exit-to-app" iconAction={logout} />
        <ScrollView contentContainerStyle={styles.container}>
          {card &&
            <Button
              title="View Current Player Card"
              onPress={() => this.setState({ cardVisible: true })}
            />}
          <Text style={[styles.helperText, styles.marginBottom]}>
            You must press I AGREE at the bottom of this page to create or
            update your player card.
          </Text>
          <Button title="SELECT A PHOTO" onPress={selectPhoto} />
          {user.photo &&
            <Image style={styles.image} source={{ uri: user.photo }} />}
          <Input
            placeholder="Name"
            value={user.name}
            onChangeText={text => onChangeInput('name', text)}
          />
          <Input
            placeholder="Email"
            value={user.email}
            onChangeText={text => onChangeInput('email', text)}
          />
          <Input
            placeholder="Phone Number"
            value={user.phone}
            onChangeText={text => onChangeInput('phone', text)}
          />
          <View style={styles.input}>
            <SegmentedControls
              options={GENDER_OPTIONS}
              selectedIndex={getGenderIndex(user.gender)}
              extractText={option => option.label}
              onSelection={option => onChangeInput('gender', option.value)}
            />
          </View>
          <Input
            placeholder="Teams you play on"
            value={user.teams}
            multiline
            style={styles.team}
            onChangeText={text => onChangeInput('teams', text)}
          />
          <Text style={styles.helperText}>
            If you play on more than one team, please comma seperate your teams.
            Example: Team 1, Team 2
          </Text>
          <Text style={styles.agreementText}>
            Crescent City Soccer
          </Text>
          <Text style={styles.agreementSub}>
            Disclaimer & Release of Liability & Assumption of Risk
          </Text>
          <View style={styles.agreementContainer}>
            <Text>
              {AGREEMENT}
            </Text>
          </View>
          <Button title="I AGREE" onPress={agree} />
          <Text style={styles.helperText}>
            By pressing I AGREE, you agree to the terms of the Agreement above
          </Text>
        </ScrollView>
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
  container: {
    paddingTop: 20,
    paddingBottom: 80,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginTop: 5,
    marginBottom: 10,
  },
  helperText: {
    fontSize: 10,
    fontStyle: 'italic',
    width: '80%',
    textAlign: 'center',
  },
  team: {
    height: 100,
    textAlignVertical: 'top',
  },
  agreementText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  agreementSub: {
    fontSize: 14,
    textAlign: 'center',
  },
  agreementContainer: {
    width: '90%',
  },
  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
  },
  marginBottom: {
    marginBottom: 10,
    fontSize: 14,
  },
});
