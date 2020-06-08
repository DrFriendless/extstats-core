import {some} from "lodash";
import {mapValues} from "lodash";
import {groupBy} from "lodash";

export interface ExpansionRow {
    basegame: number;
    expansion: number;
}

export class ExpansionData {
    private readonly gameToExpansions: { [game: number]: number[] };
    private readonly expansionToBaseGames: { [game: number]: number[] };

    constructor(rows: ExpansionRow[]) {
        this.gameToExpansions = mapValues(groupBy(rows, (row: ExpansionRow) => row.basegame), (rs: ExpansionRow[]) => rs.map(row => row.expansion));
        this.expansionToBaseGames = mapValues(groupBy(rows, (row: ExpansionRow) => row.expansion), (rs: ExpansionRow[]) => rs.map(row => row.basegame));
    }

    isExpansion(game: number): boolean {
        return !!this.expansionToBaseGames[game];
    }

    isBasegameOf(maybeBaseGame: number, maybeExpansion: number): boolean {
        const exps = this.gameToExpansions[maybeBaseGame] as number[];
        return exps && exps.indexOf(maybeExpansion) >= 0;
    }

    isAnyBasegameOf(maybeBaseGames: number[], maybeExpansion: number): boolean {
        const basegames = this.expansionToBaseGames[maybeExpansion] as number[];
        return basegames && some(maybeBaseGames, (mbg: number) => basegames.indexOf(mbg) >= 0);
    }

    getUniqueBasegame(expansion: number): number | undefined {
        const basegames = this.expansionToBaseGames[expansion];
        if (basegames && basegames.length == 1) return basegames[0];
        return undefined;
    }

    getBasegames(expansion: number): number[] {
        return this.expansionToBaseGames[expansion] || [];
    }

    getPossibleBasegameChains(expansion: number, inProgress: number[] = []): number[][] {
        if (!this.isExpansion(expansion)) return [[]];
        // need to avoid loops here.
        if (inProgress.indexOf(expansion) >= 0) return [];
        inProgress.push(expansion);
        const result: number[][] = [];
        const bgs = this.getBasegames(expansion);
        for (const bg of bgs) {
            const chains = this.getPossibleBasegameChains(bg, inProgress);
            for (const chain of chains) {
                chain.push(bg);
                result.push(chain);
            }
        }
        if (bgs.length === 0) {
            // we don't know the base game because it's not in our data
            return [[expansion]];
        }
        inProgress.pop();
        return result;
    }
}
