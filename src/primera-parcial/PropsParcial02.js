import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropsParcial02 = ({ route }) => {
  const { materia = 'Sin materia', nota = 'Sin nota' } = route.params || {}; // Manejo de parámetros

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        En la materia: {materia}, recibí la siguiente nota {nota}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PropsParcial02;