import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import Footer from 'components/ValidationFirstPageFooter';
import React, { useState } from 'react';

const BreathingDifficultyScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>
      
      <MenstrualScreenCheckboxes 
      Symptom="Changes to / difficulties in breathing" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="1/19" 
      nextPage="MenstrualSymptomsScreens/NauseaScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualBreathing"
      />


    </>
  );
};

export default BreathingDifficultyScreen;