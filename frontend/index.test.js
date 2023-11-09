const { default: test, describe } = require("node:test");
const {
  restartGame,
  addToScoreBoard,
  openBoard,
  closeBoard,
  closeModal,
  openModal,
  retrieveScoreBoard,
} = require("./index");

test("restartGame -exists", () => {
  expect(restartGame).toBeDefined();
});

describe("restartGame -is a function", () => {
  expect(restartGame instanceof Function).toEqual(true);
});

test("openModal -exists", () => {
  expect(openModal).toBeDefined();
});

describe("openModal -is a function", () => {
  expect(openModal instanceof Function).toEqual(true);
});

test("closeModal -exists", () => {
  expect(closeModal).toBeDefined();
});

describe("closeModal -is a function", () => {
  expect(closeModal instanceof Function).toEqual(true);
});

test("addToScoreBoard -exists", () => {
  expect(addToScoreBoard).toBeDefined();
});

describe("addToScoreBoard -is a function", () => {
  expect(addToScoreBoard instanceof Function).toEqual(true);
});

test("retrieveScoreBoard -exists", () => {
  expect(retrieveScoreBoard).toBeDefined();
});

describe("retrieveScoreBoard -is a function", () => {
  expect(retrieveScoreBoard instanceof Function).toEqual(true);
});

test("openBoard -exists", () => {
  expect(openBoard).toBeDefined();
});

describe("openBoard -is a function", () => {
  expect(openBoard instanceof Function).toEqual(true);
});

test("closeBoard -exists", () => {
  expect(closeBoard).toBeDefined();
});

describe("closeBoard -is a function", () => {
  expect(closeBoard instanceof Function).toEqual(true);
});
