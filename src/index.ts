import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";
import definition from "./definition.ts";
import defuse from "./defuse.ts";
if (!Deno.args[0]) {
    throw new Error("please supply args");
}
const prompt = Deno.args[1].toUpperCase();
const flags = parse(Deno.args, {
    string: ["lc", "lettercount"]
});
switch (Deno.args[0]) {
    case "definition":
    case "d":
        definition(prompt);
        break;
    case "solve":
    case "s":
        defuse(prompt, flags.lc ? parseInt(flags.lc) : undefined);
        break;
}