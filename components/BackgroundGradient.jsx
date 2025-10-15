import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const BackgroundGradient = () => {
  return (
    <LinearGradient
      colors={[
        'rgba(249,166,143,0.4)', // #F9A68F @ 40%
        'rgba(255,186,166,0.4)', // #FFBAA6 @ 40%
        'rgba(255,207,194,0.4)', // #FFCFC2 @ 40%
        'rgba(255,225,220,0.4)', // #FFE1DC @ 40%
      ]}
      locations={[0.2, 0.5, 0.8, 1]}
      style={styles.gradient}
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default BackgroundGradient;
