import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { updatedbFeedback } from 'components/BackendEssentials'; // ✅ use this instead
import { getAuth } from 'firebase/auth';

const ValidationFooter = ({
  number,
  prevPage,
  nextPage,
  value,
  symptomName,
  alertMessage,
  extraData = {}, // ✅ new prop to handle extra values like msOther, text, etc.
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
        // ✅ save both main value and any extraData
        await updatedbFeedback(user, symptomName, value, extraData);
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
            <AntDesign name="arrowleft" size={60} color="black" />
            <Text style={styles.navText}>Back</Text>
          </Pressable>
        </Link>
      ) : (
        <View style={{ width: 100 }} /> // keeps layout aligned if no Back
      )}

      <Text style={styles.number}>{number}</Text>

      <Pressable onPress={checker} style={styles.navButton}>
        <Text style={styles.navText}>Next</Text>
        <AntDesign name="arrowright" size={60} color="black" />
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
