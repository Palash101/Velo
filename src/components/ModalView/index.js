import React from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Modal} from 'react-native-paper';

const height = Dimensions.get('window').height;

export const ModalView = ({visible, setVisible, children, heading, style}) => {
  return (
    <Modal
      visible={visible}
      onDismiss={setVisible}
      style={style ? style : {height: 'auto', marginTop: 260}}
      // style={{height: 'auto', marginTop: 260, justifyContent:'flex-end',marginBottom:0}}
      //{...props}
      >
      <View style={styles.modalBox}>
        <View style={styles.titleHeading}>
          <Text style={styles.titleText}>{heading}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.modalContent}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBox: {
    paddingTop: Platform.OS === 'ios' ? 30 : 30,
    backgroundColor: '#fff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },
  titleHeading: {
    flexDirection: 'row',
  },
  titleText: {
    paddingHorizontal: 20,
    paddingTop: 20,

    paddingBottom: 10,
    fontSize: 22,
    color: '#000',
    fontFamily: 'Gotham-Medium',
    textTransform: 'uppercase',
  },
});