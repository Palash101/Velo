import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {
  RoundedDarkButton,
  RoundedDarkButton2,
  RoundedGreyButton,
  RoundedGreyButton2,
  RoundedThemeButton,
  RoundedThemeButton2,
} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {PackageItem} from '../../components/PackageItem';
import {CartItem} from '../../components/CartItem';
import {useNavigation} from '@react-navigation/native';
import {assets} from '../../config/AssetsConfig';
import {DoubleJoyController} from '../../controllers/DoubleJoyController';
import {UserContext} from '../../../context/UserContext';
import {MyOrderItem} from '../../components/CartItem/MyOrderItem';
import PageLoader from '../../components/PageLoader';

const MyOrder = props => {
  const [active, setActive] = useState({name: 'New', id: 0});
  const [filterData, setFilterdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const {getToken} = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      if (props.route.params !== undefined) {
        setActive('My');
      }
      getAllData();
    });
    return focusHandler;
  }, [props.route.params, navigation]);

  const getAllData = async () => {
    setLoading(true)
    const token = await getToken();
    const instance = new DoubleJoyController();
    const result = await instance.getMyOrder(token);
    console.log(result,'result')
    setLoading(false);
    setData(result.data)
  };

  const statusData = [
    {name: 'New', id: 0},
    {name: 'Inprogress', id: 1},
    {name: 'Ready', id: 2},
    {name: 'Picked', id: 4},
  ];

  return (
    <>
     <PageLoader loading={loading} />
      <PageContainer>
        <View style={styles.tab}>
          <FlatList
            data={statusData}
            pagingEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={'normal'}
            renderItem={({item, index}) => (
              <View key={index + 'cat'}>
                {active.id === item.id ? (
                  <RoundedGreyButton2 label={item.name} style={styles.tabBtn} />
                ) : (
                  <RoundedThemeButton2
                    label={item.name}
                    onPress={() => setActive(item)}
                    style={styles.tabBtn}
                  />
                )}
              </View>
            )}
          />
        </View>

        <ScrollView
          contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 20,height:height-180,}}>
        

          {data
            .filter(item => item?.attributes?.status === active.name)
            .map((item, index) => (
              <MyOrderItem key={index + 'my'} item={item} />
            ))}

            {data.filter(item => item?.attributes?.status === active.name).length == 0 &&
            <View style={{
              position:'absolute',
              top:'50%',
              alignItems:'center',
              left:0,
              right:0,

            }}>

            <Text>No data found</Text>
            </View>
            }
        </ScrollView>
        
      </PageContainer>
    </>
  );
};
export default MyOrder;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  classesList: {
    paddingBottom: 130,
    paddingTop: 10,
    backgroundColor: '#333',
    height: height,
  },
  mainHeading: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Gotham-Medium',
    color: '#161415',
  },
  hdr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'android' ? 0 : 20,
    marginBottom: 10,
  },
  tabBtn: {
    width: width / 3 - 15,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  calander: {
    marginBottom: 20,
  },
  buyBtn: {
    marginTop: 20,
    backgroundColor: '#ddd',
  },
});
