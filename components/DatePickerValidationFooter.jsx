import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { updatedbMisc } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

const DatePickerValidationFooter = ({ number, prevPage, nextPage, value, symptomName, alertMessage }) => {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  if (alertMessage === undefined) {
    alertMessage = 'Invalid value';
  }

  function checker() {
    if (value === undefined || value === null) {
      Alert.alert(alertMessage);
    } else {
      updatedbMisc(user, symptomName, value);
      router.push(`/${nextPage}`);
    }
  }

  return (
    <View style={styles.footer}>
      {/* BACK button with label */}
      <Link href={`/${prevPage}`} asChild>
        <Pressable style={styles.navButton} hitSlop={8}>
          <AntDesign name="arrow-left" size={60} color="black" />
          <Text style={styles.navText}>Back</Text>
        </Pressable>
      </Link>

      {/* centred number */}
      <Text style={styles.number}>
        {typeof number === 'string' || typeof number === 'number' ? number : ''}
      </Text>

      {/* NEXT button - calls checker exactly as you wanted */}
      <Pressable onPress={checker} style={styles.navButton} hitSlop={8}>
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

    paddingHorizontal: 18,
    paddingVertical: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFE1DB',
    zIndex: 100,
    elevation: 4,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // keeps number centred between Back and Next
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

export default DatePickerValidationFooter;
