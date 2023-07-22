import React, {useContext, useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import TopBar from '../../components/TopBar';
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {ClassItem} from '../../components/ClassItem';
import Calendar from '../../components/calendar/Calendar';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../../context/UserContext';
import {ClassContoller} from '../../controllers/ClassController';
import PageLoader from '../../components/PageLoader';

const Classes = (props) => {
  const [classes, setClasses] = useState();
  const [allData, setAllData] = useState([]);
  const {getToken} = useContext(UserContext);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [props.route.params]);

  const getData = async () => {
    setLoading(true)
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.getAllClasses(token);
    setAllData(result.locations);
    console.log('reload')
   if(props.route.params?.activeId){
    const activeLocation = result.locations.filter(item => item.id === props.route.params?.activeId)
    setActive(activeLocation[0]);
    setFilteredClass(activeLocation[0].classess);
  }
  else{
    setActive(result.locations[0]);
    setFilteredClass(result.locations[0].classess);
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

    const filterData = active?.classess.filter(item =>
      moment(item.start_date).isSame(dt),
    );
    setClasses(filterData);
    setLoading(false);
  };
 

  const selectCategory = async item => {
    setActive(item);
    setFilteredClass(item.classess);
  };

  return (
    <>
      {/* <PageLoader loading={loading} /> */}
      <PageContainer>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.tab}>
            <FlatList
              data={allData}
              pagingEnabled
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              decelerationRate={'normal'}
              renderItem={({item}, key) => (
                <>
                  {active?.id === item.id ? (
                    <RoundedDarkButton
                      label={item.name}
                      onPress={() => console.log()}
                      style={styles.tabBtn}
                    />
                  ) : (
                    <RoundedThemeButton
                      label={item.name}
                      onPress={() => selectCategory(item)}
                      style={styles.tabBtn}
                    />
                  )}
                </>
              )}
            />
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
              <Text style={styles.noData}>No data available</Text>
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
    marginVertical: 10
  },
  classesList: {
    marginBottom: 270,
  },
  calander: {
    marginBottom: 20,
  },
});
