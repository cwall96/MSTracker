import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native'
import React, { useState } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import NormalFooter from 'components/DatePickerValidationFooter';
import DateTimePicker from '@react-native-community/datetimepicker';
import BackgroundGradient from 'components/BackgroundGradient';

const IUDSection = () => {
    const [date, setDate] = useState(new Date()); //visual date
    const [enteredDate, setEnteredDate] = useState(null); //Date used for data
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      const string = currentDate.toISOString().split('T')[0].toString();
      setEnteredDate(string);
    };

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

        <Text style={styles.text}>The <Text style={styles.bold}>hormonal IUD continuously releases progestogen for 3 – 5 years</Text>, depending on the type and brand. </Text>

        <View style={styles.space} />

        <Text style={styles.text}>The <Text style={styles.bold}>first day of contraceptive use</Text> is the <Text style={styles.bold}>day of IUD insertion.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.text}>Some users experience <Text style={styles.bold}>irregular bleeding or spotting.</Text> Over time, many users experience <Text style={styles.bold}>lighter or no bleeding</Text>, while others continue to have <Text style={styles.bold}>regular but lighter bleeding.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.bold}>When was your last contraceptive inserted (DD/MM/YYYY)?</Text>

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
        symptomName="hormornalContraceptiveIUDDate"
      />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcoral',
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
  }
  });

export default IUDSection
// copy past this for slides 46-47