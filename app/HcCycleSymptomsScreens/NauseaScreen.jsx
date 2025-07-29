import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const NauseaScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Nausea, sickness & vomiting" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="2/19" 
      prevPage="HcCycleSymptomsScreens/BreathingDifficultyScreen"
      nextPage="HcCycleSymptomsScreens/ConstipationScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalNausea"/>

    </>
  );
};

export default NauseaScreen;
