## Describing a Model
The api will manage everything in `"__system__"`. It will handle patches to models and return the new entry with the new id and version if any properties have been removed. If any of the type information about the property changes it will create a new version as well. The only things that can change on a property is the label without causing a version bump.

```javascript
{
    "__system__": {
        "type": "class",
        "id": "UUID",
        "revisionId": "UUID",
        "version": 1,
        "permissions":{
            "create": [],
            "read": ["role1", "role2"],
            "update":[],
            "delete": [],
            "admin": ["admin"]
        }
    }
    "name": "Page",
    "label": "Page",
    "properties": [
        {
            "type": "string",
            "name": "title",
            "label": "Title",
            "defaultValue": "LDS"
            
        },
        {
            "types": [
                {
                    "class": "ArticleTemplate",
                    "version": 1
                },
                {
                    "class": "TrainingTemplate",
                    "version": 1
                }
            ],
            "name": "root",
            "label": "Root",
            "isRequired": true
        }
    ]
}
```



## String Property Type Options
```json 
{
    "type": "string",
    "name": "firstName",
    "label": "First Name",
    "isRequired": false,
    "defaultValue": "John"
}
```

## Number Property Type Options
``` 
{
    "type": "number",
    "name": "age",
    "label": "Age",
    "isRequired": false,
    "defaultValue": 0
}
```

## Boolean Property Type Options
``` 
{
    "type": "boolean",
    "name": "isAdmin",
    "label": "Is Administrator",
    "isRequired": true,
    "defaultValue": false
}
```

## Date Property Type Options
``` 
{
    "type": "date",
    "name": "dateOfBirth",
    "label": "Date of Birth",
    "isRequired": true,
    "defaultValue": "2018-04-29T15:22:17.143Z"
}
```

## Enum Property Type Options
Enum values can be any primitive, string, number, boolean.
``` 
{
    "type": "enum",
    "name": "gender",
    "label": "Gender",
    "isRequired": true,
    "options": [
        {
            "label": "Male",
            value: "male"
        },
        {
            "label": "Female",
            value: "female"
        }
    ],
    "defaultValue": "male"
}
```

## Array Property Type Options
``` 
{
    "type": "array",
    "name": "components",
    "label": "Components",
    "isRequired": false,
    "itemTypes": ["string", { class": "Tile", version: 1 }]
}
```

## Class Property Type Options
``` 
{
    "type": {
        class: "Person",
        version: 1
    },
    "name": "employee",
    "label": "Employee",
    "isRequired": false
}
```

## Data Tranfer Object 
This will be the result if the query parameter includes `link=true`.
```javascript 
{
    "instances":[
        {
            "__system__": {
                "type": "instance",
                "class": {
                    "name": "Page",
                    "version": 1
                },
                "instance": {
                    "id": "eaf2-93kd",
                    "revisionId":"UUID",
                    "updatedDate": "",
                    "createdDate": "" 
                }
            },
            "title": "John",
            "root": {
                "type": "link",
                "id": "fue5-bn00"
            } 
        },
        {
            "__system__": {
                "type": "instance",
                "class": {
                    "name": "Body",
                    "version": 1
                },
                "instance": {
                    "id": "fue5-bn00",
                    "revisionId":"UUID",
                    "updatedDate": "",
                    "createdDate": "" 
                }
            },
            "body": "This is some text"
        }
    ],
    "result"{
        "type": "link",
        "id": "eaf2-93kd"
    }
}
```

## Data Tranfer Object 
```javascript 
{
    
    "__system__": {
        "type": "instance",
        "class": {
            "name": "Page",
            "version": 1
        },
        "instance": {
            "id": "eaf2-93kd",
            "revisionId":"UUID",
            "updatedDate": "",
            "createdDate": "" 
        }
    },
    "title": "John",
    "root": {
        "type": "link",
        "id": "fue5-bn00"
    } 

}
```

Aliases will be built into the Api. You will be able to make any alias to any entity. This is however a key value mapping, so there can be mutliple aliases to one entity buy only one alias to one entity. These aliases could be urls for a domain or just simply a string to tag an entity with.

All `"__system__"` data will be indexed for fast querying. This will allow other services to react and query the system for changes.