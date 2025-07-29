import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DisturbedSleepScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Disturbed sleep" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="8/19" 
      prevPage="HcCycleSymptomsScreens/TemperatureFluctuationsScreen"
      nextPage="HcCycleSymptomsScreens/DiarrhoeaScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalSleep"/>

    </>
  );
};

export default DisturbedSleepScreen;

