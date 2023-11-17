import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
  Alert,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {Heading} from '../../components/Typography';
import {TraingBox} from '../../components/TrainingBox';
import {assets} from '../../config/AssetsConfig';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {UserContext} from '../../../context/UserContext';
import {ClassContoller} from '../../controllers/ClassController';
import {useNavigation} from '@react-navigation/native';
import {SkeltonBlackCard} from '../../components/Skelton';
import analytics from '@react-native-firebase/analytics';
import {HappeningContoller} from '../../controllers/HappeningController';
import {API_SUCCESS} from '../../config/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {AuthContoller} from '../../controllers/AuthController';
import remoteConfig from '@react-native-firebase/remote-config';
import { ModalView } from '../../components/ModalView';
import { RoundedGreyButton } from '../../components/Buttons';

const width = Dimensions.get('window').width;

const Home = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const {getToken, getUser} = useContext(UserContext);
  const [allData, setAllData] = useState([]);
  const [list, setList] = useState([]);
  const [scrollData, setScrollData] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [doubleJoyImage, setDoubleJoyImage] = useState('');
  const [storeImage, setStoreImage] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getData();
      getList();
      getHappening();
      getFirebaseToken();
      checkForUpdate();
    });
    return focusHandler;
  }, []);

  async function checkForUpdate() {
    try {
      await remoteConfig().fetchAndActivate();
      const forceUpdateVersion = remoteConfig()
        .getValue('force_update_version')
        .asString();
      const currentAppVersion = '3.9'; // Replace with your app's current version
      if (currentAppVersion < forceUpdateVersion) {
        setUpdateModal(true)
        // Show a modal or message to the user indicating they need to update the app.
        // You can use a library like 'react-native-modal' for modals.
        // You can also navigate the user to the app store.
      }
    } catch (error) {
      console.error('Error fetching remote config:', error);
    }
  }

  const update = async() => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.velo.bassem&hl=en_IN&gl=US')
  }

  const getFirebaseToken = async () => {
    const newFirebaseToken = await messaging().getToken();
    const saveToken = await AsyncStorage.getItem('firebaseToken');

    console.log(newFirebaseToken, 'newFirebaseToken');
    if (!saveToken || saveToken !== newFirebaseToken) {
      const token = await getToken();
      const instance = new AuthContoller();
      const result = await instance.firebaseTokenUpdate(
        newFirebaseToken,
        token,
      );
      AsyncStorage.setItem('firebaseToken', newFirebaseToken);
    }
  };

  const getData = async () => {
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.getHomeLocation(token);
    setAllData(result.locations);
  };

  const getList = async () => {
    const data = [
      {
        img: require('../../../assets/images/bg.png'),
      },
      {
        img: require('../../../assets/images/bg.png'),
      },
      {
        img: require('../../../assets/images/bg.png'),
      },
      {
        img: require('../../../assets/images/bg.png'),
      },
      {
        img: require('../../../assets/images/bg.png'),
      },
    ];
    setList(data);
    // const half = Math.ceil(data.length / 2);
    // const firstHalf = data.slice(0, half);
    // setScrollData(firstHalf);
  };

  const getHappening = async () => {
    const token = await getToken();
    const instance = new HappeningContoller();
    const result = await instance.getAllChallenges(token);
    setChallenges(result?.happenings);

    setDoubleJoyImage(result?.doublejoy_banner);
    setStoreImage(result?.store_banner);

    const half = Math.ceil(result?.happenings.length / 2);
    const firstHalf = result?.happenings.slice(0, half);
    setScrollData(firstHalf);
  };

  const logCustomeEvent = async (eventName, name) => {
    const {gender} = await getUser();
    await analytics().logEvent(eventName, {
      name: name,
      gender: gender,
    });
  };

  return (
    <>
      <PageContainer>
        <ScrollView
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}>
          <Heading style={{marginBottom: 5, marginTop: 5}}>Train</Heading>
          {!allData?.length ? (
            <>
              <SkeltonBlackCard />
              <SkeltonBlackCard />
              <SkeltonBlackCard />
            </>
          ) : (
            <>
              {allData?.map((item, key) => (
                <View key={key + 'tr'}>
                  {key < 3 && (
                    <View>
                      <TraingBox
                        title={item.name}
                        bg={{uri: API_SUCCESS +'/'+ item.image}}
                        onPress={() => {
                          logCustomeEvent('MostStudioClicked', item.name);
                          AsyncStorage.setItem(
                            'activeStudio',
                            JSON.stringify([key]),
                          );
                          navigation.navigate('classes');
                        }}
                      />
                    </View>
                  )}
                </View>
              ))}
            </>
          )}
          {challenges && challenges.length > 0 && (
            <View style={{marginTop: 10}}>
              <Heading style={{marginBottom: 5, marginTop: 10}}>
                HAPPENING NOW
              </Heading>

              <FlatList
                horizontal={true}
                data={challenges.sort((a, b) => a.position - b.position)}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {
                    useNativeDriver: false,
                  },
                )}
                pagingEnabled
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={({item}, key) => (
                  <View key={key + 'happening'}>
                    <TraingBox
                      title={''}
                      bg={{uri: API_SUCCESS + '/' + item.image}}
                      onPress={() => {
                        if (item?.enroll?.id) {
                          navigation.navigate('HappeningsReport', {item: item});
                        } else {
                          navigation.navigate('HappeningDetail', {item: item});
                        }
                      }}
                      style={{
                        width: width / 2 - 15,
                        marginRight: 8,
                        height: 95,
                      }}
                    />
                  </View>
                )}
              />
              {challenges?.length > 2 && (
                <ExpandingDot
                  data={scrollData}
                  expandingDotWidth={30}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.6}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                  activeDotColor="#606060"
                  inActiveDotColor="#888"
                  containerStyle={{
                    top: 145,
                    left: '50%',
                    right: '50%',
                    width: width,
                    marginLeft: -45,
                  }}
                />
              )}
            </View>
          )}
          <View style={{marginTop: challenges?.length > 2 ? 40 : 20}}>
            <Heading style={{marginBottom: 5}}>DOUBLE JOY</Heading>
            <TraingBox
              // title={'Coming Soon...'}
              title={''}
              bg={{uri: doubleJoyImage}}
              style={{marginHorizontal: 0, height: 150}}
              onPress={() => console.log()}
              onPress={() => navigation.navigate('DoubleJoy')}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Heading style={{marginBottom: 5, marginTop: 10}}>STORE</Heading>
            <TraingBox
              title={'Coming Soon...'}
              bg={{uri: storeImage}}
              style={{marginHorizontal: 0, height: 150}}
              onPress={() => console.log()}
              //onPress={() => navigation.navigate('Store')}
            />
          </View>
        </ScrollView>
      </PageContainer>

      <ModalView
        visible={updateModal}
        heading="Update App"
        setVisible={() => setUpdateModal(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
          zIndex: 999,
        }}>
        <View style={styles.summeryBox}>
          <View style={styles.modalTotalBox}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              Please update your application to continue.
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 15,
            }}>
          
            <RoundedGreyButton
              label={'UPDATE'}
              onPress={() => update()}
              style={{width: 100, marginLeft: 5, marginTop: 5}}
            />
          </View>
        </View>
      </ModalView>

    </>
  );
};
export default Home;
const styles = StyleSheet.create({
  modalTotalBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
  },
  summeryBox: {
    width: width - 70,
    alignSelf: 'center',
    marginBottom: 20,
  },

})
