import Screen from 'components/GenericSymptomsStartScreen';
import FirstPageFooter from 'components/FirstPageFooter';

const SymptomsStartScreen = () => {
  return (
    <>
      <Screen symptomType="Menstrual Cycle" />

      <FirstPageFooter nextPage="MenstrualSymptomsScreens/CycleStatus" />
    </>
  );
};

export default SymptomsStartScreen;
