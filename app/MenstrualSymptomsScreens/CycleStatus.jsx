import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import { TextInput, Provider, PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import Footer from 'components/FirstPageFooter';
import { Link, router } from 'expo-router';
import FirstPageFooter from 'components/ValidationMultipleFooter';
import BackgroundGradient from 'components/BackgroundGradient';

/**
 * @author Yusaf Ashraf
 *
 * Code for the screen in the title
 *
 * @version 24/03/2025 // fixing merge conflicts
 */
const CycleStatus = () => {
  //for dropdown
  const [day, setDay] = useState(null);
  //for radiobuttons
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  //for text input
  const [text, setText] = React.useState('');
  const maxLength = 300;

  //for storing yes/no as 1/0
  //useref because it needs to persist between renders
  const selectedBinary = useRef(null);
    
  const dropdownTest = [];
  for (let i = 1; i < 36; i++) {
    dropdownTest.push({ label: `${i}`, value: `${i}` });
  }
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
    
    <PaperProvider>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BackgroundGradient/>
        {/* Title Component */}
        <MsTitle titleName="Menstrual Cycle Status" />
        
          {/* Intro Paragraph */}
          <View style={styles.textWrapper}>
            <Text style={styles.paragraph}>
              {'A menstrual cycle typically lasts around 28 days ' +
                'but can range from 21 to 35 days. Day 1 is the first day of your period (bleeding), ' +
                'and the cycle ends the day before your next period starts.'}
            </Text>
          </View>

          {/* Cycle Day Prompt */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{'What day of your menstrual cycle are you on today?'}</Text>
          </View>

          {/* dropdown currently functional but looks bad because of styling */}

          <View style={{ margin: 16 }}>
            <Dropdown
              hideMenuHeader={true}
              placeholder="Day"
              options={dropdownTest}
              value={day}
              onSelect={setDay}
            />
          </View>

          {/* Cycle Day Prompt */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{'Are you currently on your period?'}</Text>
          </View>

          <CheckboxButton
            value="yes"
            selected={selectedA}
            onPress={() => [setSelectedA('yes'),selectedBinary.current = "1bin"]}
            description="Yes"
          />

          <CheckboxButton
            value="no"
            selected={selectedA}
            onPress={() =>
              [setSelectedA('no'),selectedBinary.current = "0bin"]
              }
            description="No"
          />

          {/* Bleeding Prompt */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{'How much are you bleeding today?'}</Text>
          </View>

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

          {/* Fluid Prompt */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{'What does your cervical fluid look like today?'}</Text>
          </View>

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
        
        {/* Possibly disable text input unless other is selected */}

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

        <FirstPageFooter 
        nextPage="MenstrualSymptomsScreens/BreathingDifficultyScreen"
        selectedA={day}
        selectedB={selectedBinary.current}
        selectedC={selectedB}
        selectedD={selectedC}
        dataNameA="cycleDay"
        dataNameB="onPeriod"
        dataNameC="bleedingAmount"
        dataNameD="cervicalFluid"
         />
      </ScrollView>
      </PaperProvider>
    
    </>
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
    gap:15
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  paragraph: {
    fontSize: 16,
    marginTop: -2,
  },
});
export default CycleStatus;
