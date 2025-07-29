import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const TemperatureFluctuationsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Temperature fluctuations" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="7/19" 
      prevPage="HcCycleSymptomsScreens/JointPainScreen"
      nextPage="HcCycleSymptomsScreens/DisturbedSleepScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalTemperature"/>

    </>
  );
};

export default TemperatureFluctuationsScreen;




