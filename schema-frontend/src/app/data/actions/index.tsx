import * as constants from "../constants";
/*
	We've created two types that describe what increment actions and decrement actions should look like. 
	We also created a type (EnthusiasmAction) to describe cases where an action could be an increment or a decrement.
	Finally, we made two functions that actually manufacture the actions which we can use instead of writing out bulky object literals.
	There's clearly boilerplate here, so you should feel free to look into libraries like redux-actions once you've got the hang of things.
*/

export interface IDecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM;
}

export interface IIncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;

export function incrementEnthusiasm(): IIncrementEnthusiasm {
  return {
    type: constants.INCREMENT_ENTHUSIASM
  };
}

export function decrementEnthusiasm(): IDecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM
  };
}
