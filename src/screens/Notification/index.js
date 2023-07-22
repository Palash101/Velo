import React, {useEffect} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedGreyButton} from '../../components/Buttons';
import {useState} from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PlannerClass} from '../../components/PlannerClass';
import { Heading } from '../../components/Typography';

const Notification = () => {
  const [data, setData] = useState([
    {
      title: 'Lorem ipsum doller emit',
      description: 'Loem ipsum doller emit is dummy content',
      date: '12 Jul 2023',
    },
    {
      title: 'Lorem ipsum doller emit',
      description: 'Loem ipsum doller emit is dummy content',
      date: '12 Jul 2023',
    },
    {
      title: 'Lorem ipsum doller emit',
      description: 'Loem ipsum doller emit is dummy content',
      date: '12 Jul 2023',
    },
    {
      title: 'Lorem ipsum doller emit',
      description: 'Loem ipsum doller emit is dummy content',
      date: '12 Jul 2023',
    },
  ]);


  return (
    <>
      <PageContainer>
        <Heading style={{marginVertical: 5}}>Notifications</Heading>
        <ScrollView contentContainerStyle={{paddingHorizontal: 10,marginTop:20,}}>
          <View style={styles.classesList}>
            {data.map((item, index) => (
              <View
              key={index+'keyy'}
                style={styles.notiTitle}
                >
                <Text style={styles.titleText}>{item.title}</Text>
             </View>
            ))}
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Notification;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
 notiTitle: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    fontFamily: 'Gotham-Book',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontFamily: 'Gotham-Book',
    lineHeight: 16,
    fontSize: 14,
  },
});
