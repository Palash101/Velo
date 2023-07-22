import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedGreyButton, RoundedThemeButton} from '../../components/Buttons';
import {useState} from 'react';
import { PlannerClass } from '../../components/PlannerClass';

const Planner = () => {
  const [classes, setClasses] = useState([
    {name: 'CYCLE', data: [{}, {}, {}]},
    {name: 'RACK', data: [{}, {}, {}]},
    {name: 'FORM', data: [{}, {}, {}]},
  ]);

  useEffect(() => {
    
  }, []);


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
    marginTop: 10,
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
