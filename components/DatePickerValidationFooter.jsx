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
    alertMessage = "Invalid value";
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
      <Link href={`/${prevPage}`}>
        <AntDesign name="arrowleft" size={36} color="black" />
      </Link>

      <Text style={styles.number}>
        {typeof number === 'string' || typeof number === 'number' ? number : ''}
      </Text>

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
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFE1DB',
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DatePickerValidationFooter;
