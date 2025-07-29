import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const VisionScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="9. Dizziness"
        subDescription="Feeling off balance, ‘spinning’ / vertigo"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/VisionScreen"
        nextPage="MsSymptomsScreens/CognitiveFunctionScreen"
        number="9/13"
        value={selected}
        symptomName="msVision" 
      />
    </>
  );
};

export default VisionScreen;
