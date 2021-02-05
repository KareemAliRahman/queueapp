import React, { useContext } from 'react';
import { AuthNavProps } from '../AuthParamList';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../providers/AuthProvider';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';

export function Login({navigation, route} : AuthNavProps<'Login'>){
  const {login} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        queues
      </Text>
      <View style={styles.registerView}>
          <TouchableWithoutFeedback  style={styles.button} onPress={() => {
            navigation.navigate('Register');
          }}>
              <Text style={styles.text}>Register</Text>
          </TouchableWithoutFeedback>
          <View style={styles.outTextView}>
            <Text style={styles.outText}>or</Text>
          </View>
        </View>
      <View style={styles.loginForm}>
        <TextInput placeholder="email" style={styles.textInput}>
        </TextInput>
        <TextInput placeholder="password" style={styles.textInput}>
        </TextInput>
          <TouchableWithoutFeedback  style={styles.button} onPress={() => {
            login();
            console.log('logging in');
          }}>
              <Text style={styles.text}>Sign In</Text>
            </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    flex:1,
    fontFamily: 'LobsterTwo_700Bold',
    fontSize: 40,
    color: '#0e639a'
  },
  loginForm: {
    flex:2,
    width: '80%',
  },
  textInput:{
    borderColor: '#0e639a',
    borderRadius: 10,
    borderWidth: 2,
    height: 40,
    marginBottom: 20,
    paddingStart: 10,
    fontFamily: 'OpenSans_400Regular'
  },
  button: {
    backgroundColor: '#0e639a',
    alignItems: 'center',
    height: 30,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  outTextView: {
    alignItems: 'center'
  },
  outText: {
    color: '#0e639a',
    fontSize: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  registerView:{
    flex: 1,
    width: '70%',
  }
})