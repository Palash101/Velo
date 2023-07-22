import React, {useState} from 'react';
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

const Journey = ({navigation}) => {
  const [data, setData] = useState([{}, {}, {}]);

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
        <View style={styles.totalClass}>
          <Text style={styles.subTitle}>Your Journey</Text>
          <Text style={styles.title}>750</Text>
          <Text style={styles.para}>Total Classes</Text>
        </View>
        <View style={styles.rideBoxes}>
          <View style={styles.rideBox}>
            <Text style={styles.rideText1}>Cycle</Text>
            <Text style={styles.count}>250</Text>
          </View>
          <View style={styles.rideBox}>
            <Text style={styles.rideText1}>Cycle</Text>
            <Text style={styles.count}>250</Text>
          </View>
          <View style={styles.rideBox}>
            <Text style={styles.rideText1}>Cycle</Text>
            <Text style={styles.count}>250</Text>
          </View>
        </View>

        <View style={styles.achBoxTitle}>
          <Text style={styles.achTitle}>Achievements</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Achievement')}>
            <Text style={styles.achTitle}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.achBoxes}>
          {data.map((item, index) => (
            <View style={styles.achBox} key={index}>
              <Image source={assets.vlogo} style={styles.achImg} />
            </View>
          ))}
        </View>
      </ScrollView>
    </PageContainer>
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
    fontWeight: '600',
    lineHeight: 82,
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  para: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginTop: -20,
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
    fontWeight: '600',
  },
  count: {
    fontSize: 32,
    fontWeight: '700',
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
    fontSize: 14,
    textTransform: 'uppercase',
  },
  achBox: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 16,
  },
  achImg: {
    width: 38,
    height: 38,
  },
});
