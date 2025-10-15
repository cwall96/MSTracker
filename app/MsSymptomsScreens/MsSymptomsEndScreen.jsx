import { StyleSheet, Text, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import BackgroundGradient from 'components/BackgroundGradient';
import { getdb } from 'components/BackendEssentials';
import { useEffect, useState } from 'react';
import { firebaseAuth } from 'firebaseconfig';

const MsSymptomsEndScreen = () => {
  const [gender, setGender] = useState(null);
  const [cycleType, setCycleType] = useState(null);
  const [cycleCompleted, setCycleCompleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const user = firebaseAuth.currentUser;
      const formattedDate = new Date().toISOString().split('T')[0];
      try {
        const data = await getdb(user, formattedDate);

        if (data) {
          setGender(data.sex);
          const userCycleType = data.cycleType || null;
          setCycleType(userCycleType);

          const prefix = userCycleType === 'Hormonal' ? 'hormonal' : 'menstrual';
          const cycleKeys = Object.keys(data).filter((key) => key.startsWith(prefix));
          setCycleCompleted(cycleKeys.length > 40);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const renderCycleButton = () => {
    if (gender !== 'Female' || !cycleType) return null;

    const isHormonal = cycleType === 'Hormonal';
    const buttonText = isHormonal
      ? 'Hormonal Contraceptive Cycle Symptoms'
      : 'Menstrual Cycle Symptoms';

    const targetRoute = isHormonal
      ? 'HcCycleSymptomsScreens/HcSymptomsStartScreen'
      : 'MenstrualSymptomsScreens/SymptomsStartScreen';

    const isDisabled = cycleCompleted;

    return (
      <>
        <Text style={styles.heading}>
          Now, let’s check in on your cycle-related symptoms – it only takes two minutes.
        </Text>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: isDisabled ? '#ccc' : 'orangered',
              marginTop: 12,
            },
          ]}
          onPress={() => !isDisabled && router.push(targetRoute)}
          disabled={isDisabled}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
          {isDisabled && (
            <Text style={{ textAlign: 'center', marginTop: 4 }}>
              You have already completed this today
            </Text>
          )}
        </Pressable>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <BackgroundGradient />

      <View style={{ marginTop: 20 }} />

      <Text style={styles.heading}>Thank you for reporting your MS symptoms today!</Text>

      {renderCycleButton()}

      <Pressable
        style={[styles.button, { backgroundColor: 'lightsalmon', marginTop: 20 }]}
        onPress={() => {
          router.push('screens/MySymptomsScreen');
        }}
      >
        <Text style={styles.buttonText}>See My Symptoms</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: 'mistyrose', marginTop: 10 }]}
        onPress={() => {
          router.push('screens/StudyInformationScreen');
        }}
      >
        <Text style={styles.buttonText}>Study Information</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: 'lightblue', marginTop: 10 }]}
        onPress={() => {
          router.push('screens/MenuScreen'); // <- Home Screen
        }}
      >
        <Text style={styles.buttonText}>Go to Home Screen</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundGradientFrom: "#FFA388",
    backgroundGradientTo: "#FFE1DB",
    padding: 20,
  },
  button: {
    borderColor: 'darkred',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heading: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MsSymptomsEndScreen;
