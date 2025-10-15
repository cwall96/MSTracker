import { View, Text, StyleSheet, Button, Pressable, ScrollView } from 'react-native'
import React, { useState, useRef } from 'react';
import MsTitle from 'components/MsTitle';
import CheckboxButton from 'components/CheckboxButton';
import Footer from 'components/FirstPageFooter';
import {Link,router} from "expo-router";
import BackgroundGradient from 'components/BackgroundGradient';
import {updatedbMisc} from 'components/BackendEssentials';
import { getAuth } from 'firebase/auth';


const SelectHomonalContreceptive = () => {
    const [selected, setSelected] = useState(null);
    const [route, setRoute] = useState("HcCycleSymptomsScreens/SelectHomonalContreceptive")

    const auth = getAuth();
    const user = auth.currentUser;      

    const contraceptiveMethod = useRef(null)

    function page(value) {
      setSelected(value)

      let createRoute = ""

      switch(value) {
        case '1':
          
          createRoute = "HcCycleSymptomsScreens/OCPSection"
          
          contraceptiveMethod.current = "OCP"
          break;

        case '2':
          
          createRoute = "HcCycleSymptomsScreens/contraceptivePatchSection"
          
          contraceptiveMethod.current = "Patch"
          break

        case '3':
          
          createRoute = "HcCycleSymptomsScreens/vaginalRingSection"
          
          contraceptiveMethod.current = "Ring"
          break

        case '4':
          
          createRoute = "HcCycleSymptomsScreens/ContraceptiveInjectionSection"
          
          contraceptiveMethod.current = "Injection"
          break

        case '5':
          
          createRoute = "HcCycleSymptomsScreens/contraceptiveImplantSection"
          
          contraceptiveMethod.current = "Implant"
          break

        case '6':
          
          createRoute = "HcCycleSymptomsScreens/IUDSection"
          
          contraceptiveMethod.current = "IUD"
          break
      }

      setRoute(createRoute)

    }
    





    const contraceptiveBoxes = [
        {
          id: '1',
          description: 'Oral contraceptive pill (OCP) (combined or progestogen-only)',
        },
        {
          id: '2',
          description: 'Contraceptive patch',
        },
        {
          id: '3',
          description: 'Vaginal ring',
        },
        {
          id: '4',
          description: 'Contraceptive injection',
        },
        {
          id: '5',
          description: 'Contraceptive implant',
        },
        {
          id: '6',
          description: 'Hormonal intrauterine device (IUD)',
        },
      ];
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <BackgroundGradient/>
      <MsTitle titleName={"Hormonal Contraceptive Cycle status"} />

      <View style={styles.space} />

      <Text style={styles.text}>Which hormonal contraceptive method are you currently using?</Text>

      <View style={styles.space} />

      {contraceptiveBoxes.map((item) => (
        <CheckboxButton
        key={item.id}
        value={item.id}
        selected={selected}
        description={item.description}
        onPress={() => page(item.id)}
        />
      ))}
      
 
      <Footer
      nextPage= {route}
      nameKey = "contraceptiveMethod"
      value = {contraceptiveMethod.current}
      />


    </ScrollView>
    
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  text: {
    fontWeight: 'bold',
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
});

export default SelectHomonalContreceptive