import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const SpasticityStiffnessScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="3. Spasticity and stiffness"
        subDescription="Muscle cramping or muscle tightness"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/HandFunctionDexterityScreen"
        nextPage="MsSymptomsScreens/BodilyPainScreen"
        number="3/13"
        value={selected}
        symptomName="msSpasticityStiffness" 
      />
    </>
  );
};

export default SpasticityStiffnessScreen;
