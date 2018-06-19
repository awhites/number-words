//@flow
import * as R from "ramda";

type NumberNameDef = {
  key: Object,
  value: string
};

// will convert 42 into [2, 4]
// each slot corresponds to its decimal position
// ie, 1's, 10's, 100's, etc
function splitNumberIntoArray(number: number) {
  return Array.from(number.toString())
    .map(Number)
    .reverse();
}

const numberNameLookup = [
  {
    key: { "1": 1 },
    value: "one"
  },
  {
    key: { "1": 2 },
    value: "two"
  },
  {
    key: { "1": 3 },
    value: "three"
  },
  {
    key: { "1": 4 },
    value: "four"
  },
  {
    key: { "1": 5 },
    value: "five"
  },
  {
    key: { "1": 6 },
    value: "six"
  },
  {
    key: { "1": 7 },
    value: "seven"
  },
  {
    key: { "1": 8 },
    value: "eight"
  },

  {
    key: { "1": 9 },
    value: "nine"
  },
  {
    key: { "1": 0, "10": 1 },
    value: "ten"
  },
  {
    key: { "1": 1, "10": 1 },
    value: "eleven"
  },
  {
    key: { "1": 2, "10": 1 },
    value: "twelve"
  },
  {
    key: { "1": 3, "10": 1 },
    value: "thirteen"
  },
  {
    key: { "1": 4, "10": 1 },
    value: "fourteen"
  },
  {
    key: { "1": 5, "10": 1 },
    value: "fifteen"
  },
  {
    key: { "1": 6, "10": 1 },
    value: "sixteen"
  },

  {
    key: { "1": 7, "10": 1 },
    value: "seventeen"
  },
  {
    key: { "1": 8, "10": 1 },
    value: "eighteen"
  },
  {
    key: { "1": 9, "10": 1 },
    value: "nineteen"
  },
  {
    key: { "1": 0, "10": 2 },
    value: "twenty"
  },
  {
    key: { "1": 0, "10": 3 },
    value: "thirty"
  },
  {
    key: { "1": 0, "10": 4 },
    value: "forty"
  },

  {
    key: { "1": 0, "10": 5 },
    value: "fifty"
  },
  {
    key: { "1": 0, "10": 6 },
    value: "sixty"
  },
  {
    key: { "1": 0, "10": 7 },
    value: "seventy"
  },

  {
    key: { "1": 0, "10": 8 },
    value: "eighty"
  },
  {
    key: { "10": 9 },
    value: "ninety"
  }
];

var numberSuffixLookup = {
  "100": "hundred",
  "1000": "thousand",
  "1000000": "million"
};

var numberSuffixConnectorsLookup = {
  "1": " ",
  "10": " ",
  "100": " and ",
  "1000": ", ",
  "1000000": ", "
};

const getNumberPlaceValuesMap = number => {
  const numberArray: Array<number> = splitNumberIntoArray(number);

  // to ensure that no 'undefined' values are set
  const getNumberAt = index => {
    return numberArray[index] ? numberArray[index] : 0;
  };

  return {
    "1": getNumberAt(0),
    "10": getNumberAt(1),
    "100": getNumberAt(2),
    "1000": combineNumberFromArray([
      getNumberAt(5),
      getNumberAt(4),
      getNumberAt(3)
    ]),
    "1000000": combineNumberFromArray([
      getNumberAt(8),
      getNumberAt(7),
      getNumberAt(6)
    ])
  };
};

const appendNumberSuffix = (placeValue: string, numberName: string): string => {
  var suffix = numberSuffixLookup[placeValue];
  return `${numberName} ${suffix}`;
};

const combineNumberFromArray = (_numberArray: Array<number>): number => {
  var numberArray = _numberArray.map(Number);
  var numberStr = numberArray.join("");
  return Number(numberStr);
};

const getPlaceValuesFromNumberNameMatches = (
  numberNameMatches: Array<NumberNameDef>
) => {
  return R.compose(
    R.uniq,
    Object.keys,
    R.mergeAll,
    R.map(R.prop("key"))
  )(numberNameMatches);
};

const appendConnectorPrefix = (name: string, placeValueKey: Object): string => {
  var placeValue = Object.keys(placeValueKey)[0];
  return name + numberSuffixConnectorsLookup[placeValue];
};
const convertNumberNameMapToSentence = (_numberNameMap, numberSuffixLookup) => {
  var numberNameMap = _numberNameMap.reverse();
  var nameArr = [];
  for (var i = 0; i < numberNameMap.length; i++) {
    var name = numberNameMap[i].value;
    if (numberNameMap[i + 1] !== undefined) {
      name = appendConnectorPrefix(name, numberNameMap[i].key);
    }
    nameArr.push(name);
  }
  return nameArr.join("");
};

const convertPlaceValuesMapToNumberArray = (placeValueMap): Array<number> => {
  var placeValues = R.map(Number, Object.keys(placeValueMap));
  return R.compose(
    R.reject(val => val === 0),
    R.map(placeValue => placeValue * placeValueMap[placeValue])
  )(placeValues);
};

const getAllMatchesFromNumberNameLookup = (numberNameLookup, placeValueMap) => {
  var numberNameMatches = [];
  var rawNumbers: Array<number> = convertPlaceValuesMapToNumberArray(
    placeValueMap
  );
  for (var i = 0; i < numberNameLookup.length; i++) {
    var numberNameDef = numberNameLookup[i];
    var numberNameKey = numberNameDef.key;

    var numberNameNumbers = convertPlaceValuesMapToNumberArray(numberNameKey);
    var intersection = R.intersection(rawNumbers, numberNameNumbers);
    if (R.equals(intersection, numberNameNumbers)) {
      numberNameMatches.push(numberNameDef);
    }
  }

  return numberNameMatches;
};

const deduplicateNumberNameMatches = numberNameMatches => {
  // get highest place value
  var highestAggregatePlaceValue = {};
  for (let i = 0; i < numberNameMatches.length; i++) {
    let keyDef = numberNameMatches[i].key;
    for (var placeValue in keyDef) {
      if (!highestAggregatePlaceValue[placeValue])
        highestAggregatePlaceValue[placeValue] = keyDef[placeValue];
    }
  }
  for (let j = 0; j < numberNameMatches.length; j++) {
    let keyDef = numberNameMatches[j].key;
    if (R.equals(keyDef, highestAggregatePlaceValue)) {
      numberNameMatches = [numberNameMatches[j]];
    }
  }
  return numberNameMatches;
};

const getMatchingNumberNamesFromLookup = (placeValueMap, numberNameLookup) => {
  var numberNameMatches = [];

  numberNameMatches = getAllMatchesFromNumberNameLookup(
    numberNameLookup,
    placeValueMap
  );

  numberNameMatches = deduplicateNumberNameMatches(numberNameMatches);

  return numberNameMatches;
};

const mapPlaceValuesToNumberNames = (
  placeValueMap: Object,
  numberNameLookup: Array<Object>
) => {
  var numberNameMatches = [];
  for (var placeValue in placeValueMap) {
    numberNameMatches = numberNameMatches.concat(
      getMatchingNumberNamesFromLookup(placeValueMap, numberNameLookup)
    );
    numberNameMatches = R.uniq(numberNameMatches);

    // evaluate if number needs to be broken down further
    var placeValues = getPlaceValuesFromNumberNameMatches(numberNameMatches);
    if (!R.contains(placeValue, placeValues) && placeValueMap[placeValue] > 0) {
      var newPlaceValuesMap = getNumberPlaceValuesMap(
        placeValueMap[placeValue]
      );

      var newNumberNameMap: Array<NumberNameDef> = mapPlaceValuesToNumberNames(
        newPlaceValuesMap,
        numberNameLookup
      );

      var numberStr: string = convertNumberNameMapToSentence(
        newNumberNameMap,
        numberSuffixLookup
      );

      numberNameMatches.push({
        key: {
          [placeValue]: placeValueMap[placeValue]
        },
        value: appendNumberSuffix(placeValue, numberStr)
      });
    }
  }

  return numberNameMatches;
};

function parseNumberAsSentence(number: number): string {
  var placeValues: Object = getNumberPlaceValuesMap(number);
  var numberNameMap: Array<NumberNameDef> = mapPlaceValuesToNumberNames(
    placeValues,
    numberNameLookup
  );
  return convertNumberNameMapToSentence(numberNameMap, numberNameLookup);
}

export default parseNumberAsSentence;
