import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import SymptoMScreen, { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';

/**
 * @author Yusaf Ashraf
 *
 * Largely similar to DefaultScreenCheckboxes
 * 
 * Handles menstrual cycle symptom questions 
 *
 * @version: 25/03/2025
 */
const ScreenCheckboxes = ({Symptom, Title, selectedA, setSelectedA, selectedB, setSelectedB}) => {

  const severityBoxes = [
    {
      id: '1a',
      description: 'Absent'
    },
    {
      id: '2a',
      description: 'Mild'
    },
    {
      id: '3a',
      description: 'Moderate'
    },
    {
      id: '4a',
      description: 'Severe'
    }    
  ]



  const symptoMScreenBoxes = SetSymptomBoxes();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BackgroundGradient/>
      {/* Title Component */}
      <MsTitle titleName={Title} />

      {/* Question A Heading */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{Symptom + " (severity)"}</Text>
      </View>

      {/* Severity Buttons */}
      {severityBoxes.map((item) => (
        <CheckboxButton
        key={item.id}
        value={item.id}
        selected={selectedA}
        description={item.description}
        onPress={() => setSelectedA(item.id)}
        />
      ))}




      {/* Question B Heading */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{Symptom + " (impact on daily life)"}</Text>
      </View>

      {/* SymptoMScreen Buttons */}
      {symptoMScreenBoxes.map((item) => (
        <CheckboxButton
          key={item.id}
          value={item.id}
          selected={selectedB}
          description={item.description}
          onPress={() => setSelectedB(item.id)}
        />
      ))}

    

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcoral',
   
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap: 5,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

});
export default ScreenCheckboxes;
