import {Image, StyleSheet, Text, View} from 'react-native';
import {assets} from '../config/AssetsConfig';

export const AuthHeader = ({title}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row:{
    marginTop:100
  },
  title: {
    fontSize: 32,
    color:'#000',
    textTransform:'uppercase'
  },
});
