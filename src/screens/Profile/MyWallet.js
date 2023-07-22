import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedDarkButton} from '../../components/Buttons';
import PageLoader from '../../components/PageLoader';
import {WalletController} from '../../controllers/WalletController';
import {UserContext} from '../../../context/UserContext';
import {ModalView} from '../../components/ModalView';
import {Input} from '../../components/Input/input';
import {useToast} from 'react-native-toast-notifications';
import {API_BASE, API_SUCCESS} from '../../config/ApiConfig';
import WebView from 'react-native-webview';

const height = Dimensions.get('window').height;
const MyWallet = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const {getToken} = useContext(UserContext);
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [paymentModal, setPaymentModal] = useState(false);
  const [qnbUrl, setQnbUrl] = useState('');
  const toast = useToast();
  const [token, setToken] = useState();
  

  useEffect(() => {
    getMyBanance();
  }, []);


  const getMyBanance = async () => {
    const token = await getToken();
    setToken(token);
    const instance = new WalletController();
    const result = await instance.getBalance(token);
    console.log(result, 'ress');
    setLoading(false);
    if (result?.attributes?.balance) {
      setBalance(result.attributes.balance);
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  const checkqnbresponse = data => {
    console.log('resback', data.url);
    if (data.url === API_SUCCESS + '/wallet/paymentsuccess') {
      setPaymentModal(false);
      getMyBanance();
    } else if (data.url.includes('transaction_cancelled')) {
      setPaymentModal(false);
      toast.show('Your transaction has been cancelled.');
    }
  };

  const openPaymentMethod = async () => {
    if (amount == '' || amount == 0) {
      toast.show('Please enter valid amount');
    } else {
      const paymentURL = API_BASE + '/wallet/add/balance?amount=' + amount;
      setQnbUrl(paymentURL);
      setOpen(false);
      setPaymentModal(true);
    }
  };

  return (
    <>
      <PageLoader loading={loading} />

      <PageContainer>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Text style={{paddingLeft: 15}}>WALLET</Text>

          <View style={styles.form}>
            <View style={styles.walletBox}>
              <Text style={styles.amountText}>{balance} QR</Text>
            </View>
            <View style={styles.btnBox}>
              <RoundedDarkButton
                label={'TOP UP'}
                style={{marginTop: 20, width: width / 2 - 50}}
                onPress={openModal}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </PageContainer>

      <ModalView
        visible={open}
        heading="AMOUNT TO ADD"
        setVisible={() => setOpen(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
        }}>
        <View style={{paddingHorizontal: 30, marginTop: 30, paddingBottom: 80}}>
          <Input
            value={amount}
            label={'ENTER AMOUNT'}
            onChang={setAmount}
            keyboardType="numeric"
          />

          <RoundedDarkButton
            label="PAY FROM CREDIT/DEBIT CART"
            style={{marginTop: 30}}
            onPress={openPaymentMethod}
          />
        </View>
      </ModalView>

      <Modal
        visible={paymentModal}
        onRequestClose={() => setPaymentModal(false)}
        animationType="slide">
        <View style={{paddingTop: Platform.OS === 'ios' ? 40 : 0}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#161415',
            }}>
            <Text
              style={{
                padding: 15,
                fontSize: 16,
                color: '#161415',
                fontFamily: 'Gotham-Medium',
              }}>
              WALLET RECHARGE
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              padding: 10,
              bottom: 0,
              height: height - 140,
              backgroundColor: '#f9f9f9',
            }}>
            <WebView
              source={{
                uri: qnbUrl,
                headers: {
                  Authorization: 'Bearer ' + token,
                  Accept: 'application/json',
                },
              }}
              onNavigationStateChange={data => checkqnbresponse(data)}
              startInLoadingState={true}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};
export default MyWallet;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  form: {
    width: width - 40,
    alignSelf: 'center',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  walletBox: {
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingVertical: 70,
    borderRadius: 24,
    shadowColor: '#161415',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  amountText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
