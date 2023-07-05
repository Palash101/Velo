import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {assets} from '../../config/AssetsConfig';
import ScaledImage from '../../components/ScaleImage';

const DoubleJoyDetail = ({navigation}) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View
          style={{
            paddingHorizontal: 10,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text style={styles.mainHeading}>Double Joy</Text>
          <TouchableOpacity onPress={() => navigation.navigate('DoubleJoy')}>
            <Image source={assets.back} style={{width: 20, height: 20}} />
          </TouchableOpacity>
          <Image source={assets.shake} style={styles.itemImage} />
        </View>
        <View style={styles.detailBox}>
          <View style={styles.detailInnerBox}>
            <View style={{marginBottom:20,display: 'flex',flexDirection:'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.title}>Lorem Ipsum</Text>
                <Text style={styles.subTitle}>Ingredients</Text>
              </View>
              <View>
                <Text style={styles.title}>15 QR</Text>
              </View>
            </View>
            <Text style={styles.subTitle}>
              LOREM IPSUM DOLOR SIT AMET, CONSECTETUER ADIPISCING ELIT, SED DIAM
              NONUMMY NIBH EUISMOD TINCIDUNT UT{' '}
            </Text>
          </View>
          <View style={styles.cartBox}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <View style={styles.greyBox}>
                <Text style={styles.unitTitle}>34.1</Text>
                <Text style={styles.unit}>kcal</Text>
              </View>
              <View style={styles.greyBox}>
                <Text style={styles.unitTitle}>34.1</Text>
                <Text style={styles.unit}>kcal</Text>
              </View>
              <View style={styles.greyBox}>
                <Text style={styles.unitTitle}>34.1</Text>
                <Text style={styles.unit}>kcal</Text>
              </View>
              <View style={styles.greyBox}>
                <Text style={styles.unitTitle}>34.1</Text>
                <Text style={styles.unit}>kcal</Text>
              </View>
            </View>

            <View style={styles.addToCart}>
              <TouchableOpacity style={styles.decrementBox}>
                <Text style={styles.decrText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>1</Text>
              <TouchableOpacity style={styles.incrementBox}>
                <Text style={styles.incText}>+</Text>
              </TouchableOpacity>
            </View>

            <RoundedDarkButton
              style={styles.buyBtn}
              label={'ADD NOTE TO ORDER'}
              onPress={() => console.log('sdf')}
            />
            <RoundedDarkButton
              style={styles.buyBtn}
              label={'ADD TO CART'}
              onPress={() => console.log('sdf')}
            />
          </View>
        </View>
      </View>
    </>
  );
};
export default DoubleJoyDetail;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Gotham-medium',
  },
  itemImage: {
    width: 160,
    height: 260,
    alignSelf: 'center',
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: '#e2e3e5',
    height: '100%',
    display: 'flex',
  },
  addToCart: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    height: 24,
    borderRadius: 6,
    marginTop: 7,
    width:60,
    alignSelf:'center',
    marginTop:20,
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
  buyBtn: {
    marginTop: 20,
  },
  detailBox: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flex: 1,
    bottom: 0,
    paddingTop: 50,
    marginTop: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cartBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    bottom: 0,
    paddingTop: 20,
    marginTop: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '15%',
  },
  greyBox: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    textAlign: 'center',
    borderRadius: 15,
  },
  unitTitle: {
    fontSize: 16,
    fontFamily: 'Gotham-Medium',
    color: '#000',
  },
  unit: {
    ontSize: 6,
    fontFamily: 'Gotham-Medium',
    color: '#000',
  },
  detailInnerBox:{
    paddingHorizontal:'15%'
  },
  title:{
    fontSize:21,
    fontFamily:'Gotham-Book',
    fontWeight:'800',
    textTransform:'uppercase'
  },
  subTitle:{
    fontSize:12,
    textTransform:'uppercase',
    lineHeight:16,
    color:'#333'
  },
  
});
