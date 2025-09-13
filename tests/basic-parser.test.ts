import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z, ZodError } from "zod";
import { PersonRowSchema, FoodSchema, PlayerSchema } from "../src/schema";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const FOOD_CSV_PATH = path.join(__dirname, "../data/food.csv");
const PLAYERS_CSV_PATH = path.join(__dirname, "../data/players.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)

  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parses empty field", async () => {
  const csv = "Alice, ,Bob";
  const result = parseCSV(csv); 
  expect(result).toEqual([["Alice", "", "Bob"]]);
});

test("parses quoted field", () => {
  const csv = '"Alice","Bob","Charlie"';
  const result = parseCSV(csv);
  expect(result).toEqual([["Alice", "Bob", "Charlie"]]);
});

test("parses commas in field", () => {
  const csv = '"Alice","Bob, Jr.","Charlie"';
  const result = parseCSV(csv);
  expect(result).toEqual([["Alice", "Bob, Jr.", "Charlie"]]);
});

test("parses rows with different column counts", () => {
  const csv = "name,age,city\nAlice,23";
  const result = parseCSV(csv);
  expect(result).toEqual([
    ["name", "age", "city"],
    ["Alice", "23"],
  ]);
});

test("parses newlines inside quotes", () => {
  const csv = `"Alice", "Bob\nSmith","Charlie"`;
  const result = parseCSV(csv);
  expect(result).toEqual([
    ["Alice", "Bob\nSmith", "Charlie"],
  ]);
});

test("parses trailing commas", () => {
  const csv = "Alice,Bob,Charlie,";
  const result = parseCSV(csv);
  expect(result).toEqual([["Alice", "Bob", "Charlie", ""]]);
});

// Test Schemas

// Person Schema
test("default case: returns raw string[][]", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH);

  expect(results).toEqual([
    ["name", "age"],
    ["Alice", "23"],
    ["Bob", "thirty"],
    ["Charlie", "25"],
    ["Nim", "22"],
  ]);
});

test("works with PersonRowSchema", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema);

  // Skip header row
  expect(results.slice(1)).toEqual([
    { name: "Alice", age: 23 },
    { name: "Bob", age: NaN }, // invalid num becomes NaN
    { name: "Charlie", age: 25 },
    { name: "Nim", age: 22 },
  ]);
});

test("throws error if schema requires valid numbers", async () => {
  const StrictSchema = z
    .tuple([z.string(), z.number().min(0)])
    .transform(([name, age]) => ({ name, age }));

  await expect(parseCSV(PEOPLE_CSV_PATH, StrictSchema)).rejects.toBeInstanceOf(ZodError);
});

// Food Schema
test("works with FoodSchema", async () => {
  const results = await parseCSV(FOOD_CSV_PATH, FoodSchema);

  expect(results.slice(1)).toEqual([
    { name: "Pizza", price: 12.5, vegetarian: true },
    { name: "Burger", price: 10, vegetarian: false },
  ]);
});

// Basketball Player Schema
test("works with PlayerSchema", async () => {
  const results = await parseCSV(PLAYERS_CSV_PATH, PlayerSchema);

  expect(results.slice(1)).toEqual([
    { name: "Curry", position: "G", points: 30 },
    { name: "Jokic", position: "C", points: 26 },
  ]);
});

// Empty file
test("empty file returns empty array", async () => {
  const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");
  const results = await parseCSV(EMPTY_CSV_PATH);

  expect(results).toEqual([]);
});