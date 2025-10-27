import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import CheckboxButton from './CheckboxButton';
import MsTitle from './MsTitle';
import { SetSymptomBoxes } from './SymptoMScreen';
import BackgroundGradient from 'components/BackgroundGradient';

const DefaultScreenCheckboxes = ({
  name,
  subDescription,
  selected,
  setSelected,
  uiScale,
  containerStyle,
  notes,
  setNotes,
}) => {
  const boxes = SetSymptomBoxes();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, containerStyle]}
        keyboardShouldPersistTaps="handled"
      >
        <BackgroundGradient />

        <MsTitle titleName="MS Symptoms" />

        <View style={styles.textWrapper}>
          <Text
            style={[
              styles.title,
              uiScale?.titleSize ? { fontSize: uiScale.titleSize } : null,
            ]}
          >
            {name}
          </Text>
          {!!subDescription && (
            <Text
              style={[
                styles.subDescription,
                uiScale?.textSize ? { fontSize: uiScale.textSize } : null,
              ]}
            >
              {subDescription}
            </Text>
          )}
        </View>

        {boxes.map((item) => (
          <View key={item.id} style={styles.checkboxWrapper}>
            <CheckboxButton
              value={item.id}
              selected={selected}
              description={item.description}
              onPress={setSelected}
              style={uiScale?.checkboxStyle}
              textStyle={
                uiScale?.optionSize
                  ? { fontSize: uiScale.optionSize }
                  : undefined
              }
            />
          </View>
        ))}

        {/* Additional Notes Section */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesLabel}>Additional information:</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="If you wish, you can enter additional info for this symptom here."
            placeholderTextColor="#999"
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  textWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20, // more breathing room under title
  },
  title: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    textAlign: 'center',
    marginBottom: 6,
    marginTop: 12,
  },
  subDescription: { 
    fontSize: 15, 
    textAlign: 'center', 
    color: '#555',
  },
  checkboxWrapper: {
    alignSelf: 'center',
    width: '95%',
    marginVertical: 8, // space between checkboxes
  },
  notesContainer: {
    marginTop: 30,
    marginBottom: 30,
    alignSelf: 'center',
    width: '90%',
  },
  notesLabel: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 8,
  },
  notesInput: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
});

export default DefaultScreenCheckboxes;
