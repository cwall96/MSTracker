import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import { TextInput, Provider as PaperProvider } from 'react-native-paper';

import FirstPageFooter from 'components/ValidationMultipleFooter';
import BackgroundGradient from 'components/BackgroundGradient';

const multipleQuestionsBeginning = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  //for text input
  const [text, setText] = React.useState('');
  const maxLength = 300;
  const selectedBinary = useRef(null);
  const bleedingBoxes = [
    {
      id: '1a',
      description: 'None - No bleeding at all',
    },
    {
      id: '2a',
      description:
        'Very light/spotting - Only a little blood; you need to change a light pad or tampon once or twice a day',
    },
    {
      id: '3a',
      description:
        'Light - You need to change a light or regular pad or tampon about 2 - 3 times a day',
    },
    {
      id: '4a',
      description: 'Moderate - You need to change a regular pad or tampon every 3 - 4 hours',
    },
    {
      id: '5a',
      description: 'Heavy - You need to change a high-absorbency pad or tampon every 3 - 4 hours',
    },
    {
      id: '6a',
      description:
        'Very heavy - Your protection does not last long; you need to change a super/high-absorbency pad or tampon every 1 - 2 hours',
    },
  ];

  const fluidBoxes = [
    {
      id: '1b',
      description: 'None/dry - No noticeable fluid or just slight moisture',
    },
    {
      id: '2b',
      description: 'Sticky - Thick, sticky, or clumpy; may be white or cloudy',
    },
    {
      id: '3b',
      description: 'Creamy - Smooth, milky, or lotion-like',
    },
    {
      id: '4b',
      description:
        'Clear and stretchy - Looks like raw egg whites, slippery, and stretchy; usually more fluid than other types',
    },
    {
      id: '5b',
      description: 'Other - Please specify',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient/>
        <MsTitle titleName={'Hormonal Contraceptive Cycle status'} />

        <Text style={styles.text}>
          <Text style = {styles.bold}>Are you currently having any bleeding?</Text>
        </Text>

        <CheckboxButton
          value="yes"
          selected={selectedA}
          onPress={() => [setSelectedA('yes'),selectedBinary.current = "1bin"]}
          description="Yes"
        />

        <CheckboxButton
          value="no"
          selected={selectedA}
          onPress={() => [setSelectedA('no'),selectedBinary.current = "0bin"]}
          description="no"
        />

        <Text style={styles.text}>
          <Text style = {styles.bold}>How much are you bleeding today?</Text>
        </Text>

        {/* Bleeding Buttons */}
        {bleedingBoxes.map((item) => (
          <CheckboxButton
            key={item.id}
            value={item.id}
            selected={selectedB}
            description={item.description}
            onPress={() => setSelectedB(item.id)}
          />
        ))}

        <Text style={styles.text}>
          <Text style = {styles.bold}>What does your cervical fluid look like today?</Text>
        </Text>

        {/* Fluid Buttons */}
        {fluidBoxes.map((item) => (
          <CheckboxButton
            key={item.id}
            value={item.id}
            selected={selectedC}
            description={item.description}
            onPress={() => setSelectedC(item.id)}
          />
        ))}

        <TextInput
          editable
          multiline
          onChangeText={(text) => setText(text)}
          value={text}
          maxLength={maxLength}
          style={styles.paragraph}
        />
        <Text style={styles.paragraph}>
          {text.length} / {maxLength}
        </Text>
      </ScrollView>
      <FirstPageFooter 
      nextPage="HcCycleSymptomsScreens/BreathingDifficultyScreen"
      selectedA={selectedBinary.current}
      selectedB={selectedB}
      selectedC={selectedC}
      selectedD={false}
      dataNameA="hormonalIsBleeding"
      dataNameB="hormonalBleedingAmount"
      dataNameC="hormonalCervicalFluid"   
       />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcoral',
  },
  text: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },  
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap:30
  },
});

export default multipleQuestionsBeginning;
