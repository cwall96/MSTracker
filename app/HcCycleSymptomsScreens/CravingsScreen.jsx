import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const CravingsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Cravings / change in appetite" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="17/19" 
      prevPage="HcCycleSymptomsScreens/BreastPainScreen"
      nextPage="HcCycleSymptomsScreens/MoodChangesScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalCravings"/>

    </>
  );
};

export default CravingsScreen;










