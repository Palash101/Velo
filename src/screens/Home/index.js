import React, {useContext, useEffect, useRef, useState} from 'react';
import {View, FlatList, Animated, Dimensions, ScrollView} from 'react-native';
import {PageContainer} from '../../components/Container';
import {Heading} from '../../components/Typography';
import {TraingBox} from '../../components/TrainingBox';
import {assets} from '../../config/AssetsConfig';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {UserContext} from '../../../context/UserContext';
import {ClassContoller} from '../../controllers/ClassController';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;

const Home = () => {
  console.log(assets, 'trainingstrainings');

  const scrollX = useRef(new Animated.Value(0)).current;
  const {getToken} = useContext(UserContext);
  const [allData, setAllData] = useState([]);

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

  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.getAllClasses(token);
    setAllData(result.locations);
  };

  return (
    <>
      <PageContainer>
        <ScrollView contentContainerStyle={{paddingBottom: 100}}>
          <Heading>Train</Heading>

          {allData?.map((item, key) => (
            <>
              {key < 3 && (
                <View key={key + 'taining'}>
                  <TraingBox
                    title={item.name}
                    bg={require('../../../assets/images/bg.png')}
                    onPress={() =>
                      navigation.navigate('classes', {activeId: item.id})
                    }
                  />
                </View>
              )}
            </>
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
                <View key={key + 'happening'}>
                  <TraingBox
                    title={''}
                    bg={item.img}
                    style={{
                      width: width / 2 - 15,
                      marginRight: 8,
                      height: 95,
                    }}
                  />
                </View>
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
              activeDotColor="#606060"
              inActiveDotColor="#888"
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
              style={{marginHorizontal: 8, height: 150}}
              onPress={() => navigation.navigate('DoubleJoy')}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Heading style={{marginBottom: 5}}>STORE</Heading>
            <TraingBox
              title={''}
              bg={require('../../../assets/images/bg.png')}
              style={{marginHorizontal: 8, height: 150}}
              onPress={() => navigation.navigate('Store')}
            />
          </View>
        </ScrollView>
      </PageContainer>
    </>
  );
};
export default Home;
