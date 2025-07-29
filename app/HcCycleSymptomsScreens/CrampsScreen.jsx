import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const CrampsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Period cramps / pain & pelvic / uterine / ovarian pain" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="14/19" 
      prevPage="HcCycleSymptomsScreens/BloatingScreen"
      nextPage="HcCycleSymptomsScreens/TirednessScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalCramps"/>

    </>
  );
};

export default CrampsScreen;







