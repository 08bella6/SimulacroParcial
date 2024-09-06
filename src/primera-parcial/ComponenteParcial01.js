import React from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Componente01 = () => {
  const navigation = useNavigation();

  let materia = '';
  let nota = '';

  const items = [
    { id: '1', title: 'PropsParcial02', screen: 'PropsParcial02' },
    { id: '2', title: 'AxiosParcial03', screen: 'AxiosParcial03' },
    { id: '3', title: 'AsyncStorageParcial04', screen: 'AsyncStorageParcial04' },
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen, { materia, nota });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Examen Primera Parcial</Text>
      <TextInput
        placeholder="Ingresar nombre de materia"
        onChangeText={(text) => materia = text} // Asignar directamente
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Ingresar nota"
        keyboardType="numeric"
        onChangeText={(text) => nota = text} // Asignar directamente
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigation(item.screen)}>
            <Text style={styles.button}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'skyblue', // Color celeste
    marginBottom: 5,
    textAlign: 'center', // Centrar texto
  },
});

export default Componente01;