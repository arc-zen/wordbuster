import * as colors from "https://deno.land/std@0.206.0/fmt/colors.ts";
async function definition(prompt: string) {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${prompt}`);
    const json = await resp.json();
    if (json.title) {
        console.log(`${colors.gray("No word found for:")} ${colors.red(colors.bold(prompt))}`);
        return;
    }
    const word = json[0];
    console.log(`${colors.blue(colors.bold(word.word.toUpperCase()))} ${word.phonetic ? colors.gray(word.phonetic) : ""}`);
    word.origin ? console.log(`    ${colors.gray(word.origin)}`) : null;
    for (const meaning of word.meanings) {
        console.log(`${colors.gray(meaning.partOfSpeech.toUpperCase())} >`);
        for (const definitions of meaning.definitions) {
            console.log(` ${colors.green(definitions.definition)}`);
            definitions.example ? console.log(colors.gray(`  "${definitions.example}"`)) : null;
            !(definitions.synonyms?.length == 0) ? console.log(`    S: ${colors.gray(definitions.synonyms)}`) : null;
            !(definitions.antonyms?.length == 0) ? console.log(`    A: ${colors.gray(definitions.antonyms)}`) : null;

        }
    }
}
export default definition;