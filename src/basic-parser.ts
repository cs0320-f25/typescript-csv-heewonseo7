import * as fs from "fs";
import * as readline from "readline";
import { z } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */
export async function parseCSV(path: string): Promise<string[][]>;
export async function parseCSV<T>(
  path: string,
  schema: z.ZodType<T>
): Promise<T[]>;

export async function parseCSV<T>(
  path: string,
  schema?: z.ZodType<T>
): Promise<string[][] | T[]> {
  // This initial block of code reads from a file in Node.js. The "rl"
  // value can be iterated over in a "for" loop.
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  
  // Create an empty array to hold the results
  const rows: string[][] = [];
  
  // We add the "await" here because file I/O is asynchronous. 
  // We need to force TypeScript to _wait_ for a row before moving on. 
  // More on this in class soon!
  for await (const line of rl) {
    const values = line.split(",").map(v => v.trim());
    rows.push(values);
  }

  // If no schema provided, return raw string[][]
  if (!schema) {
    return rows;
  }

  // With schema: validate & transform each row into T
  const out: T[] = [];
  for (const raw of rows) {
    const parsed = schema.parse(raw); // throws on invalid rows
    out.push(parsed);
  }
  return out;
}
