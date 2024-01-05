import React, {useContext, useEffect, useState} from 'react';
import {CurvedGreyButton} from '../../components/Buttons';
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';
import {useToast} from 'react-native-toast-notifications';
import PageLoader from '../../components/PageLoader';
import WebView from 'react-native-webview';
import {Modal} from 'react-native-paper';
import {ProfileController} from '../../controllers/ProfileController';
import {API_SUCCESS} from '../../config/ApiConfig';
import {useNavigation} from '@react-navigation/native';
import {DoubleJoyController} from '../../controllers/DoubleJoyController';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const DoubleJoypay = props => {
  const [loading, setLoading] = useState(false);
  const {getToken} = useContext(UserContext);
  const [paymentUrl, setPaymentUrl] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  const toast = useToast();

  const getUserToken = async () => {
    return await getToken();
  };

  const checkResponse = data => {
    console.log(data.url)
    if (data.url.includes('status')) {
      const url1 = data.url.split('?')[1];
      const url2 = url1.split('&')[0];
      const status = url2.split('=')[1];
      console.log(status, 'status');
      if (status === 'Paid') {
        setLoading(true);
        setPaymentModal(false);
        setTimeout(() => {
          toast.show('Payment successfully');
          navigation.navigate('MyOrder', {purchase: 'success'});
          setLoading(false);
        }, 2000);
      } else {
        setPaymentModal(false);
        navigation.navigate('DoubleJoy');
        toast.show('Payment has been ' + status);
      }
    }

    // console.log(data.url);
    // if (data.url.includes('payment/success')) {
    //   setLoading(true);
    //   setPaymentModal(false);
    //   setTimeout(() => {
    //     toast.show('Payment successfully');
    //     navigation.navigate('MyOrder', {purchase: 'success'});
    //     setLoading(false);
    //   }, 3000);
    // } else if (data.url.includes('payment/failed')) {
    //   navigation.navigate('DoubleJoy');
    //   toast.show('Payment has been failed');
    // } else if (data.url.includes('transaction_cancelled')) {
    //   setPaymentModal(false);
    //   navigation.navigate('DoubleJoy');
    //   toast.show('transaction cancelled');
    // }
  };

  const payNow = val => {
    if (val === 'wallet') {
      PayFromWallet();
    } else if (val === 'debit') {
      completePaymentDebit('VISA');
    } else if (val === 'apple') {
      completePaymentDebit('ApplePay');
    } else if (val === 'gpay') {
      completePaymentDebit('Gpay');
    }
  };

  const PayFromWallet = async () => {
    Alert.alert(
      'Confirm',
      'You want to book package from wallet?',
      [
        {
          text: 'No',
          onPress: () => {},
        },
        {
          text: 'Yes',
          onPress: () => {
            setLoading(true);
            completePaymentDebit('Wallet');
          },
        },
      ],
      {cancelable: false},
    );
  };

  const completePaymentDebit = async type => {
    const token = await getToken();
    const cart_id = props.route.params.cart.id;
    const note = props.route.params.note;
    console.log(token, cart_id, type, note);
    setLoading(true);
    const instance = new DoubleJoyController();
    const result = await instance.checkout(token, cart_id, type, note);
    console.log(result, 'resultttt');
    if (result.IsSuccess === true) {
      if (type === 'Wallet') {
        toast.show(result.Message);
        navigation.navigate('MyOrder');
        setLoading(false);
      } else {
        setPaymentUrl(result.Data.PaymentURL);
        setPaymentModal(true);
        setLoading(false);
      }
    } else {
      if (result?.Message) {
        toast.show(result.Message);
      } else {
        toast.show(result.msg);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <PageLoader loading={loading} />

      <View style={{marginTop: Platform.OS === 'android' ? 10 : 70}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('DoubleJoyCheckout')}
            style={{position: 'absolute', left: 0}}>
            <Image
              source={assets.back}
              style={{width: 16, height: 16, marginLeft: 15, marginTop: 2}}
            />
          </TouchableOpacity>
          <Text style={{fontSize: 16}}>PAYMENT METHOD</Text>
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '80%',
            height: height - 210,
            alignSelf: 'center',
            paddingBottom: 20,
          }}>
          {Platform.OS === 'ios' && (
            <CurvedGreyButton
              label={
                <>
                  <Image
                    source={assets.apple}
                    style={{tintColor: '#fff', height: 24, width: 24}}
                  />
                  <Text style={{paddingLeft: 5}}> PAY</Text>
                </>
              }
              style={{marginTop: 15, borderRadius: 12}}
              onPress={() => payNow('apple')}
            />
          )}

          <CurvedGreyButton
            label={
              <>
                <Image source={assets.google} style={{height: 24, width: 24}} />
                <Text> PAY</Text>
              </>
            }
            style={{marginTop: 15, borderRadius: 12}}
            onPress={() => payNow('gpay')}
          />

          <CurvedGreyButton
            label="WALLET"
            style={{marginTop: 15, borderRadius: 12}}
            onPress={() => payNow('wallet')}
          />

          <CurvedGreyButton
            label={
              <>
                <Text style={{fontSize: 16, width: '100%'}}>
                  Pay with Debit/Credit Card
                </Text>
              </>
            }
            style={{marginTop: 15, borderRadius: 12}}
            onPress={() => payNow('debit')}
          />
        </View>
      </View>

      <Modal
        visible={paymentModal}
        onDismiss={() => setPaymentModal(false)}
        style={{height: 'auto'}}>
        <View style={styles.modalBox1}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#161415',
              marginTop: 70,
            }}>
            <TouchableOpacity onPress={() => setPaymentModal(false)}>
              <Image
                source={assets.back}
                style={{width: 16, height: 16, marginLeft: 15, marginTop: 15}}
              />
            </TouchableOpacity>

            <Text
              style={{
                padding: 15,
                fontSize: 16,
                color: '#161415',
                fontFamily: 'Gotham-Medium',
                textAlign: 'center',
              }}>
              PAY
            </Text>
          </View>

          <ScrollView
            contentContainerStyle={{
              bottom: 0,
              height: height,
              backgroundColor: '#f9f9f9',
            }}>
            <WebView
              source={{
                uri: paymentUrl,
                headers: {
                  Authorization: 'Bearer ' + getUserToken(),
                  Accept: 'application/json',
                },
              }}
              onNavigationStateChange={data => checkResponse(data)}
              startInLoadingState={true}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default DoubleJoypay;

const styles = StyleSheet.create({
  modalBox1: {
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 0,
  },
});
