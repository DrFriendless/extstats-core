export function roundRating(r: number): number {
    let rating = Math.round(r);
    if (rating < 1) rating = 1;
    if (rating > 10) rating = 10;
    return rating;
}

export interface HasBGGID { bggid: number }

export function makeIndex<C extends HasBGGID>(games: C[]): Record<string, C> {
    const result: Record<string, C> = {};
    if (games) games.forEach(gd => result[gd.bggid] = gd);
    return result;
}
