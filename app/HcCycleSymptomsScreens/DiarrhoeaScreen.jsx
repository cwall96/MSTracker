import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DiarrhoeaScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Diarrhoea" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="9/19" 
      prevPage="HcCycleSymptomsScreens/DisturbedSleepScreen"
      nextPage="HcCycleSymptomsScreens/HeadachesScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalDiarrhoea"/>

    </>
  );
};

export default DiarrhoeaScreen;


