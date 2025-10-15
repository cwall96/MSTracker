import MsTitle from 'components/MsTitle';
import { FlatList, ScrollView, Text, View, Button, Alert, Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import { Checkbox, TextInput } from 'react-native-paper';
import Footer from 'components/BackOnlyFooter';
import {router} from "expo-router";
import BackgroundGradient from 'components/BackgroundGradient';
import {updatedb, updatedbFeedback} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import { firebaseAuth } from 'firebaseconfig';
import { getdb } from 'components/BackendEssentials';
const auth = getAuth();
const user = auth.currentUser;



const FeedbackScreen = () => {
  const list1 = [
    'Changes to / difficulties in breathing',
    'Nausea, sickness & vomiting',
    'Constipation',
    'Dizziness / light headedness / reduced co-ordination',
    'Poor concentration / memory',
    'Joint pain / muscle aches & cramps',
    'Temperature fluctuations',
    'Disturbed sleep',
    'Diarrhoea',
  ];

  const list2 = [
    'Headaches / Migraines',
    'Lower back pain',
    'Water retention',
    'Bloating / Increased gas',
    'Period cramps / pain & pelvic / uterine / ovarian pain',
    'Tiredness / Fatigue',
    'Breast pain / tenderness',
    'Cravings / changes in appetite',
    'Mood changes / irritability / anxiety',
  ];

  useEffect(() => {
    const fetchData = async () => {
      const user = firebaseAuth.currentUser;
      const formattedDate = new Date().toISOString().split('T')[0];

      try {
        const data = await getdb(user, formattedDate);

        if (data) {
          const msFields = Object.keys(data).filter(key => key.startsWith("ms"));
          setMsCompleted(msFields.length > 0);
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.bullet}>{'\u2022'}</Text>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
  const [checked, setChecked] = useState(null);

  const [msCompleted, setMsCompleted] = useState(false);

  const [text, onChangeText] = React.useState('');
  const maxLength = 300;

  
  function checker(route) {
    if (checked === null){
      Alert.alert("Please select Yes or No")
  } else {
    router.push(route)
  }
}

const handleNavigation = (destination) => {
    if (checked === null) {
      Alert.alert("Please select Yes or No");
    } else {
      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        Alert.alert("Error", "User not authenticated");
        return;
      }
      updatedbFeedback(currentUser, "menstrualIsOtherSymptoms", "menstrualOtherFeedback", checked, text);
      router.push(destination);
    }
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient/>
        <MsTitle titleName="Hormonal Contraceptive Cycle Symptoms" />

        <Text style={styles.heading}>
          As a reminder, this is the list of Hormonal Contraceptive Cycle Symptoms covered by this questionnaire:
        </Text>

        <View style={styles.listsContainer}>
          <FlatList
            data={list1}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `list1-${index}`}
            style={styles.list}
          />

          <FlatList
            data={list2}
            renderItem={renderListItem}
            keyExtractor={(item, index) => `list2-${index}`}
            style={styles.list}
          />
        </View>

        <Text style={styles.heading}>Do you suffer from any other symptoms not listed above?</Text>

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
        

        <Text style={styles.heading}>If you selected Yes, please specify (…/300 characters):</Text>

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

        <Text style={styles.largeText}>
          Thank you for reporting your Hormonal Contraceptive Cycle symptoms today!
        </Text>

        <Pressable
            style={[
              styles.button,
              {
                backgroundColor: msCompleted ? '#ccc' : 'orangered',
                marginTop: 12,
              },
            ]}
            onPress={() => !msCompleted && router.push("MsSymptomsScreens/MsSymptomsStartScreen")}
            disabled={msCompleted}
          >
            <Text style={styles.buttonText}>Report MS Symptoms</Text>
            {msCompleted && (
              <Text style={{ textAlign: 'center', marginTop: 4 }}>
                You have already completed this today
              </Text>
            )}
        </Pressable>

    
        <Pressable
          style={[styles.button, { backgroundColor: 'lightsalmon', marginTop: 20 }]}
          onPress={async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
              Alert.alert("User not authenticated");
              return;
            }

            await updatedbFeedback(user, "hormonalIsOtherSymptoms", "hormonalOtherFeedback", checked, text);
            checker("screens/MySymptomsScreen");
          }}
        >
          <Text style={styles.buttonText}>See My Symptoms</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: 'mistyrose', marginTop: 10 }]}
          onPress={async () => {
              const auth = getAuth();
              const user = auth.currentUser;

              if (!user) {
                Alert.alert("User not authenticated");
                return;
              }

              await updatedbFeedback(user, "hormonalIsOtherSymptoms", "hormonalOtherFeedback", checked, text);
              checker("screens/StudyInformationScreen");
            }}
        >
          <Text style={styles.buttonText}>Study Information</Text>
        </Pressable>

        {/* Home */}
        <Pressable
          style={[styles.button, { backgroundColor: 'lightblue' }]}
          onPress={() => handleNavigation("screens/MenuScreen")}
        >
          <Text style={styles.buttonText}>Go to Home Screen</Text>
        </Pressable>
          <View style = {{padding:25}}/>

      </ScrollView>
      <Footer number="19/19" prevPage="HcCycleSymptomsScreens/MoodChangesScreen" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    gap:20,
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
    borderColor: '#d35400',
    backgroundColor: '#de5400',
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
  space: {
    width: 10,
    height: 10,
  },
  largeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: 'darkred',
    borderRadius: 10,
  },
  
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
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
