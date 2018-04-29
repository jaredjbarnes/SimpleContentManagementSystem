## Describing a Model
The api will manage the everything in `"__system__"`. It will handle patches to models and return the new entry with the new id and version if any properties have been removed. 

```javascript
{
    "__system__": {
        "type": "model",
        "id": "UUID",
        "revisionId": "UUID",
        "version": 1,
        "permissions":{
            "create": [],
            "read": ["role1", "role2"],
            "update":[],
            "delete": []
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
                    "name": "ArticleTemplate",
                    "version": 1
                },
                {
                    "name": "TrainingTemplate",
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

## Data Tranfer Objects
```javascript 
{
    "__system__": {
        "type": "entry",
        "model": {
            "name": "Page",
            "label": "Page",
            "version": 1
        },
        "entry": {
            "id": "UUID",
            "revisionId":"UUID",
            "updatedDate": "",
            "createdDate": "" 
        }
    }
    "title": "John",
    "root": {
        "type": "link",
        "id": "UUID"
    } 
}
```

There will be a parameter on the GET of any of the entries of fillLinks=true. This will retrieve all the links with entries.

When saving entries it needs to ensure no circular references.