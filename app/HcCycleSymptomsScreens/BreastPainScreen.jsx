import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BreastPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Breast pain / tenderness" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="16/19" 
      prevPage="HcCycleSymptomsScreens/TirednessScreen"
      nextPage="HcCycleSymptomsScreens/CravingsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalBreastpain"/>

    </>
  );
};

export default BreastPainScreen;









