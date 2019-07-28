/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () => createSelector(selectGlobal, globalState => globalState.currentUser );

const makeSelectLoading = () => createSelector(selectGlobal, globalState => globalState.loading );

const makeSelectError = () => createSelector(selectGlobal, globalState => globalState.error );

const makeSelectRepos = () => createSelector(selectGlobal, globalState => globalState.userData.repositories);

const makeSelectLocation = () => createSelector( selectRouter, routerState => routerState.location );



const makeSelectCurrentSchema =   () => createSelector(selectGlobal, globalState => globalState.currentSchema );
const makeSelectSchemasLoading =   () => createSelector(selectGlobal, globalState => globalState.schemaData.loading );
const makeSelectSchemas =         () => createSelector(selectGlobal, globalState => globalState.schemaData.schemas);
const makeSelectSchemasLocation = () => createSelector(selectRouter, routerState => routerState.schemaData.location );


export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  // schema  => state.schema.* ?
  makeSelectCurrentSchema,
  makeSelectSchemasLoading,
  makeSelectSchemas,
  makeSelectSchemasLocation,
};
