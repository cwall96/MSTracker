import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';

/**
 * @author: Neil Robertson
 * @version: 21/04/2025 - added gradient @author Yusaf Ashraf
 */

const DefaultScreenCheckboxes = ({ name, subDescription, selected, setSelected }) => {
  const boxes = SetSymptomBoxes();

  return (
    <View style={styles.container}>
      <BackgroundGradient />
      
      {/* Title Component */}
      <MsTitle titleName="MS Symptoms" />

      {/* Description */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subDescription}>{subDescription}</Text>
      </View>

      {/* Checkbox Buttons */}
      {boxes.map((item) => (
        <View key={item.id} style={styles.checkboxWrapper}>
          <CheckboxButton
            value={item.id}
            selected={selected}
            description={item.description}
            onPress={setSelected}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 50,
  },
  textWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '85%', // Adjusted width to center the text better
    marginVertical: -10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  subDescription: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  checkboxWrapper: {
    alignSelf: 'center',
    width: '95%',
    marginBottom: 5,
  },
});

export default DefaultScreenCheckboxes;
