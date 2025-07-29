import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const ConstipationScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Constipation" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="3/19" 
      prevPage="HcCycleSymptomsScreens/NauseaScreen"
      nextPage="HcCycleSymptomsScreens/DizzinessScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalConstipation"/>

    </>
  );
};

export default ConstipationScreen;
