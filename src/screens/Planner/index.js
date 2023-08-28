import React, {useContext, useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {
  RoundedDarkButton,
  RoundedGreyButton,
  RoundedOutlineButton,
  RoundedThemeButton,
} from '../../components/Buttons';
import {useState} from 'react';
import {PlannerClass} from '../../components/PlannerClass';
import {PlannerContoller} from '../../controllers/PlannerController';
import {UserContext} from '../../../context/UserContext';
import {SkeltonCard} from '../../components/Skelton';
import {useToast} from 'react-native-toast-notifications';
import {ClassContoller} from '../../controllers/ClassController';
import {ModalView} from '../../components/ModalView';
import {Heading, Heading2} from '../../components/Typography';

const Planner = ({navigation}) => {
  const [classes, setClasses] = useState([
    {name: 'CYCLE', data: [{}, {}, {}]},
    {name: 'RACK', data: [{}, {}, {}]},
    {name: 'FORM', data: [{}, {}, {}]},
  ]);
  const [refresh, setRefresh] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {getToken} = useContext(UserContext);
  const [cancelId, setCancelId] = useState();
  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      getBookings();
    });
    return focusHandler;
  }, [refresh, navigation]);

  const getBookings = async () => {
    setLoading(true);
    setData();
    const token = await getToken();
    const instance = new PlannerContoller();
    const result = await instance.getAllBooking(token);
    setLoading(false);
    console.log(result,'result')
    const result1 = result.data.filter(
      item => item.attributes.status !== 'Cancelled',
    );

    const allData = joinGroup(result1);
    console.log(allData,'allData')
    setData(allData);
  };

  const joinGroup = allData => {
    const groupByCategory = allData.reduce((group, product) => {
      const loc = product.relation.classes.relations.location.attributes.name;
      group[loc] = group[loc] ?? [];
      group[loc].push(product);
      return group;
    }, {});

    const array = [];
    Object.keys(groupByCategory).map(function (key) {
      array.push({
        name: key,
        data: groupByCategory[key],
      });
    });

    return array;
  };

  const toast = useToast();

  const cancelModalOpen = id => {
    setCancelId(id);
    setCancelModal(true);
  };

  const cancelBooking = async () => {
    setLoading(true);
    const dt = {
      booking_id: cancelId,
    };
    const token = await getToken();
    const instance = new ClassContoller();
    const result = await instance.CancelClass(dt, token);
    if (result.status === 'success') {
      toast.show(result.msg);
      setLoading(false);
      setCancelModal(false);
      setRefresh(!refresh);
    } else {
      toast.show(result.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <PageContainer>
        <View style={styles.tab}>
          <RoundedGreyButton
            label={'UPCOMING'}
            onPress={() => console.log('')}
            style={styles.tabBtn}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 10}}>
            
          <View style={styles.classesList}>
       

            {data?.length > 0 ? (
              <>
                {data.map((item, key) => (
                  <View key={key + 'pancat'}>
                    <Heading
                      style={{marginTop: 10, fontFamily: 'Gotham-Medium'}}>
                      {item.name}
                    </Heading>
                    {item.data.map((item, key) => (
                      <PlannerClass
                        key={key + 'plan'}
                        item={item}
                        cancelModalOpen={cancelModalOpen}
                      />
                    ))}
                  </View>
                ))}
              </>
            ) : (
              <>
                {!data ? (
                  <>
                    <SkeltonCard />
                    <SkeltonCard />
                    <SkeltonCard />
                    <SkeltonCard />
                  </>
                ) : (
                  <View>
                    <Text style={styles.noData}>
                      No upcoming bookings available.
                    </Text>
                    <RoundedDarkButton
                      label={'Book Now'}
                      onPress={() => navigation.navigate('classes')}
                      style={{width:150,alignSelf:'center'}}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </PageContainer>
      <ModalView
        visible={cancelModal}
        heading="CANCEL BOOKING"
        setVisible={() => setCancelModal(false)}
        style={{
          height: 'auto',
          marginTop: 260,
          justifyContent: 'flex-end',
          marginBottom: 0,
        }}>
        <View style={styles.summeryBox}>
          <View style={styles.modalTotalBox}>
            <Text style={{fontSize: 14, textAlign: 'center'}}>
              Are you sure you want to cancel your booking?
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 25,
              marginBottom: 20,
              paddingRight: 20,
            }}>
            <RoundedOutlineButton
              label={'NO'}
              onPress={() => setCancelModal(false)}
              style={{width: 100, marginLeft: 5, marginTop: 5}}
            />
            <RoundedGreyButton
              label={'YES'}
              onPress={() => cancelBooking()}
              style={{width: 100, marginLeft: 5, marginTop: 5}}
            />
          </View>
        </View>
      </ModalView>
    </>
  );
};
export default Planner;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

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
    fontFamily: 'Gotham-Medium',
  },
  tabBtn: {
    width: width / 2 - 16,
    alignSelf: 'center',
  },
  classesList: {
    paddingBottom: 10,
  },
  calander: {
    marginBottom: 20,
  },
  noData: {
    fontSize: 14,
    alignSelf: 'center',
    marginTop: height / 2 - 200,
    marginBottom:20
  },
});
