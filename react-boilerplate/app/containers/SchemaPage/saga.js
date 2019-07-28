import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_SCHEMAS } from 'containers/App/constants';
import { schemasLoaded, schemasLoadingError } from 'containers/App/actions';
import request from 'utils/request';
import { makeSelectSchemaName } from 'containers/SchemaPage/selectors';


export function* getSchemas() {
  // Select schemaName from store
  const schemaName = yield select(makeSelectSchemaName());
  const collectionSchema = `http://localhost:4000/api/collection-schemas/${schemaName}`;

  try {
    // Call our request helper (see 'utils/request')
    const itemSchemas = yield call(request, `http://localhost:4000/api/item-schemas/`);
    // const collectionSchemas = yield call(request, `http://localhost:4000/api/collection-schemas/${schemaName}`);
    yield put(schemasLoaded(itemSchemas));
  } catch (err) {
    yield put(schemasLoadingError(err));
  }
}

export default function* githubData() {
  // Watches for LOAD_SCHEMAS actions and calls getSchemas when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_SCHEMAS, getSchemas);
}
