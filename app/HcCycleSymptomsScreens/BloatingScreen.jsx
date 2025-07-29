import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BloatingScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Bloating / Increased gas" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="13/19" 
      prevPage="HcCycleSymptomsScreens/WaterRetentionScreen"
      nextPage="HcCycleSymptomsScreens/CrampsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalBloating"/>

    </>
  );
};

export default BloatingScreen;






