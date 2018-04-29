export default class TypeInference {
  constructor(dataModel) {
    this.value = null;
    this.dataModel = dataModel;
    this.possibleModels = [];
    this.probabilities = [];
  }

  getBuiltInTypeByValue(value) {
    if (typeof value === "undefined") {
      return null;
    }

    // Complex built in
    if (Array.isArray(value)) {
      return "array";
    } else if (typeof value === "object" && value !== null) {
      return "class";
    } else if (value instanceof Date) {
      return "date";
    }

    // Primitive built in
    if (typeof value === "number") {
      return "number";
    } else if (typeof value === "string") {
      return "string";
    } else if (typeof value === "boolean") {
      return "boolean";
    }
  }

  calculateMatch(model) {
    const keys = Object.keys(this.value);
    const length = keys.length;

    const matchingFactors = {
      keys: 0,
      types: 0,
      values: 0
    };

    keys.forEach(key => {
      const property = model.properties.find(p => p.name === key);

      if (property != null) {
        const value = this.value[key];
        const type = this.getBuiltInTypeByValue(value);

        matchingFactors.keys++;

        // type === registered model
        if (type == null && typeof value === "object" && value != null) {
          const typeInference = new TypeInference(this.dataModel);
          const probabilities = typeInference.getProbabilities(value, [
            property.type
          ]);

          if (probabilities.length > 0) {
            matchingFactors.types += probabilities[0].value;
          }
        }

        // type === array
        if (property.type === "array" && Array.isArray(value)) {
          value.forEach(item => {
            const typeInference = new TypeInference(this.dataModel);
            const probabilities = typeInference.getProbabilities(
              item,
              property.itemTypes.map(i => i.type)
            );

            if (probabilities.length > 0) {
              matchingFactors.types += probabilities[0].value;
            }
          });
        }

        if (property.type === type || (value == null && property.isNullable)) {
          matchingFactors.types++;
        }

        if (typeof property.defaultValue !== "undefined") {
          matchingFactors.values++;
        }
      }
    });

    return matchingFactors;
  }

  calculateMatches() {
    this.probabilities = this.possibleModels.map(model => {
      return this.calculateMatch(model);
    });
  }

  getProbabilities(value, possibleTypeNames) {
    const type = this.getBuiltInTypeByValue(value);

    if (type === "class") {
      // If complex type.
      this.value = value;
      this.probabilities = [];

      this.possibleModels = possibleTypeNames
        .map(name => {
          return this.dataModel.getModel(name);
        })
        .filter(m => m != null);

      this.calculateMatches();
      return this.sortProbabilities();
    } else {
      // If it a is primitive.
      if (possibleTypeNames.indexOf(type) > -1) {
        return [
          {
            model: { name: type },
            value: Infinity
          }
        ];
      } else {
        return [];
      }
    }
  }

  infer(value, possibleTypeNames) {
    const probabilities = this.getProbabilities(value, possibleTypeNames);
    if (probabilities.length > 0) {
      return probabilities[0].model.name;
    } else {
      return null;
    }
  }

  sortProbabilities() {
    return this.probabilities
      .map(({ keys, types, values }, index) => {
        return {
          model: this.possibleModels[index],
          value: keys + types + values / 10 // values aren't weighted as high.
        };
      })
      .sort((a, b) => {
        return b.value - a.value;
      });
  }
}
