import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {GreyBox} from '../../components/GreBox';
import {Input} from '../../components/Input/input';
import {
  DarkButton,
  RoundedDarkButton,
  RoundedThemeButton,
} from '../../components/Buttons';

const ChangePassword = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
     const [loading, setLoading] = useState(false);

  const submit = () => {};

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Text style={{paddingLeft: 15}}>CHANGE PROFILE</Text>

        <View style={styles.form}>
        <Input
        value={password}
        label={'Password'}
        onChang={setPassword}
        secureTextEntry={true}
        />
        <Input
        value={password_confirmation}
        label={'Confirm password'}
        onChang={setPasswordConfirmation}
        secureTextEntry={true}
        />

          <View style={styles.btnBox}>
            <RoundedThemeButton
              label={'CANCEL'}
              style={{marginTop: 20, width: width / 2 - 50}}
              onPress={() => navigation.navigate('Profile')}
              loading={loading}
            />
            <RoundedDarkButton
              label={'SAVE'}
              style={{marginTop: 20, width: width / 2 - 50}}
              onPress={submit}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
};
export default ChangePassword;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  form: {
    width: width - 40,
    alignSelf: 'center',
    marginTop:50
  },
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
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
