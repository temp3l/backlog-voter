import * as React from "react";

interface IExample {
  test: number;
}

const example: React.FunctionComponent<IExample> = props => (
  <h1>jij iasdads111122d ssd aa{props.test}</h1>
);

export default example;
