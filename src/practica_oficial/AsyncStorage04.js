import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage04 = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null); // Estado para manejar la edición

  const loadItems = async () => {
    const storedItems = await AsyncStorage.getItem('items');
    if (storedItems) setItems(JSON.parse(storedItems));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const storeItem = async () => {
    if (editingItemId) {
      // Si estamos editando, actualizar el item existente
      const updatedItems = items.map(item => 
        item.id === editingItemId ? { id: item.id, nombre, cedula } : item
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setEditingItemId(null); // Limpiar estado de edición
    } else {
      // Si no estamos editando, crear un nuevo item
      const newItem = { id: Date.now().toString(), nombre, cedula };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }
    setNombre('');
    setCedula('');
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const editItem = (item) => {
    setNombre(item.nombre);
    setCedula(item.cedula);
    setEditingItemId(item.id); // Marcar el item para edición
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title={editingItemId ? "Actualizar" : "Guardar"} onPress={storeItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 5 }}>
            <Text>{item.nombre} - {item.cedula}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button title="Editar" onPress={() => editItem(item)} />
              <Button title="Eliminar" onPress={() => deleteItem(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AsyncStorage04;
