import {Image, StyleSheet, Text, View} from 'react-native';
import {assets} from '../config/AssetsConfig';

export const AuthHeader = ({title}) => {
  return (
    <View style={styles.row}>
      <Image source={assets.logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 130,
    height: 53,
    position: 'absolute',
    zIndex: 999,
    top: 50,
    left: 20,
    tintColor:'#fff'
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
});
