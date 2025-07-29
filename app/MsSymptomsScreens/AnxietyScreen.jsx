import DefaultScreenCheckboxes from 'components/DefaultScreenCheckboxes';
import NormalFooter from 'components/ValidationFooter';
import React, { useState } from 'react';

const AnxietyScreen = () => {
  const [selected, setSelected] = useState(undefined);
  
  return (
    <>
      <DefaultScreenCheckboxes
        name="12. Anxiety"
        subDescription="Feelings of stress; panic attacks"
        selected={selected}
        setSelected={setSelected}
      />
      <NormalFooter
        prevPage="MsSymptomsScreens/DepressionScreen"
        nextPage="MsSymptomsScreens/FeedbackScreen"
        number="12/13"
        value={selected}
        symptomName="msAnxiety" 
      />
    </>
  );
};

export default AnxietyScreen;
