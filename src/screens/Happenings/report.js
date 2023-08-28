import React, {useContext, useEffect, useState} from 'react';
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
import {
  RoundedDarkButton,
  RoundedGreyButton,
  RoundedThemeButton,
} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {assets} from '../../config/AssetsConfig';
import ScaledImage from '../../components/ScaleImage';
import {useNavigation} from '@react-navigation/native';
import {API_SUCCESS} from '../../config/ApiConfig';
import moment from 'moment';
import {UserContext} from '../../../context/UserContext';
import {HappeningContoller} from '../../controllers/HappeningController';
import PageLoader from '../../components/PageLoader';
import {useToast} from 'react-native-toast-notifications';
import {ProfileController} from '../../controllers/ProfileController';

const height = Dimensions.get('window').height;

const HappeningReport = props => {
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const navigation = useNavigation();
  const {getToken} = useContext(UserContext);
  const toast = useToast();
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [rides, setRides] = useState(0);

  useEffect(() => {
    getDetail();
    getHappeningDetail();
  }, [props.route.params]);

  const getDetail = async () => {
    const token = await getToken();
    const instance = new ProfileController();
    const result = await instance.getUserDetail(token);
    setUser(result.user);
  };

  const getHappeningDetail = async () => {
    const token = await getToken();
    const id = props.route.params.item.id;
    const instance = new HappeningContoller();
    const result = await instance.getChallenges(id, token);
    setItem(result?.happening);
    if (result?.happening) {
      let newData = [];
      for (var i = 0; i < result?.happening.attended_classes; i++) {
        newData.push(i);
      }
      setData(newData);
    }
    if (result?.rides) {
      setRides(result?.rides);
    }
  };

  return (
    <>
      <PageLoader loading={loading} />
      <View style={styles.mainContainer}>
        <View
          style={{
            paddingHorizontal: 10,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: API_SUCCESS + '/' + item?.image}}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.detailBox}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, height: height}}>
            <View
              style={{
                width: 300,
                alignSelf: 'center',
                marginTop: 20,
                paddingBottom: 30,
              }}>
              <View style={styles.topBx}>
                <Text style={styles.uname}>
                  {user.first_name} {user.last_name}
                </Text>
                <Text style={styles.date}>
                  {moment(item?.start_date).format('DD MMM, YYYY')} - {' '}
                  {moment(item?.end_date).format('DD MMM, YYYY')}
                </Text>
              </View>
              <Text style={styles.hd}>{item?.title}</Text>

              <View style={styles.cirBx}>
                {data.map((i, index) => (
                  <View style={[styles.circle, styles.blackfilled]}>
                    {index < rides && (
                      <Image
                        source={{uri: API_SUCCESS + '/' + item?.icon}}
                        style={styles.filled}
                      />
                    )}
                  </View>
                ))}
              </View>
              <Text style={styles.hd3}>{item?.description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};
export default HappeningReport;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 60,
    fontFamily: 'Gotham-Black',
    color: '#161415',
  },
  itemImage: {
    width: width,
    height: 260,
    alignSelf: 'center',
    marginTop: 0,
  },
  mainContainer: {
    backgroundColor: '#e2e3e5',
    height: '100%',
    display: 'flex',
  },
  detailBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    bottom: 0,
    paddingTop: 20,
    marginTop: -75,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  date: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    lineHeight: 18,
    fontFamily: 'Gotham-Medium',
  },
  cirBx: {
    backgroundColor: '#000',
    width: 300,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  circle: {
    borderWidth: 1,
    borderColor: '#000',
    width: 32,
    height: 32,
    borderRadius: 20,
    margin: 12,
    backgroundColor: '#fff',
    zIndex: 999,
    position: 'relative',
  },
  filled: {
    textAlign: 'center',
    lineHeight: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 28,
    margin: 2,
    width: 26,
    height: 26,
  },
  blackfilled: {},
  uname: {
    color: '#000',
    fontSize: 12,
    lineHeight: 18,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
  },

  back: {
    margin: 20,
  },
  backImage: {
    width: 24,
    height: 20,
  },

  p3: {
    position: 'absolute',
    zIndex: 999,
    bottom: -10,
    right: -20,
    width: 100,
    height: 100,
    tintColor: '#000',
  },
  logov: {
    position: 'absolute',
    zIndex: 999,
    top: 220,
    left: width / 2 - 140,
    right: 0,
    margin: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 280,
    height: 280,
    opacity: 0.1,
  },
  hd: {
    color: '#000',
    fontSize: 22,
    marginTop: 6,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
  },
  hd2: {
    fontFamily: 'Gotham-Medium',
  },
  hd3: {
    color: '#000',
    fontSize: 24,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
  },
});
