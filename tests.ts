import { assertEquals } from "https://deno.land/std@0.206.0/assert/mod.ts";
import { wirecutter } from "./defuse.ts";
import definition from "./definition.ts";
Deno.test("wirecutter should correctly get 6 words when prompted ZK", () => {
    assertEquals(wirecutter("ZK", undefined), ["BLITZKRIEG", "BRITZKA", "BUZKASHI", "KAZATZKA", "LANZKNECHT", "SITZKRIEG"]);
    assertEquals(wirecutter("ZK", undefined).length, 6);
})
Deno.test("definitions should throw when prompted nonsense (AHHAHABHBHBHB)", async () => {
    assertEquals(await definition("AHHAHABHBHBHB"), undefined);
})