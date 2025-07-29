import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const SensorySymptomsScreen = () => {
  const [selected, setSelected] = useState(undefined);

  return (
    <>
      <DefaultScreenCheckboxes
        name="5. Sensory symptoms"
        subDescription="Numbness, tingling, or burning"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/BodilyPainScreen"
        nextPage="MsSymptomsScreens/BladderControlScreen"
        number="5/13"
        value={selected}
        symptomName="msSensorySymptom" 
      />
    </>
  );
};

export default SensorySymptomsScreen;
