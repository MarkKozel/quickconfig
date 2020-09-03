# Quick JSON Config

Simple JavaScript package to read in json files for project configuration

After elements are read from file and parsed into a JavaScript object, each element is added to the instantiated QuickJsonConfig object as member variables. Also, simple *set* and *get* member functions are added to the same instantiated QuickJsonConfig object

As silly as this is, I think it is pretty cool

## Requires:
- Node 12.x, maybe earlier

## Usage:

*Test JSON File*
```json
{
  "FirstName": "Steve",
  "LastName": "Martin",
  "Position": "Standup Philosopher",
  "Shows": [
    {
      "date":"01/21/2016",
      "showName": "Tonight Show",
      "host": "Jimmy Fallon"
    },
    {
      "date":"01/28/2016",
      "showName": "Late night",
      "host": "Steven Colbert"
    }
  ]
}
```

*Create QuickJsonObject*

*Load file and call getters*
```javascript
const QuickJsonConfig = require('quickjsonconfig').QuickJsonConfig;

let configObj = new QuickJsonConfig(path/to/test.json));

console.log(configObj.getFirstName())
console.log(configObj.getLastName())
console.log(configObj.getPosition())
console.log(configObj.getShows())
```
*Output*
```
    Steve
    Martin
    Standup Philosopher
    [
      {
        date: '01/21/2016',
        showName: 'Tonight Show',
        host: 'Jimmy Fallon'
      },
      {
        date: '01/28/2016',
        showName: 'Late night',
        host: 'Steven Colbert'
      }
    ]
```

*Call setters*
```javascript
configObj.setFirstName("Gern");
configObj.setLastName("Blanston");
configObj.setPosition("Plain old person");
configObj.setShows([
  {
    "location": "home",
    "when": "most nights"
  }
]);

console.log(configObj.getFirstName())
console.log(configObj.getLastName())
console.log(configObj.getPosition())
console.log(configObj.getShows())
```

*New Output*
```
    Gern
    Blanston
    Plain old person
    [ { location: 'home', when: 'most nights' } ]
```

*Get Raw Json from object*
```javascript
let obj = configObj._getJson();
console.log(obj)
```

*Output*
```
    {
      FirstName: 'Gern',
      LastName: 'Blanston',
      Position: 'Plain old person',
      Shows: [ { location: 'home', when: 'most nights' } ]
    }
```
*Add Config Element*
```javascript
configObj._addElement({ Residence: 'Florida' });
let obj = configObj._getJson();
console.log(obj)
```

*Output*
```{
      FirstName: 'Gern',
      LastName: 'Blanston',
      Position: 'Plain old person',
      Shows: [ { location: 'home', when: 'most nights' } ],
      Residence: 'Florida'
    }
```

*Delete Config Element*
```javascript
configObj._deleteElement('Residence');
let obj = configObj._getJson();
console.log(obj)
```

*Output*
```{
      FirstName: 'Gern',
      LastName: 'Blanston',
      Position: 'Plain old person',
      Shows: [ { location: 'home', when: 'most nights' } ]
    }
```

**Saving Json Files**

*Save Changes to existing File*
```javascript
let configObj = new QuickJsonConfig(path/to/test.json));
configObj._addElement({ Residence: 'Florida' });
// update test.json with changes
configObj._saveFile();
```
*Save Changes to different File*
```javascript
let configObj = new QuickJsonConfig(path/to/test.json));
configObj._addElement({ Residence: 'Florida' });
// create or overwrite test1.json
configObj._saveFile(path/to/test1.json);
```
*Save Changes to different File -and- remember new file name*
```javascript
let configObj = new QuickJsonConfig(path/to/test.json));
configObj._addElement({ Residence: 'Florida' });
// created or overwritten test1.json and 
// filename updated to test1.json for future actions
configObj._saveFile(path/to/test1.json, true);
```

## License:
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
Attribution-NonCommercial-ShareAlike 4.0 International

## Miscellany

### Near Future to-dos
Nothing comes to mind

### Version History
1.0.0 - Initial release. Read, Access, Update, Delete, Write (RAUDW) functionality complete

0.0.x - Initial buildup for side project. Implementing minimal elements

### Historical Context
Global pandemic, protests erupting around the world. US Postal Service likely to play bigger roll in US Presidential election that Florida did in 2000