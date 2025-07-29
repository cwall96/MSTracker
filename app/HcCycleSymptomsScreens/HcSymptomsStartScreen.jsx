import Screen from 'components/GenericSymptomsStartScreen';
import FirstPageFooter from 'components/FirstPageFooter';

const HcSymptomsStartScreen = () => {
  return (
    <>
      <Screen symptomType="Hormonal Contraceptive Cycle" />

      <FirstPageFooter nextPage="HcCycleSymptomsScreens/SelectHomonalContreceptive" />
    </>
  );
};

export default HcSymptomsStartScreen;
