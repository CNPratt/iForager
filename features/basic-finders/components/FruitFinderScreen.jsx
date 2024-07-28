import FinderDisplay from "../../finder-display/components/FinderDisplay";
import { idObject } from "../../shared/data/idObject";

const FruitFinderScreen = (props) => {
  return <FinderDisplay ids={idObject.fruit.ids} />;
};

export default FruitFinderScreen;
