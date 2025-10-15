import React, { useMemo, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';

// --- responsive helpers (same pattern as your other screens) ---
const makeRF = (width) => (size) => {
  // iPhone 12 width baseline = 390
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};

const getStyles = (width) => {
  const rf = makeRF(width);
  return StyleSheet.create({
    screen: { flex: 1 },
    // keeps content above the absolute-positioned footer
    footerSpacer: { height: 84 },
    // adaptive vertical padding inside DefaultScreenCheckboxes
    containerOverride: {
      paddingVertical: Math.max(24, Math.min(48, Math.round(width * 0.06))),
    },
    // scale checkbox touch target slightly on narrow devices
    checkboxScale: {
      transform: [{ scale: width < 360 ? 0.9 : 1 }],
    },
    // font sizes to pass into child component
    fontSizes: {
      title: rf(18),
      body: rf(16),
      option: rf(16),
    },
  });
};
// ---------------------------------------------------------------

const VisionScreen = () => {
  const { width } = useWindowDimensions();
  const styles = useMemo(() => getStyles(width), [width]);

  const [selected, setSelected] = useState(null); // "0b".."6b"

  return (
    <View style={styles.screen}>
      <DefaultScreenCheckboxes
        name="8. Vision"
        subDescription="Blurry vision, double vision"
        selected={selected}
        setSelected={setSelected}
        // responsive props to scale text and hit areas
        uiScale={{
          titleSize: styles.fontSizes.title,
          textSize: styles.fontSizes.body,
          optionSize: styles.fontSizes.option,
          checkboxStyle: styles.checkboxScale,
        }}
        containerStyle={styles.containerOverride}
      />

      {/* spacer so the last option isn't hidden behind the absolute footer */}
      <View style={styles.footerSpacer} />

      <NormalFooter
        prevPage="MsSymptomsScreens/FatigueScreen"
        nextPage="MsSymptomsScreens/DizzinessScreen"
        number="8/13"
        value={selected}             // e.g., "3b" (backend normalises to 3)
        symptomName="msVision"
        alertMessage="Please select a score for Vision"
      />
    </View>
  );
};

export default VisionScreen;
