import FinderDisplay from "../../finder-display/components/FinderDisplay";
import { idObject } from "../../shared/data/idObject";

const AlliumsFinderScreen = (props) => {
  return <FinderDisplay ids={idObject.alliums.ids} />;
};

export default AlliumsFinderScreen;
