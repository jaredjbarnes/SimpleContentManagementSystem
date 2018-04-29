import ModelValidator from "./ModelValidator";

export default class DataModel {
  constructor() {
    this.modelsByName = {};
  }

  addModel(model) {
    this.modelsByName[model.name] = model;

    try {
      const modelValidator = new ModelValidator({
        model,
        modelsByName: this.modelsByName
      });
      modelValidator.validate();
    } catch (error) {
      delete this.modelsByName[model.name];
      throw error;
    }

    this.modelsByName[model.name] = model;
  }

  getModels() {
    return Object.keys(this.modelsByName).map(key => this.modelsByName[key]);
  }

  getModel(name) {
    return this.modelsByName[name] || null;
  }

  removeModel(name) {
    delete this.modelsByName[name];
  }
}
