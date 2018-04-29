import * as assert from "assert";
import overlay from "../utilities/overlay";

exports["utilities.overlay: shallow."] = () => {
    const bottom = {
        firstName: "John",
        lastName: "Doe"
    };

    const top = {
        middleName: "Smith"
    };

    const result = overlay(bottom, top);

    assert.equal(result.middleName, top.middleName);
    assert.equal(result.firstName, bottom.firstName);
    assert.equal(result.lastName, bottom.lastName);
};

exports["utilities.overlay: deep."] = () => {
    const bottom = {
        firstName: "John",
        lastName: "Doe",
        children: [{
            firstName: "Sally",
            lastName: "Doe"
        }, {
            firstName: "Donny",
            lastName: "Doe"
        }, {
            firstName: "Harry",
            lastName: "Doe"
        }]
    };

    const top = {
        middleName: "Smith",
        children: [{
            firstName: "Jolly",
            lastName: "Doe"
        }, {
            firstName: "Donny",
            middleName: "Smith",
            lastName: "Doe"
        }, null]
    };

    const result = overlay(bottom, top);

    assert.equal(result.middleName, top.middleName);
    assert.equal(result.firstName, bottom.firstName);
    assert.equal(result.lastName, bottom.lastName);
    assert.equal(result.children[0].firstName, top.children[0].firstName);
    assert.equal(result.children[0].lastName, top.children[0].lastName);
    assert.equal(result.children[2].firstName, bottom.children[2].firstName);
};

exports["utilities.overlay: array deep."] = () => {
    const bottom = {
        firstName: "John",
        lastName: "Doe",
        children: [{
            firstName: "Sally",
            lastName: "Doe"
        }, {
            firstName: "Donny",
            lastName: "Doe"
        }, {
            firstName: "Harry",
            lastName: "Doe",
            children: [{
                firstName: "Sherry",
                lastName: "Doe"
            }]
        }]
    };

    const top = {
        middleName: "Smith",
        children: [{
            firstName: "Jolly",
            lastName: "Doe"
        }, {
            firstName: "Donny",
            middleName: "Smith",
            lastName: "Doe"
        }, null]
    };

    const result = overlay(bottom, top);

    assert.equal(result.middleName, top.middleName);
    assert.equal(result.firstName, bottom.firstName);
    assert.equal(result.lastName, bottom.lastName);
    assert.equal(result.children[0].firstName, top.children[0].firstName);
    assert.equal(result.children[0].lastName, top.children[0].lastName);
    assert.equal(result.children[2].firstName, bottom.children[2].firstName);
    assert.equal(result.children[2].children[0].firstName, bottom.children[2].children[0].firstName);
};