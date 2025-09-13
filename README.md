# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

    1. The output is only stored within an array. What if the user wants more structured data?
    2. The current implementation auto trims the value in the csv. What if the user wants to retain the whitespace?
    3. There is no data validation/error checking to prevent any issues
    4. We can't parse into different types. For example what if we wanted to parse  the data and then map everything to a string.

- #### Step 2: Use an LLM to help expand your perspective.

    Prompt 1: "I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What are some missing features or edge cases that I should consider? What improvements would make it easier for other developers to use in different kinds of apps?"

    Notes for Prompt 1: The LLM provided some interesting and useful considerations to think about while implementing this parser. It brought up delimiters, line endings such as \n, UTF-8, and headers. All considerations that would definitely improve the user experience when using the parser.

    Prompt 2 (Modified): "I’m working on a CSV parser in TypeScript that currently accepts a filename as input and converts rows into strings or objects. What improvements would make it easier for other developers to use in different kinds of apps? Would trying to include some sort of error handling create a more robust program? What if the user wants more structured data? Think of all missing features or edge cases that might arise."

    Modifications: In the second prompt I was more specific on what I would want to focus on for a parser: being able to handle bad data and structuring the data.

    How the results differed/or stayed the same: The results for the second prompt were a lot more specific. It provided the modified compoenents and also included code snippets implementing error handling and creating a schema to structure the data while also explaining in depth the reasons behind each improvement.

- #### Step 3: use an LLM to help expand your perspective.

    Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition.

    1. Header Handling (Functionality)
       Origin: Both

       User Story: As a user importing CSVs, I want the parser to reliably handle headers (auto-detect, validate, or supply my own) so that my downstream code can depend on stable, meaningful field names.

       Acceptance Criteria:
        - If headers=true, the first non-comment row becomes headers; duplicates are resolved predictably (e.g., name, name_2).
        - If requiredColumns are provided and missing, the parser surfaces a clear, actionable error (or warning in lenient mode).
        - Mixed or empty header cells are trimmed according to an option.

    2. Empty/Nullish Values (Functionality)
       Origin: Both

       User Story: As a user integrating messy CSV data, I want to define which textual values count as empty or null so that my application receives consistent null rather than misleading empty strings.

       Acceptance Criteria:
        - An option (e.g., nullish: string[]) maps values like "", "NA", "N/A" "null", "undefined" to null.
        - Mapping is applied after trimming (if enabled) and before type coercion/schema validation.
        - A per-column override allows different nullish sets by column (optional).

    3. Structuring Data (Extensibility)
       Origin: Me

       User Story: As a user consuming CSVs, I want the parser to output structured, typed objects (zod schema) so that I can safely use the data without writing my own validators.

    4. Data Sanitization (Functionality)
       Origin: LLM

       User Story: As a user exporting parsed data to spreadsheets, I want protection against CSV/Excel formula injection so that opening the file in spreadsheet software doesn’t execute unexpected formulas.

       Acceptance Criteria:
        - An opt-in flag (e.g., sanitizeForExcel) escapes cells beginning with =, +, -, or @ by prefixing a safe character (e.g., ').
        - Sanitization is applied only to string cells and is reversible/documented.

    Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.)

    At first, my ideas focused on keeping the parser flexible by supporting structured outputs, handling whitespace cleanly, and adding some basic error checking. After using the LLM, I got more concrete suggestions, like supporting different delimiters, handling various line endings, and adding stronger validation through schemas. The second prompt gave me more specific advice, including example code for error handling and structured data.

### Design Choices: I separated the schemas into their own file to help modularize the files a bit keeping things more organized.

#### Errors/Bugs: Most of the tests are failing but I'm pretty sure that's supposed to happen right now since parser isn't really implemented?

#### Tests: Tested a variety of different cases that could occur such as testing different types of schemas and parser behavior.

#### How To…

#### Team members and contributions (include cs logins): Heewon Seo (hseo25)

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI): Chat GPT used to prompt ideas and compare enhancements to my own.
#### Total estimated time it took to complete project: 2 hr
#### Link to GitHub Repo: 
