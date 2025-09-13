import { z } from "zod";

// Person schema
export const PersonRowSchema = z
    .tuple([z.string(), z.coerce.number()])
    .transform(([name, age]) => ({ name, age }));

// Food schema
export const FoodSchema = z
    .tuple([z.string(), z.coerce.number(), z.coerce.boolean()])
    .transform(([name, price, vegetarian]) => ({ name, price, vegetarian }));

// Basketball player schema
export const PlayerSchema = z
    .tuple([z.string(), z.enum(["G", "F", "C"]), z.coerce.number()])
    .transform(([name, position, points]) => ({ name, position, points }));
