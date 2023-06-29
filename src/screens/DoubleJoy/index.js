import React, {useEffect} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
import {FlatList} from 'react-native-gesture-handler';
import {useState} from 'react';
import {PackageItem} from '../../components/PackageItem';
import { CartItem } from '../../components/CartItem';

const DoubleJoy = () => {
  const [active, setActive] = useState('Shakes');

  const [data, setData] = useState([
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'CCC'},
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'BBB'},
    {name: 'CCC'},
    {name: 'AAA'},
    {name: 'BBB'},
    {name: 'CCC'},
  ]);

  const selectItem = item => {
    Alert.alert(item.name);
  };
  return (
    <>
      <PageContainer>
        <View style={{paddingHorizontal: 10}}>
            <Text style={styles.mainHeading}>Double Joy</Text>
          <View style={styles.tab}>
            {active === 'Shakes' ? (
              <RoundedDarkButton label={'SHAKES'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'SHAKES'}
                onPress={() => setActive('Shakes')}
                style={styles.tabBtn}
              />
            )}
            {active === 'Coffee' ? (
              <RoundedDarkButton label={'COFFEE'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'COFFEE'}
                onPress={() => setActive('Coffee')}
                style={styles.tabBtn}
              />
            )}
            {active === 'Snacks' ? (
              <RoundedDarkButton label={'SNACKS'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'SNACKS'}
                onPress={() => setActive('Snacks')}
                style={styles.tabBtn}
              />
            )}
          </View>

          <View style={styles.classesList}>
            <FlatList
              data={data}
              pagingEnabled
              numColumns={2}
              showsVerticalScrollIndicator={false}
              decelerationRate={'normal'}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
              renderItem={({item}, key) => (
                <CartItem key={key} item={item} onPress={selectItem} />
              )}
            />
          </View>
        </View>
      </PageContainer>
    </>
  );
};
export default DoubleJoy;

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainHeading:{
        fontSize:20,
        fontWeight:'700',
        textAlign:'center',
        marginTop:10,
    },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  tabBtn: {
    width: width / 3 - 20,
  },
  classesList: {
    marginBottom: 200,
  },
  calander: {
    marginBottom: 20,
  },
});
