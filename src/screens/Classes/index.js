import React, {useContext, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import TopBar from '../../components/TopBar';
import {
  RoundedDarkButton,
  RoundedThemeButton,
  RoundedThemeLightButton,
} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {ClassItem} from '../../components/ClassItem';
import Calendar from '../../components/calendar/Calendar';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../context/UserContext';
import {ClassContoller} from '../../controllers/ClassController';
import PageLoader from '../../components/PageLoader';
import {useNavigation} from '@react-navigation/native';
import {assets} from '../../config/AssetsConfig';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SkeltonCard, SkeltonStudio} from '../../components/Skelton';
import analytics from '@react-native-firebase/analytics';

const Classes = props => {
  const [classes, setClasses] = useState();
  const [allData, setAllData] = useState([]);
  const {getToken, getUser} = useContext(UserContext);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  const [forceReload, setForseReload] = useState(false);
  const navigation = useNavigation();
  const [activeStudios, setActiveStudios] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [catIndex, setCatIndex] = useState([]);

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      console.log('Refreshed');
      setForseReload(!forceReload);
      setAllData([]);
      setClasses();
      getData();
      const result = AsyncStorage.getItem('di');
      if (result) {
        setGlobalIndex(result);
        var date = moment(new Date(), 'YYYY-MM-DD')
          .add(result, 'days')
          .format('YYYY-MM-DD');
        setSelectedDate(date);
      } else {
        setGlobalIndex(0);
      }
    });
    return focusHandler;
  }, [props.route.params, navigation]);

  useEffect(() => {
    setClasses();
    getData();
    const result = AsyncStorage.getItem('di');
    if (result) {
      setGlobalIndex(result);
      var date = moment(new Date(), 'YYYY-MM-DD')
        .add(result, 'days')
        .format('YYYY-MM-DD');
      setSelectedDate(date);
    } else {
      setGlobalIndex(0);
    }
  }, [refresh]);

  const getData = async () => {
    setLoading(true);
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.getAllClasses(token);
    setAllData(result.locations);
    console.log('reload');
    const aStudio = await AsyncStorage.getItem('activeStudio');


    if (props.route.params?.activeId) {
      const activeLocation = result.locations.filter(
        item => item.id === props.route.params?.activeId,
      );
      setActiveStudios([activeLocation[0]]);
      setActive(activeLocation[0]?.classess);
      setFilteredClass(activeLocation[0].classess);
    } else {

      if (aStudio?.length) {

        const allCatIndex = JSON.parse(aStudio);
        setCatIndex(allCatIndex);
       
        let studios = [];
        result.locations.forEach((item,index) => {
          const exist = allCatIndex.filter(item => item === index);
          if(exist.length){
            studios.push(item)
          }
        })
       

        setActiveStudios(studios);
        const allClasses = getAllFilteredClassess(studios);
        setActive(allClasses);
        setFilteredClass(allClasses);


      } else {
        setActiveStudios([result.locations[0]]);
        setActive(result.locations[0]?.classess);
        setFilteredClass(result.locations[0].classess);
      }

     
    }
  };

  const setFilteredClass = async activeData => {
    setLoading(true);
    const newData = activeData;
    const date = new Date();
    let activeDate = '';
    const result = await AsyncStorage.getItem('di');
    if (result) {
      activeDate = moment(date, 'YYYY-MM-DD')
        .add(result, 'days')
        .format('YYYY-MM-DD');
      setSelectedDate(activeDate);
    } else {
      activeDate = moment(date).format('YYYY-MM-DD');
      setSelectedDate(activeDate);
    }

    const filterData = newData.filter(item =>
      moment(item.start_date).isSame(activeDate),
    );
    setClasses(filterData);
    setLoading(false);
  };

  const onSelectDate = (date, i) => {
    setLoading(true);
    var dt = moment(date).format('YYYY-MM-DD');
    AsyncStorage.setItem('date', dt);
    AsyncStorage.setItem('di', JSON.stringify(i));

    const filterData = active.filter(item =>
      moment(item.start_date).isSame(dt),
    );
    setClasses(filterData);
    setLoading(false);
  };

  const selectCategory = async (item, index) => {
    const filterData = activeStudios.filter(item1 => item1.id === item.id);
    

    if (filterData.length) {
      const filterData1 = activeStudios.filter(item1 => item1.id !== item.id);
      const filterData2 = catIndex.filter(item1 => item1 !== index);

      setActiveStudios(filterData1);

      setCatIndex(filterData2)
      AsyncStorage.setItem('activeStudio', JSON.stringify(filterData2));
      setCatIndex(filterData2)
      let allClasses = getAllFilteredClassess(filterData1);
      setActive(allClasses);
      setFilteredClass(allClasses);
    } else {
      const allData = [...activeStudios, item];
      setActiveStudios(allData);

      const catIndexData = [...catIndex, index];
      console.log(catIndexData,'ttt');
      setCatIndex(catIndexData)
      AsyncStorage.setItem('activeStudio', JSON.stringify(catIndexData));

      let allClasses = getAllFilteredClassess(allData);

      setActive(allClasses);
      setFilteredClass(allClasses);
    }
  };

  const getAllFilteredClassess = allStudioData => {
    let allClasses = [];
    allStudioData.forEach((val, index) => {
      val.classess.forEach((classVal, index2) => {
        allClasses.push(classVal);
      });
    });
    return allClasses;
  };

  const isInclude = id => {
    const filterData = activeStudios.filter(item => item.id === id);
    if (filterData.length) {
      return true;
    }
  };

  const logCustomeEvent = async (eventName, name) => {
    const {gender} = await getUser();
    await analytics().logEvent(eventName, {
      name: name,
      gender: gender,
    })
  };

  return (
    <>
      {/* <PageLoader loading={loading} /> */}
      <PageContainer>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.tab}>
            {!allData?.length ? (
              <SkeltonStudio />
            ) : (
              <FlatList
                data={allData}
                pagingEnabled
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate={'normal'}
                renderItem={({item, index}) => (
                  <>
                    {isInclude(item.id) ? (
                      <RoundedDarkButton
                        label={item.name}
                        onPress={() => selectCategory(item, index)}
                        style={styles.tabBtn}
                      />
                    ) : (
                      <RoundedThemeLightButton
                        label={item.name}
                        onPress={() => {
                          logCustomeEvent('MostStudioClicked', item.name);
                          selectCategory(item, index)}}
                        style={styles.tabBtn}
                      />
                    )}
                  </>
                )}
              />
            )}
          </View>
          <View style={styles.refreshIcon}>
            <TouchableOpacity onPress={() => setRefresh(!refresh)}>
              <Image source={assets.refresh} style={{width: 24, height: 24}} />
            </TouchableOpacity>
          </View>
          <View style={styles.calander}>
            <Calendar onSelectDate={onSelectDate} globalIndex={globalIndex} />
          </View>

          <View style={styles.classesList}>
            {classes?.length ? (
              <FlatList
                data={classes}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                decelerationRate={'normal'}
                renderItem={({item}, key) => (
                  <ClassItem key={key} item={item} />
                )}
              />
            ) : (
              <>
                {!classes ? (
                  <>
                    <SkeltonCard />
                    <SkeltonCard />
                  </>
                ) : (
                  <Text style={styles.noData}>No data available</Text>
                )}
              </>
            )}
          </View>
        </View>
      </PageContainer>
    </>
  );
};
export default Classes;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noData: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: height / 2 - 200,
  },
  tabBtn: {
    width: width / 3 - 20,
    marginRight: 10,
    marginVertical: 10,
  },
  classesList: {
    marginBottom: 270,
  },
  calander: {
    marginBottom: 20,
    marginTop: 10,
  },
  refreshIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
    top: 60,
    zIndex: 999,
  },
});
