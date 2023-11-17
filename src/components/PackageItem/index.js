import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {RoundedDarkButton, RoundedGreyButton} from '../Buttons';

const width = Dimensions.get('window').width;

export const PackageItem = ({item, onPress}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{item?.attributes?.name}</Text>
      <Text style={styles.price}>{item?.attributes?.amount} QR</Text>
      <Text style={styles.class}>
        {item?.attributes?.rides}
        {item?.attributes?.type !== 'unlimited' ? (
          item?.attributes?.type === 'ride' ? (
            ' Class'
          ) : (
            item?.attributes?.type
          )
        ) : (
          <></>
        )}
      </Text>
      <Text style={styles.validity}>
        {item?.attributes?.validity} days validity
      </Text>
      <TouchableOpacity style={styles.buyBtn} onPress={() => onPress(item)}>
        <Text style={styles.btnText}>BUY NOW</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
    color: '#161415',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  class: {
    fontWeight: '600',
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#161415',
    fontFamily: 'Gotham-Medium',
    marginBottom: 3,
  },
  validity: {
    textAlign: 'center',
    fontSize: 10,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 0,
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  buyBtn: {
    width: 130,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 100,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
    fontFamily: 'Gotham-Black',
    textAlign: 'center',
    fontSize: 12,
  },
});
