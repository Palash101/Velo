import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Dimensions,
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
import {BuyContoller} from '../../controllers/BuyController';
import {UserContext} from '../../../context/UserContext';
import {Modal} from 'react-native-paper';
import WebView from 'react-native-webview';
import {useToast} from 'react-native-toast-notifications';
import {API_BASE} from '../../config/ApiConfig';
import {ActivePackageItem} from '../../components/PackageItem/ActivePackageItem';
import PageLoader from '../../components/PageLoader';
const height = Dimensions.get('window').height;

const Buy = ({navigation}) => {
  const [active, setActive] = useState('All');
  const {getToken} = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [userPackages, setUserPackages] = useState([{}]);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartModal, setCartModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [payLoading1, setPayLoading1] = useState(false);
  const [payLoading2, setPayLoading2] = useState(false);

  const toast = useToast();

  useEffect(() => {
    getPackages();
    getUserAllPackages();
  }, []);

  const getUserToken = async () => {
    return await getToken();
  };

  const getPackages = async () => {
    const token = await getToken();
    const instance = new BuyContoller();
    const result = await instance.getAllPackages(token);
    if (result?.data?.length) {
      setData(result.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const getUserAllPackages = async () => {
    const token = await getToken();
    const instance = new BuyContoller();
    const result = await instance.getUserPackages(token);
    console.log(result);
    if (result?.length) {
      setUserPackages(result);
    } else {
      setErrorMessage(result.msg);
    }
  };

  const selectItem = item => {
    setSelectedItem(item);
    setCartModal(true);
  };

  const checkResponse = data => {
    if (data.url === 'https://veloqa.com/admin/package/paymentsuccess') {
      setPaymentModal(false);
      toast.show('Package purchased successfully');
      navigation.navigate('Buy');
    } else if (data.url.includes('transaction_cancelled')) {
      setPaymentModal(false);
    }
  };

  const PayFromCard = async () => {
    const payurl =
      API_BASE +
      '/packages/purchase?package_id=' +
      selectedItem.id +
      '&type=Prepaid&device=mobile';
    setPaymentUrl(payurl);
    setCartModal(false);
    setPaymentModal(true);
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
            setPayLoading2(true);
            completePayment();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const completePayment = async () => {
    const data = {
      id: selectedItem.id,
      type: 'wallet',
    };
    const token = await getToken();
    const instance = new BuyContoller();
    const result = await instance.purchasePackage(data, token);
    console.log(result, 'resss');
    if (result.status === 'success') {
      toast.show(result.msg);
      setCartModal(false);
      getUserAllPackages();
      setActive('My');
      setLoading(false);
      setPayLoading2(false)
    } else {
      if (result.checkout_link) {
        setPaymentUrl(result.checkout_link);
        setCartModal(true);
      } else {
        console.log(result, 'resjj');
        toast.show(result.msg);
      }
      setLoading(false);
      setPayLoading2(false)
    }
  };

  const bookingSummery = () => {
    if (selectedItem && selectedItem.attributes) {
      return (
        <View>
          <View style={styles.summary}>
            <Text style={[styles.hding, {marginTop: 0, marginBottom: 10}]}>
              Booking Summary
            </Text>

            <View style={styles.summaryLine}>
              <Text style={styles.stext1}>{selectedItem.attributes.name}</Text>
              <Text style={styles.stext2}>
                {selectedItem.attributes.amount} QR
              </Text>
            </View>

            <View style={styles.summaryLine}>
              <Text style={styles.stext1}>Rides</Text>
              <Text style={styles.stext2}>
                {selectedItem.attributes.rides}{' '}
              </Text>
            </View>
            <View style={styles.summaryLine}>
              <Text style={styles.stext1}>Validity</Text>
              <Text style={styles.stext2}>
                {selectedItem.attributes.validity} Days{' '}
              </Text>
            </View>

            <View style={styles.summaryLineTotal}>
              <Text style={styles.stext1Bold}>Total</Text>
              <Text style={styles.stext2Bold}>
                {selectedItem.attributes.amount} QR
              </Text>
            </View>
          </View>
          <View style={styles.payBtnBox}>
            <RoundedDarkButton
              label="PAY FROM CREDIT/DEBIT CARD"
              loading={payLoading1}
              onPress={() => PayFromCard()}
            />
            <RoundedDarkButton
              label="PAY FROM WALLET"
              loading={payLoading2}
              onPress={() => PayFromWallet()}
            />
          </View>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
    <PageLoader loading={loading} />
      <PageContainer>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.tab}>
            {active === 'All' ? (
              <RoundedDarkButton label={'ALL PACKAGES'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'ALL PACKAGES'}
                onPress={() => setActive('All')}
                style={styles.tabBtn}
              />
            )}
            {active === 'My' ? (
              <RoundedDarkButton label={'My PACKAGES'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'MY PACKAGES'}
                onPress={() => setActive('My')}
                style={styles.tabBtn}
              />
            )}
          </View>
          {active === 'All' ? (
            <View style={styles.classesList}>
              <FlatList
                data={data}
                pagingEnabled
                numColumns={2}
                showsVerticalScrollIndicator={false}
                decelerationRate={'normal'}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                renderItem={({item}, key) => (
                  <PackageItem key={key} item={item} onPress={selectItem} />
                )}
              />
            </View>
          ) : (
            <View style={styles.classesList}>
              {userPackages?.length ? (
                <FlatList
                  data={userPackages}
                  pagingEnabled
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  decelerationRate={'normal'}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                  }}
                  renderItem={({item}, key) => (
                    <ActivePackageItem key={key} item={item} />
                  )}
                />
              ) : (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </PageContainer>

      <Modal
        visible={cartModal}
        onDismiss={() => setCartModal(false)}
        style={{height: 'auto', marginTop: 260}}>
        <View style={styles.modalBox}>
          <View style={styles.titleHeading}>
            <Text style={styles.titleText}>CHECKOUT</Text>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            {bookingSummery()}
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={paymentModal}
        onDismiss={() => setPaymentModal(false)}
        style={{height: 'auto', marginTop: 60}}>
        <View style={styles.modalBox1}>
          <View style={styles.titleHeading}>
            <Text style={styles.titleText}>Package Payment</Text>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
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
export default Buy;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  errorBox: {
    marginTop: '50%',
  },
  modalBox: {
    paddingTop: Platform.OS === 'ios' ? 30 : 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    //  marginTop: 160,
  },
  modalBox1: {
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: 60,
  },
  titleHeading: {
    flexDirection: 'row',
  },
  titleText: {
    paddingHorizontal: 10,
    paddingTop: 30,
    fontSize: 22,
    color: '#000',
    fontFamily: 'Gotham-Medium',
    textTransform: 'uppercase',
  },
  closeBtnBox: {
    padding: 15,
    borderRightWidth: 1,
    borderColor: '#ddd',
  },
  closeText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  modalContent: {
    padding: 10,
    bottom: 0,
    height: height - 100,
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Gotham-Medium',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  tabBtn: {
    width: width / 2 - 30,
  },
  classesList: {
    marginBottom: 170,
  },
  calander: {
    marginBottom: 20,
  },
  summary: {
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 20,
  },
  summaryLine: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
    paddingTop: 0,
    paddingBottom: 0,
  },
  summaryLineTotal: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 1,
  },
  stext2: {
    position: 'absolute',
    right: 0,
    lineHeight: 40,
    fontSize: 14,
    fontFamily: 'Gotham-Medium',
    color: '#000',
    marginTop: 0,
  },
  stext3: {
    position: 'absolute',
    right: 100,
    lineHeight: 40,
  },
  stext1: {
    lineHeight: 40,
    color: '#000',
    fontSize: 14,
    marginTop: 0,
    fontFamily: 'Gotham-Medium',
  },
  stext1Bold: {
    lineHeight: 40,
    fontWeight: 'bold',
    fontFamily: 'Gotham-Medium',
  },
  stext2Bold: {
    position: 'absolute',
    right: 20,
    lineHeight: 40,
    fontWeight: 'bold',
    fontFamily: 'Gotham-Medium',
  },
  payBtnBox: {
    height: 100,
    justifyContent: 'space-around',
  },
});
