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
  const footerHeight = 84; // adjust to your footer height
  const padH = Math.max(16, Math.min(24, Math.round(width * 0.05)));

  return StyleSheet.create({
    screen: {
      flex: 1,
      position: 'relative', // anchor for absolute footer
    },
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
      transform: [{ scale: width < 360 ? 0.95 : 1 }],
      marginVertical: 2,
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
    footerSpacer: { height: footerHeight }, // keeps content above fixed footer
    footerHost: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      elevation: 4,
    },
    gradientFill: {
      ...StyleSheet.absoluteFillObject,
    },
  });
};
// --------------------------------------

const CycleStatus = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width), [width]);

  // state
  const [day, setDay] = useState(null);
  const [selectedA, setSelectedA] = useState(null); // yes/no
  const [selectedB, setSelectedB] = useState(null); // bleeding amount
  const [selectedC, setSelectedC] = useState(null); // cervical fluid
  const [text, setText] = useState('');
  const maxLength = 300;

  // persist yes/no as "1bin"/"0bin"
  const selectedBinary = useRef(null);

  // dropdown values
  const dropdownTest = Array.from({ length: 35 }, (_, i) => {
    const v = `${i + 1}`;
    return { label: v, value: v };
    // If your Dropdown expects {label, value}, this matches.
  });

  const bleedingBoxes = [
    { id: '1a', description: 'None - No bleeding at all' },
    { id: '2a', description: 'Very light/spotting - Only a little blood; you need to change a light pad or tampon once or twice a day' },
    { id: '3a', description: 'Light - You need to change a light or regular pad or tampon about 2 - 3 times a day' },
    { id: '4a', description: 'Moderate - You need to change a regular pad or tampon every 3 - 4 hours' },
    { id: '5a', description: 'Heavy - You need to change a high absorbency pad or tampon every 3 - 4 hours' },
    { id: '6a', description: 'Very heavy - Your protection does not last long; you need to change a super/high absorbency pad or tampon every 1 - 2 hours' },
  ];

  const fluidBoxes = [
    { id: '1b', description: 'None/dry - No noticeable fluid or just slight moisture' },
    { id: '2b', description: 'Sticky - Thick, sticky, or clumpy; may be white or cloudy' },
    { id: '3b', description: 'Creamy - Smooth, milky, or lotion like' },
    { id: '4b', description: 'Clear and stretchy - Looks like raw egg whites, slippery, and stretchy; usually more fluid than other types' },
    { id: '5b', description: 'Unsure / prefer not to say' },
    { id: '6b', description: 'Other - Please specify' },
  ];

  return (
    <PaperProvider>
      <View style={styles.screen}>
        <BackgroundGradient style={styles.gradientFill} />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <MsTitle titleName="Menstrual Cycle Status" />

          {/* Intro */}
          <View style={styles.textWrapper}>
            <Text style={styles.paragraph}>
              {'A menstrual cycle typically lasts around 28 days but can range from 21 to 35 days. Day 1 is the first day of your period (bleeding), and the cycle ends the day before your next period starts.'}
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

          {/* keep content above fixed footer */}
          <View style={styles.footerSpacer} />
        </ScrollView>

        {/* fixed footer (outside the ScrollView) */}
        <View style={styles.footerHost}>
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
        </View>
      </View>
    </PaperProvider>
  );
};

export default CycleStatus;
