import { Pressable, StyleSheet, Text, View, Platform, useWindowDimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';

const BackOnlyFooter = ({ number, prevPage }) => {
  const { height } = useWindowDimensions();

  // Janky: shove the footer under the bottom a bit, proportional to screen height.
  // Tweak 0.03 to taste (e.g., 0.025 or 0.035). Android usually doesn't need it.
  const jankyBottom = Platform.OS === 'ios' ? -Math.round(height * 0.00) : 0;

  return (
    <View style={[styles.footer, { bottom: jankyBottom }]}>
      <Link href={`/${prevPage}`} asChild>
        <Pressable style={styles.navButton} hitSlop={8}>
          <AntDesign name="arrow-left" size={60} color="black" />
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
    left: 0,
    right: 0,
    // bottom set dynamically above
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFE1DB',
    zIndex: 100,
    elevation: 4,
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

  spacer: {
    width: 1,
    opacity: 0,
  },
});

export default BackOnlyFooter;
