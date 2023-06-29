import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {GreyBox} from '../../components/GreBox';

const Profile = ({navigation}) => {
  return (
    <PageContainer>
      <View>
        <Image source={assets.bg} style={styles.prImg} />
        <Text style={styles.name}>LOREM IPSUM</Text>
        <Text style={styles.email}>loremipsum@gmail.com</Text>
        <Text style={styles.phone}>98679687687</Text>

        <View style={{marginTop: 30}}>
          <GreyBox
            label="My Packages"
            textStyle={{textAlign: 'center'}}
            onPress={() => navigation.navigate('Profile')}
          />
          <GreyBox
            label="Change password"
            textStyle={{textAlign: 'center'}}
            onPress={() => navigation.navigate('ChangePassword')}
          />
          <GreyBox
            label="My Wallet"
            textStyle={{textAlign: 'center'}}
            onPress={() => navigation.navigate('MyWallet')}
          />
          <GreyBox
            label="Journey"
            textStyle={{textAlign: 'center'}}
            onPress={() => navigation.navigate('Journey')}
          />
        </View>
      </View>
    </PageContainer>
  );
};
export default Profile;

const styles = StyleSheet.create({
  prImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
  },
  email: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    color: '#333',
  },
  phone: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    color: '#333',
  },
});
