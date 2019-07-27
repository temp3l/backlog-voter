function transformErrors(errors: any) {
  return errors;
}

class Akeliusform {
  public dob: string;
  public passportExipirationDate: string;
}

function validate(formData: Akeliusform, errors: any) {
  const { dob, passportExipirationDate } = formData;
  // needs more checks or try/catch!
  if (dob && new Date(dob).getTime() > Date.now()) {
    errors.dob.addError("futuristic birth");
  }
  if (
    passportExipirationDate &&
    new Date(passportExipirationDate).getTime() < Date.now()
  ) {
    errors.passportExipirationDate.addError("Deprecated passport");
  }
  if (dob && passportExipirationDate) {
    if (new Date(passportExipirationDate).getTime() < new Date(dob).getTime()) {
      errors.passportExipirationDate.addError("Expires prior birth!");
    }
  }
  return errors;
}
/* tslint:disable:object-literal-sort-keys */
const formSource = {
  formData: {
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo",
    dob: "2019-04-18",
    done: true,
    issuingCountry: "de",
    lastName: "reb",
    nationality: "German",
    passportExipirationDate: "2019-04-18",
    passportNumber: "asdadasda1",
    sex: "Male",
    title: "My first task"
  },
  schema: {
    collectionName: "akelius",
    $schema: "http://json-schema.org/draft-07/schema#",
    // $id: "http://localhost:3000/static/docs/combined.schema.json",
    type: "object",
    description:
      "This is combined  schema with examples for multiple types and their constraints.",
    title: "custom dependent validation logic",
    required: [
      "firstName",
      "lastName",
      "dob",
      "sex",
      "passportNumber",
      "passportExipirationDate",
      "issuingCountry",
      "nationality"
    ],
    properties: {
      firstName: {
        maxLength: 15,
        minLength: 3,
        pattern: "^[a-zA-Z]+$",
        title: "First name",
        type: "string"
      },
      lastName: {
        maxLength: 15,
        minLength: 3,
        pattern: "^[a-zA-Z]+$",
        title: "Last name",
        type: "string"
      },
      dob: {
        description: "Date of birth",
        format: "date",
        title: "Birthday",
        type: "string"
      },
      sex: {
        enum: ["Male", "Female", "Alien"],
        title: "Sex",
        type: "string"
      },
      passportNumber: {
        maxLength: 10,
        minLength: 6,
        pattern: "\\d+",
        title: "Passport ID",
        type: "string"
      },
      passportExipirationDate: {
        format: "date",
        title: "Passport expiry",
        type: "string"
      },
      issuingCountry: {
        description: "fetched later",
        enum: [],
        title: "Issuer country",
        type: "string"
      },
      nationality: {
        description: "test",
        enum: [
          "Afghan",
          "Albanian",
          "Algerian",
          "American",
          "Andorran",
          "Angolan",
          "Antiguan",
          "Zimbabwean"
        ],
        title: "Nationality",
        type: "string"
      }
    }
  },
  transformErrors,
  uiSchema: {
    firstName: {
      "ui:autofocus": true
    }
  },
  validate
};

async function resolveSchema() {
  const items = await fetch("https://jsonplaceholder.typicode.com/users").then(
    response => response.json()
  );
  const formSourceClone = Object.assign({}, formSource); // quite messy/memoryBuggy
  formSourceClone.schema.properties.issuingCountry.enum = items.map(
    (i: any) => i.address.street
  );

  return formSourceClone;
}

export default resolveSchema;
