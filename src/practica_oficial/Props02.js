import React from 'react';
import { View, Text } from 'react-native';

const Props02 = ({ route }) => {
  const { nombre, estado } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Nombre: {nombre}</Text>
      <Text>Estado: {estado.toString()}</Text>
    </View>
  );
};

export default Props02;
