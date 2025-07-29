import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const BackgroundGradient = () => {
  return (
    <LinearGradient
      colors={['#F9A68F', '#FFBAA6', '#FFCFC2', '#FFE1DC']}
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