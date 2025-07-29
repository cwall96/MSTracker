import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const BladderControlScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="6. Bladder control"
        subDescription="Urinary urgence, frequency, hesitancy"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/SensorySymptomsScreen"
        nextPage="MsSymptomsScreens/FatigueScreen"
        number="6/13"
        value={selected}
        symptomName="msBladder" 
      />
    </>
  );
};

export default BladderControlScreen;
