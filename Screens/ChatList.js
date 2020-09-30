import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {CometChat} from '@cometchat-pro/react-native-chat';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function ChatList({navigation}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = () => {
    var usersRequest = new CometChat.UsersRequestBuilder().setLimit(30).build();
    usersRequest.fetchNext().then(
      (userList) => {
        /* userList will be the list of User class. */
        setUsers(userList);
        console.log('User list received:', userList);
        /* retrived list can be used to display contact list. */
      },
      (error) => {
        console.log('User list fetching failed with error:', error);
      },
    );
  };

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({item}) => {
          if (item.blockedByMe && item.hasBlockedMe) {
            return null;
          }
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', {id: item.uid})}
              style={{
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                borderBottomWidth: 0.5,
              }}>
              <Image
                source={{uri: item.avatar}}
                style={{height: 50, width: 50, borderRadius: 50}}
              />
              <View
                style={{
                  marginLeft: 15,
                  marginTop: 5,
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 18}}>{item.name}</Text>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      backgroundColor:
                        item?.status === 'offline' ? '#707070' : 'green',
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                    }}></View>
                  <Text style={{fontSize: 18}}>{item.status}</Text>
                  <Text></Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
