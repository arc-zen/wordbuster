// import
// import { parse } from "https://deno.land/std@0.202.0/flags/mod.ts";
import * as colors from "https://deno.land/std@0.206.0/fmt/colors.ts";
import dictlist from "../data/dict.json" with { type: "json" }
// args
// const prompt = Deno.args[1].toUpperCase();
// const flags = parse(Deno.args, {
//     string: ["lc", "lettercount"]
// });
// the meat
const words = dictlist.words;
function wirecutter(prompt: string, lettercount: number | undefined) {
    const rgxp = new RegExp(prompt, "g");
    if (lettercount) {
        const lcrgxp = new RegExp(`^.{${lettercount}}$`, "gm");
        return words.filter((value) => rgxp.test(value) && lcrgxp.test(value))
    }
    else return words.filter((value) => rgxp.test(value));
}
function defuse(prompt: string, lc: number | undefined) {
    const found = wirecutter(prompt, lc ? lc : undefined);
    console.log(`Found ${colors.yellow(found.length.toString())} words matching ${colors.yellow(colors.bold(prompt))}${lc ? ` with letter count ${colors.yellow(lc.toString())}` : ""}:`);
    let i = 0;
    for (const word of found) {
        console.log(`${colors.blue(colors.bold(word))} (${word.length})`)
        if (i > 10) {
            console.log(colors.gray(colors.italic(`and ${found.length - 10} more...`)));
            break;
        }
        i++;
    }
    if (found.length >= 10) console.log(`A random one is ${colors.green(found[Math.floor(Math.random() * found.length-1)])}`);
}
export default defuse;
export { wirecutter };