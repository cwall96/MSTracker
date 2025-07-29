import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import {Dropdown} from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import ValidationFooter from 'components/ValidationFooter';
import BackgroundGradient from 'components/BackgroundGradient';

// font is different on this page for some reason

const vaginalRingSection = () => {
    //for dropdown
    const [ringDays , setRingDays] = useState(null);
    const [ringFreeDay, setRingFreeDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [value, setValue] = useState(undefined)

    const dropdownDays = []
    for(let i = 1; i < 22; i++) {
      dropdownDays.push({label:`${i}`,value: `${i}`})
    } 

    const contraceptiveType = useRef(undefined)    

    const Conditional = () => {
          if (selected === "yes") {
            return (
              <><Text style={styles.bold}>How many days have you been using this ring? </Text>

              <View style={styles.space} />
              
              <Dropdown
                  placeholder="Day"
                  options={dropdownDays}
                  value={ringDays}
                  onSelect={(value) => {
                    setRingDays(value)
                    setValue(value)
                    }} />
              </>
            )
          }
          else if (selected === "no") {
            return (
              <><Text style={styles.bold}>What day of your ring-free week are you on? </Text>

              <View style={styles.space} />

                <Dropdown
                  placeholder="Day"
                  options={dropdownDays}
                  value={ringFreeDay}
                  onSelect={(value) => {
                    setRingFreeDay(value)
                    setValue(value)}} />
              </>
            )
          }
    
          return null
        }


  return (
    <PaperProvider>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BackgroundGradient/>
        <MsTitle titleName={"Hormonal Contraceptive Cycle status"} />

        <View style={styles.space} />
        
        {/*Need to add bold to spesific words */}
        <Text style={styles.text}>The <Text style={styles.bold}>ring is inserted for 21 days</Text>, followed by <Text style={styles.bold}>a ring-free week</Text> before inserting a new ring.</Text>

        <View style={styles.space} />

        <Text style={styles.text}>The <Text style={styles.bold}>first day of a new ring cycle</Text> is the day a new ring is inserted after the <Text style={styles.bold}>ring-free break.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.text}><Text style={styles.bold}>Withdrawal bleeding</Text> usually occurs <Text style={styles.bold}>during the ring-free week.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.bold}>Are you currently using a vaginal ring?</Text>

        <View style={styles.space} />

        <CheckboxButton
        value = 'yes'
        selected = {selected}
        onPress={() => {
          setSelected('yes')
          setValue(undefined)
          contraceptiveType.current = "ringDays"
        }}
        description = 'Yes'
      />

      <CheckboxButton
        value = 'no'
        selected = {selected}
        onPress={() => {
          setSelected('no')
          setValue(undefined)
          contraceptiveType.current = "ringFreeDays"
        }}
        description = 'no (ring-free week)'
      />

    {/* Drop down still showing in weird palces and overlap*/}

    <Conditional />

    <ValidationFooter
        prevPage="HcCycleSymptomsScreens/SelectHomonalContreceptive"
        nextPage="HcCycleSymptomsScreens/multipleQuestionsBeginning"
        value={value}
        symptomName={contraceptiveType.current}
      />
    

    
    </ScrollView>
    </PaperProvider>
    
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

export default vaginalRingSection
// Copy paste this for slides 43-44