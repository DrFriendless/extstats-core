import type { GameData, GamePlays } from "./collection-interfaces.mjs";

export function roundRating(r: number): number {
    let rating = Math.round(r);
    if (rating < 1) rating = 1;
    if (rating > 10) rating = 10;
    return rating;
}

type HasBGGID = { bggid: number };

export function makeGamesIndex(games: GameData[]): { [bggid: number]: GameData } {
    const result = {} as  { [bggid: number]: GameData };
    if (games) games.forEach(gd => result[gd.bggid] = gd);
    return result;
}

export function makePlaysIndex(plays: GamePlays[]): { [bggid: number]: GamePlays } {
    const result: { [bggid: number]: GamePlays } = {};
    if (plays) plays.forEach(gp => result[gp.game] = gp);
    return result;
}

export function makeIndex<C extends HasBGGID>(games: C[]): Record<string, C> {
    const result: Record<string, C> = {};
    if (games) games.forEach(gd => result[gd.bggid] = gd);
    return result;
}
