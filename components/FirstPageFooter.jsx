import { Pressable, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import {updatedbMisc} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';
import BackgroundGradient from './BackgroundGradient';

// BackgroundGradient
// Component for creating the footer that is used on first pages
// that does not need to back

const FirstPageFooter = ({ number, nextPage, nameKey, value }) => {
  

// Gets the current user

  const auth = getAuth();
  const user = auth.currentUser;  

  // Returns the footer View if undefined

if (nameKey === undefined){
  
  return (
    <View style={styles.footer}>
      <Text style={styles.number}>{number}</Text>
      <Pressable
        onPress={() => {
          if (nameKey === undefined) {
            router.push(`/${nextPage}`);
          } else {
            updatedbMisc(user, nameKey, value);
            router.push(`/${nextPage}`);
          }
        }}
      >
        <AntDesign name="arrow-right" size={60} color="black" />
      </Pressable>
    </View>
  );

// Returns the footer view if it is not null

}else{
  
  return (
    <View style={styles.footer}>
      <Text style={styles.number}>{number}</Text>
      <Pressable
        onPress={() => {
          if (nameKey === undefined) {
            router.push(`/${nextPage}`);
          } else {
            updatedbMisc(user, nameKey, value);
            router.push(`/${nextPage}`);
          }
        }}
      >
        <AntDesign name="arrow-right" size={60} color="black" />
      </Pressable>
    </View>
  );  
}

}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16, // added to create breathing room for icons
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // separates number and arrow evenly
    backgroundColor: '#FFE1DB',
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default FirstPageFooter;
