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

const Classes = () => {
  const [classes, setClasses] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
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
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.tab}>
            <RoundedDarkButton
              label={'CYCLE'}
              onPress={() => console.log('hello')}
              style={styles.tabBtn}
            />
            <RoundedThemeButton
              label={'RACK'}
              onPress={() => console.log('hello')}
              style={styles.tabBtn}
            />
            <RoundedThemeButton
              label={'FORM'}
              onPress={() => console.log('hello')}
              style={styles.tabBtn}
            />
            <RoundedThemeButton
              label={'FORM'}
              onPress={() => console.log('hello')}
              style={styles.tabBtn}
            />
          </View>
          <View style={styles.calander}>
            <Calendar onSelectDate={onSelectDate} globalIndex={globalIndex} />
          </View>

          <View style={styles.classesList}>
            <FlatList
              data={classes}
              pagingEnabled
              showsVerticalScrollIndicator={false}
              decelerationRate={'normal'}
              renderItem={({item}, key) => <ClassItem key={key} item={item} />}
            />
          </View>
        </View>
      </PageContainer>
    </>
  );
};
export default Classes;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 10,
  },
  tabBtn: {
    width: width / 4 - 16,
  },
  classesList: {
    marginBottom: 330,
  },
  calander: {
    marginBottom: 20,
  },
});
