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
        <Text style={{fontSize:18,color:'#000'}}>{props.label}</Text>
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
        <Text style={{fontSize:18,color:'#fff'}}>{props.label}</Text>
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
  loader: {
    marginTop: 8,
  },
});
