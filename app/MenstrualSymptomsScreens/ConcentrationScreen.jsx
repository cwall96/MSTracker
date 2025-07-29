import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const ConcentrationScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Poor concentration / memory" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="5/19" 
      prevPage="MenstrualSymptomsScreens/DizzinessScreen"
      nextPage="MenstrualSymptomsScreens/JointPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualConcentration"
      />

    </>
  );6
};

export default ConcentrationScreen;



