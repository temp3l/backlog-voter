import * as RefParser from "json-schema-ref-parser";

const transformErrors = (errors: any) => errors;
const validate = (formData: any, errors: any) => errors;

const noSchemaFound = {
  description: "No Schema found",
  title: "Schema not found",
  type: "object"
};

// @ts-ignore
const liveBundle = async (uri: string) => {
  // uri: path or url
  // Bundles all referenced files/URLs into a single schema that only has internal $ref pointers.
  // This lets you split-up your schema however you want while you're building it,
  // but easily combine all those files together when it's time to package or distribute the schema to other people.
  // The resulting schema size will be small, since it will still contain internal JSON references rather than being fully-dereferenced.
  // return await RefParser.bundle(uri).then((schema: any) => {
  //   return schema;
  // });
};

const resolve = async (file: string) => {
  const schema = await fetch(`/schemas/${file}.schema.json`)
    .then(response => response.json())
    .catch(err => {
      return noSchemaFound;
    });
  // TODO: also load functions ?!
  return {
    formData: await fetch(`/schemas/data/${file}.formData.json`)
      .then(response => response.json())
      .catch(err => ({})),
    schema,
    transformErrors,
    uiSchema: await fetch(`/schemas/data/${file}.uiSchema.json`)
      .then(response => response.json())
      .catch(err => {
        return {};
      }),
    validate
  };
};

export default resolve;
