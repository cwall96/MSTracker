import { View, Text, StyleSheet, TextInput, ScrollView, Button, Pressable, Alert} from 'react-native'
import React, { useState, useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import NormalFooter from 'components/DatePickerValidationFooter';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackgroundGradient from 'components/BackgroundGradient';
import { updatedbMisc } from 'components/BackendEssentials';
import { Link, useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';;
// might have to use "npx expo install @react-native-community/datetimepicker" to get this working not sure tho
// date picker only works on on mobile




const ContraceptiveInjectionSection = () => {
    const [date, setDate] = useState(new Date()); //visual date
    const [enteredDate, setEnteredDate] = useState(null); //Date used for data
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
   
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      const string = currentDate.toISOString().split('T')[0].toString();
      setEnteredDate(string)
      
    };
    const contraceptiveType = useRef(undefined)   
    // changes date to be compact and GB format (DD/MM/YYYY)
    const formattedDate = date.toLocaleString('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    



  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BackgroundGradient/>
        <MsTitle titleName={"Hormonal Contraceptive Cycle status"} />

        <View style={styles.space} />
        
        <Text style={styles.text}>The <Text style={styles.bold}>injection is administered every 8, 12, or 13 weeks</Text>, depending on the injection type and brand. </Text>

        <View style={styles.space} />

        <Text style={styles.text}>The <Text style={styles.bold}>first day of the cycle</Text> is the <Text style={styles.bold}>day of injection.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.text}>Many users experience <Text style={styles.bold}>irregular bleeding at first</Text>, but bleeding often becomes <Text style={styles.bold}>lighter or stops completely</Text> over time. Some users may have <Text style={styles.bold}>occasional spotting.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.bold}>When was your last contraceptive injection (DD/MM/YYYY)?</Text>

        <View style={styles.space} />

      <Button onPress={showDatepicker} title="Click Here To Select Date" />

      

      <Text>Date selected: {formattedDate}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}

        

        <NormalFooter
        prevPage="HcCycleSymptomsScreens/SelectHomonalContreceptive"
        nextPage="HcCycleSymptomsScreens/multipleQuestionsBeginning"
        number=""
        value={enteredDate}
        alertMessage="Please select a date"
        symptomName="hormornalContraceptiveInjectionDate"
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      textAlign: 'center',
    },
    contentContainer: {
      flexGrow: 1,
      padding: 20,
      justifyContent: 'flex-start',
    }, 
    space: {
      width: 20,
      height: 20,
    },
    bold: {
      fontWeight: 'bold',
      textAlign: 'center'
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
  },

  number: {
      flex: 1,
      textAlign: 'center',
      marginRight: 'auto',
  },
  });

export default ContraceptiveInjectionSection
// copy past this for slides 46-47