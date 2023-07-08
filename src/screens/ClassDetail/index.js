import React, {useEffect} from 'react';
import {
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
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
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
import { useToast } from 'react-native-toast-notifications';
import { assets } from '../../config/AssetsConfig';

const height = Dimensions.get('window').height;
const ClassDetail = (props) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState();
  const [pageUrl, setPageUrl] = useState(
    API_LAYOUT + 'app/class-layout',
  );
  const {item} = props.route.params;

  const toast = useToast();
   const navigation = useNavigation();

  useEffect(() => {
    console.log(item,'item')
    loadClassLayout();
  }, [navigation]);

  const loadClassLayout = async () => {
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

  const LogoTitle = () => {
    return <Image source={assets.logo} style={{width: 60, height: 24}} />;
  };

  const BackIcon = () => {
    return (
      <TouchableOpacity onPress={() => {
        setOpen(false);
        navigation.navigate('Home');}}>
        <Image
          source={assets.back}
          style={{width: 24, height: 24, marginLeft: 15}}
        />
      </TouchableOpacity>
    );
  };

  const bookNow = async () => {
    console.log(selectedSeat, 'selected');
  }

  return (
    <>
      <PageLoader loading={loading} />
      <Modal
        visible={open}
        onRequestClose={() => setOpen(false)}
        animationType="slide">
        <View style={{paddingTop: Platform.OS === 'ios' ? 60 : 0}}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderColor: '#000',
              justifyContent:'space-between',
              paddingBottom:15,
            }}>
            <BackIcon />
            <LogoTitle />
            <View style={{width: 24, height: 24, marginLeft: 15}}></View>
          </View>
          <ScrollView
            contentContainerStyle={{
              bottom: 0,
              height: height - 180,
              backgroundColor: '#fff',
            }}>
            <WebView
              source={{
                uri: pageUrl,
                headers: {
                  //  Authorization: 'Bearer ' + token,
                  Accept: 'application/json',
                },
              }}
              onMessage={(event) => {
                setSelectedSeat(JSON.parse(event.nativeEvent.data).seatClick)
            }}
              onNavigationStateChange={data => checkResponce(data)}
              startInLoadingState={true}
            />
          </ScrollView>
          <View style={{paddingHorizontal:30,paddingVertical:15}}>
            <RoundedDarkButton
                label={'BOOK NOW'}
                onPress={bookNow}
            />
          </View>
          
        </View>
      </Modal>


      
    </>
  );
};
export default ClassDetail;

const styles = StyleSheet.create({});
