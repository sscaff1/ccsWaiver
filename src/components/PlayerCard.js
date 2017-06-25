import React from 'react';
import PropTypes from 'prop-types';
import { Modal, View, Text, Image, StyleSheet } from 'react-native';
import { WINDOW_WIDTH } from '../constants';
import Header from './Header';

export default function PlayerCard({ card, visible, closeCard }) {
  return (
    <Modal animationType="slide" visible={visible} onRequestClose={closeCard}>
      <View style={styles.container}>
        <Header title="Player Card" icon="close" iconAction={closeCard} />
        <View style={styles.content}>
          <View style={styles.row}>
            <Image source={{ uri: card.photo }} style={styles.image} />
            <View style={styles.container}>
              <Text>
                <Text style={styles.label}>Name: </Text>
                {card.name}
              </Text>
              <Text>
                <Text style={styles.label}>Gender: </Text>
                {card.gender}
              </Text>
              <Text>
                <Text style={styles.label}>Email: </Text>
                {card.email}
              </Text>
              <Text>
                <Text style={styles.label}>Phone: </Text>
                {card.phone}
              </Text>
            </View>
          </View>
          <Text style={styles.teams}>
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
    paddingTop: 20,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    aspectRatio: 2,
    resizeMode: 'contain',
  },
  teams: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});
