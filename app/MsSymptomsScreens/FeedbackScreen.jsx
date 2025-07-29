import MsTitle from 'components/MsTitle';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Checkbox, TextInput } from 'react-native-paper';
import NormalFooter from 'components/ValidationFooter';
import BackgroundGradient from 'components/BackgroundGradient';
import {updatedb, updatedbFeedback} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';


// Gets current user

const auth = getAuth();
const user = auth.currentUser;

// Also the textinput freaks up with a gradient


// Creates the lists of symptoms

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

  // Renders each list item with bulletpoint styles

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>{'\u2022'}</Text>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
  const [checked, setChecked] = useState(null);

  // Creates a textbox state with a max length to it

  const [text, onChangeText] = React.useState('');
  const maxLength = 300;

  return (
    // ScrollView for the container 
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient/>
        {/* Title */}
        <MsTitle titleName="MS Symptoms" />

        {/* Heading */}
        <Text style={styles.heading}>
          As a reminder, this is the list of MS Symptoms covered by this questionnaire:
        </Text>

        {/* First List */}
        <View style={styles.listsContainer}>
          <FlatList
            data={list1}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `list1-${index}`}
            style={styles.list}
          />

          {/* Second List */}
          <FlatList
            data={list2}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `list2-${index}`}
            style={styles.list}
          />
        </View>

        {/* Second Heading */}

        <Text style={styles.heading}>Do you suffer from any other symptoms not listed above?</Text>

        {/* Checkboxes of Yes and No */}

        <View style={styles.checkboxWrapper}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked === '1' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('1')}
              color="#E97132"
              uncheckedColor="#E97132"
              style={styles.checkbox}
              backgroundColor='#ffffff'
            />
            <Text style={styles.checkboxLabel}>Yes</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={checked === '0' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('0')}
              color="#E97132"
              uncheckedColor="#E97132"
              style={styles.checkbox}
              backgroundColor='#ffffff'
            />
            <Text style={styles.checkboxLabel}>No</Text>
          </View>
        </View>


        {/* Textbox Heading */}

        <Text style={styles.heading}>If you selected Yes, please specify (…/300 characters):</Text>

   
        {/* Textbox */}

        <TextInput
          editable
          multiline
          onChangeText={(text) => onChangeText(text)}
          value={text}
          placeholder="Enter your text here"
          numberofLines={4}
          maxLength={300}
          style={styles.textInput}
        />
        <Text style={styles.characterCounter}>
          {text.length} / {maxLength}
        </Text>

      </ScrollView>

      {/* Footer */}

      <NormalFooter
        prevPage="MsSymptomsScreens/AnxietyScreen"
        nextPage="MsSymptomsScreens/MsSymptomsEndScreen"
        number="13/13"
        value={checked}
        alertMessage="Please select Yes or No"
        symptomName="feedbackScreenResponse"
      />

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcoral',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap: 20
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
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  boxContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  radio: {
    alignSelf: 'flex-start',
  },
  textInput: {
    width: '100%',
    height: 120,
    borderRadius: 20,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    fontSize: 14,
    backgroundColor: 'white',
    color: 'black',
    marginVertical: 20,
  },
  characterCounter: {
    textAlign: 'center',
    color: 'black',
    marginVertical: 5,
  },

  checkboxWrapper: {
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 10,
  },
  
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  
  checkbox: {
    transform: [{ scale: 0.2 }],
  },
  
  checkboxLabel: {
    fontSize: 16,
    color: 'black',
    paddingLeft: 10,
  },
  
});

export default FeedbackScreen;
