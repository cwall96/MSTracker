import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const NauseaScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Nausea, sickness & vomiting" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="2/19" 
      prevPage="MenstrualSymptomsScreens/BreathingDifficultyScreen"
      nextPage="MenstrualSymptomsScreens/ConstipationScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualNausea"
      />

    </>
  );6
};

export default NauseaScreen;
