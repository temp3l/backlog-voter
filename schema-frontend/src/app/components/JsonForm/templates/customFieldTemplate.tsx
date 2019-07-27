import * as React from "react";
import { FieldTemplateProps } from "react-jsonschema-form"; //

/*
  id: The id of the field in the hierarchy. You can use it to render a label targeting the wrapped widget.
  classNames: A string containing the base Bootstrap CSS classes, merged with any custom ones defined in your uiSchema.
  label: The computed label for this field, as a string.
  description: A component instance rendering the field description, if one is defined (this will use any custom DescriptionField defined).
  rawDescription: A string containing any ui:description uiSchema directive defined.
  children: The field or widget component instance for this field row.
  errors: A component instance listing any encountered errors for this field.
  rawErrors: An array of strings listing all generated error messages from encountered errors for this field.
  help: A component instance rendering any ui:help uiSchema directive defined.
  rawHelp: A string containing any ui:help uiSchema directive defined. NOTE: rawHelp will be undefined if passed ui:help is a React component instead of a string.
  hidden: A boolean value stating if the field should be hidden.
  required: A boolean value stating if the field is required.
  readonly: A boolean value stating if the field is read-only.
  disabled: A boolean value stating if the field is disabled.
  displayLabel: A boolean value stating if the label should be rendered or not. This is useful for nested fields in arrays where you don't want to clutter the UI.
  fields: An array containing all Form's fields including your custom fields and the built-in fields.
  schema: The schema object for this field.
  uiSchema: The uiSchema object for this field.
  formContext: The formContext object that you passed to Form.
*/ function CustomFieldTemplate(
  props: FieldTemplateProps
) {
  const {
    id,
    classNames,
    label,
    help,
    required,
    description,
    errors,
    children
  } = props;
  return (
    <div className={classNames}>
      <label htmlFor={id}>
        {label}
        {required ? "*" : null}
      </label>
      {description}
      {children}
      {errors}
      {help}
    </div>
  );
}

export default CustomFieldTemplate;
