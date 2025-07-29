import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import { Pressable, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import NormalFooter from 'components/ValidationFooter';

const WalkingMobilityScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes 
      name="1. Walking/ Mobility" 
      selected={selected}
      setSelected={setSelected}
      />

      <NormalFooter
        nextPage="MsSymptomsScreens/HandFunctionDexterityScreen"
        number="1/13"
        value={selected}
        symptomName="msWalking" 
      />
   
    </>
  );
};
export default WalkingMobilityScreen;