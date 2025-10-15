import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';

/**
 * Responsive ScreenCheckboxes
 *
 * Props:
 *  - Symptom       (string)  e.g. "Changes to / difficulties in breathing"
 *  - Title         (string)  e.g. "Hormonal Contraceptive Cycle Symptoms"
 *  - selectedA     (string|null) severity id: "1a".."4a"
 *  - setSelectedA  (fn)
 *  - selectedB     (string|null) impact id: "0b".."6b"
 *  - setSelectedB  (fn)
 *  - uiScale?      ({
 *      titleSize?: number,
 *      subtitleSize?: number, // section headings
 *      optionSize?: number,   // option label size
 *      checkboxStyle?: ViewStyle // e.g., { transform: [{ scale: 0.92 }] }
 *    })
 *  - containerStyle? (ViewStyle)
 */
const ScreenCheckboxes = ({
  Symptom,
  Title,
  selectedA,
  setSelectedA,
  selectedB,
  setSelectedB,
  uiScale,
  containerStyle,
}) => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width, uiScale), [width, uiScale]);

  // Severity options (A)
  const severityBoxes = [
    { id: '1a', description: 'Absent' },
    { id: '2a', description: 'Mild' },
    { id: '3a', description: 'Moderate' },
    { id: '4a', description: 'Severe' },
  ];

  // Impact options (B) come from your shared 0–6b set
  const symptoMScreenBoxes = SetSymptomBoxes();

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer, containerStyle]}>
      <BackgroundGradient />
      <MsTitle titleName={Title} />

      {/* Question A: Severity */}
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>{`${Symptom} (severity)`}</Text>
      </View>

      {severityBoxes.map((item) => (
        <View key={item.id} style={styles.checkboxRow}>
          <CheckboxButton
            value={item.id}
            selected={selectedA}
            description={item.description}
            onPress={() => setSelectedA(item.id)}
            // If CheckboxButton supports a label style prop, pass styles.optionText:
            // textStyle={styles.optionText}
          />
        </View>
      ))}

      {/* Question B: Impact */}
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>{`${Symptom} (impact on daily life)`}</Text>
      </View>

      {symptoMScreenBoxes.map((item) => (
        <View key={item.id} style={styles.checkboxRow}>
          <CheckboxButton
            value={item.id}
            selected={selectedB}
            description={item.description}
            onPress={() => setSelectedB(item.id)}
            // If CheckboxButton supports a label style prop, pass styles.optionText:
            // textStyle={styles.optionText}
          />
        </View>
      ))}
    </ScrollView>
  );
};

// ------------------- responsive helpers -------------------
const makeRF = (width) => (size) => {
  // iPhone 12 width baseline = 390; clamp between 0.85x and 1.25x
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};

const getStyles = (width, uiScale) => {
  const rf = makeRF(width);
  const horizontalPad = Math.max(16, Math.min(24, Math.round(width * 0.05)));

  const titleSize     = uiScale?.titleSize     ?? rf(18);
  const subtitleSize  = uiScale?.subtitleSize  ?? rf(16);
  const optionSize    = uiScale?.optionSize    ?? rf(16);
  const checkboxStyle = uiScale?.checkboxStyle ?? { transform: [{ scale: width < 360 ? 0.92 : 1 }] };

  return StyleSheet.create({
    container: { flex: 1 },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: horizontalPad,
      paddingTop: 20,
      paddingBottom: 16,
      justifyContent: 'flex-start',
      gap: 12,
    },
    textWrapper: {
      flexDirection: 'column',
      marginBottom: 4,
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: subtitleSize,
    },
    checkboxRow: {
      // Scales the row (and typically the internal checkbox hit area) on narrow devices
      ...checkboxStyle,
      marginVertical: 2,
    },
    optionText: {
      fontSize: optionSize,
    },
  });
};

export default ScreenCheckboxes;
