import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DizzinessScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Dizziness / light headedness / reduced coordination" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="4/19" 
      prevPage="MenstrualSymptomsScreens/ConstipationScreen"
      nextPage="MenstrualSymptomsScreens/ConcentrationScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualDizziness"
      />

    </>
  );6
};

export default DizzinessScreen;


