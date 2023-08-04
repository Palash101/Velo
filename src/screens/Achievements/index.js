import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, FlatList} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';

const Achievements = () => {
  const [data, setData] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  return (
    <PageContainer>
      <View style={styles.achBoxTitle}>
        <Text style={styles.achTitle}>Achievements</Text>
      </View>
      <View style={{paddingBottom: 40}}>
        <FlatList
          data={data}
          pagingEnabled
          numColumns={3}
          showsVerticalScrollIndicator={false}
          decelerationRate={'normal'}
          columnWrapperStyle={{
            justifyContent: 'space-around',
          }}
          renderItem={({item}, key) => (
            <View style={styles.achBox}>
              <Image source={assets.lock} style={styles.achImg} />
            </View>
          )}
        />
      </View>
    </PageContainer>
  );
};
export default Achievements;

const styles = StyleSheet.create({
  achBoxes: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  achBoxTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  achTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  achBox: {
    backgroundColor: '#f2f2f2',
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
  },
  achImg: {
    width: 28,
    height: 28,
    tintColor: '#8a898a'
  },
});
