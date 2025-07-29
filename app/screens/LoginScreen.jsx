import { TextInput, Text, View, Pressable, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { firebaseAuth, firebaseData } from '../../firebaseconfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import BackgroundGradient from 'components/BackgroundGradient';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;
  
    const formatDateISO = (date) => {
      const isoString = date.toISOString();
      const formattedDate = isoString.split("T")[0];
      return formattedDate;
    }
  
    const currentDate = new Date();
  
    const splitName = (username) => {
      const shortened = username.split("@");
      shortened.length = 1;
      return shortened.toString();
    }

    const signIn = async () => {
      setLoading(true);
    
      try {
        const response = await signInWithEmailAndPassword(auth, username, password);
    
        const consentValue = await AsyncStorage.getItem(`consent_${username}`);
        const hasConsented = consentValue === 'true';
    
        const currentDateISO = formatDateISO(currentDate);
        const userDocRef = doc(firebaseData, 'users', username.concat(currentDateISO));
    
        const firstChar = username.charAt(0).toLowerCase();
    
        if (firstChar === "m") {
          await setDoc(userDocRef, {
            name: username,
            date: currentDateISO,
            sex: "Male"
          }, { merge: true });
    
        } else if (firstChar === "f") {
          const secondChar = username.charAt(1).toLowerCase();
          let cycleType = "";
    
          if (secondChar === "m") {
            cycleType = "Menstrual";
          } else if (secondChar === "h") {
            cycleType = "Hormonal";
          } else {
            throw new Error("Invalid username format for female user: second character must be 'm' or 'h'.");
          }
    
          await setDoc(userDocRef, {
            name: username,
            date: currentDateISO,
            sex: "Female",
            cycleType: cycleType
          }, { merge: true });
    
        } else {
          throw new Error("Invalid username format: must start with 'm' for male or 'f' for female.");
        }
    
        // Routing based on consent
        if (hasConsented) {
          router.push('screens/MenuScreen');
        } else {
          router.push('screens/ConsentFormScreen');
        }
    
      } catch (error) {
        alert('Sign in failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    

  // Sign up function currently unused
  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, username, password);
      
      alert('Account created');     
    } catch (error) {
      
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackgroundGradient/>
      <View style={styles.imagecontainer}>
        <Image
          style={styles.logo}
          source={require('app/images/MSsocietyLogo.png')}
          resizeMode="contain"
        />

        <Image
          style={styles.logo}
          source={require('app/images/MStogetherLogo.png')}
          resizeMode="contain"
        />
      </View>

      

      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{'Menstrual-related symptom worsening of MS'}</Text>
      </View>

      <View style={styles.padded}>

        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className=""
        />
      </View>

      <View style={styles.padded}>
        <Text>Password:</Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          className=""
        />
      </View>

      <Text style={styles.info}>
        To find out more information and register your interest in this study, please {''}
        <Link href="screens/StudyInformationScreen">
          <Text style={styles.infoLined}>click here</Text>
        </Link>
      </Text>

      <View style={styles.padded}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Pressable
              style={[styles.button, { backgroundColor: 'orangered' }]}
              onPress={signIn}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
            {/* <Button title="Create Account" onPress={signUp} /> */} 
          </>
        )}
      </View>

      <View style={styles.imagecontainer}>
        <Image
          style={styles.northumbriaLogo}
          source={require('app/images/NorthumbriaLogo.png')}
          resizeMode="contain"
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  info: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  infoLined: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  padded: {
    flex: 1,
    paddingTop: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'orange',
    borderRadius: 5,
  },
  imagecontainer: {
    flex: 2,
    flexDirection: 'row',
    width: '100%',
  },
  logo: {
    flex: 1,
    width: 0, // if undefined it looks weird
    height: '80%',
  },
  northumbriaLogo: {
    flex: 1,
    width: 0, // if undefined it looks weird
    height: '150%',
  },
  button: {
  borderColor: 'darkred',
  paddingVertical: 10,
  marginHorizontal: 80,
  borderWidth: 2,
  borderRadius: 10,
  alignItems: 'center',
},

buttonText: {
  color: 'white',
  fontSize: 16,
  fontWeight: 'bold',
},
});



export default LoginScreen;
