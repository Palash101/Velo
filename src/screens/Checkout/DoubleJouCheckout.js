import React, {useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {PackageItem} from '../../components/PackageItem';
import {CartItem} from '../../components/CartItem';
import {useNavigation} from '@react-navigation/native';
import {assets} from '../../config/AssetsConfig';
import {CartItem1} from '../../components/CartItem/CartItem1';
import {ModalView} from '../../components/ModalView';

const height = Dimensions.get('window').height;

const DoubleJoyCheckout = () => {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const [data, setData] = useState([
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'CCC'},
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'BBB'},
    {name: 'CCC'},
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'CCC'},
  ]);

  const selectItem = item => {
    navigation.navigate('DoubleJoyDetail');
    // Alert.alert(item.name);
  };
  return (
    <>
      <PageContainer>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              paddingHorizontal: 10,
              display: 'flex',
              justifyContent: 'center',
              marginTop: Platform.OS === 'android' ? 0 : 50,
            }}>
            <Text style={styles.mainHeading}>Double Joy</Text>
            <TouchableOpacity style={{marginTop:Platform.OS === 'android' ? -20 : 0}} onPress={() => navigation.navigate('DoubleJoy')}>
              <Image source={assets.back} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>

          <View style={styles.classesList}>
            <FlatList
              data={data}
              pagingEnabled
              renderItem={({item}, key) => (
                <CartItem1 key={key} item={item} onPress={selectItem} />
              )}
            />
          </View>
          <View style={styles.summeryBox}>
            <View style={styles.totalBox}>
              <Text style={styles.priceText}>TOTAL</Text>
              <Text style={styles.priceText}>45 QR</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => setShowModal(true)}>
              <Text style={styles.btnText}>GO TO CHECKOUT</Text>
              <Image source={assets.chevron} style={styles.btnImage} />
            </TouchableOpacity>
          </View>
        </View>
      </PageContainer>

      <ModalView
        visible={showModal}
        heading="PAYMENT METHOD"
        setVisible={() => setShowModal(false)}
        style={{ height: 'auto', marginTop: 260, justifyContent:'flex-end',marginBottom:0}}
        >
        <View style={styles.summeryBox}>
            <View style={styles.modalTotalBox}>
              <Text style={styles.priceText}>TOTAL</Text>
              <Text style={styles.priceText}>45 QR</Text>
            </View>
            <TouchableOpacity
              style={styles.methodBtn}
              onPress={() => console.log()}>
              <Text style={styles.methodBtnText}>APPLE PAY</Text>
              <Image source={assets.chevron} style={styles.methodBtnImage} />
            </TouchableOpacity>
            <View style={styles.payBtnBox}>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.priceText}>TOTAL</Text>
                    <Text style={styles.para}>SUB TOTAL</Text>
                </View>
                <TouchableOpacity
                style={styles.payBtn}
                onPress={() => setShowModal(true)}>
                <Text style={styles.payBtnText}>PAY</Text>
                </TouchableOpacity>
            </View>
            
          </View>
        </ModalView>
    </>
  );
};
export default DoubleJoyCheckout;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    color:'#161415',
    fontFamily:'Gotham-Medium'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  tabBtn: {
    width: width / 3 - 20,
  },
  classesList: {
    marginBottom: 0,
    marginTop: 20,
    height: height - 250,
  },
  calander: {
    marginBottom: 20,
  },
  summeryBox: {
    width: width - 70,
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutBtn: {
    backgroundColor: '#161415',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
  },
  btnImage: {
    width: 24,
    height: 24,
    tintColor: '#fff',
    transform: [{rotate: '-90deg'}],
  },

  methodBtn:{
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginTop:20,
    marginBottom:10,
  },
  methodBtnImage:{
        width: 24,
        height: 24,
        tintColor: '#161415',
        transform: [{rotate: '-90deg'}],
      
  },
  methodBtnText: {
    color: '#161415',
    fontSize: 16,
  },
  totalBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  modalTotalBox:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  priceText: {
    fontSize: 18,
    color:'#161415',
    fontFamily:'Gotham-Medium'
  },
  payBtnBox:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    marginBottom:20,
  },
  payBtn:{
    backgroundColor: '#161415',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
  },
  payBtnText:{
    fontFamily:'Gotham-Medium',
    color:'#fff',
    fontSize:24,
  }
});
