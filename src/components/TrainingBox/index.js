import {ImageBackground, Text, View} from 'react-native';
import {Heading2} from '../Typography';

export const TraingBox = props => {
  return (
    <View
      style={{
        height: 100,
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        marginVertical: 8,
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
          borderRadius: 6,
          overflow: 'hidden',
        }}>
        <Text style={{color: '#fff', fontWeight: '600', fontSize: 21}}>
          {props.title}
        </Text>
      </ImageBackground>
    </View>
  );
};
