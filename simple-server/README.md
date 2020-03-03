## A simple server used for a TodoApp assignment.

## Instalation

`npm install`
or
`yarn install`

## Running the server

`npm run start`
or
`yarn start`

## Authentication

### **POST @ /api/login** -> token: string

```js
body {
  email: String
  password String
}
```

---

## Todo CRUD

### **GET @ /api/todos** -> list of todos

```js
response: [
  {
    id: String
    description: String
    done: Boolean
  }
]
```

### **POST @ /api/todos** -> creates a new todo

```js
body: {
  id: String
  description: String
  done: Boolean
}

// the newly added todo
response: {
  id: String
  description: String
  done: Boolean
}
```

### **PATCH @ /api/todos/:todoId** -> updates a todo

```js
body: {
  description: String
  done: Boolean
}

// the updated todo
response: {
  id: String
  description: String
  done: Boolean
}
```

### **DELETE @ /api/todos/:todoId** -> deletes the specified todo item

```js
response: {
  todoId: String
}
```

## Watches

### **GET @ /api/watches** -> list of watches

```js
response: [
  {
    id: "dd6e46ad-4254-5242-abf0-29b9496d445b",
    price: "$202.59",
    name: "Vacheron Constantin",
    description:
      "Si pes guguro zebitu ebiza pebdojaj decgewur ol pud mo wadnum li vetwupav etip. Alolihhon arusuz li lapku pupop tanaka giuf adowi vejsam ve kek su gek. Ovhi uzogapi nilwukjoz tis nunwaoki pofisoku jevwohti arnefjom gana govwe mopcug gowvimze bejubot ih demog.",
    image:
      "https://placeholder.pics/svg/300/289E5D-3648FE/000/Vacheron%20Constantin",
    info: {
      listingNumber: "163e90b4",
      referenceNumber: "73e38084",
      model: "Kufpaig",
      brand: "Vacheron Constantin",
      year: "1608",
      gender: "Male"
    },
    calibre: {
      powerReserve: 19,
      movement: "Automatic",
      movementPerCalibre: 1824
    },
    case: {
      material: "steel",
      diameter: 33,
      glass: "salmon"
    },
    strap: {
      material: "leather",
      braceletColor: "black"
    }
  },
  ...otherWatches
]
```

### **GET @ /api/watches/:watchId** -> details of a single watch

```js
response: {
    "id": "dd6e46ad-4254-5242-abf0-29b9496d445b",
    "price": "$202.59",
    "name": "Vacheron Constantin",
    "description": "Si pes guguro zebitu ebiza pebdojaj decgewur ol pud mo wadnum li vetwupav etip. Alolihhon arusuz li lapku pupop tanaka giuf adowi vejsam ve kek su gek. Ovhi uzogapi nilwukjoz tis nunwaoki pofisoku jevwohti arnefjom gana govwe mopcug gowvimze bejubot ih demog.",
    "image": "https://placeholder.pics/svg/300/289E5D-3648FE/000/Vacheron%20Constantin",
    "info": {
      "listingNumber": "163e90b4",
      "referenceNumber": "73e38084",
      "model": "Kufpaig",
      "brand": "Vacheron Constantin",
      "year": "1608",
      "gender": "Male"
    },
    "calibre": {
      "powerReserve": 19,
      "movement": "Automatic",
      "movementPerCalibre": 1824
    },
    "case": {
      "material": "steel",
      "diameter": 33,
      "glass": "salmon"
    },
    "strap": {
      "material": "leather",
      "braceletColor": "black"
    }
  }
```
