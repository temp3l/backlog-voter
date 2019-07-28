/*
 * SchemaReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { CHANGE_SCHEMA_NAME } from './constants';

// The initial state of the App
export const initialState = {
  schemaName: '',
  schemas: [],
};

/* eslint-disable default-case, no-param-reassign */
const schemaReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SCHEMA_NAME:
        // respect collectionName
        draft.schemaName = action.schemaName;
        break;
    }
  });

export default schemaReducer;
