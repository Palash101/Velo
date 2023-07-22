import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {SupportController} from '../../controllers/SupportController';

const Support = ({navigation}) => {
  const Faqs = [
    {
      id: 1,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id: 2,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id: 3,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
    {
      id: 4,
      question: 'What is the waitlist policy?',
      answer:
        'Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content Lorem ipsum doller emit is dummy content',
    },
  ];

  const [data, setData] = useState(Faqs);
  const [supportData, setSupportData] = useState();
  const [active, setActive] = useState({});

  const toggleActive = async item => {
    if (active.id === item.id) {
      setActive('');
    } else {
      setActive(item);
    }
  };

  useEffect(() => {
    getSupportData();
  }, []);

  const getSupportData = async () => {
    const instance = new SupportController();
    const result = await instance.getSupport();
    if (result.status === 'success') {
      console.log(result.contact_us, 'result.contact_us');
      setSupportData(result.contact_us);
    }
  };

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <Text style={styles.heading}>FAQ</Text>

        <View style={styles.allFaq}>
          {data.map((item, index) => (
            <View style={styles.faqItem} key={index + 'faq'}>
              <TouchableOpacity
                style={styles.faqTitle}
                onPress={() => toggleActive(item)}>
                <Text style={styles.titleText}>{item.question}</Text>
                <Image
                  source={assets.chevron}
                  style={
                    active.id !== item.id
                      ? styles.chevronImage
                      : styles.chevronImageOpen
                  }
                />
              </TouchableOpacity>
              {active.id === item.id && (
                <View style={styles.faqPara}>
                  <Text style={styles.paraText}>{item.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
        {supportData && (
          <>
            <Text
              style={{paddingLeft: 15, height: 30, textTransform: 'uppercase'}}>
              {supportData.heading}
            </Text>

            <View style={styles.support}>
              <Text style={styles.supportText}>{supportData.description}</Text>
            </View>
          </>
        )}
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
  heading: {
    paddingLeft: 15,
    fontSize: 16,
    lineHeight: 20,
    marginTop: 10,
    textTransform: 'uppercase',
    fontFamily: 'Gotham-Book',
  },
  support: {
    padding: 15,
  },
  supportText: {
    fontSize: 14,
    fontFamily: 'Gotham-Book',
    lineHeight: 18,
  },
  faqTitle: {
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
  paraText: {
    fontFamily: 'Gotham-Book',
    lineHeight: 16,
    fontSize: 14,
  },
  faqPara: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 5},
    shadowOpacity: 0.4,
    shadowRadius: 4,
    fontFamily: 'Gotham-Book',
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
