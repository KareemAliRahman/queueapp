import React from 'react';
import { AuthNavProps } from '../AuthParamList';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export function Register({navigation, route} : AuthNavProps<'Register'>){
    return (
      <View style={styles.container}>
        <TextInput placeholder="email" style={styles.textInput} autoCompleteType="email"/>
        <TextInput placeholder="password" style={styles.textInput} autoCompleteType="password" secureTextEntry={true} />
        <TextInput placeholder="reenter password" style={styles.textInput} autoCompleteType="password" secureTextEntry={true} />
        <TouchableOpacity  style={styles.button} onPress={() => {
          console.log('registering');
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
});