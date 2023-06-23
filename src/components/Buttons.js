import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-paper';

export const ThemeButton = ({label, loading, onPress}) => {
  return (
    <Button
      mode="elevated"
      style={styles.buttonText}
      textColor="#000"
      onPress={() => onPress()}>
      {loading !== true ? (
        label
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
    marginTop:50
  },

  loader: {
    marginTop: 8,
  },
});
