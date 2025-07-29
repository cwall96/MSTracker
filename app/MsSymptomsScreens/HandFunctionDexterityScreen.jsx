import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const HandFunctionDexterityScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="2. Hand function / Dexterity"
        subDescription="Hand coordination, hand tremors"
        selected={selected}
        setSelected={setSelected}
      />

      <NormalFooter
        prevPage="MsSymptomsScreens/WalkingMobilityScreen"
        nextPage="MsSymptomsScreens/SpasticityStiffnessScreen"
        number="2/13"
        value={selected}
        symptomName="msHandFunctionDexterity" 
      />
    </>
  );
};

export default HandFunctionDexterityScreen;
