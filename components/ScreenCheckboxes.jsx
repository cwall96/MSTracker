import React, { useMemo } from 'react';
import { StyleSheet, Text, View, ScrollView, useWindowDimensions } from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const severityBoxes = [
    { id: '1a', description: 'Absent' },
    { id: '2a', description: 'Mild' },
    { id: '3a', description: 'Moderate' },
    { id: '4a', description: 'Severe' },
  ];

  const symptoMScreenBoxes = SetSymptomBoxes();

  return (
   <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer, containerStyle]}
        showsVerticalScrollIndicator={false}
      >
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
              textStyle={styles.optionText}
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
              textStyle={styles.optionText}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// ------------------- responsive helpers -------------------
const makeRF = (width) => (size) => {
  const scale = Math.min(1.25, Math.max(0.85, width / 390)); // baseline iPhone 12 width
  return Math.round(size * scale);
};

const getStyles = (width, uiScale) => {
  const rf = makeRF(width);
  const horizontalPad = Math.max(16, Math.min(24, Math.round(width * 0.05)));
  const subtitleSize = uiScale?.subtitleSize ?? rf(16);
  const optionSize = uiScale?.optionSize ?? rf(16);
  const checkboxStyle =
    uiScale?.checkboxStyle ?? { transform: [{ scale: width < 360 ? 0.92 : 1 }] };

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: horizontalPad,
      paddingTop: 20,
      paddingBottom: 150,
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
      flexShrink: 1,
      flexWrap: 'wrap',
    },
    checkboxRow: {
      ...checkboxStyle,
      marginVertical: 2,
    },
    optionText: {
      fontSize: optionSize,
      flexShrink: 1,
    },
  });
};

export default ScreenCheckboxes;
