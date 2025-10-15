import React, { useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import { TextInput, PaperProvider } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import FirstPageFooter from 'components/ValidationMultipleFooter';
import BackgroundGradient from 'components/BackgroundGradient';

// --------- responsive helpers ----------
const makeRF = (width) => (size) => {
  // iPhone 12 width baseline = 390; clamp scaling between 0.85x and 1.25x
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};

const getStyles = (width) => {
  const rf = makeRF(width);
  const footerHeight = 84; // adjust to your footer’s actual height
  const padH = Math.max(16, Math.min(24, Math.round(width * 0.05)));

  return StyleSheet.create({
    container: { flex: 1 },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: padH,
      paddingTop: 20,
      paddingBottom: 24,
      justifyContent: 'flex-start',
      gap: 18,
    },
    textWrapper: {
      flexDirection: 'column',
    },
    title: {
      fontWeight: 'bold',
      fontSize: rf(16),
    },
    paragraph: {
      fontSize: rf(15),
      marginTop: -2,
    },
    dropdownWrap: {
      marginHorizontal: 0,
      marginVertical: 8,
      paddingHorizontal: 0,
    },
    checkboxRow: {
      // subtly scale touch target on narrow screens
      transform: [{ scale: width < 360 ? 0.95 : 1 }],
    },
    input: {
      width: '100%',
      height: Math.max(100, Math.min(180, Math.round(120 * (width / 390)))),
      borderRadius: 12,
      backgroundColor: '#fff',
      fontSize: rf(14),
      color: 'black',
      padding: 10,
    },
    counter: {
      fontSize: rf(12),
      textAlign: 'center',
      color: 'black',
    },
    footerSpacer: { height: footerHeight },
  });
};
// --------------------------------------

const CycleStatus = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width), [width]);

  // state
  const [day, setDay] = useState(null);
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);
  const [selectedC, setSelectedC] = useState(null);
  const [text, setText] = useState('');
  const maxLength = 300;

  // persist yes/no as "1bin"/"0bin"
  const selectedBinary = useRef(null);

  // dropdown values
  const dropdownTest = [];
  for (let i = 1; i < 36; i++) dropdownTest.push({ label: `${i}`, value: `${i}` });

  const bleedingBoxes = [
    { id: '1a', description: 'None - No bleeding at all' },
    { id: '2a', description: 'Very light/spotting - Only a little blood; you need to change a light pad or tampon once or twice a day' },
    { id: '3a', description: 'Light - You need to change a light or regular pad or tampon about 2 - 3 times a day' },
    { id: '4a', description: 'Moderate - You need to change a regular pad or tampon every 3 - 4 hours' },
    { id: '5a', description: 'Heavy - You need to change a high-absorbency pad or tampon every 3 - 4 hours' },
    { id: '6a', description: 'Very heavy - Your protection does not last long; you need to change a super/high-absorbency pad or tampon every 1 - 2 hours' },
  ];

  const fluidBoxes = [
    { id: '1b', description: 'None/dry - No noticeable fluid or just slight moisture' },
    { id: '2b', description: 'Sticky - Thick, sticky, or clumpy; may be white or cloudy' },
    { id: '3b', description: 'Creamy - Smooth, milky, or lotion-like' },
    { id: '4b', description: 'Clear and stretchy - Looks like raw egg whites, slippery, and stretchy; usually more fluid than other types' },
    { id: '5b', description: 'Unsure / prefer not to say' },
    { id: '6b', description: 'Other - Please specify' },
  ];

  return (
    <PaperProvider>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient />

        {/* Title */}
        <MsTitle titleName="Menstrual Cycle Status" />

        {/* Intro */}
        <View style={styles.textWrapper}>
          <Text style={styles.paragraph}>
            {'A menstrual cycle typically lasts around 28 days ' +
              'but can range from 21 to 35 days. Day 1 is the first day of your period (bleeding), ' +
              'and the cycle ends the day before your next period starts.'}
          </Text>
        </View>

        {/* Cycle day */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>What day of your menstrual cycle are you on today?</Text>
        </View>

        <View style={styles.dropdownWrap}>
          <Dropdown
            hideMenuHeader
            placeholder="Day"
            options={dropdownTest}
            value={day}
            onSelect={setDay}
          />
        </View>

        {/* On period? */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Are you currently on your period?</Text>
        </View>

        <View style={styles.checkboxRow}>
          <CheckboxButton
            value="yes"
            selected={selectedA}
            onPress={() => { setSelectedA('yes'); selectedBinary.current = '1bin'; }}
            description="Yes"
          />
          <CheckboxButton
            value="no"
            selected={selectedA}
            onPress={() => { setSelectedA('no'); selectedBinary.current = '0bin'; }}
            description="No"
          />
        </View>

        {/* Bleeding amount */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>How much are you bleeding today?</Text>
        </View>

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

        {/* Cervical fluid */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>What does your cervical fluid look like today?</Text>
        </View>

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

        {/* Notes */}
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

        {/* keep content above absolute footer */}
        <View style={styles.footerSpacer} />

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
  );
};

export default CycleStatus;
