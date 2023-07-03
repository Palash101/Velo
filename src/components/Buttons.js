import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const ThemeButton = props => {
  return (
    <Button
      mode="elevated"
      contentStyle={styles.buttonText}
      onPress={() => props.onPress()}
      {...props}>
      {props.loading !== true ? (
        <Text style={{fontSize:18,color:'#000',fontFamily: 'Gotham-Medium',}}>{props.label}</Text>
      ) : (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      )}
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
      {props.loading !== true ? (
        <Text style={{fontSize:18,color:'#fff',fontFamily: 'Gotham-Medium',}}>{props.label}</Text>
      ) : (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      )}
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
      {props.loading !== true ? (
        <Text style={{fontSize:14,color:'#fff',lineHeight:16,fontFamily: 'Gotham-Medium',}}>{props.label}</Text>
      ) : (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      )}
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
      {props.loading !== true ? (
        <Text style={{fontSize:14,color:'#000',fontFamily: 'Gotham-Medium',lineHeight:16}}>{props.label}</Text>
      ) : (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      )}
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
    width: 220,
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
  RoundedDarkButton:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#000',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 36,
  },
  RoundedThemeButton:{
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    alignSelf: 'center',
    width: 220,
    height: 36,
  },
  loader: {
    marginTop: 8,
  },
});
