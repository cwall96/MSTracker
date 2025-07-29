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
      <Link href={`/${prevPage}`}>
        <AntDesign name="arrowleft" size={36} color="black" />
      </Link>
      <Text style={styles.number}>{String(number)}</Text>
      <Pressable onPress={checker}>
        <AntDesign name="arrowright" size={36} color="black" />
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
});

export default ValidationCheckboxFooter;
