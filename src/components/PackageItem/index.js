import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {RoundedDarkButton} from '../Buttons';

const width = Dimensions.get('window').width;

export const PackageItem = ({item, onPress}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{item?.attributes?.name}</Text>
      <Text style={styles.price}>{item?.attributes?.amount} QR</Text>
      <Text style={styles.class}>{item?.attributes?.rides} class</Text>
      <Text style={styles.validity}>
        {item?.attributes?.validity} days validity
      </Text>
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
    paddingHorizontal: 10,
    borderRadius: 16,
    width: width / 2 - 25,
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    fontWeight:'800',
  },
  price: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Gotham-Book',
  },
  class: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Book',
  },
  validity: {
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 5,
    fontFamily: 'Gotham-Book',
  },
  buyBtn: {
    width: 130,
    alignSelf: 'center',
  },
});
