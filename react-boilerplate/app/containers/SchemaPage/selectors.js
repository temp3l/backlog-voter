/**
 * Schemapage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSchema = state => state.schema || initialState;

const makeSelectSchemaName = () =>
  createSelector(selectSchema, schemaState => schemaState.schemaName, );

export { selectSchema, makeSelectSchemaName };
