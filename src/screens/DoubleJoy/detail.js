import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {
  RoundedDarkButton,
  RoundedGreyButton,
  RoundedThemeButton,
} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {assets} from '../../config/AssetsConfig';
import ScaledImage from '../../components/ScaleImage';
import {useNavigation} from '@react-navigation/native';
import {API_SUCCESS} from '../../config/ApiConfig';
import {Input} from '../../components/Input/input';
import {UserContext} from '../../../context/UserContext';
import {DoubleJoyController} from '../../controllers/DoubleJoyController';
import PageLoader from '../../components/PageLoader';

const DoubleJoyDetail = props => {
  const navigation = useNavigation();
  const [item, setItem] = useState(props.route?.params?.item);
  const [refresh, setRefresh] = useState(false);
  const {getToken} = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(props.route.params.item, 'props');
    setItem(props.route?.params?.item);
  }, [props]);

  useEffect(() => {}, [refresh, item]);

  const addClick = async () => {
    const token = await getToken();
    const instance = new DoubleJoyController();

    console.log(item, 'item');
    setLoading(true);
    const result = await instance.addItem(token, item.id, item.quantity + 1);
    console.log(result, 'addcart');
    if (result.status === 'success') {
      setRefresh(!refresh);
      let newItem = props.route.params.item;
      newItem.quantity = newItem.quantity + 1;
      setItem(newItem);
      setLoading(false)
    } else {
      setLoading(false);
    }
  };

  const minusClick = async () => {
    const token = await getToken();
    const instance = new DoubleJoyController();

    if (item.quantity > 1) {
      setLoading(true);
      const result = await instance.addItem(token, item.id, item.quantity - 1);
      console.log(result, 'addcart');
      if (result.status === 'success') {
        let newItem = props.route.params.item;
        newItem.quantity = newItem.quantity - 1;
        setItem(newItem);
        setLoading(false)
      } else {
        setLoading(false);
      }
    } else {
      setLoading(true);
      const result = await instance.removeItem(
        token,
        item.id,
      );
      console.log(result, 'remove');
      if (result.status === 'success') {
        let newItem = props.route.params.item;
        newItem.quantity = newItem.quantity - 1;
        setItem(newItem);
        setLoading(false)
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <PageLoader loading={loading} />
      <View style={styles.mainContainer}>
        <View
          style={{
            paddingHorizontal: 10,
            display: 'flex',
            justifyContent: 'center',
          }}>
          <Text style={styles.mainHeading}>Double Joy</Text>
          <TouchableOpacity
            style={{marginTop: Platform.OS === 'android' ? -20 : -20}}
            onPress={() => navigation.navigate('DoubleJoy')}>
            <Image source={assets.back} style={{width: 20, height: 20}} />
          </TouchableOpacity>
          <Image
            source={{uri: API_SUCCESS + '/' + item?.attributes?.image}}
            style={styles.itemImage}
          />
        </View>
        <View style={styles.detailBox}>
          <View style={styles.detailInnerBox}>
            <View
              style={{
                marginBottom: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.title}>{item.attributes?.name}</Text>
                {/* <Text style={styles.subTitle}>Ingredients</Text> */}
              </View>
              <View>
                <Text style={styles.title}>{item.attributes?.price} QR</Text>
              </View>
            </View>
            <Text style={styles.subTitle}>{item.attributes?.description}</Text>
          </View>
          <View style={styles.cartBox}>
            {item.attributes?.tags?.length > 0 && (
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}>
                {item?.attributes?.tags.map((i, index) => (
                  <View style={styles.greyBox}>
                    <Text style={styles.unitTitle}>{i}</Text>
                  </View>
                ))}
              </View>
            )}

            {item?.quantity > 0 ? (
              <View style={styles.addToCart}>
                <TouchableOpacity style={styles.decrementBox} onPress={() => minusClick()}>
                  <Text style={styles.decrText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item?.quantity}</Text>
                <TouchableOpacity style={styles.incrementBox} onPress={() => addClick()}>
                  <Text style={styles.incText}>+</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <RoundedGreyButton
                style={styles.buyBtn}
                label={'ADD TO CART'}
                onPress={() => addClick()}
              />
            )}
            {item?.quantity > 0 && (
              <RoundedGreyButton
                style={styles.buyBtn}
                label={'GO TO CART'}
                onPress={() => navigation.navigate('DoubleJoyCheckout')}
              />
            )}
          </View>
        </View>
      </View>
    </>
  );
};
export default DoubleJoyDetail;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 60,
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  itemImage: {
    width: width,
    height: 280,
    alignSelf: 'center',
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: '#e2e3e5',
    height: '100%',
    display: 'flex',
  },
  addToCart: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    height: 24,
    borderRadius: 6,
    width: 60,
    alignSelf: 'center',
    marginTop: 20,
  },
  incrementBox: {
    backgroundColor: '#161415',
    padding: 3,
    height: 24,
    width: 24,
    textAlign: 'center',
    borderRadius: 6,
  },
  incText: {
    color: '#fff',
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    lineHeight: 17,
  },
  decrementBox: {
    backgroundColor: '#161415',
    padding: 3,
    height: 24,
    width: 24,
    textAlign: 'center',
    borderRadius: 6,
  },
  decrText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    width: '100%',
    textAlign: 'center',
    lineHeight: 17,
  },
  qty: {
    textAlign: 'center',
    lineHeight: 24,
    width: 24,
    color: '#161415',
    fontFamily: 'Gotham-Medium',
  },
  buyBtn: {
    marginTop: 20,
    backgroundColor: '#ddd',
  },
  detailBox: {
    backgroundColor: '#f2f2f2',
    display: 'flex',
    flex: 1,
    bottom: 0,
    paddingTop: 50,
    marginTop: -35,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  cartBox: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    bottom: 0,
    paddingTop: 20,
    marginTop: 25,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: '15%',
  },
  greyBox: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
  },
  unitTitle: {
    fontSize: 16,
    fontFamily: 'Gotham-Medium',
    color: '#000000',
  },
  unit: {
    fontSize: 10,
    fontFamily: 'Gotham-Medium',
    color: '#000000',
    textAlign: 'center',
  },
  detailInnerBox: {
    paddingHorizontal: '15%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Gotham-Medium',
    textTransform: 'uppercase',
    marginBottom: 5,
    color: '#161415',
  },
  subTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    lineHeight: 16,
    fontFamily: 'Gotham-Book',
    color: '#161415',
  },
});
