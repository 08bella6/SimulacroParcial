import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AsyncStorageParcial04 = () => {
  const [codigo, setCodigo] = useState('');
  const [carrera, setCarrera] = useState('');
  const [materia, setMateria] = useState('');
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
        item.id === editingItemId ? { id: item.id, codigo, carrera, materia } : item
      );
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
      setEditingItemId(null); // Limpiar estado de edición
    } else {
      const newItem = { id: Date.now().toString(), codigo, carrera, materia };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await AsyncStorage.setItem('items', JSON.stringify(updatedItems));
    }
    setCodigo('');
    setCarrera('');
    setMateria('');
  };

  const editItem = (item) => {
    setCodigo(item.codigo);
    setCarrera(item.carrera);
    setMateria(item.materia);
    setEditingItemId(item.id); // Marcar el item para edición
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Código"
        value={codigo}
        onChangeText={setCodigo}
        style={styles.input}
      />
      <TextInput
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
        style={styles.input}
      />
      <TextInput
        placeholder="Materia"
        value={materia}
        onChangeText={setMateria}
        style={styles.input}
      />
      <TouchableOpacity style={styles.saveButton} onPress={storeItem}>
        <Text style={styles.saveButtonText}>{editingItemId ? "Actualizar" : "Guardar"}</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.codigo} - {item.carrera} - {item.materia}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editItem(item)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
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
  itemContainer: {
    padding: 10,
    backgroundColor: 'lightgray',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#28A745', // Color verde para editar
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default AsyncStorageParcial04;