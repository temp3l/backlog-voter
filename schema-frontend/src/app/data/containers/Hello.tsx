import { connect } from "react-redux";
import { Dispatch } from "redux";
import Hello from "../../components/Hello/Hello";
import * as actions from "../actions/";
import { IStoreState } from "../types/index";
// https://github.com/Microsoft/TypeScript-React-Starter
/*
	The real two key pieces here are the original Hello component as well as the connect function from react-redux.
	connect will be able to actually take our original Hello component and turn it into a container using two functions:
	* mapStateToProps which massages the data from the current store to part of the shape that our component needs.
	* mapDispatchToProps which creates callback props to pump actions to our store using a given dispatch function.
	* 
 */

// Note that mapStateToProps only creates 2 out of 4 of the properties a Hello component expects.
// Namely, we still want to pass in the onIncrement and onDecrement callbacks.

export function mapStateToProps({
  enthusiasmLevel,
  languageName
}: IStoreState) {
  return {
    enthusiasmLevel,
    name: languageName
  };
}

// mapDispatchToProps is a function that takes a dispatcher function.
// This dispatcher function can pass actions into our store to make updates, so we can create a pair of callbacks that will call the dispatcher as necessary.

export function mapDispatchToProps(
  dispatch: Dispatch<actions.EnthusiasmAction>
) {
  return {
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    onIncrement: () => dispatch(actions.incrementEnthusiasm())
  };
}

/*
	Finally, we're ready to call connect. 
	connect will first take mapStateToProps and mapDispatchToProps,
	and then return another function that we can use to wrap our component. 
	Our resulting container is defined with the following line of code:
*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello);
