import { Pressable, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import {updatedb} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

// Validation used in severity and daily impact checkboxes for first page
const ValidationFirstPageFooter = ({ number, nextPage, selectedA, selectedB, symptomName }) => {
  
  const auth = getAuth();
  const user = auth.currentUser;
  
  const severity = symptomName + "Severity"
  const impact = symptomName + "Impact"  

  const router = useRouter()

  // Checks if user has not checked a checkbox and returns corresponding error message and updates database
  function checker() {
          if (selectedA === null) {
              Alert.alert("Please select a severity")
          }
          else if (selectedB === null) {
            Alert.alert("Please select an impact on daily life")
              
          } else {
            // Sends data to database and pushes next page
            updatedb(user,severity,impact,selectedA,selectedB)
            router.push(`/${nextPage}`)
          }
      }

  return (
    <View style={styles.footer}>
      <Text style={styles.number}>{number}</Text>
      <Pressable onPress={() => checker()}>
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
    paddingHorizontal: 18, // prevents clipping of right arrow
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // clean left/right alignment
    backgroundColor: '#FFE1DB',
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // fill available space
  },
});


export default ValidationFirstPageFooter;
