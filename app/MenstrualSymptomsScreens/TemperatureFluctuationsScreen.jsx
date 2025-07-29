import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const TemperatureFluctuationsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Temperature fluctuations" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="7/19" 
      prevPage="MenstrualSymptomsScreens/JointPainScreen"
      nextPage="MenstrualSymptomsScreens/DisturbedSleepScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualTemperature"
      />

    </>
  );6
};

export default TemperatureFluctuationsScreen;





