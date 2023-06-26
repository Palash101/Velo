import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const ThemeButton = props => {
  return (
    <Button
      mode="elevated"
      style={styles.buttonText}
      textColor="#000"
      onPress={() => props.onPress()}
      {...props}>
      {props.loading !== true ? (
        props.label
      ) : (
        <ActivityIndicator style={styles.loader} size="small" color="#fff" />
      )}
    </Button>
  );
};

export const ThemeBorderButton = props => {
  return (
    <Button
      mode="outlined"
      style={styles.OutlineButtonText}
      textColor="#fff"
      onPress={() => props.onPress()}
      {...props}>
      {props.loading !== true ? (
        props.label
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
    backgroundColor: '#d6d5d5',
    alignItems: 'center',
    alignSelf: 'center',
    width: 220,
    height: 42,
    marginTop: 50,
  },
  OutlineButtonText: {
    fontFamily: 'Gotham-Black',
    fontWeight: '800',
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignSelf: 'center',
    width: 220,
    height: 42,
    borderWidth: 1,
    color: '#ffffff',
    borderColor: '#ffffff',
  },
  loader: {
    marginTop: 8,
  },
});
