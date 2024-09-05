import React from 'react';
import { View, Text } from 'react-native';

const UserDetails = ({ route }) => {
  const { username, status } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Username: {username}</Text>
      <Text>Status: {status.toString()}</Text>
    </View>
  );
};

export default UserDetails;
