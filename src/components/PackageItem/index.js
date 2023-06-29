import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {RoundedDarkButton} from '../Buttons';

const width = Dimensions.get('window').width;

export const PackageItem = ({item, onPress}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Trial Class</Text>
      <Text style={styles.price}>50 QR</Text>
      <Text style={styles.class}>1 class</Text>
      <Text style={styles.validity}>7 days validity</Text>
      <RoundedDarkButton
        style={styles.buyBtn}
        label={'BUY NOW'}
        onPress={() => onPress(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: width / 2 - 25,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 7,
  },
  class: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  validity: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 5,
  },
  buyBtn: {
    width: 110,
    alignSelf: 'center',

  },
});
