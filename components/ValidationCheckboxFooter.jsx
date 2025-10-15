import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { updatedb } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

// Validation footer used in all severity and impact on daily life checkboxes other than first page
const ValidationCheckboxFooter = ({ number, prevPage, nextPage, selectedA, selectedB, symptomName }) => {
  const router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;

  const severity = symptomName + "Severity";
  const impact = symptomName + "Impact";

  function checker() {
    if (selectedA === null) {
      Alert.alert("Please select a severity");
    } else if (selectedB === null) {
      Alert.alert("Please select an impact on daily life");
    } else {
      updatedb(user, severity, impact, selectedA, selectedB);
      router.push(`/${nextPage}`);
    }
  }

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
    paddingHorizontal: 16, // added to prevent clipping
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ensures number stays centered
    backgroundColor: '#FFE1DB',
  },

  number: {
    fontSize: 14,
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

export default ValidationCheckboxFooter;
