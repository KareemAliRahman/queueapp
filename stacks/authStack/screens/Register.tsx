import React, { useContext, useState } from 'react';
import { AuthNavProps } from '../AuthParamList';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { httpRegister } from '../../../api/api';
import { cos } from 'react-native-reanimated';
import { Login } from './Login';
import { AuthContext } from '../../../providers/AuthProvider';

export function Register({navigation, route} : AuthNavProps<'Register'>){
  const {login} = useContext(AuthContext);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [repass, setRepass] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  
  return (
    <View style={styles.container}>
      <Text style={styles.errorMsg}>{errMsg}</Text>
      <TextInput placeholder="first name" style={styles.textInput} onChangeText={c => setFname(c)} />
      <TextInput placeholder="last name" style={styles.textInput} onChangeText={c => setLname(c)} />
      <TextInput placeholder="email" style={styles.textInput} autoCompleteType="email" 
      onChangeText={c => setEmail(c)} />
      <TextInput placeholder="password" style={styles.textInput} autoCompleteType="password" 
        secureTextEntry={true} onChangeText={c => setPass(c)} />
      <TextInput placeholder="reenter password" style={styles.textInput} autoCompleteType="password"  
      secureTextEntry={true} onChangeText={c => setRepass(c)} />
      <TouchableOpacity  style={styles.button} onPress={async () => {
        if(pass !== repass){
          setErrMsg("Password and repeated password must be identical");
          return;
        }
        try{
          setErrMsg("");
          await httpRegister(fname, lname, email, pass);
          navigation.goBack();
          login(email, pass);
        }catch(error){
          setErrMsg(error.message);
        }
      }}>
          <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    paddingTop: 40,
  },
  textInput:{
    width: '80%',
    borderColor: '#0e639a',
    borderRadius: 10,
    borderWidth: 2,
    height: 40,
    marginBottom: 20,
    paddingStart: 10,
    fontFamily: 'OpenSans_400Regular'
  },
  button: {
    width: '80%',
    backgroundColor: '#0e639a',
    alignItems: 'center',
    height: 30,
    borderRadius: 12,
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'OpenSans_400Regular',
  },
  errorMsg:{
    color: 'red',
    fontSize: 15,
    fontFamily: 'OpenSans_400Regular',
    height: 40,
  }
});