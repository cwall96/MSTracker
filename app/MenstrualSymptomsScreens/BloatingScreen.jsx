import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BloatingScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Bloating / Increased gas" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="13/19" 
      prevPage="MenstrualSymptomsScreens/WaterRetentionScreen"
      nextPage="MenstrualSymptomsScreens/CrampsScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualBloating"
      />

    </>
  );6
};

export default BloatingScreen;










