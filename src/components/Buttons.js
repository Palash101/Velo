import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ThemeButton = ({label, loading, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress()}>
      <Text style={[loading === true ? styles.hide : styles.buttonText]}>
        {label}
      </Text>
      <ActivityIndicator
        style={[loading === true ? styles.loader : styles.hide]}
        size="small"
        color="#fff"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Gotham-Black',
    lineHeight: 40,
    fontWeight:'800'
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
});
