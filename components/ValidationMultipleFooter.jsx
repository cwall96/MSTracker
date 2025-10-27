import React from 'react';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updatedb } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

// Used in multiple validation of 3 or 4
const ValidationMultipleFooter = ({
  number,
  nextPage,
  selectedA,
  selectedB,
  selectedC,
  selectedD,      // pass false if there's no 4th question
  dataNameA,
  dataNameB,
  dataNameC,
  dataNameD,
}) => {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const checker = () => {
    if (selectedA === null) return Alert.alert('First question requires an answer');
    if (selectedB === null) return Alert.alert('Second question requires an answer');
    if (selectedC === null) return Alert.alert('Third question requires an answer');

    // if a 4th question exists (selectedD !== false), require it
    if (selectedD !== false) {
      if (selectedD === null) return Alert.alert('Fourth question requires an answer');
      // 4 answers present
      updatedb(user, dataNameA, dataNameB, selectedA, selectedB);
      updatedb(user, dataNameC, dataNameD, selectedC, selectedD);
    } else {
      // only 3 questions on this page
      updatedb(user, dataNameA, dataNameB, selectedA, selectedB);
      updatedb(user, dataNameC, 'empty', selectedC, 'empty');
    }

    router.push(`/${nextPage}`);
  };

  return (
    <View style={styles.footer}>
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
    left: 0,
    right: 0,
    bottom: 0,

    paddingHorizontal: 18, // match your other footer
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#FFE1DB',
    zIndex: 10,
    elevation: 4,
  },
  number: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // keeps number centred between left edge and nav button
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

export default ValidationMultipleFooter;
