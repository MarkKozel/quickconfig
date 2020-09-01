# Quick JSON Config

Simple JavaScript package to read in json files for project configuration

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
const QuickJsonConfig = require('../src/QuickJsonConfig');

const path = require('path');

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
## License:
[CC-BY-NC-SA-4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
Attribution-NonCommercial-ShareAlike 4.0 International

## Miscellany

### Near Future to-dos
- Add write back to file

### Version History
0.0.x - Initial buildup for side project. Implementing minimal elements

### Historical Context
Global pandemic, protests erupting around the world. US Postal Service likely to play bigger roll in US Presidential election that Florida did in 2000