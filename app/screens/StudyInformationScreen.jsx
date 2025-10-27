import { FlatList, ScrollView, StyleSheet, Text, Pressable, View, Image, Linking } from 'react-native';
import BackgroundGradient from 'components/BackgroundGradient';
import BackOnlyFooter from 'components/BackOnlyFooter';
import { getAuth } from 'firebase/auth';
import { firebaseAuth } from 'firebaseconfig';
import { useEffect, useState } from 'react';

const StudyInformationScreen = () => {
  const [prevPage, setPrevPage] = useState('screens/MenuScreen');

  useEffect(() => {
    const user = firebaseAuth.currentUser;
    if (!user || !user.email) {
      setPrevPage('screens/LoginScreen');
    } else {
      setPrevPage('screens/MenuScreen');
    }
  }, []);

  const list = [
    'The study procedures',
    'What you are being asked to do',
    'How long you are being asked to do it',
    'Instructions on what to do if you wish to withdraw from the study at any time.',
  ];

  return (
    <View style={{ flex: 1 }}>
      <BackgroundGradient />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Study Information</Text>

        <View style={styles.padded}>
          <Text style={styles.heading}>Study Website</Text>
          <Text style={styles.text}>
            Visit the study website by{' '}
            <Pressable onPress={() => Linking.openURL('https://ms-menstrualcycle.co.uk')}>
              <Text style={[styles.text, styles.textlined]}>clicking here</Text>
            </Pressable>
          </Text>
        </View>

        <View style={styles.padded}>
          <Text style={styles.heading}>Ethical Approval</Text>
          <Text style={styles.text}>
            This study was approved by the Northumbria University Health and Life Sciences Ethics Committee (reference number: 9764).
          </Text>
        </View>

        <View style={styles.padded}>
          <Text style={styles.heading}>Study Documentation</Text>
          <Text style={styles.text}>Below you can find the participant information sheet that explains:</Text>
          <View style={styles.listsContainer}>
            {list.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL('https://raw.githubusercontent.com/cwall96/msapp/main/PIS_final.pdf')}
        >
          <Text style={styles.buttonText}>Participant Information Sheet</Text>
        </Pressable>

        <View style={styles.padded}>
          <Text style={styles.heading}>Contact</Text>
          <Text style={styles.text}>
            If you have any questions while reporting your symptoms, please email: elisa.nedelec@northumbria.ac.uk or p.ansdell@northumbria.ac.uk.
          </Text>
        </View>

        <View style={styles.imagecontainer}>
          <Image style={styles.logo} source={require('app/images/MSsocietyLogo.png')} resizeMode="contain" />
          <Image style={styles.logo} source={require('app/images/NorthumbriaLogo.png')} resizeMode="contain" />
          <Image style={styles.logo} source={require('app/images/MStogetherLogo.png')} resizeMode="contain" />
        </View>
      </ScrollView>

      <BackOnlyFooter prevPage={prevPage} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding:30,
    gap: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  textlined: {
    textDecorationLine: 'underline',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
    flexWrap: 'wrap',
  },
  bullet: {
    color: 'black',
    marginRight: 5,
  },
  listText: {
    flex: 1,
    flexShrink: 1,
    color: 'black',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#de5400',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 3,
    marginTop: 10,
    borderRadius: 20,
    borderColor: '#d35400',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  padded: {
    paddingVertical: 10,
  },
  imagecontainer: {
    paddingTop: 10,
    flexDirection: 'row',
    height: 155,
    width: '100%',
  },
  logo: {
    flex: 1,
    width: 0,
    height: '80%',
  },
});

export default StudyInformationScreen;
