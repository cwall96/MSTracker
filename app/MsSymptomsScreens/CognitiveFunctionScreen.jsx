import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const CognitiveFunctionScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="10. Cognitive function"
        subDescription="Memory, concentration problems"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/DizzinessScreen"
        nextPage="MsSymptomsScreens/DepressionScreen"
        number="10/13"
        value={selected}
        symptomName="msCognitiveFunction" 
      />
    </>
  );
};

export default CognitiveFunctionScreen;
