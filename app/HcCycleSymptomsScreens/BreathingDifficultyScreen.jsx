import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import Footer from 'components/ValidationFirstPageFooter';
import React, { useState } from 'react';


const BreathingDifficultyScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Changes to / difficulties in breathing" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="1/19" 
      nextPage="HcCycleSymptomsScreens/NauseaScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalBreathing"/>

    </>
  );
};

export default BreathingDifficultyScreen;
