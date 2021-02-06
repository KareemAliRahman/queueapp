import React, { useContext, useState } from 'react';
import { AuthNavProps } from '../AuthParamList';
import { StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../../providers/AuthProvider';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { apiCall, http } from '../../../api/api';

export function Login({navigation, route} : AuthNavProps<'Login'>){
  const {login} = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("aslkl");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        queues
      </Text>
      <View style={styles.loginForm}>
        <Text style={styles.errorMsg}>{errorMsg}</Text>
        <TextInput placeholder="email" style={styles.textInput} autoCompleteType="email"/>
        <TextInput placeholder="password" style={styles.textInput} autoCompleteType="password" secureTextEntry={true} />
          <TouchableOpacity  style={styles.button} onPress={async () => {
            try{
              const response = await apiCall();
            }catch(error){
              console.log(error);
              setErrorMsg(error);
            }
          }}>
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
      </View>
      <View style={styles.outTextView}>
        <Text style={styles.outText}>or</Text>
      </View>
      <View style={styles.registerView}>
          <TouchableOpacity  style={styles.button} onPress={() => {
            navigation.navigate('Register');
          }}>
              <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 5,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  outText: {
    color: '#0e639a',
    fontSize: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  registerView:{
    flex: 1,
    width: '70%',
  },
  errorMsg:{
    color: 'red',
    fontSize: 20,
    fontFamily: 'OpenSans_400Regular',
    height: 40,
  }
})