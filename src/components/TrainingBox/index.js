import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';

export const TraingBox = props => {
  return (
    <TouchableOpacity
      style={{
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
        marginVertical: 2,
        borderColor: '#ddd',
      }}
      {...props}>
      <ImageBackground
        source={props.bg}
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 21}}>
          {props.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};
