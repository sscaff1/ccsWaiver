import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default function Deal({ deal, isFirst }) {
  return (
    <View
      style={[
        styles.container,
        !isFirst && { borderTopWidth: 1, paddingTop: 20 },
      ]}
    >
      <Text style={styles.title}>
        {deal.title}
      </Text>
      {deal.photo &&
        <Image style={styles.image} source={{ uri: deal.photo }} />}
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
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    marginVertical: 5,
    width: '90%',
    aspectRatio: 2,
    resizeMode: 'contain',
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
