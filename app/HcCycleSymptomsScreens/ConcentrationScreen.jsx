import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const ConcentrationScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Poor concentration / memory" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="5/19" 
      prevPage="HcCycleSymptomsScreens/DizzinessScreen"
      nextPage="HcCycleSymptomsScreens/JointPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalConcentration"/>

    </>
  );
};

export default ConcentrationScreen;


