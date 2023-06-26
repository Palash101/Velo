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
         activeOutlineColor="#000"
         outlineColor="transparent"
         contentStyle={{color: '#000'}}
         textColor="#000"
        theme={{colors:{primary:'#000'}}}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    marginBottom:10,
  },
  input: {
    backgroundColor: 'transparent',
    color: '#000',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
});
