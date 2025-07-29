import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const DiarrhoeaScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Diarrhoea" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="9/19" 
      prevPage="MenstrualSymptomsScreens/DisturbedSleepScreen"
      nextPage="MenstrualSymptomsScreens/HeadachesScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualDiarrhoea"
      />

    </>
  );6
};

export default DiarrhoeaScreen;







