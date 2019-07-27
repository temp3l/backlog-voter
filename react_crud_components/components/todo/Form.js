import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  renderField = data => {
    data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      <div className={`form-group`}>
        <label
          htmlFor={`todo_${data.input.name}`}
          className="form-control-label"
        >
          {data.input.name}
        </label>
        <input
          {...data.input}
          type={data.type}
          step={data.step}
          required={data.required}
          placeholder={data.placeholder}
          id={`todo_${data.input.name}`}
        />
        {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
      </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <Field
          component={this.renderField}
          name="create_date"
          type="text"
          placeholder="The todo creation date"
          required={true}
        />
        <Field
          component={this.renderField}
          name="done_date"
          type="text"
          placeholder="The todo resolution date"
        />
        <Field
          component={this.renderField}
          name="id"
          type="text"
          placeholder="The todo identifier"
          required={true}
        />
        <Field
          component={this.renderField}
          name="status"
          type="text"
          placeholder="The todo state"
          required={true}
        />
        <Field
          component={this.renderField}
          name="title"
          type="text"
          placeholder="The todo title"
          required={true}
        />

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'todo',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
