/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {CometChat} from '@cometchat-pro/react-native-chat';
import Router from '@navigation/Router';

const App = () => {
  useEffect(() => {
    var appID = '23792a8a77d5196';
    var region = 'us';
    var appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
        // You can now call login function.
      },
      (error) => {
        console.log('Initialization failed with error:', error);
        // Check the reason for error and take appropriate action.
      },
    );
  });

  return <Router />;
};

export default App;
