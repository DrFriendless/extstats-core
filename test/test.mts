import {ExpansionData, type ExpansionRow} from "../lib/expansion-data.mts";
import fs from 'fs';
import readline from 'readline';

async function loadExpansionData(): Promise<ExpansionData> {
    const fileStream = fs.createReadStream('expansions.csv');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const rows: ExpansionRow[] = [];
    for await (const line of rl) {
        if (line.indexOf(",") >= 0) {
            const fs = line.split(",");
            rows.push({ basegame: parseInt(fs[0]), expansion: parseInt(fs[1]) });
        }
    }
    return new ExpansionData(rows);
}

const ed = await loadExpansionData();
console.log(ed.getBasegames(137762));
