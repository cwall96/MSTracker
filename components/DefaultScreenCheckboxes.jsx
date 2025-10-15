import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';

/**
 * Optional responsive props:
 *  uiScale: {
 *    titleSize?: number,
 *    textSize?: number,
 *    optionSize?: number,
 *    checkboxStyle?: ViewStyle,
 *  }
 *  containerStyle?: ViewStyle
 */
const DefaultScreenCheckboxes = ({ name, subDescription, selected, setSelected, uiScale, containerStyle }) => {
  const boxes = SetSymptomBoxes();

  return (
    <View style={[styles.container, containerStyle]}>
      <BackgroundGradient />

      <MsTitle titleName="MS Symptoms" />

      <View style={styles.textWrapper}>
        <Text style={[styles.title, uiScale?.titleSize ? { fontSize: uiScale.titleSize } : null]}>
          {name}
        </Text>
        {!!subDescription && (
          <Text style={[styles.subDescription, uiScale?.textSize ? { fontSize: uiScale.textSize } : null]}>
            {subDescription}
          </Text>
        )}
      </View>

      {boxes.map((item) => (
        <View key={item.id} style={styles.checkboxWrapper}>
          <CheckboxButton
            value={item.id}                     // "0b".."6b"
            selected={selected}
            description={item.description}
            onPress={setSelected}
            // pass scale to the button container if supported
            style={uiScale?.checkboxStyle}
            // if CheckboxButton supports textStyle prop, this will scale its label
            textStyle={uiScale?.optionSize ? { fontSize: uiScale.optionSize } : undefined}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-around', paddingVertical: 50 },
  textWrapper: { alignSelf: 'center', alignItems: 'center', width: '85%', marginVertical: -10 },
  title: { fontWeight: 'bold', fontSize: 16, textAlign: 'center' },
  subDescription: { fontSize: 16, marginTop: 4, textAlign: 'center' },
  checkboxWrapper: { alignSelf: 'center', width: '95%', marginBottom: 5 },
});

export default DefaultScreenCheckboxes;
