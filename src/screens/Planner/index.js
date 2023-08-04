import React, {useContext, useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedGreyButton, RoundedThemeButton} from '../../components/Buttons';
import {useState} from 'react';
import { PlannerClass } from '../../components/PlannerClass';
import { PlannerContoller } from '../../controllers/PlannerController';
import { UserContext } from '../../../context/UserContext';

const Planner = () => {
  const [classes, setClasses] = useState([
    {name: 'CYCLE', data: [{}, {}, {}]},
    {name: 'RACK', data: [{}, {}, {}]},
    {name: 'FORM', data: [{}, {}, {}]},
  ]);
  const [data, setData] = useState([]);

  const {getToken} = useContext(UserContext);

  useEffect(() => {
    getBookings()
  }, []);

  const getBookings = async() => {
    const token = await getToken();
    const instance = new PlannerContoller();
    const result = await instance.getAllBooking(token);
    console.log(result,'result')
    setData(result.data)
    //const allData = joinGroup(result.data);
    //console.log(allData,'alldata')
    // result.data.forEach((item,index) => {
    //   console.log(item.relation.classess.relation.location.id,'item')
    // })
  }


  // const joinGroup = (allData) => {
  //   const result = allData.reduce((acc, value) => {
  //     // console.log(acc.relation.classes.relation.location.id,'accc')

  //     if (acc[acc.length - 1][0].relation.classes.relation.location.id == value.relation.classes.relation.location.id) {
  //       acc[acc.length - 1].push(value);
  //     } else {
  //       acc.push([value]);
  //     }
  //     return acc;
  //   }, []);

  //   return result;
  // }

  return (
    <>
      <PageContainer>
        <View style={styles.tab}>
          <RoundedGreyButton
            label={'UPCOMING'}
            onPress={() => console.log('hello')}
            style={styles.tabBtn}
          />
        </View>

        <ScrollView contentContainerStyle={{paddingHorizontal: 10}}>
          <View style={styles.classesList}>
            {/* {classes.map((item, index) => (
              <View key={index}>
                <Text style={styles.heading}>{item.name}</Text> */}
                {data.map((item1, index1) => (
                  <PlannerClass item={item1} key={index1} />
                ))}
              {/* </View>
            ))} */}
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
    marginTop: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontFamily:'Gotham-Medium'
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
