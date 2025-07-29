import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const WaterRetentionScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Water retention" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="12/19" 
      prevPage="HcCycleSymptomsScreens/BackPainScreen"
      nextPage="HcCycleSymptomsScreens/BloatingScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalWaterRetention"/>

    </>
  )
};

export default WaterRetentionScreen;





