import PropertyValidator from "./PropertyValidator";

export default class Validator {
  constructor(obj) {
    this.obj = obj;
  }

  setObject(obj) {
    this.obj = obj;
  }

  getObject(obj, namespace) {
    if (namespace == null || obj == null) {
      return undefined;
    }

    const properties = namespace.split(".");
    const property = properties[0];

    if (obj[property] != null) {
      if (properties.length > 1) {
        return this.getObject(obj[property], properties.slice(1));
      } else {
        return obj[property];
      }
    } else {
      return undefined;
    }
  }

  validate(namespace) {
    const value = this.getObject(this.obj, namespace);
    return new PropertyValidator(value);
  }

  getValue(namespace) {
    return this.getObject(this.obj, namespace);
  }
}
