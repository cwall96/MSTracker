import { StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

const CheckboxButton = ({ value, selected, description, onPress }) => {
  const isChecked = selected === value;

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => onPress(value)}
        color="#E97132"
        uncheckedColor="#E97132"
        style={styles.checkbox} // ✅ scaled directly
        backgroundColor = '#ffffff'
      />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%'
  },
  checkbox: {
    transform: [{ scale: 0.2 }], // 👈 smaller checkbox
    
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    flexWrap: 'wrap',
    paddingLeft: 10,
    
  },
});

export default CheckboxButton;
