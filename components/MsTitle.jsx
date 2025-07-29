import { StyleSheet, Text, View } from 'react-native';

const MsTitle = ({ titleName }) => {
  return (
    // generates the title component
    <View style={styles.title}>
      <Text style={styles.text}>{titleName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 title: {
  backgroundColor: '#de5400',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderWidth: 5,
  borderRadius: 20,
  borderColor: '#d35400',
  alignSelf: 'center',     // ⬅️ centers the component horizontally
  width: '80%',            // ⬅️ gives it a fixed width relative to screen
  marginTop: -10,
},
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MsTitle;
