import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {RoundedDarkButton} from '../Buttons';
import {assets} from '../../config/AssetsConfig';

const width = Dimensions.get('window').width;

export const CartItem = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => onPress(item)}>
      <Image source={assets.shake} style={styles.itemImage} />
      <Text style={styles.title}>{item.name}</Text>
      <View style={styles.priceBox}>
        <Text style={styles.price}>15 QR</Text>
        <View style={styles.addToCart}>
          <TouchableOpacity style={styles.decrementBox}>
            <Text style={styles.decrText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>1</Text>
          <TouchableOpacity style={styles.incrementBox}>
            <Text style={styles.incText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 10,
    borderRadius: 24,
    shadowColor: '#161415',
    shadowOffset: {width: -1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginVertical: 20,
    marginHorizontal: 10,
    width: width / 2 - 40,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 7,
    fontWeight: '700',
  },
  itemImage: {
    width: 30,
    height: 90,
    alignSelf: 'center',
  },
  priceBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  addToCart: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    height: 24,
    borderRadius: 6,
    marginTop: 7,
  },
  incrementBox: {
    backgroundColor: '#161415',
    padding: 3,
    height: 24,
    width: 24,
    textAlign: 'center',
    borderRadius: 6,
  },
  incText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    lineHeight: 17,
  },
  decrementBox: {
    backgroundColor: '#161415',
    padding: 3,
    height: 24,
    width: 24,
    textAlign: 'center',
    borderRadius: 6,
  },
  decrText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    lineHeight: 17,
  },
  qty: {
    textAlign: 'center',
    lineHeight: 24,
    width: 24,
  },
});
