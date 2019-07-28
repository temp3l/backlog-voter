import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedNumber } from 'react-intl';
import { makeSelectCurrentUser, makeSelectSchemas } from 'containers/App/selectors';

import ListItem from 'components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import SchemaLink from './SchemaLink';
import Wrapper from './Wrapper';

export function SchemaListItem(props) {
  const { item } = props;
  const content = (
    <Wrapper>
    
      <SchemaLink href={item.id} target="_blank">

        {item.collectionName}
        {item.title}
        {item.description}

      </SchemaLink>
      <IssueLink href={`${item.$id}/issues`} target="_blank">
        <IssueIcon />
      </IssueLink>
    </Wrapper>
  );
  // <FormattedNumber value={item.open_issues_count} />
  // Render the content into a list item
  // ${item.full_name}
  return <ListItem key="repo-list-item-" item={content} />;
}

SchemaListItem.propTypes = {
  item: PropTypes.object,
};

export default connect(
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    schemas: makeSelectSchemas()
  }),
)(SchemaListItem);
