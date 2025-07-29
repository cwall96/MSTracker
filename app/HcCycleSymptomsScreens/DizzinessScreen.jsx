import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DizzinessScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Dizziness / light headedness / reduced co-ordination" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="4/19" 
      prevPage="HcCycleSymptomsScreens/ConstipationScreen"
      nextPage="HcCycleSymptomsScreens/ConcentrationScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalDizziness"/>

    </>
  );
};

export default DizzinessScreen;

