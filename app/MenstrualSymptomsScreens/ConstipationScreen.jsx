import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const ConstipationScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Constipation" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="3/19" 
      prevPage="MenstrualSymptomsScreens/NauseaScreen"
      nextPage="MenstrualSymptomsScreens/DizzinessScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualConstipation"
      />

    </>
  );6
};

export default ConstipationScreen;

