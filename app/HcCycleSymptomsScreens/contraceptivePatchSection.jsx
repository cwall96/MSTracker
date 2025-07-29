import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState,useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import {Dropdown} from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import ValidationFooter from 'components/ValidationFooter';
import BackgroundGradient from 'components/BackgroundGradient';



const contraceptivePatchSection = () => {
    //for dropdown
    const [patchCycleWeek , setpatchCycleWeek] = useState(null);
    const [patchFreeDay, setpatchFreeDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [value, setValue] = useState(undefined)
    const patchType = useRef(null)

    const dropdownDays = []
    for(let i = 1; i < 8; i++) {
      dropdownDays.push({label:`${i}`,value:`${i}`})
    } 

    const Conditional = () => {
      if (selected === "yes") {
        return (
          <><Text style={styles.bold}>What week of your patch cycle are you in?</Text>
            <View style={styles.space} />
            <Dropdown
              placeholder="Week"
              options={dropdownDays}
              value={patchCycleWeek}
              onSelect={(value) => {
                setpatchCycleWeek(value)
                setValue(value)
                patchType.current = "patchWeek"}
              }/>
                 
              </>
        )
      }
      else if (selected === "no") {
        return (
          <><Text style={styles.bold}>What day of your patch-free week are you on? </Text>
            <View style={styles.space} />
          
            <Dropdown
              placeholder="Day"
              options={dropdownDays}
              value={patchFreeDay}
              onSelect={(value) => {
                setpatchFreeDay(value)
                setValue(value)
                patchType.current = "patchFreeWeek"}
                }/>
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
        <Text style={styles.text}>The <Text style={styles.bold}>patch is worn for three consecutive weeks</Text>, with a <Text style={styles.bold}>patch-free fourth week</Text> when <Text style={styles.bold}>withdrawal bleeding may occur.</Text></Text>

        <View style={styles.space} />

        <Text style={styles.text}>The <Text style={styles.bold}>first day of a new patch cycle</Text> is the day a new patch is applied after the patch-free week.</Text>
        
        <View style={styles.space} />

        <Text style={styles.bold}>Are you currently wearing a contraceptive patch?</Text>

        <View style={styles.space} />


        <CheckboxButton
        value = 'yes'
        selected = {selected}
        onPress={() => {
          setSelected('yes')
          setValue(undefined)
        }}
        description = 'Yes'
      />

      <CheckboxButton
        value = 'no'
        selected = {selected}
        onPress={() => {
          setSelected('no')
          setValue(undefined)
        }}
        description = 'no (Patch-free week)'
      />

    {/* Drop down still showing in weird palces and overlap*/}
    {/* Need to add conditional logic to detirmine which dropdown is shown */}

    <Conditional />

    <ValidationFooter
        prevPage="HcCycleSymptomsScreens/SelectHomonalContreceptive"
        nextPage="HcCycleSymptomsScreens/multipleQuestionsBeginning"
        value={value}
        symptomName={patchType.current}
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

export default contraceptivePatchSection
// Copy paste this for slides 43-44