import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {RoundedDarkButton} from '../Buttons';
import moment from 'moment';
import {Badge} from 'react-native-paper';
const width = Dimensions.get('window').width;
import {assets} from '../../config/AssetsConfig';

export const MyOrderItem = props => {
  const {item} = props;
  const [showItem, setShowItem] = useState();

  const getColor = status => {
    if (status === 'New') {
      return '#000';
    } else if (status === 'Inprogress') {
      return '#ffc107';
    } else if (status === 'Ready') {
      return '#06ba0e';
    } else if (status === 'Picked') {
      return '#ffff';
    }
  };

  const showItemCall = item => {
    if (showItem?.id === item.id) {
      setShowItem();
    } else {
      setShowItem(item);
    }
  };

  return (
    <View style={styles.box}>
      <View
        style={{
          width: '100%',
        }}>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width - 60,
            }}>
            <Text style={styles.title}>{item.attributes.order_ref}</Text>
            <Text style={styles.title}>{item.attributes.items_total} QR</Text>
          </View>

          <View style={styles.paraBox}>
            <Text style={styles.paraText}>Date</Text>
            <Text style={styles.paraText}>
              : {moment(item.attributes.date).format('DD MMM, YYYY HH:MM A')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width - 60,
              marginTop:5
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                borderRadius: 10,
                padding: 5,
                paddingHorizontal: 10,
                display: 'flex',
                flexDirection: 'row',
              }}
              onPress={() => showItemCall(item)}>
              <Text
                style={{
                  color: '#fff',
                  height: 12,
                  fontSize: 12,
                  fontFamily: 'Gotham-Medium',
                  fontWeight: '700',
                }}>
                Items (3){' '}
              </Text>
              <Image
                source={assets.chevron}
                style={{width: 16, height: 12, tintColor: '#fff'}}
              />
            </TouchableOpacity>
            <Badge
              style={[
                styles.bedge,
                {
                  backgroundColor: getColor(item.status),
                  color: item.attributes.status === 'New' ? '#fff' : '#000',
                  paddingHorizontal: 10,
                  fontWeight:'700'
                },
              ]}>
              {item.attributes.status}
            </Badge>
          </View>
        {showItem?.id === item.id &&
        <View>
          {item.attributes.items.map((item1,index) =>(
              <View style={styles.itemBox}>
                <Text style={styles.itemText}>{item1.name}</Text>
                <View style={styles.itemBox2}>
                  <Text style={styles.itemText}>{item1.price/item1.quantity} x {item1.quantity}</Text>
                  <Text style={styles.itemText}>{item1.price} {item1.currency}</Text>
                </View>
              </View>
          ))}
         
        </View>
        }

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    // backgroundColor: '#161415',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    width: width - 40,
    marginTop: 20,
    shadowColor: '#161415',
    shadowOffset: {width: -1, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  itemBox:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  itemBox2:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:width/2.5
  },
  itemText:{
    fontSize:12,
    paddingTop:10,
    paddingBottom:5,
    fontFamily: 'Gotham-Medium',
  },
  paraBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 2,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Black',
    color: '#000',
    marginBottom: 5,
  },
  paraText: {
    fontSize: 10,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    color: '#000',
  },
  paraValue: {
    fontSize: 12,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Medium',
    color: '#000',
  },
});
