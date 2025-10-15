import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import { TextInput } from 'react-native-paper';
import FirstPageFooter from 'components/ValidationMultipleFooter';
import BackgroundGradient from 'components/BackgroundGradient';

// ------------------- responsive helpers -------------------
const makeRF = (width) => (size) => {
  // iPhone 12 width baseline = 390; clamp between 0.85x and 1.25x
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};

const getStyles = (width) => {
  const rf = makeRF(width);
  const footerHeight = 84; // adjust if your FirstPageFooter is taller
  const horizontalPad = Math.max(16, Math.min(24, Math.round(width * 0.05)));

  return StyleSheet.create({
    container: { flex: 1 },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: horizontalPad,
      paddingTop: 20,
      paddingBottom: 24,
      justifyContent: 'flex-start',
      gap: 24,
    },
    text: { textAlign: 'center', fontSize: rf(15) },
    bold: { fontWeight: 'bold', fontSize: rf(16) },
    checkboxRow: {
      // wrapper to slightly increase touch target on small screens
      transform: [{ scale: width < 360 ? 0.95 : 1 }],
    },
    input: {
      width: '100%',
      height: Math.max(100, Math.min(180, Math.round(120 * (width / 390)))),
      borderRadius: 16,
      backgroundColor: '#fff',
      color: 'black',
      fontSize: rf(14),
      padding: 10,
    },
    counter: { textAlign: 'center', color: 'black', fontSize: rf(12) },
    footerSpacer: { height: footerHeight },
  });
};
// ----------------------------------------------------------

const multipleQuestionsBeginning = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width), [width]);

  const [selectedA, setSelectedA] = useState(null);   // yes/no (strings)
  const [selectedB, setSelectedB] = useState(null);   // bleeding amount (e.g. "3a")
  const [selectedC, setSelectedC] = useState(null);   // fluid (e.g. "2b")
  const [text, setText] = useState('');
  const maxLength = 300;

  // persist yes/no as binary string for footer
  const selectedBinary = useRef(null);

  const bleedingBoxes = [
    { id: '1a', description: 'None - No bleeding at all' },
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
    { id: '4a', description: 'Moderate - You need to change a regular pad or tampon every 3 - 4 hours' },
    { id: '5a', description: 'Heavy - You need to change a high-absorbency pad or tampon every 3 - 4 hours' },
    {
      id: '6a',
      description:
        'Very heavy - Your protection does not last long; you need to change a super/high-absorbency pad or tampon every 1 - 2 hours',
    },
  ];

  const fluidBoxes = [
    { id: '1b', description: 'None/dry - No noticeable fluid or just slight moisture' },
    { id: '2b', description: 'Sticky - Thick, sticky, or clumpy; may be white or cloudy' },
    { id: '3b', description: 'Creamy - Smooth, milky, or lotion-like' },
    {
      id: '4b',
      description:
        'Clear and stretchy - Looks like raw egg whites, slippery, and stretchy; usually more fluid than other types',
    },
    { id: '5b', description: 'Unsure / prefer not to say' },
    { id: '6b', description: 'Other - Please specify' },
  ];

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient />
        <MsTitle titleName="Hormonal Contraceptive Cycle status" />

        <Text style={styles.text}>
          <Text style={styles.bold}>Are you currently having any bleeding?</Text>
        </Text>

        <View style={styles.checkboxRow}>
          <CheckboxButton
            value="yes"
            selected={selectedA}
            onPress={() => {
              setSelectedA('yes');
              selectedBinary.current = '1bin';
            }}
            description="Yes"
          />
          <CheckboxButton
            value="no"
            selected={selectedA}
            onPress={() => {
              setSelectedA('no');
              selectedBinary.current = '0bin';
            }}
            description="No"
          />
        </View>

        <Text style={styles.text}>
          <Text style={styles.bold}>How much are you bleeding today?</Text>
        </Text>

        {bleedingBoxes.map((item) => (
          <View key={item.id} style={styles.checkboxRow}>
            <CheckboxButton
              value={item.id}
              selected={selectedB}
              description={item.description}
              onPress={() => setSelectedB(item.id)}
            />
          </View>
        ))}

        <Text style={styles.text}>
          <Text style={styles.bold}>What does your cervical fluid look like today?</Text>
        </Text>

        {fluidBoxes.map((item) => (
          <View key={item.id} style={styles.checkboxRow}>
            <CheckboxButton
              value={item.id}
              selected={selectedC}
              description={item.description}
              onPress={() => setSelectedC(item.id)}
            />
          </View>
        ))}

        <TextInput
          editable
          multiline
          onChangeText={setText}
          value={text}
          maxLength={maxLength}
          style={styles.input}
          placeholder="Add details (optional)…"
        />
        <Text style={styles.counter}>
          {text.length} / {maxLength}
        </Text>

        {/* Keep scrollable content above absolute footer */}
        <View style={styles.footerSpacer} />
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

export default multipleQuestionsBeginning;
