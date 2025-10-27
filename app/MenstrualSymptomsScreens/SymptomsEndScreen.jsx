import MsTitle from 'components/MsTitle';
import { ScrollView, Text, View, Pressable, Alert, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import { TextInput, Checkbox } from 'react-native-paper';
import Footer from 'components/BackOnlyFooter';
import BackgroundGradient from 'components/BackgroundGradient';
import { updatedbFeedback, getdb } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';
import { firebaseAuth } from 'firebaseconfig';
import { router } from 'expo-router';
import CheckboxButton from 'components/CheckboxButton';


const makeRF = (width) => (size) => {
  // iPhone 12 width baseline (390); clamp between 0.85x and 1.25x
  const scale = Math.min(1.25, Math.max(0.85, width / 390));
  return Math.round(size * scale);
};

const useResponsiveStyles = () => {
  const { width } = useWindowDimensions();
  const rf = useMemo(() => makeRF(width), [width]);
  const isNarrow = width < 360;
  const isTabletish = width >= 768;

  return {
    isNarrow,
    rf,
    styles: StyleSheet.create({
      container: { flex: 1 },
      contentContainer: {
        flexGrow: 1,
        paddingHorizontal: Math.max(16, Math.min(24, Math.round(width * 0.05))),
        paddingTop: 20,
        paddingBottom: 24,
        justifyContent: 'flex-start',
        gap: 12,
      },

      heading: { fontWeight: 'bold', fontSize: rf(16) },

      listsContainer: {
        flexDirection: isTabletish ? 'row' : 'column',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 8,
      },
      list: { flex: 1, marginHorizontal: isTabletish ? 10 : 0 },
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
      },
      bullet: { color: 'black', marginRight: 8, fontSize: rf(16) },
      textItem: { color: 'black', fontSize: rf(15), flexShrink: 1, flexWrap: 'wrap' },

      checkboxWrapper: {
        flexDirection: 'column',
        gap: 8,
        paddingVertical: 10,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 6,
        transform: [{ scale: isNarrow ? 0.95 : 1 }],
      },
      checkboxLabel: {
        fontSize: rf(16),
        color: 'black',
        paddingLeft: 10,
      },
      // Light scale; 0.2 was too tiny on all devices
      checkbox: { transform: [{ scale: isNarrow ? 0.9 : 1 }] },

      textInput: {
        width: '100%',
        height: Math.max(110, Math.min(180, Math.round(120 * (width / 390)))),
        borderRadius: 16,
        borderColor: '#d35400',
        backgroundColor: 'white',
        fontSize: rf(14),
        color: 'black',
        marginVertical: 16,
        padding: 10,
      },
      characterCounter: { textAlign: 'center', color: 'black', marginVertical: 4, fontSize: rf(12) },

      button: {
        borderColor: 'darkred',
        paddingVertical: Math.max(10, Math.min(14, Math.round(width * 0.03))),
        paddingHorizontal: 12,
        borderWidth: 2,
        borderRadius: 12,
      },
      buttonText: { fontWeight: 'bold', textAlign: 'center', fontSize: rf(16) },

      // Spacer to keep scroll content above absolute footer
      footerSpacer: { height: 84 },
    }),
  };
};

const SymptomsEndScreen = () => {
  const { styles, rf } = useResponsiveStyles();

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

  const [checked, setChecked] = useState(null);        // '1' | '0'
  const [text, onChangeText] = useState('');
  const [msCompleted, setMsCompleted] = useState(false);
  const maxLength = 300;

  useEffect(() => {
    const fetchData = async () => {
      const user = firebaseAuth.currentUser;
      if (!user) return;
      const formattedDate = new Date().toISOString().split('T')[0];
      try {
        const data = await getdb(user, formattedDate);
        if (data) {
          const msFields = Object.keys(data).filter((key) => key.startsWith('ms'));
          setMsCompleted(msFields.length > 0);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleNavigation = async (destination) => {
    if (checked === null) {
      Alert.alert('Please select Yes or No');
      return;
    }
    const currentUser = getAuth().currentUser;
    if (!currentUser) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }
    try {
      await updatedbFeedback(currentUser, 'menstrualIsOtherSymptoms', 'menstrualOtherFeedback', checked, text);
      router.push(destination);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'There was a problem saving your response.');
    }
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <BackgroundGradient />
        <MsTitle titleName="Menstrual Cycle Symptoms" />

        <Text style={styles.heading}>
          As a reminder, this is the list of Menstrual Cycle Symptoms covered by this questionnaire:
        </Text>

        <View style={styles.listsContainer}>
          <View style={styles.list}>
            {list1.map((item, index) => (
              <View key={`list1-${index}`} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.textItem}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={styles.list}>
            {list2.map((item, index) => (
              <View key={`list2-${index}`} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.textItem}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.heading}>Do you suffer from any other symptoms not listed above?</Text>

        <View style={styles.checkboxWrapper}>
          <View style={styles.checkboxContainer}>
            <CheckboxButton
              value="1"
              selected={checked}
              description="Yes"
              onPress={() => setChecked('1')}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckboxButton
              value="0"
              selected={checked}
              description="No"
              onPress={() => setChecked('0')}
            />
          </View>
        </View>

        <Text style={styles.heading}>If you selected Yes, please specify (…/300 characters):</Text>

        <TextInput
          editable
          multiline
          onChangeText={onChangeText}
          value={text}
          placeholder="Enter your text here"
          numberOfLines={4}
          maxLength={maxLength}
          style={styles.textInput}
        />
        <Text style={styles.characterCounter}>{text.length} / {maxLength}</Text>

        <Text style={styles.heading}>Thank you for reporting your Menstrual Cycle symptoms today!</Text>

        {/* Report MS Symptoms */}
        <Pressable
          style={[
            styles.button,
            { backgroundColor: msCompleted ? '#ccc' : 'orangered', marginTop: 12 },
          ]}
          onPress={() => !msCompleted && router.push('MsSymptomsScreens/MsSymptomsStartScreen')}
          disabled={msCompleted}
        >
          <Text style={styles.buttonText}>Report MS Symptoms</Text>
          {msCompleted && (
            <Text style={{ textAlign: 'center', marginTop: 4, fontSize: rf(13) }}>
              You have already completed this today
            </Text>
          )}
        </Pressable>

        {/* My Symptoms */}
        <Pressable
          style={[styles.button, { backgroundColor: 'lightsalmon' }]}
          onPress={() => handleNavigation('screens/MySymptomsScreen')}
        >
          <Text style={styles.buttonText}>See My Symptoms</Text>
        </Pressable>

        {/* Study Info */}
        <Pressable
          style={[styles.button, { backgroundColor: 'mistyrose' }]}
          onPress={() => handleNavigation('screens/StudyInformationScreen')}
        >
          <Text style={styles.buttonText}>Study Information</Text>
        </Pressable>

        {/* Home */}
        <Pressable
          style={[styles.button, { backgroundColor: 'lightblue' }]}
          onPress={() => handleNavigation('screens/MenuScreen')}
        >
          <Text style={styles.buttonText}>Go to Home Screen</Text>
        </Pressable>

        {/* keep scroll content above the absolute footer */}
        <View style={styles.footerSpacer} />
      </ScrollView>

      <Footer number="19/19" prevPage="MenstrualSymptomsScreens/MoodChangesScreen" />
    </>
  );
};

export default SymptomsEndScreen;
