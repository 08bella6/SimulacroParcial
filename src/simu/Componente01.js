import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Principal</Text>
      <TextInput
        placeholder="Ingresa un texto"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen, { nombre: inputText, estado: false })}
            style={styles.button} // Aplicar estilo de botón
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  button: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#007BFF', // Azul
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Texto blanco para contraste
    textAlign: 'center',
  },
});

export default Componente01;