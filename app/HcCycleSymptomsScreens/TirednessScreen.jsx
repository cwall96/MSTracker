import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const TirednessScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Tiredness / Fatigue" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="15/19" 
      prevPage="HcCycleSymptomsScreens/CrampsScreen"
      nextPage="HcCycleSymptomsScreens/BreastPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalTiredness"/>

    </>
  );
};

export default TirednessScreen;








