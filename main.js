class Menu {
  static _TEXT = ["Americano", "Latte", "Vanilla", "Macchiato", "Hazelnut", "Green Grape", "Lemon", "Passion Fruits", "Grapefruit", "Applemango", "Schizandara", "Plum", "Iced Tea", "Choco", "Banana", "Strawberry", "Green Tea"];

  static AMERICANO = new Menu(0, 1000);
  static LATTE = new Menu(1, 1500);
  static VANILLA = new Menu(2, 1700);
  static MACCHIATO = new Menu(3, 1700);
  static HAZELNUT = new Menu(4, 1700);
  static GREEN_GRAPE = new Menu(5, 1500);
  static LEMON = new Menu(6, 1500);
  static PASSION_FRUITS = new Menu(7, 1500);
  static GRAPEFRUIT = new Menu(8, 1500);
  static APPLEMANGO = new Menu(9, 1500);
  static SCHIZANDARA = new Menu(10, 1000);
  static PLUM = new Menu(11, 1000);
  static ICED_TEA = new Menu(12, 1000);
  static CHOCO = new Menu(13, 1500);
  static BANANA = new Menu(14, 1500);
  static STRAWBERRY = new Menu(15, 1500);
  static GREEN_TEA = new Menu(16, 1500);

  constructor(menu, cost) {
    if (0 <= menu && menu <= 16) {
      this._menu = menu;
      this._cost = cost;
    } else {
      throw new RangeError("Must be between 0 to 16 but " + menu);
    }
  }

  getId() {
    return this._menu;
  }

  getCost() {
    return this._cost;
  }

  toString() {
    return Menu._TEXT[this._menu];
  }

  static _MENU_LIST = [
    Menu.AMERICANO, Menu.LATTE, Menu.VANILLA, Menu.MACCHIATO, Menu.HAZELNUT, Menu.GREEN_GRAPE, Menu.LEMON, Menu.PASSION_FRUITS, Menu.GRAPEFRUIT, Menu.APPLEMANGO, Menu.SCHIZANDARA, Menu.PLUM, Menu.ICED_TEA, Menu.CHOCO, Menu.BANANA, Menu.STRAWBERRY, Menu.GREEN_TEA
  ];

  static findMenuById(id) {
    return Menu._MENU_LIST[id];
  }
};

class Coffee {
  static random() {
    return new Coffee(Menu.AMERICANO);
  }

  constructor(menu) {
    this.hot = false;
    this.shot = 0;
    this.decaffeinated = false;
    this.count = 1;
    this.menu = menu;
  }

  calculateCost() {
    let cost = this.menu.getCost() * this.count;
    if (this.decaffeinated)
      cost += 500 * this.count;
    return cost + this.shot * 500 * this.count;
  }
  
  getMenuId() {
    return this.menu.getId();
  }

  toString() {
    let result = this.menu.toString() + ' × ' + this.makeBillString();
    if (this.hot)
      result = 'Hot ' + result;
    return result;
  }

  makeBillString() {
    let result = this.count;
    if (this.decaffeinated)
      result = "d" + result;
    for (let i = 0; i < this.shot; i++)
      result = result + "+";

    return result;
  }

  equals(coffee) {
    return this.hot === coffee.hot &&
      this.shot === coffee.shot &&
      this.decaffeinated === coffee.decaffeinated &&
      this.menu === coffee.menu;
  }
};

class Bill {
  constructor() {
    this._order = [];
  }

  addCoffee(coffee) {
    for (var item of this._order) {
      if (item.equals(coffee)) {
        item.count += 1;
        return;
      }
    }
    this._order.push(coffee);
  }

  calculateCost() {
    let cost = 0;

    for (let coffee of this._order)
      cost += coffee.calculateCost();

    return cost;
  }

  toString() {
    let result = '';
    for (var item of this._order)
      result += item.toString() + '\n';

    return result;
  }
  
  makeBillStringByMenuId() {
    let result = { };
    for (var item of this._order) {
      let id = item.getMenuId();
      if (id < 5) {
        id *= 2;
        if (item.hot === false)
          id += 1;
      } else {
        id += 5;
      }
      if (result[id] == undefined)
        result[id] = [ item ];
      
      else
        result[id].push(item);
    }
    
    return result;
  }
}

const ratioPreset = [
  {
    "hot": 10,
    "count": 150,
    "decaffeinated": 10,
    "shot": 10,
    "two_shot": 1
  },
  {
    "hot": 4,
    "count": 50,
    "decaffeinated": 3,
    "shot": 5,
    "two_shot": 1
  },
  {
    "hot": 1,
    "count": 10,
    "decaffeinated": 1,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 1,
    "count": 8,
    "decaffeinated": 2,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 1,
    "count": 10,
    "decaffeinated": 1,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 6,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 6,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 6,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 1,
    "count": 6,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 6,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 1,
    "count": 7,
    "decaffeinated": 0,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 1,
    "count": 7,
    "decaffeinated": 0,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 12,
    "decaffeinated": 0,
    "shot": 3,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 7,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 7,
    "decaffeinated": 0,
    "shot": 1,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 7,
    "decaffeinated": 0,
    "shot": 0,
    "two_shot": 0
  },
  {
    "hot": 0,
    "count": 7,
    "decaffeinated": 0,
    "shot": 1,
    "two_shot": 0
  },
];

let sum = 0;
for (var object of ratioPreset) {
  sum += object["count"];
}

function randomInteger(start, end) {
  return Math.floor((Math.random() * (end - start + 1)) + start);
}

function sampleCoffee() {
  let random = randomInteger(0, sum);
  let pivot = 0;
  let menu = Menu.AMERICANO;
  let index = 0;
  for (var menuPreset of ratioPreset) {
    pivot += menuPreset["count"];
    if (random < pivot) {
      menu = Menu.findMenuById(index);
      break;
    }
    index += 1;
  }

  var coffee = new Coffee(menu);
  let current = ratioPreset[index];

  random = randomInteger(0, current["count"]);
  if (random < current["hot"])
    coffee.hot = true;

  random = randomInteger(0, current["count"]);
  if (random < current["decaffeinated"])
    coffee.decaffeinated = true;

  random = randomInteger(0, current["count"]);
  if (random < current["shot"])
    coffee.shot = 1;

  random = randomInteger(0, current["count"]);
  if (random < current["two_shot"])
    coffee.shot = 2;

  return coffee;
}

document.addEventListener('DOMContentLoaded', function() {
  let bill = new Bill();

  for (var i = 0; i < randomInteger(3, 10); i++) {
    let coffee = sampleCoffee();
    bill.addCoffee(coffee);
    console.log(coffee.toString());
  }

  console.log(bill.toString());
  
  let items = document.getElementsByClassName('item');
  console.log(items);
  
  let menusById = bill.makeBillStringByMenuId();
  for (var key of Object.keys(menusById)) {
    console.log(key)
    let menuId = parseInt(key);
    let coffeeArray = menusById[menuId];
    let text = coffeeArray[0].makeBillString();
    for (var i = 1; i < coffeeArray.length; i++) {
      text += ', ' + coffeeArray[i].makeBillString();
    }
    console.log(text + '\n');
    items[menuId].innerHTML = text;
  }
  
  document.addEventListener('click', (event) => {
    let element = document.getElementById('answer');
    console.log(bill);
    element.innerHTML = bill.calculateCost();
  });
});