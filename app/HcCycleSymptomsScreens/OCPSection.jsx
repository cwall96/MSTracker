
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native'
import React, { useState, useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import {Dropdown} from 'react-native-paper-dropdown';
import { Provider as PaperProvider } from 'react-native-paper';
import ValidationFooter from 'components/ValidationFooter';
import BackgroundGradient from 'components/BackgroundGradient';




const OCPSection = () => {
    //for dropdown
    const [consumptionDay , setconsumptionDay] = useState(null);
    const [withdrawalDay, setwithdrawalDay] = useState(null);
    const [selected, setSelected] = useState(null);
    const [route, setRoute] = useState("HcCycleSymptomsScreens/OCPSection")
    const [value, setValue] = useState(undefined)

    const pillType = useRef(undefined)

    const dropdownDays = []
    for(let i = 1; i < 51; i++) {
      dropdownDays.push({label:`${i}`,value:`${i}`})
    } 

    const Conditional = () => {
      if (selected === "yes") {
        return (
          <><Text style={styles.bold}>What day of your active pill pack are you on?</Text><View/>

            <View style={styles.space}/>

            <Dropdown
              placeholder="Day"
              options={dropdownDays}
              value={consumptionDay}
              onSelect={(value) => {
                setconsumptionDay(value);
                setValue(value)
              }
              } />
          </>
        )
      }
      else if (selected === "no") {
        return (
          <><Text style={styles.bold}>What day of your pill withdrawal are you on? </Text><View/>

            <View style={styles.space}/>
          
            <Dropdown
              placeholder="Day"
              options={dropdownDays}
              value={withdrawalDay}
              onSelect={(value) => {
                setwithdrawalDay(value);
                setValue(value)
              }
              } />
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
        
        <View style={styles.space}/>

        <Text style={styles.text}>Most <Text style={styles.bold}>combined pills</Text> follow a <Text style={styles.bold}>21/7 cycle</Text> (21 active, 7 placebo/inactive or pill-free days), while some have <Text style={styles.bold}>24/4</Text>
        For <Text style={styles.bold}>extended use</Text> (continuous pill-taking). <Text style={styles.bold}>Progestogen-only pills</Text> (POP or mini-pill) are taken <Text style={styles.bold}>daily without breaks.</Text> </Text>

        <View style={styles.space}/>

        <Text style={styles.text}>For <Text style={styles.bold}>combined pills, day 1</Text> is the <Text style={styles.bold}>first day of active pill-taking</Text> in a new pack.
        For <Text style={styles.bold}>progestogen-only pills</Text>, there is <Text style={styles.bold}>no cycle break</Text>, so day 1 is the <Text style={styles.bold}>first day after starting a new pack.</Text> </Text>

        <View style={styles.space}/>

        <Text style={styles.text}>For <Text style={styles.bold}>combined pills</Text>, a <Text style={styles.bold}>withdrawal bleed</Text> usually occurs <Text style={styles.bold}>during the placebo or pill-free days</Text>. 
        For <Text style={styles.bold}>progestogen-only pills, bleeding patterns vary</Text>, with some users having <Text style={styles.bold}>irregular spotting</Text> or no bleeding at all.</Text>

        <View style={styles.space}/>
        
        <Text style={styles.bold}>Are you currently on an active pill-taking day?</Text>

        <View style={styles.space}/>

        <CheckboxButton
        value = 'yes'
        selected = {selected}
        onPress={() => {
          setSelected('yes')
          setValue(undefined)
          pillType.current = "ocpActiveDay"
        }}
        description = 'Yes'
      />

      <CheckboxButton
        value = 'no'
        selected = {selected}
        onPress={() => {
          setSelected('no')
          setValue(undefined)
          pillType.current="ocpWithdrawalDay"
        }}
        description = 'no (inactive/placebo or pill-free break)'
      />

    <Conditional />


    
    <ValidationFooter
        prevPage="HcCycleSymptomsScreens/SelectHomonalContreceptive"
        nextPage="HcCycleSymptomsScreens/multipleQuestionsBeginning"
        value={value}
        symptomName={pillType.current}
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
      textAlign: 'center',
    }
  });

export default OCPSection
// Copy paste this for slides 43-44