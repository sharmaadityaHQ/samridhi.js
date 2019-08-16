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

  arrayReverse(array, size) {
    let revArray = [];
    for (let i = size; i >= 0; i--) {
      revArray.push(array[i]);
    }
    return revArray;
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
  }
};

// Do not write or modify code below this line
module.exports = _;
