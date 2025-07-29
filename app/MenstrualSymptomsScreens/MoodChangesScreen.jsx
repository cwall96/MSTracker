import Footer from 'components/ValidationCheckboxFooter';
import MenstrualScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const MoodChangesScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <MenstrualScreenCheckboxes 
      Symptom="Mood changes / irritability / anxiety" 
      Title="Menstrual Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="18/19" 
      prevPage="MenstrualSymptomsScreens/CravingsScreen"
      nextPage="MenstrualSymptomsScreens/SymptomsEndScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="menstrualMoodChanges"
      />

    </>
  );6
};

export default MoodChangesScreen;















