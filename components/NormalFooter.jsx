import { StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';

const NormalFooter = ({ number, prevPage, nextPage }) => {
  // makes the footer that can go between pages
  
  return (
    <View style={styles.footer}>
      <Link href={`/${prevPage}`}>
      {/* Goes back to the previous page */}
        <AntDesign name="arrowleft" size={36} color="black" />
      </Link>
      <Text style={styles.number}>{number}</Text>
      {/* Goes to the next page in the survey */}
      <Link href={`/${nextPage}`}>
        <AntDesign name="arrowright" size={36} color="black" />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE1DB',
  },

  number: {
    flex: 1,
    textAlign: 'center',
    marginRight: 'auto',
  },
});

export default NormalFooter;
