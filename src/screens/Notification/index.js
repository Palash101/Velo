import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedGreyButton} from '../../components/Buttons';
import {useState} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlannerClass} from '../../components/PlannerClass';
import {Heading} from '../../components/Typography';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';
import {NotificationController} from '../../controllers/NotificationController';
import {SkeltonCard} from '../../components/Skelton';

const Notification = ({navigation}) => {
  const {getToken} = useContext(UserContext);
  const [data, setData] = useState();
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getNotifications();
    });
    return focusHandler;
  }, [refresh]);

  const getNotifications = async () => {
    setLoading(true);
    const token = await getToken();
    const instance = new NotificationController();
    const result = await instance.getAllNotification(token);
    setLoading(false);
    setData(result?.data);
  };

  return (
    <>
      <PageContainer>
        <Heading style={{marginVertical: 5}}>Notifications</Heading>
        <ScrollView
          contentContainerStyle={{paddingHorizontal: 10, marginTop: 20}}>
          {data?.length > 0 ? (
            <View style={styles.classesList}>
              {data.map((item, index) => (
                <View key={index + 'keyy'} style={styles.notiTitle}>
                  <Image source={assets.vlogo} style={styles.img} />
                  <View style={styles.rightBox}>
                    <Text style={styles.date}>{item.attributes.date}</Text>
                    <Text style={styles.titleText}>
                      {item.attributes.title}
                    </Text>
                    <Text style={styles.description}>
                      {item.attributes.message}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View>
              {loading === true ? (
                <>
                  <SkeltonCard />
                  <SkeltonCard />
                  <SkeltonCard />
                  <SkeltonCard />
                </>
              ) : (
                <>
                  <Text style={styles.noData}>
                    No upcoming bookings available.
                  </Text>
                </>
              )}
            </View>
          )}
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Notification;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  notiTitle: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    fontFamily: 'Gotham-Book',
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
  },
  rightBox: {
    width: width - 145,
  },
  titleText: {
    fontFamily: 'Gotham-Medium',
    lineHeight: 16,
    fontSize: 14,
  },
  noData: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: height / 2 - 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Gotham-Book',
    marginTop: 2,
    lineHeight: 16,
  },
  date: {
    fontSize: 12,
    position: 'absolute',
    right: 0,
    marginTop: 0,
    color: '#888',
    fontFamily: 'Gotham-Medium',
  },
  img: {
    tintColor: '#fff',
    backgroundColor: '#000',
    borderRadius: 12,
    width: 52,
    height: 52,
    marginRight: 10,
  },
});
