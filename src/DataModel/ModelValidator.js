import Validator from "./Validator";

export default class ModelValidator {
  constructor({ model, modelsByName }) {
    this.model = model;
    this.modelsByName = modelsByName;
    this.validator = new Validator(this.model, this.modelsByName);
  }

  isPrimitive() {
    return (
      this.model.type === "string" ||
      this.model.type === "number" ||
      this.model.type === "boolean" ||
      this.model.type === "date" ||
      this.model.type === "enum" ||
      this.model.type === "array" ||
      this.model.type === "class",
      this.model.type === "component"
    );
  }

  isCustomType() {
    return this.modelsByName[this.model.type];
  }

  validate() {
    this.validateType();
    this.validateName();
    this.validateLabel();
  }

  validateToString() {
    if (!this.validator.validate("toString").isFunction()) {
      throw new Error(
        "Model's need to have a toString function to describe an instance as a string."
      );
    }
  }

  validateLabel() {
    if (!this.validator.validate("label").isString()) {
      throw new Error(
        "Model's need to have a label field. This is used for users."
      );
    }
  }

  validateName() {
    if (!this.validator.validate("name").isString()) {
      throw new Error(
        "Model's need to have a name field. This is used for code."
      );
    }
  }

  validateType() {
    if (!this.validator.validate("type").isString()) {
      throw new Error(
        "Model's need to have a type field. This can be any primitive type: string, number, boolean, date, or complex type referencing another type."
      );
    }

    if (!this.isPrimitive() && !this.isCustomType()) {
      throw new Error(
        "The model's type isn't a known class, component or a primitive type."
      );
    }

    if (
      this.model.type === "array" &&
      (!this.validator.validate("itemTypes").isArray() ||
        this.validator.validate("itemTypes").isNullOrUndefined())
    ) {
      throw new Error(
        "Model's need to have an itemTypes field to describe the allow items."
      );
    }

    if (
      this.model.type === "class" &&
      !(
        this.validator.validate("properties").isArray() ||
        this.validator.validate("properties").isNullOrUndefined()
      )
    ) {
      throw new Error(
        "Model's need to have a properties field to describe the class' properties."
      );
    }
    
  }
}
