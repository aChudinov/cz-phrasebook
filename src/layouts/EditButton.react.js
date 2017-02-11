import React, { Component, PropTypes as RPT } from 'react';
import { Actions } from 'react-native-router-flux';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const base64Icon = 'data:image/png;base64,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';

export default class EditButton extends Component {

  static propTypes = {
    iconStyle: RPT.any,
    phrase: RPT.object,
    style: RPT.any
  }

  render() {
    const { phrase, style, iconStyle } = this.props;

    return (
      <TouchableOpacity style={[styles.base, !!style && style]} onPress={() => { Actions.form({ data: phrase }); }}>
        <Image style={[styles.icon, !!iconStyle && iconStyle]} source={{ uri: base64Icon, scale: 1 }} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: 60,
    height: 80
  },

  icon: {
    height: 18,
    resizeMode: 'contain'
  }
});
