import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/todo/';

export default [
  <Route path="/todos/create" component={Create} exact key="create" />,
  <Route path="/todos/edit/:id" component={Update} exact key="update" />,
  <Route path="/todos/show/:id" component={Show} exact key="show" />,
  <Route path="/todos/" component={List} exact strict key="list" />,
  <Route path="/todos/:page" component={List} exact strict key="page" />
];
