import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Badge} from 'react-native-paper';
import {assets} from '../../config/AssetsConfig';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;
export const ClassItem = props => {
  const {item} = props;
  const time = moment(item.start_date + ' ' + item.start_time).format(
    'hh:mm A',
  );
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate('ClassDetail', {item: item})}
        style={styles.outerBox}>
        <View style={styles.imageBox}>
          <Image
            source={
              item?.trainer?.image
                ? {uri: item?.trainer?.image}
                : require('../../../assets/images/bg.png')
            }
            style={styles.mainImage}
          />
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: width - 120,
          }}>
          <View style={styles.centerBox}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {item.title}{' '}
              {item.theme_name && (
                <Text>
                  | <Text style={styles.subTitle}>{item.theme_name}</Text>
                </Text>
              )}
            </Text>
            <View style={styles.timeBox}>
              <Image source={assets.clock} style={styles.timeImage} />
              <Text style={styles.time}>{time}</Text>
            </View>
            <Text style={styles.trainerName}>{item?.trainer?.first_name}</Text>
          </View>
          <View style={styles.lastBox}>
            {item.gender === 'Female' && (
              <Text style={styles.lastBoxText}>LADIES ONLY</Text>
            )}

            {item.attributes.booking_count_status.waiting_available === 0 &&
              item.attributes.booking_count_status.available === 0 &&
              item.attributes.user_waiting === false &&
              item.attributes.mine_booking === false && (
                <Badge style={[styles.bedge, {backgroundColor: '#161415',color:'#fff'}]}>
                  Fully Booked
                </Badge>
              )}

            {item.attributes.mine_booking === true &&
              item.attributes.user_waiting === false && (
                <Badge style={[styles.bedge, {backgroundColor: '#161415',color:'#fff'}]}>
                  Booked
                </Badge>
              )}

            {item.attributes.booking_count_status.waiting_available !== 0 &&
              item.attributes.booking_count_status.available === 0 &&
              item.attributes.user_waiting === false &&
              item.attributes.mine_booking === false && (
                <Badge style={[styles.bedge, {backgroundColor: '#FFC107'}]}>
                  Join Waitlist
                </Badge>
              )}

            {item.attributes.user_waiting === true && (
              <Badge style={[styles.bedge, {backgroundColor: '#161415',color:'#fff'}]}>
                Waiting: {item.attributes.booking_count_status.waiting}
              </Badge>
            )}

            {item.attributes.available_seat_text !== '' &&
              item.attributes.mine_booking === false && (
                <Badge style={[styles.bedge, {backgroundColor: '#30ae4d'}]}>
                  {item.attributes.available_seat_text}
                </Badge>
              )}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    backgroundColor: '#f2f2f2',
    marginVertical: 5,
    borderRadius: 14,
    padding: 8,
    justifyContent: 'space-between',
  },
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  lastBox: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  lastBoxText: {
    fontSize: 8,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Gotham-Medium',
    color: '#161415',
    marginBottom:5
  },
  bedge: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    height: 20,
    borderRadius: 10,
    lineHeight: 20,
    //marginTop: 5,
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 4,
  },
  timeImage: {
    width: 8,
    height: 8,
    marginRight: 5,
    marginTop: 0,
  },
  time: {
    fontSize: 10,
    color: '#161415',
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  centerBox: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  trainerName: {
    fontSize: 9,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Light',
  },
  title: {
    fontSize: 12,
    width: width - 220,
    overflow: 'hidden',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
    color: '#161415',
  },
  subTitle: {
    fontSize: 9,
    lineHeight: 16,
    fontWeight: '500',
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Light',
    color: '#161415',
  },
});
