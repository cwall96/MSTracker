import Footer from 'components/ValidationCheckboxFooter';
import HormonalScreenCheckboxes from 'components/ScreenCheckboxes';
import React, { useState } from 'react';

const MoodChangesScreen = () => {
  const [selectedA, setSelectedA] = useState(null);
  const [selectedB, setSelectedB] = useState(null);

  return (
    <>

      <HormonalScreenCheckboxes 
      Symptom="Mood changes / irritability / anxiety" 
      Title="Hormonal Contraceptive Cycle Symptoms"
      selectedA={selectedA}
      setSelectedA={setSelectedA}
      selectedB={selectedB}
      setSelectedB={setSelectedB}
      />

      <Footer number="18/19" 
      prevPage="HcCycleSymptomsScreens/CravingsScreen"
      nextPage="HcCycleSymptomsScreens/SymptomsEndScreen" 
      selectedA={selectedA}
      selectedB={selectedB}
      symptomName="hormonalMoodChanges"/>

    </>
  );
};

export default MoodChangesScreen;











