import fs from 'fs';
import readline from 'readline';
import {ExpansionData, type ExpansionRow} from "../lib/expansion-data.mts";
import { flatten } from "lodash-es";

export interface NormalisedPlays {
    quantity: number;
    game: number;
    geek: number;
    date: number;
    month: number;
    year: number;
    baseplay?: number;
    expansionPlay: boolean;
    id?: number;
    location: string;
}

export interface WorkingNormalisedPlays {
    expansions: number[];
    isExpansion: boolean;
    quantity: number;
    game: number;
    geek: number;
    date: number;
    month: number;
    year: number;
    location: string;
}

export function toWorkingPlay(expansionData: ExpansionData, play: NormalisedPlays): WorkingNormalisedPlays {
    return {
        quantity: play.quantity,
        game: play.game,
        geek: play.geek,
        date: play.date,
        month: play.month,
        year: play.year,
        location: play.location,
        isExpansion: expansionData.isExpansion(play.game),
        expansions: []
    };
}

export async function loadExpansionData(): Promise<ExpansionData> {
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

export async function loadGameNames(): Promise<Record<number, string>> {
    const fileStream = fs.createReadStream('gamenames.csv');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    const result: Record<number, string> = {};
    for await (const line of rl) {
        if (line.startsWith("bggid")) continue;
        if (line.indexOf(",") >= 0) {
            const fs = line.split(",");
            result[parseInt(fs[0])] = fs[1];
        }
    }
    return result;
}

export function coalescePlays(initial: WorkingNormalisedPlays[]): WorkingNormalisedPlays[] {
    const byGame = splitBy(initial, wnp => wnp.game.toString());
    return flatten(byGame.map(plays => splitBy(plays, ps => ps.location))).map(sumQuantities);
}

export function splitBy<T>(items: T[], iteratee: (value: T) => string): T[][] {
    return Object.values(groupBy(items, iteratee));
}

export function groupBy<T>(items: T[], sortFunc: (x: T) => string): Record<string, T[]> {
    const result: Record<string, T[]> = {};
    for (const item of items) {
        const s = sortFunc(item);
        if (!result.hasOwnProperty(s)) {
            result[s] = [];
        }
        result[s].push(item);
    }
    return result;
}

export function getProvableBasegames(game: number, ed: ExpansionData): number[] {
    const chains = ed.getPossibleBasegameChains(game);
    if (chains.length === 0) return [];
    if (chains.length === 1) return chains[0];
    let result = chains[0];
    for (const chain of chains.slice(1)) {
        result = result.filter(g => chain.indexOf(g) >= 0);
    }
    return result;
}

export function sumQuantities(plays: WorkingNormalisedPlays[]): WorkingNormalisedPlays {
    if (plays.length === 1) return plays[0];
    plays[0].quantity = plays.map(p => p.quantity).reduce((a, b) => a + b);
    return plays[0];
}