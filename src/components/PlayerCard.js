import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, StyleSheet } from 'react-native';
import { format, differenceInYears } from 'date-fns';
import { WINDOW_WIDTH } from '../constants';
import Modal from './Modal';
import Header from './Header';

const LOGO = require('../logo.jpg');

export default function PlayerCard({ card, visible, closeCard }) {
  const age = differenceInYears(new Date(), card.dob);
  return (
    <Modal visible={visible} onRequestClose={closeCard} title="Player Card">
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.container}>
            <Image source={LOGO} style={styles.logo} />
            {age >= 30 && <Text style={styles.approved}>Over 30</Text>}
            <Text style={styles.approved}>Approved Player</Text>
          </View>
          <Image source={{ uri: card.photo }} style={styles.pic} />
        </View>
        <Text style={styles.text}>
          <Text style={styles.label}>Name: </Text>
          {`${card.firstName} ${card.lastName}`}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Gender: </Text>
          {card.gender}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Email: </Text>
          {card.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Phone: </Text>
          {card.phone}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Birth Date: </Text>
          {format(card.dob, 'MM/DD/YYYY')}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Age: </Text>
          {age}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.label}>Teams: </Text>
          {card.teams}
        </Text>
      </View>
    </Modal>
  );
}

PlayerCard.propTypes = {
  card: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  closeCard: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
    padding: 5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
    height: '35%',
  },
  label: {
    fontWeight: 'bold',
  },
  logo: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  pic: {
    flex: 2,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
  },
  approved: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
  },
});
