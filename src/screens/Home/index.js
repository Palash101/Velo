import React, {useRef} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {Heading} from '../../components/Typography';
import {TraingBox} from '../../components/TrainingBox';
import {trainings} from '../../data/traings';
import {assets} from '../../config/AssetsConfig';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

const width = Dimensions.get('window').width;

const Home = ({navigation}) => {
  console.log(assets, 'trainingstrainings');

  const scrollX = useRef(new Animated.Value(0)).current;

  const list = [
    {
      img: require('../../../assets/images/bg.png'),
    },
    {
      img: require('../../../assets/images/bg.png'),
    },
    {
      img: require('../../../assets/images/bg.png'),
    },
    {
      img: require('../../../assets/images/bg.png'),
    },
  ];

  return (
    <>

      <PageContainer>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <Heading>Training</Heading>

          {trainings.map((item, key) => (
            <TraingBox
              title={item.name}
              bg={require('../../../assets/images/bg.png')}
              key={key}
            />
          ))}

          <View style={{marginTop: 10}}>
            <Heading style={{marginBottom: 5}}>HAPPENING NOW</Heading>

            <FlatList
              horizontal={true}
              data={list}
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {
                  useNativeDriver: false,
                },
              )}
              pagingEnabled
              decelerationRate={'normal'}
              scrollEventThrottle={16}
              renderItem={({item}, key) => (
                <TraingBox
                  title={''}
                  bg={item.img}
                  key={key}
                  style={{
                    width: width / 2 - 15,
                    marginRight: 8,
                    height: 100,
                  }}
                />
              )}
            />
            <ExpandingDot
              data={list}
              expandingDotWidth={30}
              scrollX={scrollX}
              inActiveDotOpacity={0.6}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 5,
              }}
              activeDotColor='#000'
              inActiveDotColor='#888'
              containerStyle={{
                top: 145,
                left: '50%',
                right: '50%',
                width: width,
                marginLeft: -45,
              }}
            />
          </View>

          <View style={{marginTop: 40}}>
            <Heading style={{marginBottom: 5}}>DOUBLE JOY</Heading>
            <TraingBox
              title={''}
              bg={require('../../../assets/images/bg.png')}
              style={{marginHorizontal: 8, height: 140}}
              onPress={() => navigation.navigate('DoubleJoy')}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Heading style={{marginBottom: 5}}>STORE</Heading>
            <TraingBox
              title={''}
              bg={require('../../../assets/images/bg.png')}
              style={{marginHorizontal: 8, height: 140}}
              onPress={() => navigation.navigate('Store')}
            />
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Home;
