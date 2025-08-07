import { Image, Text, Pressable, View, StyleSheet, ScrollView } from 'react-native';
import { router } from "expo-router";
import BackgroundGradient from 'components/BackgroundGradient';
import { getdb } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from 'firebaseconfig';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { firestoreDb } from 'firebaseconfig'; // update this to your config
import { doc, setDoc } from 'firebase/firestore';


const registerForPushNotificationsAsync = async () => {
  if (Platform.OS === 'web') return; // ⛔️ Skip web

  if (!Device.isDevice) {
    alert('Must use physical device for push notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token');
    return;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  console.log('Push Token:', tokenData.data);

  // Save token to Firestore or your backend
};

const MenuScreen = () => {
  const auth = getAuth();
  const [gender, setGender] = useState(null);
  const [cycleType, setCycleType] = useState(null);
  const [msCompleted, setMsCompleted] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = firebaseAuth.currentUser;
      const formattedDate = new Date().toISOString().split('T')[0];
  
      try {
        const data = await getdb(user, formattedDate);
  
        if (data) {
          setGender(data.sex);
          const cycle = data.cycleType || null;
          setCycleType(cycle);
  
          const msKeys = Object.keys(data).filter((key) => key.startsWith('ms'));
          setMsCompleted(msKeys.length === 11); // Only mark as complete if all 13 fields exist
  
          const cyclePrefix = cycle === 'Hormonal' ? 'hormonal' : 'menstrual';
          const cycleKeys = Object.keys(data).filter((key) => key.startsWith(cyclePrefix));
          setCycleCompleted(cycleKeys.length > 19); // Only mark as complete if all 19 fields exist
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
    registerForPushNotificationsAsync();
  }, []);

  const renderCycleButton = () => {
    if (gender !== 'Female' || !cycleType) return null;

    const isHormonal = cycleType === 'Hormonal';
    const buttonText = isHormonal
      ? 'Report Hormonal Contraceptive Cycle Symptoms'
      : 'Report Menstrual Cycle Symptoms';

    const onPressPath = isHormonal
      ? 'HcCycleSymptomsScreens/HcSymptomsStartScreen'
      : 'MenstrualSymptomsScreens/SymptomsStartScreen';

    const isDisabled = cycleCompleted;
    

    return (
      <View style={styles.padded}>
        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: isDisabled ? '#ccc' : 'orangered',
            },
          ]}
          onPress={() => !isDisabled && router.push(onPressPath)}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
          {isDisabled && <Text style={{ textAlign: 'center' }}>You have already completed this today</Text>}
        </Pressable>
      </View>
    );
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace('/'); // or wherever your login screen is
    } catch (error) {
      console.error("Logout failed:", error);
    }
    };

  const renderMsButton = () => (
    <View style={styles.padded}>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: msCompleted ? '#ccc' : 'orangered',
          },
        ]}
        onPress={() => !msCompleted && router.push('MsSymptomsScreens/MsSymptomsStartScreen')}
        disabled={msCompleted}
      >
        <Text style={styles.buttonText}>Report MS Symptoms</Text>
        {msCompleted && <Text style={{ textAlign: 'center' }}>You have already completed this today</Text>}
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <BackgroundGradient />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Logos */}
        <View style={styles.imagecontainer}>
          <Image style={styles.logo} source={require("app/images/MSsocietyLogo.png")} resizeMode='contain' />
          <Image style={styles.logo} source={require("app/images/MStogetherLogo.png")} resizeMode='contain' />
        </View>

        {/* Welcome and disclaimers */}
        <Text style={styles.boldened}>Disclaimer:</Text>
        <View style={styles.padded}>
          <Text>
            This app is for tracking symptoms related to multiple sclerosis (MS), menstrual cycle, and hormonal contraceptives.
            It is <Text style={styles.boldened}>not</Text> a diagnostic tool and does <Text style={styles.boldened}>not</Text> replace medical advice.
          </Text>
        </View>

        <View style={styles.padded}>
          <Text>If you are concerned, please contact a medical professional. For urgent issues, seek immediate medical attention.</Text>
        </View>

        <View style={styles.padded}>
          <Text style={styles.boldened}>Welcome back!</Text>
          <Text>Please report your symptoms once per day using the links below.</Text>
        </View>

        {/* MS Symptom Button */}
        {renderMsButton()}

        {/* Female-specific cycle button */}
        {renderCycleButton()}

        

        {/* My Symptoms Page */}
        <View style={styles.padded}>
          <Pressable
            style={[styles.button, { backgroundColor: 'lightsalmon' }]}
            onPress={() => router.push('screens/MySymptomsScreen')}
          >
            <Text style={styles.buttonText}>See My Symptoms</Text>
          </Pressable>
        </View>

        {/* Study Information Page */}
        <View style={styles.padded}>
          <Pressable
            style={[styles.button, { backgroundColor: 'mistyrose' }]}
            onPress={() => router.push('screens/StudyInformationScreen')}
          >
            <Text style={styles.buttonText}>Study Information</Text>
          </Pressable>
        </View>

        <View style={styles.padded}>
          <Pressable
            style={[styles.button, { backgroundColor: 'lightgrey' }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Log Out</Text>
          </Pressable>
        </View>

        {/* Bottom Logo */}
        <View style={styles.imagecontainer}>
          <Image style={styles.northumbriaLogo} source={require("app/images/NorthumbriaLogo.png")} resizeMode='contain' />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderColor: 'darkred',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  boldened: {
    fontWeight: 'bold',
  },
  padded: {
    paddingTop: 10,
  },
  imagecontainer: {
    flexDirection: 'row',
    height: 125,
    width: "100%",
  },
  logo: {
    flex: 1,
    width: 0,
    height: "80%",
  },
  northumbriaLogo: {
    flex: 1,
    width: 0,
    height: "150%",
  },
  contentContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
});

export default MenuScreen;
