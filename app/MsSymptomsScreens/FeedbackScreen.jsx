import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { Checkbox, TextInput } from 'react-native-paper';
import MsTitle from 'components/MsTitle';
import ValidationFooter from 'components/ValidationFooter';
import BackgroundGradient from 'components/BackgroundGradient';
import { getAuth } from 'firebase/auth';
import CheckboxButton from 'components/CheckboxButton';
import { SetSymptomBoxes } from 'components/SymptoMScreen';

const auth = getAuth();
const user = auth.currentUser;

const FeedbackScreen = () => {
  const list1 = [
    'Walking / Mobility',
    'Hand function / Dexterity',
    'Spasticity and stiffness',
    'Bodily pain',
    'Sensory symptom',
  ];

  const list2 = [
    'Bladder control',
    'Fatigue, Vision',
    'Dizziness',
    'Cognitive function',
    'Depression',
    'Anxiety',
  ];

  const [checked, setChecked] = useState(null);
  const [text, setText] = useState('');
  const [msOther, setMsOther] = useState(null);
  const maxLength = 300;

  const symptoMScreenBoxes = SetSymptomBoxes();

  const extractNumber = (id) => parseInt(id.replace(/\D/g, ''), 10);

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient />
        <MsTitle titleName="MS Symptoms" />

        {/* Intro text */}
        <Text style={styles.heading}>
          As a reminder, this is the list of MS Symptoms covered by this questionnaire:
        </Text>

        <View style={styles.listsContainer}>
          <View style={styles.list}>
            {list1.map((item, index) => (
              <View key={`list1-${index}`} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.list}>
            {list2.map((item, index) => (
              <View key={`list2-${index}`} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.text}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main question */}
        <Text style={styles.heading}>Do you suffer from any other symptoms not listed above?</Text>

        {/* Yes/No checkboxes */}
        <View style={styles.checkboxWrapper}>
          <View style={styles.checkboxRow}>
            <CheckboxButton
              value="1"
              selected={checked}
              description="Yes"
              onPress={setChecked}
            />
          </View>

          <View style={styles.checkboxRow}>
            <CheckboxButton
              value="0"
              selected={checked}
              description="No"
              onPress={setChecked}
            />
          </View>
        </View>

        {/* Only show if user said Yes */}
        {checked === '1' && (
          <>
            <Text style={styles.heading}>
              Please rate how much your other MS-related symptoms limit your activities:
            </Text>

            {symptoMScreenBoxes.map((item) => (
              <View key={item.id} style={styles.checkboxContainer}>
                <CheckboxButton
                  value={item.id}
                  selected={msOther !== null ? `${msOther}b` : null}
                  description={item.description}
                  onPress={(id) => setMsOther(extractNumber(id))}
                  textStyle={styles.checkboxLabel}
                />
              </View>
            ))}

            <Text style={styles.heading}>
              If you wish, you can describe them in more detail (…/300 characters):
            </Text>

            <TextInput
              editable
              multiline
              onChangeText={setText}
              value={text}
              placeholder="Enter your text here"
              numberOfLines={3}
              maxLength={300}
              style={styles.textInput}
            />
            <Text style={styles.characterCounter}>
              {text.length} / {maxLength}
            </Text>
          </>
        )}
      </ScrollView>

      <ValidationFooter
        prevPage="MsSymptomsScreens/AnxietyScreen"
        nextPage="MsSymptomsScreens/MsSymptomsEndScreen"
        number="13/13"
        value={checked}
        alertMessage="Please select Yes or No"
        symptomName="feedbackScreenResponse"
        extraData={{
          msOther: msOther,
          otherSymptomText: text,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundGradientFrom: '#FFA388',
    backgroundGradientTo: '#FFE1DB',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap: 10,
  },
  listsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginHorizontal: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  bullet: {
    color: 'black',
    marginRight: 10,
  },
  text: {
    color: 'black',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 8,
  },
  textInput: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    fontSize: 14,
    color: 'black',
    marginVertical: 10,
    padding: 10,
    marginBottom: 100,
  },
  characterCounter: {
    textAlign: 'center',
    color: 'black',
    marginVertical: 5,
  },
  checkboxWrapper: {
    flexDirection: 'column',
    gap: 12,
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  checkboxLabel: {
    flexShrink: 1,
    flexWrap: 'wrap',
    width: 0,            // ← forces wrapping inside flex row
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },
});

export default FeedbackScreen;
