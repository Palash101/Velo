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
import {BuyContoller} from '../../controllers/BuyController';
import {useToast} from 'react-native-toast-notifications';
import PageLoader from '../../components/PageLoader';
import WebView from 'react-native-webview';
import {Modal} from 'react-native-paper';
import {ProfileController} from '../../controllers/ProfileController';
import {API_SUCCESS} from '../../config/ApiConfig';
import {useNavigation} from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Pay = props => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const {getToken} = useContext(UserContext);
  const [paymentUrl, setPaymentUrl] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [user, setUser] = useState({});

  const navigation = useNavigation();

  const toast = useToast();

  useEffect(() => {
    console.log(props.route.params.item);
    setItem(props.route.params.item);
    getDetail();
  }, []);

  const getDetail = async () => {
    const token = await getToken();
    const instance = new ProfileController();
    const result = await instance.getUserDetail(token);
    setUser(result.user);
  };

  const getUserToken = async () => {
    return await getToken();
  };

  const checkResponse = data => {
    console.log(data,'datadata')
    if (data.url.includes('/payment/success')) {
      setPaymentModal(false);
      toast.show('Package purchased successfully');
      navigation.navigate('Buy',{purchase:'success'});
    } else if (data.url.includes('transaction_cancelled')) {
        setPaymentModal(false)
      navigation.navigate('Buy');
      toast.show('transaction cancelled');
    }
  };

  const payNow = val => {
    if (val === 'wallet') {
        completePaymentDebit('Wallet');
    } else if (val === 'debit') {
      completePaymentDebit('Package');
    }
    else if (val === 'apple'){
      completePaymentDebit('ApplePay')
    }
    else if (val === 'gpay'){
      completePaymentDebit('Gpay')
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
            completePayment();
          },
        },
      ],
      {cancelable: false},
    );
  };



  const completePaymentDebit = async (type) => {
    const token = await getToken();
    setLoading(true);
    const instance = new BuyContoller();
    const result = await instance.executePayment(item, type, token);
    if (result.IsSuccess === true) {
      console.log(result.Data.PaymentURL);
      setPaymentUrl(result.Data.PaymentURL);
      setPaymentModal(true);
      //toast.show(result.Message);
      setLoading(false);
    } else {
      toast.show(result.Message);
      setLoading(false);
    }
  };

  const completePayment = async () => {
    const data = {
      id: item.id,
      type: 'wallet',
    };
    console.log(data, 'data');
    const token = await getToken();
    const instance = new BuyContoller();
    const result = await instance.purchasePackage(data, token);
    console.log(result, 'resss');
    if (result.status === 'success') {
      toast.show(result.msg);
      setLoading(false);
    } else {
      toast.show(result.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <PageLoader loading={loading} />

      <View style={{marginTop: 70}}>
        <View
          style={{
            display: 'flex',
            flexDirection:'row',
            justifyContent:'center',
            marginBottom: 20,
          }}>
             <TouchableOpacity onPress={() => navigation.navigate('Buy')} style={{position:'absolute',left:0}}>
            <Image
                source={assets.back}
                style={{width: 16, height: 16, marginLeft: 15,marginTop:2,}}
            />
            </TouchableOpacity>
          <Text style={{fontSize: 16}}>PAYMENT METHOD</Text>
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '80%',
            height: height - 150,
            alignSelf: 'center',
            paddingBottom: 20,
          }}>
          <CurvedGreyButton
            label={
              <>
                <Image
                  source={assets.apple}
                  style={{tintColor: '#fff', height: 24, width: 24,}}
                />
                <Text style={{paddingLeft: 5}}>{' '}PAY</Text>
              </>
            }
            style={{marginTop: 15, borderRadius: 12}}
            onPress={() => payNow('apple')}
          />

          <CurvedGreyButton
            label={
              <>
                <Image
                  source={assets.google}
                  style={{height: 24, width: 24,}}
                />
                <Text>{' '}PAY</Text>
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
        style={{height: 'auto',}}>
        <View style={styles.modalBox1}>
        <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#161415',
              marginTop:70
            }}>

            <TouchableOpacity onPress={() => setPaymentModal(false)}>
            <Image
                source={assets.back}
                style={{width: 16, height: 16, marginLeft: 15,marginTop:15,}}
            />
            </TouchableOpacity>

            <Text
              style={{
                padding: 15,
                fontSize: 16,
                color: '#161415',
                fontFamily: 'Gotham-Medium',
                textAlign:'center'
              }}>
              PAY
            </Text>
          </View>

          <ScrollView contentContainerStyle={{
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

export default Pay;

const styles = StyleSheet.create({
    modalBox1: {
        paddingTop: Platform.OS === 'ios' ? 0 : 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginTop: 0,
      },
});
