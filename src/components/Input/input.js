import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

export const Input = props => {
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.row}>
      <TextInput
        mode={'outlined'}
        onFocus={() => setFocus(!focus)}
        style={styles.input}
        onChangeText={text => props.onChang(text)}
         activeOutlineColor="#fff"
         outlineColor="transparent"
         contentStyle={{color: '#ddd'}}
         textColor="#fff"
        theme={{colors:{primary:'#fff'}}}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    margin: 10,
  },
  input: {
    backgroundColor: 'transparent',
    color: '#fff',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});
