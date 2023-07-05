import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Badge} from 'react-native-paper';
import {assets} from '../../config/AssetsConfig';

const width = Dimensions.get('window').width;
export const PlannerClass = props => {
  return (
    <>
      <View style={styles.outerBox}>
        <View style={styles.imageBox}>
          <Image
            source={require('../../../assets/images/bg.png')}
            style={styles.mainImage}
          />
        </View>
        <View style={styles.centerBox}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            CYCLE
          </Text>
          <Text style={styles.subTitle}>Justin bieber</Text>
          <Text style={styles.trainerName}>PAOLA</Text>
        </View>
        <View style={styles.dateBox}>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>THU, 04 MAY 2023</Text>
                </View>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>09:15 AM - 10:00 AM</Text>
                </View>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>BIKE - 28</Text>
                </View>
        </View>
        <View style={styles.lastBox}>
          <Badge style={[styles.bedge,{backgroundColor:'green'}]}>Go to Class</Badge>
          <Badge style={[styles.bedge,{backgroundColor:'red'}]}>Cancel Booking</Badge>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#f2f2f2',
    marginVertical: 5,
    borderRadius: 14,
    padding: 10,
  },
  imageBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
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
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  bedge: {
    fontSize: 7,
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingHorizontal:5,
    marginVertical:2,
    width:80,

  },
  dateBox:{
    justifyContent:'center'
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 2,
  },
  timeImage: {
    width: 8,
    height: 8,
    marginRight: 5,
    marginTop: 2,
  },
  dateText: {
    fontSize: 8,
    fontWeight: '400',
    color: '#000',
  },
  centerBox: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  trainerName: {
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    overflow: 'hidden',
  },
  subTitle: {
    fontSize: 8,
    lineHeight: 16,
    fontWeight: '500',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});
