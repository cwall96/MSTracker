import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const BackOnlyFooter = ({ number, prevPage }) => {
  return (
    <View style={styles.footer}>
      <Link href={`/${prevPage}`}>
        <AntDesign name="arrowleft" size={36} color="black" />
      </Link>

      <Text style={styles.number}>
        {typeof number === 'string' || typeof number === 'number' ? number : ''}
      </Text>

      <View style={styles.spacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFE1DB',
  },

  number: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



export default BackOnlyFooter;
