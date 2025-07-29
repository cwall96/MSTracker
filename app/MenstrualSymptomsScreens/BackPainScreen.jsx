import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const BackPainScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Lower back pain" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="11/19" 
      prevPage="MenstrualSymptomsScreens/HeadachesScreen"
      nextPage="MenstrualSymptomsScreens/WaterRetentionScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualBackpain"
      />

    </>
  );6
};

export default BackPainScreen;








