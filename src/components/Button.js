import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function Button({ title, ...props }) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1724FA',
    width: '70%',
    height: 50,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});
