import { useState } from 'react';
import {
    StyleSheet,
    View,
  } from 'react-native';
  import { TextInput } from 'react-native-paper';

  
  export const Input = (props) => {

    const [focus, setFocus] = useState(false);

    return <View style={styles.row}> 
        <TextInput
            mode={'outlined'}
            onFocus={() => setFocus(!focus)}
            style={styles.input}
            value={props.value}
            label={props.label}
            onChangeText={text => props.onChang(text)}
            activeOutlineColor='#fff'
            outlineColor='transparent'
            contentStyle={{color:'#fff'}}
            textColor='#fff'
            keyboardType={props.keyboardType ? props.keyboardType : 'numeric'}
            secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        />
  </View>
  
  };
  
  const styles = StyleSheet.create({
    row:{
        margin:10,
    },
    input:{
        backgroundColor:'transparent',
        color:'#fff',
        lineHeight:45,
        borderBottomColor:'#fff',
        borderBottomWidth:1

      },
  });
  