import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BackPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Lower back pain" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="11/19" 
      prevPage="HcCycleSymptomsScreens/HeadachesScreen"
      nextPage="HcCycleSymptomsScreens/WaterRetentionScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalBackpain"/>

    </>
  );
};

export default BackPainScreen;




