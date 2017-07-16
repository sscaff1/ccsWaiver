import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function Deal({ deal }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {deal.title}
      </Text>
      <Text style={styles.desc}>
        {deal.description}
      </Text>
    </View>
  );
}

Deal.propTypes = {
  deal: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    textAlign: 'center',
  },
});
