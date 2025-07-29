import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const WaterRetentionScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Water retention" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="12/19" 
      prevPage="MenstrualSymptomsScreens/BackPainScreen"
      nextPage="MenstrualSymptomsScreens/BloatingScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualWaterRetention"
      />

    </>
  );6
};

export default WaterRetentionScreen;









