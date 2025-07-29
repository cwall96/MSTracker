import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const CrampsScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Period cramps / pain & pelvic / uterine / ovarian pain" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="14/19" 
      prevPage="MenstrualSymptomsScreens/BloatingScreen"
      nextPage="MenstrualSymptomsScreens/TirednessScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualCramps"
      />

    </>
  );6
};

export default CrampsScreen;











