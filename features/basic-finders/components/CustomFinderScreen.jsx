import FinderDisplay from "../../finder-display/components/FinderDisplay";

const CustomFinderScreen = (props) => {
  const { ids } = props.route.params;

  return <FinderDisplay ids={ids} />;
};

export default CustomFinderScreen;
