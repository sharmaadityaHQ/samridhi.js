const _ = {

  clamp(number, lower, upper) {
    let lowerClampedValue = Math.max(number, lower);
    let clampedValue = Math.min(lowerClampedValue, upper);
    return clampedValue;
  },

  inRange(number, start, end) {
    if (end === undefined) {
      end = start;
      start = 0;
    }
    if (start > end) {
      let temp = end;
      end = start;
      start = temp;
    }
    let isInRange = start <= number && number < end;
    return isInRange;
  },

  words(string) {
    let words = string.split(' ');
    return words;
  },

  pad(string, length) {
    if (length <= string.length) {
      return string;
    }
    let startPaddingLength = Math.floor((length - string.length) / 2);
    let endPaddingLength = length - string.length - startPaddingLength;
    let paddedString = ' '.repeat(startPaddingLength) + string + ' '.repeat(endPaddingLength);
    return paddedString;
  },

  has(object, key) {
    let hasValue = object[key];
    if (object[key] === undefined) {
      hasValue = false;
    }
    else if (object[key]) {
      hasValue = true;
    }
    return hasValue;
  },

  invert(object) {
    let invertedObject = {};
    for (let i in object) {
      let originalValue = object[i];
      invertedObject = { originalValue: i };
    }
    return invertedObject;
  },

  findKey(object, predicate) {
    for (let i in object) {
      let value = object[i];
      let predicateReturnValue = predicate(value);
      if (predicateReturnValue) {
        return i;
      }
    }
    return undefined;
  },

  drop(array, n) {
    if (!n) {
      n = 1;
    }
    let droppedArray = array.slice(n);
    return droppedArray;
  },

  dropWhile(array, predicate) {
    let dropNumber = array.findIndex(function (element, index) {
      return !(predicate(element, index, array))
    });
    let droppedArray = this.drop(array, dropNumber);
    return droppedArray;
  },

  chunk(array, size) {
    if (size === undefined) {
      size = 1;
    }
    let arrayChunks = [];
    for (let i = 0; i < array.length; i += size) {
      let arrayChunk = array.slice(i, i + size);
      arrayChunks.push(arrayChunk);
    }
    return arrayChunks;
  },

  stringReverse(string) {
    return string.split('').reverse().join('');
  },

  isPalindrome(string) {
    if(string === this.stringReverse(string)) {
      return true;
    }
    return false;
  },

  everyNth(array, nth) {
    return array.filter((e, i) => i % nth === nth - 1);
  },

  filterFalsy(array) {
    return array.filter(Boolean);
  },

  bifurcate(array, filter) {
    return array.reduce((acc, v, i) => {
      acc[filter[i] ? 0 : 1].push(v);
      return acc;
    },[[], []]);
  },

  capAllElements(arr) {
    arr.forEach((el, index, array) => {
     array[index] = el.toUpperCase();
   });
   return arr;
 },

 intersection(array1, array2) {
   const s = new Set(array2);
   return array1.filter(x => s.has(x));
 },

 union(array1, array2) {
   return Array.from(new Set([...array1, ...array2]));
 },

 reject(predicate, array) {
  return array.filter((e) => !predicate(e));
},

sample(array) {
  return array[Math.floor(Math.random() * array.length)];
},

unique(array) {
  return [...new Set(array)];
},

none(array, predicate = Boolean) {
  return !array.some(predicate);
},

readFileLines(filename) {
  const fs = require('fs');
  return fs
            .readFileSync(filename)
            .toString('UTF8')
            .split('\n');
},

move(array, offset) {
  return [...array.slice(offset), ...array.slice(0,offset)];
},

isObjectLike(param) {
  return param !== null && typeof param === 'object';
},

// a set of ready to use filters designed to use with array.filter()
/* inBetween usage
let array = [1, 2, 3, 4, 5, 6, 7];
console.log(array.filter(inBetween(3, 6)));
// 3,4,5,6
*/
inBetween(a, b) {
  return function(element) {
    return element >= a && element <= b;
  };
},

/* inArray usage
let array = [1, 2, 3, 4, 5, 6, 7];
console.log(array.filter(inArray([1, 2, 10])) );
// 1,2
*/
inArray(array) {
  return function(element) {
    return array.includes(element);
  };
},

//helper function to sort by field
/* byField usage
let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" }
];
users.sort(byField('name'));
users.forEach(user => console.log(user.name));
// Ann, John, Pete
users.sort(byField('age'));
users.forEach(user => console.log(user.name));
// Pete, Ann, Joh
*/
byField(field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;    //uses comparefunction concept in array.sort()
},

//this is a function that will take another function as argument and convert it into a curried function
/*
Usage is as follows:
function abc(a, b, c) {
  return a + b + c;
}
var curriedAbc = curry(abc);
console.log(curriedAbc(1)(2)(3));  //6
*/

curry(fx) {
  let arity = fx.length;          //arity of a function is the number of arguments or operands that the function takes
  return function f1() {
    let args = Array.prototype.slice.call(arguments, 0);
    if(args.length >= arity) {
      return fx.apply(null, args);
    }
    else{
      return function f2() {
        let args2 = Array.prototype.slice.call(arguments, 0);
        return f1.apply(null, args.concat(args2));
      };
    }
  };
}
};

// Do not write or modify code below this line
module.exports = _;
