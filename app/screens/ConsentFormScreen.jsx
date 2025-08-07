import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import BackgroundGradient from 'components/BackgroundGradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseAuth, firebaseData } from 'firebaseconfig'; // ✅ correct imports
import { doc, setDoc } from 'firebase/firestore';

export default function ConsentFormScreen() {
  const [checkboxes, setCheckboxes] = useState([
    {
      id: 1,
      label: (
        <>
          I have carefully read{' '}
          <Text
            style={styles.textLined}
            onPress={() =>
              Linking.openURL('https://raw.githubusercontent.com/cwall96/msapp/main/PIS_final.pdf')
            }
          >
            the information sheet
          </Text>
        </>
      ),
      checked: false,
    },
    {
      id: 2,
      label: `I have had an opportunity to ask questions and discuss this study and I have received satisfactory answers.`,
      checked: false,
    },
    {
      id: 3,
      label: `I understand I am free to withdraw from the study at any time, without having to give a reason for withdrawing and without prejudice.`,
      checked: false,
    },
    {
      id: 4,
      label: `I am happy for the investigators to publish my data in an anonymized fashion with no identifiable information alongside it.`,
      checked: false,
    },
    {
      id: 5,
      label: `I consent to the retention of this data under the condition that any subsequent use also be restricted to research projects that have gained ethical approval from Northumbria University.`,
      checked: false,
    },
    {
      id: 6,
      label: `I agree to take part in this study.`,
      checked: false,
    },
  ]);

  const toggleCheckboxes = (id) => {
    setCheckboxes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  async function checker() {
    const checkedCount = checkboxes.filter((box) => box.checked).length;
    if (checkedCount === 6) {
      const user = firebaseAuth.currentUser;

      if (user) {
        const userRef = doc(firebaseData, 'users', user.uid); // ✅ correct Firestore usage

        // Save consent flag to Firestore
        await setDoc(userRef, { hasConsented: true }, { merge: true });

        // Save locally too
        await AsyncStorage.setItem(`consent_${user.email}`, 'true');

        router.push('/screens/MenuScreen');
      } else {
        Alert.alert('User not authenticated');
      }
    } else {
      Alert.alert('Please tick all boxes');
    }
  }

  return (
    <View style={styles.container}>
      <BackgroundGradient />
      <Text style={styles.title}>Informed Consent</Text>

      <ScrollView contentContainerStyle={styles.listContainer}>
        {checkboxes.map((item) => (
          <View key={item.id} style={styles.checkboxContainer}>
            <Checkbox
              value={item.checked}
              onValueChange={() => toggleCheckboxes(item.id)}
              color="#E97132"
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>

      <Pressable style={styles.button} onPress={checker}>
        <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 40,
    color: '#000',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 60,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  checkbox: {
    marginTop: 4,
    marginRight: 10,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  textLined: {
    textDecorationLine: 'underline',
    color: '#E97132',
  },
  button: {
    backgroundColor: '#E97132',
    marginHorizontal: 60,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'darkred',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
