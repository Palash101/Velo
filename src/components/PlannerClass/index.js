import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {Badge} from 'react-native-paper';
import {assets} from '../../config/AssetsConfig';

const width = Dimensions.get('window').width;
export const PlannerClass = props => {

  const {item} = props;
  console.log(item,'item')

  return (
    <>
      <View style={styles.outerBox}>
        <View style={styles.imageBox}>
          <Image
            source={{uri: item.relation.classes.relations.trainer.attributes.image}}
            style={styles.mainImage}
          />
        </View>
        <View style={styles.centerBox}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {item.relation.classes.attributes.title}
          </Text>
          <Text style={styles.subTitle}>Justin bieber</Text>
          <Text style={styles.trainerName}>{item.relation.classes.relations.trainer.attributes.first_name}</Text>
        </View>
        <View style={styles.dateBox}>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>{item.relation.classes.attributes.start_date}</Text>
                </View>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>{item.attributes.timing}</Text>
                </View>
                <View style={styles.timeBox}>
                    <Image source={assets.clock} style={styles.timeImage} />
                    <Text style={styles.dateText}>BIKE - {item.attributes.seat}</Text>
                </View>
        </View>
        <View style={styles.lastBox}>
          <Badge style={[styles.bedge,{backgroundColor:'#3aae4c'}]}>Go to Class</Badge>
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
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    marginVertical: 5,
    borderRadius: 14,
    padding: 0,
    padding:5
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
    color: '#161415',
    textTransform: 'uppercase'
  },
  centerBox: {
    justifyContent: 'center',
    marginLeft: 5,
  },
  trainerName: {
    fontSize: 8,
    fontFamily:'Gotham-Light',
    maxWidth:110,
    textTransform:'uppercase',
    overflow:'hidden'
  },
  title: {
    fontSize: 14,
    fontFamily:'Gotham-Black',
    overflow: 'hidden',
    textTransform:'uppercase'
  },
  subTitle: {
    fontSize: 8,
    lineHeight: 16,
    fontFamily:'Gotham-Book',
    justifyContent: 'center',
    textTransform: 'uppercase',
  },
});
