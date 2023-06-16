import React, {Component, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {AuthContoller} from '../../controllers/AuthController';
import {useNavigation} from '@react-navigation/native';
import {PageContainer} from '../../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageLoader from '../../components/PageLoader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const submit = async () => {
    if (email !== '' && password !== '') {
      setLoading(true);
      const instance = await AuthContoller();
      const result = instance.loginUser(email, password);
      if (result.success === true) {
        if (result.responseJson.access_token) {
          AsyncStorage.setItem(
            'token',
            JSON.stringify(result.responseJson.access_token),
          );
          AsyncStorage.setItem(
            'user',
            JSON.stringify(result.responseJson.user),
          );
          navigation.navigate('Home');
          alert('Welcome to velo');
        } else {
          alert(result.responseJson.error);
        }
      } else {
        alert(result.message.error);
      }
    } else {
      alert('please enter email and password');
    }
  };

  return (
    <PageContainer>
      <PageLoader loading={loading} />
      <Text>Login</Text>
    </PageContainer>

    // <View style={styles.container}  >

    //     <ScrollView style={{flex:1,paddingBottom:50}}>
    //       <View style={styles.row}>
    //           <Image source={require('../assets/images/logo.png')} style={styles.logo} />
    //           <Text style={styles.title}>Login</Text>
    //       </View>

    //       <View style={styles.form}>

    //         <View style={styles.row}>
    //                 <OutlinedTextField
    //                     label='Email address'
    //                     onChangeText={(text) => this.setState({email:text})}
    //                     ref={this.state.email}
    //                     lineWidth={0}
    //                     labelFontSize={12}
    //                     fontSize={16}
    //                     textColor="#fff"
    //                     activeLineWidth={2}
    //                     labelHeight={20}
    //                     tintColor="#fff"
    //                     baseColor="#fff"
    //                     inputContainerPadding={2}
    //                     containerStyle={{height:50}}
    //                     labelHeight={25}
    //                     keyboardType = "email-address"
    //                     inputContainerStyle={{borderBottomWidth:1,borderColor:"#fff",height:45}}
    //                   />

    //                   <OutlinedTextField
    //                     label='Password'
    //                     onChangeText={(text) => this.setState({password:text})}
    //                     ref={this.state.email}
    //                     lineWidth={0}
    //                     labelFontSize={12}
    //                     fontSize={16}
    //                     textColor="#fff"
    //                     activeLineWidth={2}
    //                     tintColor="#fff"
    //                     baseColor="#fff"
    //                     inputContainerPadding={2}
    //                     labelHeight={25}
    //                     secureTextEntry={true}
    //                     containerStyle={{marginTop:20,height:50}}
    //                     inputContainerStyle={{borderBottomWidth:1,borderColor:"#fff",height:45}}
    //                   />
    //           </View>

    //            <TouchableOpacity style={styles.button} onPress={this.Login} >
    //                 <Text style={[this.state.loading === true ? styles.hide : styles.buttonText]}>LOGIN</Text>
    //                 <ActivityIndicator style={[this.state.loading === true ? styles.loader : styles.hide]} size="small" color="#fff" />

    //             </TouchableOpacity>

    //             <TouchableOpacity style={styles.forget} onPress={() => Actions.Forget()}>
    //               <Text style={styles.forgetText}>Forgot Password </Text>
    //             </TouchableOpacity>

    //             <TouchableOpacity style={styles.skip} onPress={() => Actions.Home()}>
    //           <Text style={styles.skipText}>Skip Now </Text>
    //         </TouchableOpacity>

    //       </View>

    //     </ScrollView>

    //     <View style={styles.alreadyBox}>
    //         <Text style={{color:"#fff",fontFamily:"Gotham-Medium",fontWeight:"300",opacity:1,fontSize:16}}>Don't have account? </Text>
    //         <TouchableOpacity onPress={() => Actions.Signup()}>
    //         <Text style={styles.AlreadyText} >Sign Up</Text>
    //         </TouchableOpacity>
    //       </View>

    //       <Image source={require('../assets/images/loginbg.png')} style={styles.bottombg} />
    //       <View style={styles.bgoverlay}></View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Gotham-Medium',
    color: '#111111',
    marginTop: 20,
  },
  bottombg: {
    position: 'absolute',
    resizeMode: 'cover',
    left: 0,
    right: 0,
    height: height,
    width: width,
    bottom: 0,
    zIndex: -1,
  },
  loader: {
    position: 'absolute',
    marginTop: 10,
    flex: 1,
  },
  forget: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  forgetText: {
    color: '#fff',
    textAlign: 'center',
  },
  bgoverlay: {
    position: 'absolute',
    resizeMode: 'cover',
    left: 0,
    right: 0,
    height: height,
    width: width,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  input: {
    fontSize: 26,
    fontFamily: 'Gotham-Medium',
    color: '#F8C22E',
    borderWidth: 1,
    borderColor: '#F8C22E',
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    height: 53,
  },
  row: {},
  logo: {
    width: 130,
    height: 53,
    position: 'absolute',
    zIndex: 999,
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    fontFamily: 'Gotham-Medium',
    color: '#ffffff',
    position: 'absolute',
    left: 20,
    marginTop: 120,
    lineHeight: 30,
    width: 130,
    textAlign: 'center',
    borderBottomWidth: 2,
    paddingBottom: 10,
    borderColor: '#fff',
  },
  form: {
    marginTop: 220,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gotham-Black',
    lineHeight: 40,
  },
  button: {
    borderWidth: 1,
    borderRadius: 24,
    height: 42,
    borderColor: '#fff',
    alignItems: 'center',
    width: 220,
    zIndex: 3,
    alignSelf: 'center',
    backgroundColor: '#d6d5d5',
    marginTop: 50,
  },
  hide: {
    display: 'none',
  },
  show: {
    display: 'flex',
  },
  back: {
    width: 20,
    height: 20,
    marginTop: 5,
    position: 'absolute',
  },
  textBelow: {
    marginTop: 20,
    width: 250,
    alignSelf: 'center',
    textAlign: 'center',
  },
  pinkBorder: {
    borderColor: '#EA0A8C',
  },
  belowText: {
    color: '#ffffff',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Gotham-Medium',
  },
  skip: {
    textAlign: 'center',
    marginTop: 30,
    bottom: Platform.OS === 'ios' ? 10 : 10,
    position: 'absolute',
    zIndex: 3,
    left: 0,
    right: 0,
  },
  skipText: {
    color: '#fff',
    textAlign: 'center',
  },
  alreadyBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
  },
  AlreadyText: {
    color: '#1AA3AD',
    borderBottomWidth: 1,
    borderColor: '#1e4b4f',
    lineHeight: 16,
    marginTop: 5,
    fontSize: 16,
    fontFamily: 'Gotham-Black',
  },
});
export default Login;
