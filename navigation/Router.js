import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Login from '@screens/Login';
import ChatList from '@screens/ChatList';
import Chat from '@screens/Chat';
import LoaderScreen from '@screens/LoaderScreen';
import {CometChat} from '@cometchat-pro/react-native-chat';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  let [initailScreen, setInitialScreen] = React.useState('');
  React.useEffect(() => {
    var user = CometChat.getLoggedinUser().then(
      (user) => {
        setInitialScreen('ChatList');
      },
      (error) => {
        setInitialScreen('Login');
        console.log('error getting details:', {error});
      },
    );
  });

  if (!initailScreen) {
    return <LoaderScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initailScreen}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChatList" component={ChatList} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
