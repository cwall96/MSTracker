import React, { useMemo, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';

// responsive helpers
const makeRF = (width) => (size) => {
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};
const getStyles = (width) => {
  const rf = makeRF(width);
  return StyleSheet.create({
    screen: { flex: 1 },
    footerSpacer: { height: 84 },
    containerOverride: {
      paddingVertical: Math.max(24, Math.min(48, Math.round(width * 0.06))),
    },
    checkboxScale: { transform: [{ scale: width < 360 ? 0.9 : 1 }] },
    fontSizes: { title: rf(18), body: rf(16), option: rf(16) },
  });
};

const VisionScreen = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width), [width]);
  const [selected, setSelected] = useState(null); // "0b".."6b"

  return (
    <View style={styles.screen}>
      <DefaultScreenCheckboxes
        name="9. Dizziness"
        subDescription="Off-balance, ‘spinning’ / vertigo"
        selected={selected}
        setSelected={setSelected}
        uiScale={{
          titleSize: styles.fontSizes.title,
          textSize: styles.fontSizes.body,
          optionSize: styles.fontSizes.option,
          checkboxStyle: styles.checkboxScale,
        }}
        containerStyle={styles.containerOverride}
      />

      <View style={styles.footerSpacer} />

      <NormalFooter
        prevPage="MsSymptomsScreens/VisionScreen"
        nextPage="MsSymptomsScreens/CognitiveFunctionScreen"
        number="9/13"
        value={selected}           // e.g. "3b"
        symptomName="msDizziness"
        alertMessage="Please select a score for Dizziness"
      />
    </View>
  );
};

export default VisionScreen;
