import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet, Platform } from 'react-native';

export default function Input({ style, ...props }) {
  return (
    <TextInput
      {...props}
      style={[styles.container, style]}
      underlineColorAndroid="transparent"
    />
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([
    PropTypes.shape(TextInput.propTypes.style),
    PropTypes.number,
    PropTypes.array,
  ]),
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontWeight: 'normal',
    ...Platform.select({
      ios: {
        shadowRadius: 5,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.8,
      },
      android: {
        elevation: 1,
      },
    }),
  },
});
