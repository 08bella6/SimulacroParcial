import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorage04 = () => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
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
      const updatedItems = items.map(item => 
        item.id === editingItemId ? { id: item.id, nombre, telefono, cedula } : item
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setEditingItemId(null); // Limpiar estado de edición
    } else {
      const newItem = { id: Date.now().toString(), nombre, telefono, cedula };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }
    setNombre('');
    setTelefono('');
    setCedula('');
  };

  const deleteItem = async (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
  };

  const editItem = (item) => {
    setNombre(item.nombre);
    setTelefono(item.telefono);
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
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Cedula"
        value={cedula}
        onChangeText={setCedula}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={storeItem}>
        <Text style={styles.saveButtonText}>{editingItemId ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 5 }}>
            <Text>{item.nombre} - {item.telefono} - {item.cedula}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#007BFF', // Color azul para guardar
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#28A745', // Color verde para editar
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#DC3545', // Color rojo para eliminar
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default AsyncStorage04;