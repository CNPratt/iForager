import FinderDisplay from "../../finder-display/components/FinderDisplay";
import { idObject } from "../../shared/data/idObject";

const BerriesFinderScreen = (props) => {
  return <FinderDisplay ids={idObject.berries.ids} />;
};

export default BerriesFinderScreen;
