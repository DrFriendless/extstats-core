import * as _ from "lodash-es";

export interface ExpansionRow {
    basegame: number;
    expansion: number;
}

export class ExpansionData {
    private readonly rows: ExpansionRow[];
    private readonly expansions: Set<Number>;
    private gameToExpansions: { [game: number]: number[] } | undefined;
    private expansionToBaseGames: { [game: number]: number[] } | undefined;

    constructor(rows: ExpansionRow[]) {
        this.rows = rows;
        this.expansions = new Set<Number>(rows.map(row => row.expansion));
    }

    private init(): void {
        if (!this.gameToExpansions) {
            // this takes over a second to run! There are 25000+ rows in this.rows...
            this.gameToExpansions = _.mapValues(_.groupBy(this.rows, row => row.basegame), (rs: ExpansionRow[]) => rs.map(row => row.expansion));
            this.expansionToBaseGames = _.mapValues(_.groupBy(this.rows, row => row.expansion), (rs: ExpansionRow[]) => rs.map(row => row.basegame));
            this.rows.splice(0);
        }
    }

    isExpansion(game: number): boolean {
        return this.expansions.has(game);
    }

    isBasegameOf(maybeBaseGame: number, maybeExpansion: number): boolean {
        this.init();
        if (!this.gameToExpansions) return false;
        const exps = this.gameToExpansions[maybeBaseGame];
        return exps && exps.indexOf(maybeExpansion) >= 0;
    }

    isAnyBasegameOf(maybeBaseGames: number[], maybeExpansion: number): boolean {
        this.init();
        if (!this.expansionToBaseGames) return false;
        const basegames = this.expansionToBaseGames[maybeExpansion];
        return basegames && _.some(maybeBaseGames, (mbg: number) => basegames.indexOf(mbg) >= 0);
    }

    getUniqueBasegame(expansion: number): number | undefined {
        this.init();
        if (!this.expansionToBaseGames) return undefined;
        const basegames = this.expansionToBaseGames[expansion];
        if (basegames && basegames.length == 1) return basegames[0];
        return undefined;
    }

    getBasegames(expansion: number): number[] {
        this.init();
        if (!this.expansionToBaseGames) return [];
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
