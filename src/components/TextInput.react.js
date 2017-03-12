import React from 'react';
import { observer } from 'mobx-react/native';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const base64Icon = 'data:image/png;base64,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';

export default observer(({ action, field, hint }) =>
  <View>
    <View style={styles.container}>
      <TextInput
        blurOnSubmit
        style={styles.input}
        placeholder={field.placeholder}
        {...field.bind()}
      />

      {hint && !field.error &&
        <Text style={styles.hint}>{hint}</Text>
      }

      {field.error &&
        <Text style={[styles.hint, styles.error]}>
          {field.error}
        </Text>
      }

      {action &&
        <TouchableOpacity style={styles.button} onPress={action} >
          <Image style={styles.image} source={{ uri: base64Icon, scale: 1 }} />
        </TouchableOpacity>
      }
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#DEDEDE',
    borderTopWidth: StyleSheet.hairlineWidth
  },

  input: {
    fontSize: 15,
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 10
  },

  error: {
    color: '#ff0000'
  },

  hint: {
    position: 'absolute',
    top: 34,
    left: 10,
    fontSize: 10,
    backgroundColor: '#FFFFFF'
  },

  button: {
    position: 'absolute',
    right: 0,
    top: 5,
    width: 60,
    height: 80
  },

  image: {
    height: 18,
    resizeMode: 'contain',
    position: 'relative',
    top: 12
  }
});
