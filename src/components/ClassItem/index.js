import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Badge} from 'react-native-paper';
import {assets} from '../../config/AssetsConfig';

const width = Dimensions.get('window').width;
export const ClassItem = props => {
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
            CYCLE | <Text style={styles.subTitle}>Justin bieber ride</Text>
          </Text>
          <View style={styles.timeBox}>
            <Image source={assets.clock} style={styles.timeImage} />
            <Text style={styles.time}>05:15 PM</Text>
          </View>
          <Text style={styles.trainerName}>PAOLA</Text>
        </View>
        <View style={styles.lastBox}>
          <Text style={styles.lastBoxText}>LADIES ONLY</Text>
          <Badge style={styles.bedge}>Fully Booked</Badge>
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
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    height: 20,
    borderRadius: 10,
    lineHeight: 20,
    marginTop: 5,
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 4,
  },
  timeImage: {
    width: 10,
    height: 10,
    marginRight: 5,
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  centerBox: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  trainerName: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    width: width - 220,
    overflow: 'hidden',
  },
  subTitle: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '500',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});
