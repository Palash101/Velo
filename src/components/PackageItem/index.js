import React from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {RoundedDarkButton, RoundedGreyButton} from '../Buttons';

const width = Dimensions.get('window').width;

export const PackageItem = ({item, onPress}) => {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{item?.attributes?.name}</Text>
      <Text style={styles.price}>{item?.attributes?.amount} QR</Text>
      <Text style={styles.class}>{item?.attributes?.rides} {item?.attributes?.type !== 'unlimited' ? item?.attributes?.type : <></>}</Text>
      <Text style={styles.validity}>
        {item?.attributes?.validity} days validity
      </Text>
      <TouchableOpacity
        style={styles.buyBtn}
        onPress={() => onPress(item)}>
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
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
  },
  price: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Gotham-Medium',
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
    backgroundColor:'#000',
    paddingVertical:8,
    paddingHorizontal:10,
    width:100,
    borderRadius:20
  },
  btnText:{
    color:'#fff',
    fontFamily:'Gotham-Black',
    textAlign:'center',
    fontSize:12,
  }
});
