import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { updatedbFeedback } from 'components/BackendEssentials'; 
import { getAuth } from 'firebase/auth';

/**
 * ValidationFooter
 * - Handles "Back" and "Next"
 * - Saves symptom score and optional extra data (like notes)
 *
 * Props:
 *  number       → e.g. "1/13"
 *  prevPage     → path for the previous page
 *  nextPage     → path for the next page
 *  value        → numeric symptom score
 *  notes        → (optional) string, user’s free-text note
 *  symptomName  → e.g. "msFatigue"
 *  alertMessage → message if score missing
 */
const ValidationFooter = ({
  number,
  prevPage,
  nextPage,
  value,
  symptomName,
  alertMessage,
  notes,        // ✅ new
  extraData = {}, 
}) => {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const checker = async () => {
    if (value === undefined || value === null) {
      Alert.alert(alertMessage ?? 'Invalid value');
      return;
    }

    try {
      if (user && symptomName) {
        // ✅ Combine the standard value + any extra data + notes
        const combinedData = {
          ...extraData,
          [`${symptomName}Notes`]: notes || '', // adds e.g. msFatigueNotes
        };

        // ✅ Call your existing helper
        await updatedbFeedback(user, symptomName, value, combinedData);
      }

      router.push(`/${nextPage}`);
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      Alert.alert('There was an error saving your response. Please try again.');
    }
  };

  return (
    <View style={styles.footer}>
      {prevPage ? (
        <Link href={`/${prevPage}`} asChild>
          <Pressable style={styles.navButton}>
            <AntDesign name="arrow-left" size={60} color="black" />
            <Text style={styles.navText}>Back</Text>
          </Pressable>
        </Link>
      ) : (
        <View style={{ width: 100 }} /> // keeps layout aligned if no Back button
      )}

      <Text style={styles.number}>{number}</Text>

      <Pressable onPress={checker} style={styles.navButton}>
        <Text style={styles.navText}>Next</Text>
        <AntDesign name="arrow-right" size={60} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFE1DB',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
});

export default ValidationFooter;
