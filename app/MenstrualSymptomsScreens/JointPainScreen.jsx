import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const JointPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Joint pain / muscle aches & cramps" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="6/19" 
      prevPage="MenstrualSymptomsScreens/ConcentrationScreen"
      nextPage="MenstrualSymptomsScreens/TemperatureFluctuationsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualJointPain"
      />

    </>
  );6
};

export default JointPainScreen;




