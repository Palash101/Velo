import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {assets} from '../../config/AssetsConfig';
import { API_SUCCESS } from '../../config/ApiConfig';

const width = Dimensions.get('window').width;

export const CartItem1 = ({item, onPress,  addClick, minusClick}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => onPress(item)}>
      <View style={styles.imgBox}>
        <Image source={{uri:API_SUCCESS +'/'+ item?.attributes?.image}} style={styles.itemImage} />
      </View>
      <View style={styles.contBox}>
        <Text style={styles.title}>{item?.attributes?.optional_item}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{item?.attributes?.price} QR</Text>
          <View style={styles.addToCart}>
            <TouchableOpacity style={styles.decrementBox} onPress={() => minusClick(item)}>
              <Text style={styles.decrText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{item?.attributes?.quantity}</Text>
            <TouchableOpacity style={styles.incrementBox} onPress={() => addClick(item)}>
              <Text style={styles.incText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    textAlign: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    width: width - 60,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'#f2f2f2',
    borderRadius:16,
  },
  imgBox: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    marginRight: 15,
  },

  title: {
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: 10,
    color: '#161415',
    fontFamily: 'Gotham-Medium',
  },
  price: {
    fontSize: 14,
    marginVertical: 7,
    lineHeight:24,
    marginRight: 20,
    color: '#161415',
    fontFamily: 'Gotham-Medium',
  },
  itemImage: {
    width: 40,
    height: 80,
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
    color: '#161415',
    fontFamily: 'Gotham-Medium',
  },
});
