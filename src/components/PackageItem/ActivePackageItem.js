import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {RoundedDarkButton} from '../Buttons';

const width = Dimensions.get('window').width;

export const ActivePackageItem = (props) => {
  const {item} = props;
  console.log(item,'item')
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{item?.attributes?.name}</Text>
      <View style={styles.paraBox}>
        <Text style={styles.paraText}>Expires</Text>
        <Text style={styles.paraValue}>: {item?.attributes?.valid_till}</Text>
      </View>
      <View style={styles.paraBox}>
        <Text style={styles.paraText}>Remaining</Text>
        <Text style={styles.paraValue}>
          : {item?.attributes?.remaining_rides}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#161415',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 24,
    width: width - 40,
    marginTop: 10,
  },
  paraBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical:5,
  },
  title: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    fontWeight: '800',
    color: '#fff',
    marginBottom: 15,
  },
  paraText: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    color: '#fff',
    width: '40%',
  },
  paraValue: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    color: '#fff',
  }

});
