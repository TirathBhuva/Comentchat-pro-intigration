import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';
export default function Login(props) {
  let [loading, setLoading] = useState(false);
  let [userId, setUserId] = useState('');
  const login = () => {
    var apiKey = 'e11e6a3363ae2601119dce6c93e4ef844ac7cd65';
    setLoading(true);
    CometChat.login(userId, apiKey).then(
      (User) => {
        console.log('Login Successful:', {User});
        // User loged in successfully.
        setLoading(false);
        props.navigation.navigate('ChatList');
      },
      (error) => {
        setLoading(false);
        console.log('Login failed with exception:', {error});
        // User login failed, check error and take appropriate action.
      },
    );
  };
  let {mainContainer, inputStyle, btnStyle} = styles;
  return (
    <View style={mainContainer}>
      <TextInput
        placeholder={'Enter User ID'}
        style={inputStyle}
        value={userId}
        onChangeText={(text) => {
          setUserId(text);
        }}
      />
      <Button
        loading={loading}
        title={'Login'}
        style={btnStyle}
        onPress={login}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center'},
  inputStyle: {
    width: '90%',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    fontSize: 18,
    alignSelf: 'center',
  },
  btnStyle: {width: '90%', marginTop: 10, alignSelf: 'center'},
});
