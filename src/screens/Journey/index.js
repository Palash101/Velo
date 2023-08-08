import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {UserContext} from '../../../context/UserContext';
import {JourneyContoller} from '../../controllers/JourneyController';
import PageLoader from '../../components/PageLoader';

const Journey = ({navigation}) => {
  const [data, setData] = useState([{}, {}, {}]);
  const [locations, setLocations] = useState([]);
  const {getToken} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getBookings();
    });
    return focusHandler;
  }, []);

  const getBookings = async () => {
    setLoading(true);
    const token = await getToken();
    const instance = new JourneyContoller();
    const result = await instance.getAllBooking(token);
    console.log(result, 'result');
    setLoading(false);
    setLocations(result.locations);
    setTotal(getTotal(result.locations));
  };

  const getTotal = allLocation => {
    let totalVal = 0;
    allLocation.forEach(element => {
      totalVal = totalVal + element.bookings_count;
    });
    return totalVal;
  };

  return (
    <>
      <PageLoader loading={loading} />
      <PageContainer>
        <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
          <View style={styles.totalClass}>
            <Text style={styles.subTitle}>Your Journey</Text>
            <Text style={styles.title}>{total}</Text>
            <Text style={styles.para}>Total Classes</Text>
          </View>
          <View style={styles.rideBoxes}>
            {locations.map((item, index) => (
              <View style={styles.rideBox}>
                <Text style={styles.rideText1}>{item.name}</Text>
                <Text style={styles.count}>{item.bookings_count}</Text>
              </View>
            ))}
          </View>

          <View style={styles.achBoxTitle}>
            <Text style={styles.achTitle}>Achievements</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Achievement')}>
              <Text style={styles.achTitle}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.achBoxes}>
            {data.map((item, index) => (
              <View style={styles.achBox} key={index}>
                <Image source={assets.lock} style={styles.achImg} />
              </View>
            ))}
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Journey;
const styles = StyleSheet.create({
  totalClass: {
    marginVertical: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 82,
    fontFamily: 'Gotham-medium',
    lineHeight: 82,
    marginTop: 5,
  },
  subTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-medium',
  },
  para: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Book',
    marginTop: -5,
  },
  rideBoxes: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rideBox: {
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#161415',
    shadowOffset: {width: 2, height: 12},
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  rideText1: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-medium',
  },
  count: {
    fontSize: 32,
    fontFamily: 'Gotham-Medium',
    textAlign: 'center',
    marginTop: 5,
  },
  achBoxes: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  achBoxTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 70,
    marginBottom: 15,
  },
  achTitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Book',
  },
  achBox: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    borderRadius: 16,
  },
  achImg: {
    width: 28,
    height: 28,
    tintColor: '#161415',
  },
});
