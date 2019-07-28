import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError, makeSelectSchemas } from 'containers/App/selectors';
import H2 from 'components/H2';
import SchemasList from 'components/SchemasList';

import AtPrefix from '../HomePage/AtPrefix';
import CenteredSection from '../HomePage/CenteredSection';
// import Section from './Section';
import Section from '../HomePage/Section';
import Form from './Form';
import Input from './Input';


import messages from './messages';
import { loadSchemas } from '../App/actions'; 
import { changeSchemaName } from './actions';
import { makeSelectSchemaName } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'schema';

export function SchemaPage(props) {
  const { schemaName, loading, error, schemas, onSubmitForm, onChangeSchemaName, } = props
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    onSubmitForm();
  }, []);

  const schemasListProps = { loading, error, schemas };

  // console.log({ schemaName, loading, error, schemas, onSubmitForm, onChangeSchemaName, });

  return (
    <article>
      <Helmet>
        <title>SchemaPage</title>
        <meta name="description" content="SchemaPage"/>
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.trymeHeader} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="schemaName">
              <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix>
              <Input
                id="schemaName"
                type="text"
                placeholder="mxstbr"
                value={schemaName}
                onChange={onChangeSchemaName}
              />
            </label>
          </Form>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {schemas.map( (schema,idx) => {
                const {title, description, $id, collectionName} = schema;
                return (
                  <tr key={idx}>
                    <td>{collectionName}</td>
                    <td>{title}</td>
                    <td>{description}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </Section>
      </div>
    </article>
  );
}
// <SchemasList {...schemasListProps} />
// <pre>{JSON.stringify(props, null,3)}</pre>


SchemaPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  schemas: PropTypes.any,
  onSubmitForm: PropTypes.func,
  schemaName: PropTypes.string,
  onChangeSchemaName: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  schemas: makeSelectSchemas(),
  schemaName: makeSelectSchemaName(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSchemaName: evt => {
      dispatch(changeSchemaName(evt.target.value))
    },
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadSchemas());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SchemaPage);
