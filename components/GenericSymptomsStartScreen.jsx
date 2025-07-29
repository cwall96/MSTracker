import { Image, StyleSheet, Text, View } from 'react-native';
import BackgroundGradient from 'components/BackgroundGradient';
/**
 * @author: Yusaf Ashraf
 *
 * A styled generic version of the symptom start screen which can be
 * re used with changing the symptom type
 *
 * @version: 14/04/2025
 */

const GenericSymptomsStartScreen = ({ symptomType }) => {
  return (
    <>
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

        {/* spacer */}
        <View style={{ flex: 0.5 }}></View>

        <View style={{ flex: 2 }}>
          <Text style={styles.bold}>
            This form will ask you about any {symptomType} symptoms you have had today
          </Text>

          {/* spacer */}
          <View style={{ paddingTop: 15 }}></View>

          <Text style={styles.bold}>Please answer as accurately as you can</Text>
        </View>

        <View style={styles.imagecontainer}>
          <Image
            style={styles.northumbriaLogo}
            source={require('app/images/NorthumbriaLogo.png')}
            resizeMode="contain"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 80,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  imagecontainer: {
    flex: 1,
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
});

export default GenericSymptomsStartScreen;
