import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../constants';
import Header from './Header';

const LOGO = require('../logo.jpg');

export default function PlayerCard({ card, visible, closeCard }) {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={closeCard}>
      <View style={styles.container}>
        <Header title="Player Card" icon="close" iconAction={closeCard} />
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.container}>
              <Image source={LOGO} style={styles.logo} />
              <Text style={styles.approved}>Approved Player</Text>
            </View>
            <Image source={{ uri: card.photo }} style={styles.pic} />
          </View>
          <Text style={styles.text}>
            <Text style={styles.label}>Name: </Text>
            {card.name}
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
            <Text style={styles.label}>Teams: </Text>
            {card.teams}
          </Text>
        </View>
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
