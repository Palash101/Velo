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

export const CartItem1 = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.box} onPress={() => onPress(item)}>
      <View style={styles.imgBox}>
        <Image source={assets.shake} style={styles.itemImage} />
      </View>
      <View style={styles.contBox}>
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
    display:'flex',
    flexDirection:'row'
  },
  imgBox:{
    width:80,
    height:80,
    backgroundColor:'#f2f2f2',
    borderRadius:12,
    marginRight:15,
  },
  
  title: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  price: {
    fontSize: 18,
    marginVertical: 7,
    fontWeight: '700',
    marginRight:20,
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
    backgroundColor: '#000',
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
    backgroundColor: '#000',
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
