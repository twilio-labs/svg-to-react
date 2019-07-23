// Ramda-like general purpose functional pipe method
const pipe = (...fns: any) => (x: any) => fns.reduce((y: any, f: any) => f(y), x);

// Split ComponentName (PascalCase) to multi word regex
const pascalCaseWordSplitter = (str: string) => str.replace(/([A-Z]+)/g, ' $1').trim();

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
const removeSvgExtension = (str: string) => str.replace('.svg', '');
const removeLastCharacter = (str: string) => str.slice(0, -1);

const fileNameToComponentName = pipe(
  removeSvgExtension,
  capitalize
);

export {pascalCaseWordSplitter, fileNameToComponentName, removeLastCharacter};
