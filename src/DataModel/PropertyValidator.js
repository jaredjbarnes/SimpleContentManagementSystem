export default class PropertyValidator {
  constructor(value) {
    this.value = value;
  }

  isInstanceOf(type) {
    return this.value instanceof type;
  }

  isArray() {
    return Array.isArray(this.value);
  }

  isObject() {
    return typeof this.value === "object" && this.value !== null;
  }

  isBoolean() {
    return typeof this.value === "boolean";
  }

  isString() {
    return typeof this.value === "string";
  }

  isFunction() {
    return typeof this.value === "function";
  }

  isNull() {
    return this.value === null;
  }

  isNullableArray() {
    return this.isArray() || this.isNull();
  }

  isNullableObject() {
    return this.isObject() || this.isNull();
  }

  isNullableNumber() {
    return this.isNumber() || this.isNull();
  }

  isNullableBoolean() {
    return this.isBoolean() || this.isNull();
  }

  isNullableString() {
    return this.isString() || this.isNull();
  }

  isFunction() {
    return this.isFunction() || this.isNull();
  }

  isNullOrUndefined() {
    return this.value == null;
  }

  isNumber() {
    return typeof this.value === "number";
  }

  isUndefined() {
    return typeof this.value === "undefined";
  }
}
