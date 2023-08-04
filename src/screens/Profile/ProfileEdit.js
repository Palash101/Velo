import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {PageContainer} from '../../components/Container';
import {assets} from '../../config/AssetsConfig';
import {GreyBox} from '../../components/GreBox';
import {Input} from '../../components/Input/input';
import {RoundedDarkButton, RoundedThemeButton} from '../../components/Buttons';
import {UserContext} from '../../../context/UserContext';
import {ProfileController} from '../../controllers/ProfileController';
import {useToast} from 'react-native-toast-notifications';
import PageLoader from '../../components/PageLoader';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import DocumentPicker from 'react-native-document-picker';
import { API_SUCCESS } from '../../config/ApiConfig';

const ProfileEdit = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const {getToken} = useContext(UserContext);
  const [user, setUser] = useState({});
  const toast = useToast();
  const userCtx = useContext(UserContext);
  const [singleFile, setSingleFile] = useState('');

  useEffect(() => {
    getDetail();
  }, []);

  const selectOneFile = async () => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        //There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res[0]));
      console.log('URI : ' + res[0].uri);
      console.log('Type : ' + res[0].type);
      console.log('File Name : ' + res[0].name);
      console.log('File Size : ' + res[0].size);
      setImage(res[0].uri);
      //Setting the state to show single file attributes
      setSingleFile(res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };


  const getDetail = async () => {
    const token = await getToken();
    const instance = new ProfileController();
    const result = await instance.getUserDetail(token);
    console.log(result, 'result');
    setUser(result.user);
    setFirstName(result.user.first_name);
    setLastName(result.user.last_name);
    setEmail(result.user.email);
    setPhone(result.user.phone);
    setDob(result.user.dob);
    setImage(API_SUCCESS+'/'+result.user.image)
    setLoading(false);
  };

  const submit = async () => {
    if (first_name !== '' && last_name !== '' && email !== '' && phone !== '') {
      setLoading(true);
      let data = {
        ...user,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        dob: moment(dob).format('YYYY-MM-DD'),
      };
      if(singleFile?.uri){
        data.image = {uri: singleFile.uri, type: singleFile.uri, name: singleFile.name}
      }
      console.log(data, 'data');
      const token = await getToken();
      const instance = new ProfileController();
      const result = await instance.updateProfile(data, token);
      console.log(result, 'result');
      if (result.status === 'success') {
        toast.show(result.message);
        userCtx.setUser({...user.data, ...result.user});
        setLoading(false);
        navigation.navigate('Profile',{upload: true });
      } else {
        var errors = result.errors;
        var value = '';
        if (errors.phone) {
          var value = errors.phone + ' ,';
          toast.show(value);
        } else if (errors.email) {
          value = value + errors.email;
          toast.show(value);
        } else if (errors.dob) {
          value = value + errors.dob;
          toast.show(value);
        }

        setLoading(false);
      }
    } else {
      toast.show('Please fill all details');
    }
  };

  return (
    <>
      <PageLoader loading={loading} />
      <PageContainer>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Text style={{paddingLeft: 15}}>EDIT PROFILE</Text>
          <TouchableOpacity onPress={() => selectOneFile()}>
            {image == '' ? 
            <Image source={assets.bg} style={styles.prImg} />
            :
            <Image source={{uri:image}} style={styles.prImg} />
            }

            <View style={styles.editBox}>
              <Image source={assets.edit} style={styles.editIcon} />
            </View>
          
          </TouchableOpacity>

          <View style={styles.form}>
            <Input
              value={first_name}
              label={'First name'}
              onChang={setFirstName}
            />
            <Input
              value={last_name}
              label={'Last name'}
              onChang={setLastName}
            />
            <Input value={email} label={'Email address'} onChang={setEmail} />

            <Input
              value={phone}
              label={'Phone number'}
              onChang={setPhone}
              keyboardType={'numeric'}
            />
            <View>
              <Text
                style={{
                  paddingTop: 15,
                  fontSize: 12,
                  color: '#333',
                  marginLeft: 15,
                }}>
                Date of Birth
              </Text>
              <DatePicker
                style={{
                  borderBottomWidth: 1.5,
                  borderColor: '#000000',
                  width: '100%',
                  paddingTop: 0,
                }}
                placeholder="Birth Date"
                date={dob}
                mode="date"
                format="YYYY-MM-DD"
                maxDate="2010-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none',
                  },

                  dateText: {
                    fontSize: 14,
                    color: '#000000',
                    paddingLeft: 15,
                    paddingBottom: 0,
                  },
                  dateInput: {
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 0,
                    borderWidth: 0,
                    alignItems: 'flex-start',
                    width: '100%',
                  },
                }}
                onDateChange={date => {
                  setDob(date);
                }}
              />
            </View>

            <View style={styles.btnBox}>
              <RoundedThemeButton
                label={'CANCEL'}
                style={{marginTop: 20, width: width / 2 - 50}}
                onPress={() => navigation.navigate('Profile')}
                loading={false}
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
    </>
  );
};
export default ProfileEdit;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  form: {
    width: width - 40,
    alignSelf: 'center',
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
    color: '#161415',
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
  editBox:{
    backgroundColor:'#000',
    width:28,
    height:28,
    borderRadius:20,
    padding:5,
    position:'absolute',
    right:width/2 + 20,
    marginTop:140
  },
  editIcon:{
    tintColor:'#fff',
    width:18,
    height:18,
  }
});
