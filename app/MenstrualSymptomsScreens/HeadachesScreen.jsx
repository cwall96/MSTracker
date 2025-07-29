import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const HeadachesScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Headaches / Migraines" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="10/19" 
      prevPage="MenstrualSymptomsScreens/DiarrhoeaScreen"
      nextPage="MenstrualSymptomsScreens/BackPainScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualHeadaches"
      />

    </>
  );6
};

export default HeadachesScreen;







