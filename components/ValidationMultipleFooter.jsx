import { Pressable, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import {updatedb} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

// Used in multiple validation of 3 or 4
const ValidationMultipleFooter = ({ number, nextPage, selectedA, selectedB, selectedC, selectedD,
   dataNameA, dataNameB, dataNameC, dataNameD }) => {
  
  const router = useRouter()

  // Gets user for data sending
  const auth = getAuth();
  const user = auth.currentUser;  

  // Checks if user input is empty and returns corresponding error message and updates database
  function checker() {
          if (selectedA === null) {
              Alert.alert('First question requires an answer')
          } else if (selectedB === null) {
            Alert.alert('Second question requires an answer')  
          } else if (selectedC === null) {
            Alert.alert('Third question requires an answer') 
            
            // checks if selected D id false, false meaning the page only has 3 uder input requirments
          } else if (selectedD !== false) {
            if (selectedD === null) {
              Alert.alert('Fourth question requires an answer') 
            }
            else { // if selectedD exists 
              // updatedb pushes 2 key:value pairs at a time
              updatedb(user,dataNameA,dataNameB,selectedA,selectedB)
              updatedb(user,dataNameC,dataNameD,selectedC,selectedD)
              router.push(`/${nextPage}`)
            }
          }  
          else { // if selectedD does not exist
            updatedb(user,dataNameA,dataNameB,selectedA,selectedB)
            updatedb(user,dataNameC,"empty",selectedC,"empty")
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
    paddingHorizontal: 16, // ✅ add padding to prevent arrow clipping
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // ✅ center text between arrow and edge
    backgroundColor: '#FFE1DB',
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ValidationMultipleFooter;
