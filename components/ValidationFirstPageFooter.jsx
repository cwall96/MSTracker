import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updatedbMisc } from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';

const FirstPageFooter = ({ number, nextPage, nameKey, value }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const goNext = () => {
    try {
      if (nameKey !== undefined && user) {
        updatedbMisc(user, nameKey, value);
      }
    } finally {
      router.push(`/${nextPage}`);
    }
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.number}>{number}</Text>

      <Pressable onPress={goNext} style={styles.navButton}>
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

    paddingHorizontal: 18,  // match Validation footer spacing
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
    flex: 1, // balances layout and keeps number centered
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

export default FirstPageFooter;
