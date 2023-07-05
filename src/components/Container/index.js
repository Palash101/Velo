import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {assets} from '../../config/AssetsConfig';
import {ScrollView} from 'react-native-gesture-handler';

export const PageContainer = ({children}, props) => {
  return <View style={styles.container} {...props}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
  },
});
