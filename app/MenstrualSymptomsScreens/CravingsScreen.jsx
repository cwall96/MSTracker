import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const CravingsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Cravings / change in appetite" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="17/19" 
      prevPage="MenstrualSymptomsScreens/BreastPainScreen"
      nextPage="MenstrualSymptomsScreens/MoodChangesScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualCravings"
      />

    </>
  );6
};

export default CravingsScreen;














