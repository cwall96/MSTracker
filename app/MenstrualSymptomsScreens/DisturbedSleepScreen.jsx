import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DisturbedSleepScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Disturbed sleep" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="8/19" 
      prevPage="MenstrualSymptomsScreens/TemperatureFluctuationsScreen"
      nextPage="MenstrualSymptomsScreens/DiarrhoeaScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualSleep"
      />

    </>
  );6
};

export default DisturbedSleepScreen;






