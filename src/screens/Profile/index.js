import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {GreyBox} from '../../components/GreBox';
import { UserContext } from '../../../context/UserContext';
import { ProfileController } from '../../controllers/ProfileController';

const Profile = ({navigation}) => {
  const {getToken} = useContext(UserContext);
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getDetail()
  },[])

  const getDetail = async()=> {
    const token = await getToken();
    const instance = new ProfileController();
    const result = await instance.getUserDetail(token);
    setUser(result.user);
  }


  return (
    <PageContainer>
      <View>
        <Image source={assets.bg} style={styles.prImg} />
        <Text style={styles.name}>{user?.first_name} {user?.last_name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.phone}>{user?.phone}</Text>

        <View style={{marginTop: 30}}>
          <GreyBox
            label="My Packages"
            textStyle={{textAlign: 'center'}}
            onPress={() => navigation.push('Buy')}
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
    fontSize: 18,
    textAlign: 'center',
    color: '#161415',
    textTransform:'uppercase',
    fontFamily:'Gotham-Medium'
  },
  email: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    color: '#333',
    fontFamily:'Gotham-Medium'
  },
  phone: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 20,
    color: '#333',
    fontFamily:'Gotham-Medium'
  },
});
