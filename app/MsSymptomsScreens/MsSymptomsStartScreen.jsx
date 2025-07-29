import Screen from 'components/GenericSymptomsStartScreen';
import FirstPageFooter from 'components/FirstPageFooter';

const MsSymptomsStartScreen = () => {
  return (
    <>
      <Screen symptomType="MS" />

      <FirstPageFooter nextPage="MsSymptomsScreens/WalkingMobilityScreen" />
    </>
  );
};

export default MsSymptomsStartScreen;
