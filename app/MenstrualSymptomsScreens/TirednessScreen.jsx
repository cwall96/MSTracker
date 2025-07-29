import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const TirednessScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Tiredness / Fatigue" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="15/19" 
      prevPage="MenstrualSymptomsScreens/CrampsScreen"
      nextPage="MenstrualSymptomsScreens/BreastPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualTiredness"
      />

    </>
  );6
};

export default TirednessScreen;












