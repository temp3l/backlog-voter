import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import SchemaListItem from 'containers/SchemaListItem';

function SchemasList({ loading, error, schemas }) {
  console.log({loading, error, schemas})
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    );
    return <List component={ErrorComponent} />;
  }

  if (schemas !== false) {
    return <List items={schemas} component={SchemaListItem} />;
  }

  return null;
}

SchemasList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  schemas: PropTypes.any,
  // schemaName: PropTypes.any,
};

export default SchemasList;
