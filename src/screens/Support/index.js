import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {useState} from 'react';
import {assets} from '../../config/AssetsConfig';

const Support = ({navigation}) => {
  const Faqs = [
    {
      id:1,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id:2,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id:3,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id:4,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
  ];

  const [data, setData] = useState(Faqs);
  const [active, setActive] = useState({});

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Text style={{paddingLeft: 15, height: 30, textTransform: 'uppercase'}}>
          FAQ
        </Text>

        <View style={styles.allFaq}>
          {data.map((item, index) => (
            <View style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqTitle}
                onPress={() => setActive(item)}>
                <Text>{item.question}</Text>
                <Image source={assets.chevron} style={styles.chevronImage} />
              </TouchableOpacity>
              {active.id === item.id && (
              <View style={styles.faqPara}>
                <Text>{item.answer}</Text>
              </View>
              )}
            </View>
          ))}
        </View>

        <Text style={{paddingLeft: 15, height: 30, textTransform: 'uppercase'}}>
          SUPPORT
        </Text>
      </ScrollView>
    </PageContainer>
  );
};
export default Support;

const styles = StyleSheet.create({
  allFaq: {},
  faqItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  faqTitle: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faqPara: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  chevronImage: {
    width: 22,
    height: 22,
  },
  chevronImageOpen: {
    width: 22,
    height: 22,
    transform: [{rotate: '180deg'}],
  },
});
