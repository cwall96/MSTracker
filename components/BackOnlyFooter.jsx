import { Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const BackOnlyFooter = ({ number, prevPage }) => {
  return (
    <View style={styles.footer}>
    <Link href={`/${prevPage}`} asChild>
      <Pressable style={styles.navButton} hitSlop={8}>
        <AntDesign name="arrowleft" size={60} color="black" />
        <Text style={styles.navText}>Back</Text>
      </Pressable>
    </Link>

    <Text style={styles.number}>
      {typeof number === 'string' || typeof number === 'number' ? number : ''}
    </Text>

    {/* keep center text perfectly centered */}
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



export default BackOnlyFooter;
