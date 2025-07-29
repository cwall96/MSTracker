import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BreastPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Breast pain / tenderness" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="16/19" 
      prevPage="MenstrualSymptomsScreens/TirednessScreen"
      nextPage="MenstrualSymptomsScreens/CravingsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualBreastpain"
      />

    </>
  );6
};

export default BreastPainScreen;













