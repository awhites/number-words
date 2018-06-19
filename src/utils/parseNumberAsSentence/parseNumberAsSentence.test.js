import parseNumberAsSentence from "./index";

it("does the bear minimum to pass this code challenge...", () => {
  expect(parseNumberAsSentence(56945781)).toEqual(
    "fifty six million, nine hundred and forty five thousand, seven hundred and eighty one"
  );
});

it("formats correct sentence for 1s", () => {
  expect(parseNumberAsSentence(1)).toEqual("one");
  expect(parseNumberAsSentence(2)).toEqual("two");
  expect(parseNumberAsSentence(3)).toEqual("three");
  expect(parseNumberAsSentence(4)).toEqual("four");
  expect(parseNumberAsSentence(5)).toEqual("five");
  expect(parseNumberAsSentence(6)).toEqual("six");
  expect(parseNumberAsSentence(7)).toEqual("seven");
  expect(parseNumberAsSentence(8)).toEqual("eight");
  expect(parseNumberAsSentence(9)).toEqual("nine");
});

it("formats correct sentence for 10s", () => {
  expect(parseNumberAsSentence(10)).toEqual("ten");
  expect(parseNumberAsSentence(21)).toEqual("twenty one");
  expect(parseNumberAsSentence(33)).toEqual("thirty three");
  expect(parseNumberAsSentence(42)).toEqual("forty two");
  expect(parseNumberAsSentence(54)).toEqual("fifty four");
  expect(parseNumberAsSentence(65)).toEqual("sixty five");
  expect(parseNumberAsSentence(76)).toEqual("seventy six");
  expect(parseNumberAsSentence(87)).toEqual("eighty seven");
  expect(parseNumberAsSentence(99)).toEqual("ninety nine");
});

it("formats correct sentence for 100s", () => {
  expect(parseNumberAsSentence(100)).toEqual("one hundred");
  expect(parseNumberAsSentence(221)).toEqual("two hundred and twenty one");
  expect(parseNumberAsSentence(333)).toEqual("three hundred and thirty three");
  expect(parseNumberAsSentence(442)).toEqual("four hundred and forty two");
  expect(parseNumberAsSentence(554)).toEqual("five hundred and fifty four");
  expect(parseNumberAsSentence(665)).toEqual("six hundred and sixty five");
  expect(parseNumberAsSentence(776)).toEqual("seven hundred and seventy six");
  expect(parseNumberAsSentence(887)).toEqual("eight hundred and eighty seven");
  expect(parseNumberAsSentence(999)).toEqual("nine hundred and ninety nine");
});

it("formats correct sentence for 1000s", () => {
  expect(parseNumberAsSentence(1102)).toEqual(
    "one thousand, one hundred and two"
  );
  expect(parseNumberAsSentence(32221)).toEqual(
    "thirty two thousand, two hundred and twenty one"
  );
  expect(parseNumberAsSentence(433333)).toEqual(
    "four hundred and thirty three thousand, three hundred and thirty three"
  );
});

it("formats correct sentence for 1000000s", () => {
  expect(parseNumberAsSentence(1000000)).toEqual("one million");
  expect(parseNumberAsSentence(1300000)).toEqual(
    "one million, three hundred thousand"
  );
  expect(parseNumberAsSentence(31342345)).toEqual(
    "thirty one million, three hundred and forty two thousand, three hundred and forty five"
  );
  expect(parseNumberAsSentence(999999999)).toEqual(
    "nine hundred and ninety nine million, nine hundred and ninety nine thousand, nine hundred and ninety nine"
  );
});
