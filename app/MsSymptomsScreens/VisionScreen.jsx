import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const VisionScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes 
        name="8. Vision" 
        subDescription="Blurry vision, double vision"
        selected={selected}
        setSelected={setSelected} />

      <NormalFooter
        prevPage="MsSymptomsScreens/FatigueScreen"
        nextPage="MsSymptomsScreens/DizzinessScreen"
        number="8/13"
        value={selected}
        symptomName="msVision" 
      />
    </>
  );
};

export default VisionScreen;
