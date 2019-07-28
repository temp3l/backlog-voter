/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *w
 */

import produce from 'immer';
import { 
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  // schema
  LOAD_SCHEMAS_SUCCESS,
  LOAD_SCHEMAS,
  LOAD_SCHEMAS_ERROR
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  schemaData: {
    loading: true,
    error: false,
    schemas: [],
    schemaName: null
  }
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        draft.userData.repositories = false;
        break;

      case LOAD_REPOS_SUCCESS:
        draft.userData.repositories = action.repos;
        draft.loading = false;
        draft.currentUser = action.username;
        break;

      case LOAD_REPOS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;



      case LOAD_SCHEMAS:
        draft.schemaData.loading = true;
        draft.schemaData.error = false;
        draft.schemaData.schemas = [];
        break;

      case LOAD_SCHEMAS_SUCCESS:
        draft.schemaData.schemas = action.schemas;
        draft.schemaData.loading = false;
        draft.schemaData.currentSchema = action.schemaName;
        break;

      case LOAD_SCHEMAS_ERROR:
        draft.schemaData.error = action.error;
        draft.schemaData.loading = false;
        break;
    }
  });

export default appReducer;
