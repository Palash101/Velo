import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';

export const ThemeButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={styles.buttonText}
      onPress={() => props.onPress()}
      {...props}>
        <Text style={styles.themeBtnText}>{props.label}</Text>
     
    </Button>
  );
};

export const DarkButton = props => {
  return (
    <Button
    style={{width:'100%'}}
      mode="elevated"
      contentStyle={styles.OutlineButtonText}
      onPress={() => props.onPress()}
      {...props}>
      
        <Text style={{fontSize:18,textTransform:'uppercase',color:'#fff',fontFamily: 'Gotham-Medium',}}>{props.label}</Text>
    
    </Button>
  );
};

export const RoundedDarkButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={styles.RoundedDarkButton}
      onPress={() => props.onPress()}
     
      {...props}>
        <Text style={{fontSize:12,color:'#fff',lineHeight:16,fontFamily: 'Gotham-Medium',textTransform:'uppercase'}}>{props.label}</Text>
    </Button>
  );
};


export const RoundedDarkButton2 = props => {
  return (
    <TouchableOpacity
      style={[styles.RoundedDarkButton2,props.style]}
      onPress={() => props.onPress()}>
        <Text style={{fontSize:12,color:'#fff',lineHeight:16,fontFamily: 'Gotham-Medium',textTransform:'uppercase'}}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export const RoundedRedButton = props => {
  return (
      <TouchableOpacity
      style={[styles.RoundedRedButton,props.style]}
      onPress={() => props.onPress()}>
        <Text style={{fontSize:12,color:'#fff',lineHeight:16,fontFamily: 'Gotham-Medium',textTransform:'uppercase'}}>{props.label}</Text>
    </TouchableOpacity>
  );
};

export const RoundedGreyButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={[styles.RoundedDarkButton,{backgroundColor:'#161415'}]}
      onPress={() => props.onPress()}
      {...props}>
      {/* {props.loading !== true ? ( */}
        <Text style={{fontSize:12,color:'#fff',lineHeight:16,fontFamily: 'Gotham-Medium',textTransform:'uppercase'}}>{props.label}</Text>
      
    </Button>
  );
};

export const CurvedGreyButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={[styles.CurvedButton]}
      onPress={() => props.onPress()}
      style={{borderRadius:12,...props.style}}
      {...props}>
      {/* {props.loading !== true ? ( */}
        <Text style={{fontSize:22,color:'#fff',lineHeight:26,fontFamily: 'Gotham-Black',textTransform:'uppercase'}}>{props.label}</Text>
      
    </Button>
  );
};
export const RoundedOutlineButton = props => {
  return (
    <Button
      mode="outlined"
      contentStyle={[styles.RoundedDarkButton,{backgroundColor:'transparent'}]}
      onPress={() => props.onPress()}
      {...props}>
      {/* {props.loading !== true ? ( */}
        <Text style={{fontSize:14,color:'#000',lineHeight:16,fontFamily: 'Gotham-Medium',textTransform:'uppercase'}}>{props.label}</Text>
      
    </Button>
  );
};
export const RoundedThemeButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={styles.RoundedThemeButton}
      onPress={() => props.onPress()}
      {...props}>
        <Text style={{fontSize:14,color:'#000',fontFamily: 'Gotham-Medium',lineHeight:16,textTransform:'uppercase'}}>{props.label}</Text>
     
    </Button>
  );
};
export const RoundedThemeLightButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={styles.RoundedThemeButton}
      onPress={() => props.onPress()}
      {...props}>
        <Text style={{fontSize:12,color:'#000',fontFamily: 'Gotham-Light',lineHeight:16,textTransform:'uppercase'}}>{props.label}</Text>
     
    </Button>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 55,

  },
  OutlineButtonText: {
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#000',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 55,
  },
  CurvedButton:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#161415',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  RoundedDarkButton:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#000',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 36,
    padding:0,
  },
  RoundedDarkButton2:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#000',
    alignItems: 'center',
    alignSelf: 'center',
    width: 'auto',
    padding:5,
    borderRadius:20
  },
  RoundedRedButton:{
    backgroundColor: '#f50e02',
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    alignItems: 'center',
    alignSelf: 'center',
    width: 'auto',
    padding:5,
    borderRadius:20

  },
  RoundedThemeButton:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 36,
  },
  loader: {
    marginTop: 8,
  },
  themeBtnText:{
    fontSize:18,
    color:'#000',
    fontFamily: 'Gotham-Light',
    fontWeight:400,
  }
});
