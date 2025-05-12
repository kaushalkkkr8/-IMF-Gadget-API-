import { uniqueNamesGenerator, animals } from "unique-names-generator";

const myDirectory = ["Available", "Deployed" ];

export function generateCodename() {
  const name = uniqueNamesGenerator({
    dictionaries: [animals],
    style: "capital",
    separator: "",
  });

  return `The ${name}`;
}

export function statusGenerate() {
  const status = uniqueNamesGenerator({
    dictionaries: [myDirectory],
  });
  return status;
}


