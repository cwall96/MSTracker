import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const HeadachesScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Headaches / Migraines" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="10/19" 
      prevPage="HcCycleSymptomsScreens/DiarrhoeaScreen"
      nextPage="HcCycleSymptomsScreens/BackPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalHeadaches"/>

    </>
  );
};

export default HeadachesScreen;



