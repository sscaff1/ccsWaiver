import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header } from './Header';

export default function AppModal({
  children,
  title,
  onRequestClose,
  visible,
  ...props
}) {
  return (
    <Modal
      animationType="slide"
      visible={webViewVisible}
      onRequestClose={onRequestClose}
      {...props}
    >
      <View style={styles.container}>
        <Header title={title} icon="close" iconAction={onRequestClose} />
        {children}
      </View>
    </Modal>
  );
}

AppModal.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
