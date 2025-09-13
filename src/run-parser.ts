import { parseCSV } from "./basic-parser";
import { PersonRowSchema } from "./schema"; // import schema

/*
  Example of how to run the parser outside of a test suite.
*/

const DATA_FILE = "./data/people.csv"; // update with your actual file name

async function main() {
  try {
    // Because the parseCSV function is async, we need to use await here as well.
    const results = await parseCSV(DATA_FILE, PersonRowSchema);

    console.log("Parsed CSV data:");
    // slice(1) to skip the header row
    for (const record of results.slice(1)) {
      console.log(record);
    }
  } catch (err) {
    // Runs if schema validation fails on any row
    console.error("Error parsing CSV:", err);
  }
}

main();
