import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

export default function Chat(props) {
  let [chats, setChats] = useState([]);
  let [msg, setMsg] = useState('');

  const getMsg = () => {
    var UID = props.route.params.id;
    var limit = 30;
    var latestId = null;
    CometChat.getLastDeliveredMessageId().then((msgId) => {
      latestId = msgId;
    });
    console.log(latestId);
    var messagesRequest = new CometChat.MessagesRequestBuilder()

      .setLimit(limit)
      .setUID(UID)
      .build();

    messagesRequest.fetchPrevious().then(
      (messages) => {
        console.log('Message list fetched:', JSON.stringify(messages));
        // Handle the list of messages
        setChats(messages);
      },
      (error) => {
        console.log('Message fetching failed with error:', error);
      },
    );
  };

  const updateChats = (msg) => {
    console.log([...chats, msg].length, Platform.OS);
    setChats([...chats, msg]);
  };

  useEffect(() => {
    var listenerID = 'UNIQUE_LISTENER_ID';
    getMsg();
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          console.log('Text message received successfully', textMessage);
          // Handle text message
          updateChats(textMessage);
        },
        onMediaMessageReceived: (mediaMessage) => {
          console.log('Media message received successfully', mediaMessage);
          // Handle media message
        },
        onCustomMessageReceived: (customMessage) => {
          console.log('Custom message received successfully', customMessage);
          // Handle custom message
        },
      }),
    );
  }, []);

  const renderMessage = ({item}) => {
    if (item.type == 'text') return textMsgView(item);
  };

  const textMsgView = (item) => {
    return (
      <View>
        <Text
          style={{
            backgroundColor: 'cyan',
            maxWidth: '60%',
            alignSelf:
              item.receiverId == props.route.params.id
                ? 'flex-end'
                : 'flex-start',
            padding: 10,
            margin: 10,
            borderRadius: 5,
          }}>
          {item.data.text}
        </Text>
      </View>
    );
  };

  const sendMessage = () => {
    var receiverID = props.route.params.id;
    var messageText = msg;
    var receiverType = CometChat.RECEIVER_TYPE.USER;
    var textMessage = new CometChat.TextMessage(
      receiverID,
      messageText,
      receiverType,
    );

    CometChat.sendMessage(textMessage).then(
      (message) => {
        console.log('Message sent successfully:', message);
        setMsg('');
        updateChats(message);
      },
      (error) => {
        console.log('Message sending failed with error:', error);
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1, justifyContent: 'flex-end'}}>
        <FlatList data={chats} renderItem={renderMessage} />
        <View style={{flexDirection: 'row', padding: 10}}>
          <TextInput
            placeholder={'Message'}
            value={msg}
            onChangeText={(text) => {
              setMsg(text);
            }}
            style={{flex: 1}}
          />
          <TouchableOpacity
            onPress={sendMessage}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>SEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
