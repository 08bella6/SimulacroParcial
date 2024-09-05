import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataManager = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Estado para manejar la edición

  // Cargar los ítems almacenados desde AsyncStorage
  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) setItems(JSON.parse(storedItems));
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Guardar un nuevo ítem o actualizar uno existente
  const storeItem = async () => {
    if (editingItemId) {
      // Actualizar el ítem existente
      const updatedItems = items.map(item =>
        item.id === editingItemId ? { id: item.id, nombre, telefono } : item
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setEditingItemId(null); // Limpiar estado de edición
    } else {
      // Crear un nuevo ítem
      const newItem = { id: Date.now().toString(), nombre, telefono };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }
    setNombre('');
    setTelefono('');
  };

  // Eliminar un ítem
  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  // Preparar un ítem para ser editado
  const editItem = (item) => {
    setNombre(item.nombre);
    setTelefono(item.telefono);
    setEditingItemId(item.id); // Marcar el ítem para edición
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
      />
      <Button
        title={editingItemId ? "Actualizar" : "Crear"}
        onPress={storeItem}
        color={editingItemId ? 'blue' : 'green'} // Botón de actualizar azul, botón de crear verde
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.nombre} - {item.telefono}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Editar"
                onPress={() => editItem(item)}
                color="blue" // Botón de editar azul
              />
              <Button
                title="Eliminar"
                onPress={() => deleteItem(item.id)}
                color="red" // Botón de eliminar rojo
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  card: {
    padding: 15,
    backgroundColor: 'lightgray',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DataManager;
