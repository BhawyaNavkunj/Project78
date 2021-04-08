import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isVisible: false,
      firstName: '',
      lastName: '',
      contact: '',
      address: '',
      confirmPassword: '',
    };
  }

  showModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}>
      <View style={styles.modalContainer}>
        <ScrollView style={{ width: '100%' }}>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                fontSize: 30,
                color: '#8EE4AF',
                marginRight: 50,
                marginLeft:50,
                marginTop:20
              }}>
              Registration
            </Text>
            <TextInput
              style={styles.formTextInput}
              placeholder={'First Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Last Name'}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Mobile Number'}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  contact: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Address'}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Email Address'}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TextInput
              style={styles.formTextInput}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text,
                });
              }}
            />
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() =>
                  this.userSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.confirmPassword
                  )
                }>
                <Text style={{ color: '#8EE4AF' }}>Register</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBackButton}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({ isVisible: false })}>
                <Text style={{ color: '#8EE4AF' }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  );

  userLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return alert('Successfully logged in.');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return alert("password doesn't match\nCheck your password.");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          db.collection('Users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.contact,
            email: this.state.email,
            address: this.state.address,
          });
          return alert('User Added Successfully.', 
            { text: 'OK', onPress: () => this.setState({ isVisible: false }) },
          );
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return alert(errorMessage);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.showModal()}
        </View>
        <Image style={{width:280,height:180,alignSelf:"center",borderRadius:20}}
        source={require('../assets/barter.png')}/>
        <View style={styles.profileContainer}>
          <Text style={styles.title}>Barter</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text
            style={{
              color: '#8EE4AF',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            EMAIL
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
          </View>
          <Text
            style={{
              color: '#8EE4AF',
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: 55,
            }}>
            PASSWORD
          </Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 10 }]}
              onPress={() => {
                this.userLogin(this.state.email, this.state.password);
              }}>
              <Text
                style={{ color: '#8EE4AF', fontSize: 18, fontWeight: 'bold' }}>
                LOGIN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ isVisible: true });
              }}>
              <Text
                style={{ color: '#8EE4AF', fontSize: 18, fontWeight: 'bold' }}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF5E1',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: '300',
    fontFamily:'AvenirNext-Heavy',
    color: '#00B526',
  },
  loginBox: {
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor: '#5CDE95',
    fontSize: 20,
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    width: '75%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#ffff',
    elevation: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    marginRight: 30,
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  formTextInput: {
    width: '75%',
    height: 35,
    alignSelf: 'center',
    borderColor: '#5CDE95',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  cancelButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
});
