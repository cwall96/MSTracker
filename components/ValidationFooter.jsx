import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from 'expo-router';
import { updatedb } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

const ValidationFooter = ({ number, prevPage, nextPage, value, symptomName, alertMessage }) => {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const checker = () => {
    if (value === undefined || value === null) {
      Alert.alert(alertMessage ?? "Invalid value");
    } else {
      updatedb(user, symptomName, "empty", value, "empty");
      router.push(`/${nextPage}`);
    }
  };

  return (
    <View style={styles.footer}>
      {prevPage ? (
        <Link href={`/${prevPage}`}>
          <AntDesign name="arrowleft" size={36} color="black" />
        </Link>
      ) : (
        <View style={{ width: 36 }} /> // placeholder so number stays centered
      )}

      <Text style={styles.number}>{number}</Text>

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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ValidationFooter;
