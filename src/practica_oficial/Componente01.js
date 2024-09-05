
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const [inputText, setInputText] = useState('');
  const navigation = useNavigation();

  const items = [
    { id: '1', title: 'Props02', screen: 'Props02' },
    { id: '2', title: 'Axios03', screen: 'Axios03' },
    { id: '3', title: 'AsyncStorage04', screen: 'AsyncStorage04' },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text>Pantalla Principal</Text>
      <TextInput
        placeholder="Ingresa un texto"
        value={inputText}
        onChangeText={setInputText}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen, { nombre: inputText, estado: false })}
          >
            <Text style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 5 }}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Componente01;
