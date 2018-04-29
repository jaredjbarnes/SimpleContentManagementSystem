const isObject = (obj) => {
    return typeof obj === "object" && obj !== null;
};

const isPrimitive = (value) => {
    return !Array.isArray(value) && !isObject(value);
};

const clone = (obj) => {
    if (isPrimitive(obj)) {
        return obj;
    }

    const result = Array.isArray(obj) ? [] : {};

    Object.keys(obj).forEach((key) => {
        result[key] = clone(obj[key]);
    });

    return result;
};

const overlay = (bottom, top) => {
    if (bottom == null && top != null) {
        return clone(top);
    }

    if (top == null && bottom != null) {
        return clone(bottom);
    }

    const result = clone(top);

    if (isPrimitive(bottom)) {
        return result;
    }

    Object.keys(bottom).forEach((key) => {
        result[key] = overlay(bottom[key], top[key]);
    });

    return result;
};

export default overlay;