import React, {useEffect} from 'react';
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
import { PlannerClass } from '../../components/PlannerClass';

const Planner = () => {
  const [classes, setClasses] = useState([
    {name: 'CYCLE', data: [{}, {}, {}]},
    {name: 'RACK', data: [{}, {}, {}]},
    {name: 'FORM', data: [{}, {}, {}]},
  ]);
  const [data, setData] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [globalIndex, setGlobalIndex] = useState();

  useEffect(() => {
    const result = AsyncStorage.getItem('di');
    if (result) {
      setGlobalIndex(result);
    }
  }, []);

  const onSelectDate = (date, i) => {
    setDataNew([]);
    var dt = moment(date).format('YYYY-MM-DD');
    AsyncStorage.setItem('date', dt);
    AsyncStorage.setItem('di', JSON.stringify(i));

    const result = AsyncStorage.getItem('di');
    if (result) {
      setGlobalIndex(result);
    }

    setGlobalIndex(i);

    var Array = [];

    for (var i = 0; i < data.length; i++) {
      var dt1 = moment(data[i].datestring).format('YYYY-MM-DD');

      if (dt === dt1) {
        var dtnew = {
          arrNew: data[i].arrC,
          datestring: data[i].datestring,
          key: data[i].datestring,
        };
        Array.push(dtnew);
      }
    }
    setDataNew(Array);
  };

  return (
    <>
      <PageContainer>
        <View style={styles.tab}>
          <RoundedDarkButton
            label={'UPCOMING'}
            onPress={() => console.log('hello')}
            style={styles.tabBtn}
          />
        </View>

        <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
          <View style={styles.classesList}>
            {classes.map((item, index) => (
              <View key={index}>
                <Text style={styles.heading}>{item.name}</Text>
                {item.data.map((item1, index1) => (
                  <PlannerClass item={item1} key={index1} />
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Planner;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 5,
  },
  tabBtn: {
    width: width / 2 - 16,
    alignSelf: 'center',
  },
  classesList: {
    pasdingBottom: 260,
  },
  calander: {
    marginBottom: 20,
  },
});
