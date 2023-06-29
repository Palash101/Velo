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

const Buy = () => {
  const [active, setActive] = useState('All');

  const [data, setData] = useState([
    {name: 'AAA'},
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
          <View style={styles.tab}>
            {active === 'All' ? (
              <RoundedDarkButton label={'ALL PACKAGES'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'ALL PACKAGES'}
                onPress={() => setActive('All')}
                style={styles.tabBtn}
              />
            )}
            {active === 'My' ? (
              <RoundedDarkButton label={'My PACKAGES'} style={styles.tabBtn} />
            ) : (
              <RoundedThemeButton
                label={'MY PACKAGES'}
                onPress={() => setActive('My')}
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
                <PackageItem key={key} item={item} onPress={selectItem} />
              )}
            />
          </View>
        </View>
      </PageContainer>
    </>
  );
};
export default Buy;

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
    width: width / 2 - 30,
  },
  classesList: {
    marginBottom: 170,
  },
  calander: {
    marginBottom: 20,
  },
});
