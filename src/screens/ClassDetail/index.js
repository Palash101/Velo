import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import TopBar from '../../components/TopBar';
import {
  RoundedDarkButton,
  RoundedDarkButton2,
  RoundedGreyButton,
  RoundedOutlineButton,
  RoundedRedButton,
  RoundedThemeButton,
} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {ClassItem} from '../../components/ClassItem';
import Calendar from '../../components/calendar/Calendar';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../components/PageLoader';
import WebView from 'react-native-webview';
import {API_LAYOUT, API_SUCCESS} from '../../config/ApiConfig';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';
import {ModalView} from '../../components/ModalView';
import {ClassContoller} from '../../controllers/ClassController';
import {BuyContoller} from '../../controllers/BuyController';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ClassDetail = props => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState();
  const [pageUrl, setPageUrl] = useState('');
  const {getToken} = useContext(UserContext);
  const toast = useToast();
  const navigation = useNavigation();
  const [payModal, setPayModal] = useState(false);
  const [item, setItem] = useState();
  const [userPackages, setUserPackages] = useState();
  const [forceReload, setForseReload] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [loadFooter, setLoadFooter] = useState(false);
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      console.log('Refreshed');
      setPageUrl('');
      setItem();
      setSelectedSeat();
      setForseReload(!forceReload);
      loadClassLayout();
      getDetail();
      getUserAllPackages();
    });
    return focusHandler;
  }, [props.route.params, navigation]);

  useEffect(() => {
      console.log('Refreshed');
      setPageUrl('');
      setItem();
      setSelectedSeat();
      setForseReload(!forceReload);
      loadClassLayout();
      getDetail();
      getUserAllPackages();
  }, [refresh]);

  useEffect(() => {
    console.log(item?.id, 'itemm');
  }, [setItem, item]);

  

  const getUserAllPackages = async () => {
    const token = await getToken();
    const instance = new BuyContoller();
    const result = await instance.getUserPackages(token);
    console.log(result, 'userpackage');
    if (result.status === 'error') {
    } else {
      setUserPackages(result);
    }
  };

  const getDetail = async () => {
    setLoading(true);
    const token = await getToken();
    const id = props.route.params.item.id;
    const instance = new ClassContoller();
    const result = await instance.getClassDetail(id, token);
    console.log(result, 'pricee');
    setItem(result.class);
    setLoading(false);
  };

  const loadClassLayout = async () => {
    const newToken = await getToken();
    console.log(props.route.params.item, 'props.route.params');
    const id = props.route.params.item.id;
    const url = API_LAYOUT + 'app/class-layout?id=' + id + '&token=' + newToken;
    console.log(url, 'url');
    setPageUrl(url);
    setLoading(false);
    setOpen(true);
  };

  const checkResponce = data => {
    console.log('resback', data.url);
    if (data.url === API_SUCCESS + '/wallet/paymentsuccess') {
      toast.show('Class booked successfully');
      setOpen(false);
      navigation.navigate('Drawer');
    } else if (data.url.includes('transaction_cancelled')) {
      toast.show('Your transaction has been cancelled.');
      setOpen(false);
      navigation.navigate('Drawer');
    }
  };

  const bookNow = async () => {
    console.log(selectedSeat, item.priceType, 'selected');
    if (selectedSeat) {
      setPayModal(true);
    } else {
      toast.show('Please select seat.');
    }
  };

  const Checkout = async type => {
    const data = {
      classes_id: item.id,
      type: type,
      seat: selectedSeat,
      device: 'mobile',
    };
    completeBooking(data);
  };

  const CheckoutFromPackage = async value => {
    console.log(value.id, 'valuevalue');
    const data = {
      classes_id: item.id,
      type: 'Package',
      seat: selectedSeat,
      device: 'mobile',
      package_id: value.id,
    };
    completeBooking(data);
  };

  const completeBooking = async data => {
    setLoading(true);
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.BookClass(data, token);
    console.log(result, 'result');
    if (result.status === 'success') {
      toast.show(result.msg);
      setPayModal(false);
      setLoading(false);
      navigation.goBack();
    } else {
      toast.show(result.msg);
      setLoading(false);
    }
  };

  const updateBooking = async () => {
    console.log(selectedSeat, item.priceType, 'selected');
    if (selectedSeat) {
      setLoading(true);
      const data = {
        seat: selectedSeat,
        booking_id: item.bookings[0].id,
      };
      const token = await getToken();
      const instance = new ClassContoller();
      const result = await instance.UpdateClass(data, token);
      console.log(result, 'result');
      if (result.status === 'success') {
        toast.show(result.msg);
        setLoading(false);
        setRefresh(!refresh);
      } else {
        toast.show(result.msg);
        setLoading(false);
      }
    } else {
      toast.show('Please select seat.');
    }
  };

  const cancelBooking = async () => {
    setLoading(true);
    const data = {
      booking_id: item.bookings[0].id,
    };
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.CancelClass(data, token);
    console.log(result, 'result');
    if (result.status === 'success') {
      toast.show(result.msg);
      setLoading(false);
      setCancelModal(false);
      navigation.goBack();
    } else {
      toast.show(result.msg);
      setLoading(false);
    }
  };

  const leaveWaitlist = async () => {};

  const bookNowInWaing = async () => {};

  const renderButton = () => {
    if (item?.attributes) {
      if (
        item?.attributes?.mine_booking === true &&
        item?.attributes?.user_waiting === false
      ) {
        return (
          <View
            style={{textAlign: 'center', alignItems: 'center', marginTop: -40}}>
            <Text style={{fontSize: 12}}>Booked</Text>
            <RoundedRedButton
              label={'CANCEL'}
              onPress={() => setCancelModal(true)}
              style={{width: 120, marginLeft: 5, marginTop: 5}}
            />
            <RoundedDarkButton2
              label={'UPDATE BIKE'}
              onPress={updateBooking}
              style={{width: 120, marginLeft: 5,marginTop:5}}
            />
          </View>
        );
      } else if (item?.attributes?.user_waiting === true) {
        return (
          <RoundedDarkButton2
            label={'LEAVE WAITLIST'}
            onPress={leaveWaitlist}
            style={{width: 120, marginLeft: 5}}
          />
        );
      } else if (
        item.attributes.user_waiting === false &&
        item.attributes.mine_booking === false &&
        item.attributes.booking_count_status.available === 0 &&
        item.attributes.booking_count_status.waiting_available !== 0
      ) {
        return (
          <RoundedDarkButton
            label={'JOIN WAITLIST'}
            onPress={bookNowInWaing}
            theme={{colors: {primary: 'green'}}}
            style={{width: 150, marginLeft: 5, padding: 0}}
          />
        );
      } else {
        return (
          <RoundedDarkButton2
            label={'BOOK NOW'}
            onPress={bookNow}
            style={{width: 120, marginLeft: 5}}
          />
        );
      }
    }
  };

  return (
    <>
      <PageLoader loading={loading} />

      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? 0 : 0,
          backgroundColor: '#fff',
        }}>
        <ScrollView
          contentContainerStyle={{
            bottom: 0,
            height: height - 180,
            backgroundColor: '#fff',
          }}
         
          
          >
          {pageUrl && (
            <WebView
              source={{
                uri: pageUrl,
                forceReload: forceReload,
                headers: {
                  Accept: 'application/json',
                },
              }}
              onMessage={event => {
                setSelectedSeat(JSON.parse(event.nativeEvent.data).seatClick);
              }}
              onNavigationStateChange={data => checkResponce(data)}
              startInLoadingState={true}
              onLoadEnd={() => setLoadFooter(true)}
            />
          )}
        </ScrollView>
        {loadFooter === true && item ? (
          <View style={styles.footer}>
            <Text style={styles.smallPara}>
              THOSE WHO ARRIVE 5 MINS AFTER THE START OF THE CLASS WILL NOT BE
              PERMITTED TO ENTER
            </Text>
            {renderButton()}
          </View>
        ) : (
          <></>
        )}
      </View>

      <ModalView
        visible={cancelModal}
        heading="CANCEL BOOKING"
        setVisible={() => setCancelModal(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
        }}>
        <View style={styles.summeryBox}>
          <View style={styles.modalTotalBox}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
            Are you sure you want to cancel your booking?
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 25,
            }}>
            <RoundedOutlineButton
              label={'NO'}
              onPress={() => setCancelModal(false)}
              style={{width: 100, marginLeft: 5, marginTop: 5}}
            />
            <RoundedGreyButton
              label={'YES'}
              onPress={() => cancelBooking()}
              style={{width: 100, marginLeft: 5, marginTop: 5}}
            />
          </View>
        </View>
      </ModalView>

      <ModalView
        visible={payModal}
        heading="PROCEED TO CHECKOUT"
        setVisible={() => setPayModal(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
          zIndex: 999,
        }}>
        <View style={styles.summeryBox}>
          <View style={styles.modalTotalBox}>
            <Text style={styles.priceText}>{item?.location.spot_name}</Text>
            <Text style={styles.priceText}>{selectedSeat}</Text>
          </View>
          {item?.priceType === 'Amount' && (
            <View style={styles.modalTotalBox}>
              <Text style={styles.priceText}>Amount</Text>
              <Text style={styles.priceText}>{item?.price} QR</Text>
            </View>
          )}

          {item?.priceType === 'Amount' && (
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => Checkout('Wallet')}>
              <Text style={styles.btnText}>Pay from wallet</Text>
              <Text style={styles.btnText}>{item?.price} QR</Text>
            </TouchableOpacity>
          )}
          {item?.priceType === 'Free' && (
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => Checkout('Free')}>
              <Text style={styles.btnText}>Free Checkout</Text>
              <Text style={styles.btnText}>0 QR</Text>
            </TouchableOpacity>
          )}
          {item?.priceType === 'Credit' && userPackages && (
            <View>
              <Text
                style={[
                  {
                    marginTop: 10,
                    marginBottom: 0,
                    fontSize: 10,
                    textAlign: 'center',
                  },
                ]}>
                BOOK FROM PACKAGES
              </Text>

              {userPackages.map((item1, index) => (
                <TouchableOpacity
                  key={index + 'btn'}
                  style={styles.checkoutBtn}
                  onPress={() => CheckoutFromPackage(item1)}>
                  <Text style={styles.btnText}>{item1.attributes.name}</Text>
                  {item.attributes.remaining_rides === 'unlimited' ? (
                    <Text style={styles.btnText}>
                      {item1.attributes.remaining_rides}{' '}
                      {item1.attributes.type !== 'unlimited' && 
                      <Text style={{}}>{item1.attributes.type}</Text>
                      }
                    </Text>
                  ) : (
                    <Text style={styles.btnText}>
                      {item1.attributes.remaining_rides}{' '}
                      {item1.attributes.type !== 'unlimited' && 
                      <Text style={{}}>{item1.attributes.type}</Text>
                      }
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ModalView>
    </>
  );
};
export default ClassDetail;

const styles = StyleSheet.create({
  smallPara: {
    fontSize: 8,
    fontFamily: 'Gotham-Medium',
    maxWidth: width - 180,
    lineHeight: 12,
  },
  footer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  checkoutBtn: {
    backgroundColor: '#161415',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  priceText: {
    fontSize: 14,
    fontFamily: 'Gotham-Medium',
    textTransform: 'uppercase',
  },
  modalTotalBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  summeryBox: {
    width: width - 70,
    alignSelf: 'center',
    marginBottom: 100,
  },
});
