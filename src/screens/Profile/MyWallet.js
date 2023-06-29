import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {PageContainer} from '../../components/Container';
import {RoundedDarkButton} from '../../components/Buttons';

const MyWallet = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const submit = () => {};

  return (
    <PageContainer>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Text style={{paddingLeft: 15}}>WALLET</Text>

        <View style={styles.form}>
          <View style={styles.walletBox}>
            <Text style={styles.amountText}>0 QR</Text>
          </View>
          <View style={styles.btnBox}>
            <RoundedDarkButton
              label={'TOP UP'}
              style={{marginTop: 20, width: width / 2 - 50}}
              onPress={submit}
              loading={loading}
            />
            <RoundedDarkButton
              label={'ADD CARD'}
              style={{marginTop: 20, width: width / 2 - 50}}
              onPress={submit}
              loading={loading}
            />
          </View>
        </View>
      </ScrollView>
    </PageContainer>
  );
};
export default MyWallet;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  form: {
    width: width - 40,
    alignSelf: 'center',
    marginTop: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  btnBox: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  walletBox: {
    backgroundColor: '#fff',
    textAlign: 'center',
    paddingVertical: 70,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  amountText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
  },
});
