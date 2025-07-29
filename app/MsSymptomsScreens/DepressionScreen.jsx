import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const DepressionScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="11. Depression"
        subDescription="Depressed thoughts, low mood"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/CognitiveFunctionScreen"
        nextPage="MsSymptomsScreens/AnxietyScreen"
        number="11/13"
        value={selected}
        symptomName="msDepression" 
      />
    </>
  );
};

export default DepressionScreen;
