import FinderDisplay from "../../finder-display/components/FinderDisplay";
import { idObject } from "../../shared/data/idObject";

const MushroomsFinderScreen = (props) => {
  return <FinderDisplay ids={idObject.mushrooms.ids} />;
};

export default MushroomsFinderScreen;
