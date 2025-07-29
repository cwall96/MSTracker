import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const FaitgueScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes 
        name="7. Fatigue"
        selected={selected}
        setSelected={setSelected} />

      <NormalFooter
        prevPage="MsSymptomsScreens/BladderControlScreen"
        nextPage="MsSymptomsScreens/VisionScreen"
        number="7/13"
        value={selected}
        symptomName="msFaitgue" 
      />
    </>
  );
};

export default FaitgueScreen;
