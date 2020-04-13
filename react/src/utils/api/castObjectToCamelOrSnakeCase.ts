import { CastObjectInterface } from './type';

export enum castOptions {
  ToSnake,
  ToCamel
}

const regexToCamel = /[^a-zA-Z0-9]+(.)/g;
const regexToSnake = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;

const stringToCamelCase = (str: string) => str && str.toLowerCase()
  .replace(regexToCamel, (m, chr) => chr.toUpperCase());

const stringToSnakeCase = (str: string) => str && str.match(regexToSnake)!
  .map((x) => x.toLowerCase())
  .join('_');

export const castObject = (obj: CastObjectInterface, type: castOptions) => {
  const objectKeys = Object.keys(obj);
  objectKeys.forEach((keyName) => {
    const castedKey = type === castOptions.ToCamel ? stringToCamelCase(keyName) : stringToSnakeCase(
      keyName,
    );
    if (keyName !== castedKey) {
      delete Object.assign(obj,
        { [castedKey]: obj[keyName] })[keyName];
    }
  });
  return obj;
};

// Cast an array keys to camelCase or snake_case. Useful for mapping between
// back end and front end
export const castArrayList = (payload: object[], type: castOptions): object[] => {
  const castedArrayList = [];
  for (let i = 0; i < payload.length; i += 1) {
    const obj = payload[i];
    castObject(obj, type);
    castedArrayList.push(obj);
  }
  return castedArrayList;
};
