import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const JointPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Joint pain / muscle aches & cramps" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="6/19" 
      prevPage="HcCycleSymptomsScreens/ConcentrationScreen"
      nextPage="HcCycleSymptomsScreens/TemperatureFluctuationsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalJointPain"/>

    </>
  );
};

export default JointPainScreen;



