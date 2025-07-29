import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const BodilyPainScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="4. Bodily pain" 
        subDescription="Achiness, tenderness"
        selected={selected}
        setSelected={setSelected} />


      <NormalFooter
        prevPage="MsSymptomsScreens/SpasticityStiffnessScreen"
        nextPage="MsSymptomsScreens/SensorySymptomsScreen"
        number="4/13"
        value={selected}
        symptomName="msBodilyPain" 
      />
    </>
  );
};

export default BodilyPainScreen;
