export interface GeekGameQuery {
    geek: string;
    query: string;
    extra?: string;
    format: string;
    vars: { THEM?: string, YEAR?: number, RATING?: number, MONTH?: number }
}

export interface GeekGame {
    bggid: number;
    rating: number;
    owned: boolean;
    wantToBuy: boolean;
    wantToPlay: boolean;
    preordered: boolean;
    prevOwned: boolean;
}

export interface SelectorMetadata {
    game: number;
    colour?: string;
    owner?: string;
    player?: string;
    rater?: string;
}

export class SelectorMetadataSet {
    private metadata: { [bggid: string]: SelectorMetadata } = {};

    public lookup(id: number): SelectorMetadata | undefined {
        return this.metadata[id.toString()];
    }

    public restrictTo(ids: number[]) {
        const newMetadata = {} as { [bggid: string]: SelectorMetadata };
        ids.forEach(id => {
           const sid = id.toString();
           if (this.metadata[sid]) {
               newMetadata[sid] = this.metadata[sid];
           }
        });
        this.metadata = newMetadata;
    }

    public add(game: number, key: string, value: string) {
        const sid = game.toString();
        if (!this.metadata[sid]) this.metadata[sid] = { game };
        (this.metadata[sid] as any)[key] = value;
    }

    public addIfNotPresent(game: number, key: string, value: string) {
        const sid = game.toString();
        if (this.metadata[sid] && !(this.metadata[sid] as any)[key]) (this.metadata[sid] as any)[key] = value;
    }
}

export interface GeekGameQueryResult {
    metadata: SelectorMetadataSet;
    geekGames: GeekGame[];
}

export interface GameData {
    bggid: number;
    name: string;
    bggRating: number;
    bggRanking: number;
    yearPublished: number;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    subdomain: string;
    weight: number;
    isExpansion: boolean;
}

export interface WarTableRow {
    geek: number;
    geekName: string;
    totalPlays: number;
    distinctGames: number;
    top50: number;
    sdj: number;
    owned: number;
    want: number;
    wish: number;
    trade: number;
    prevOwned: number;
    friendless: number;
    cfm: number;
    utilisation: number;
    tens: number;
    zeros: number;
    ext100: number;
    hindex: number;
    preordered: number;
}

export interface GamePlays {
    game: number;
    plays: number;
    expansion: boolean;
    firstPlay: number | undefined;
    lastPlay: number | undefined;
    distinctYears: number;
    distinctMonths: number;
}

export interface Collection {
    collection: GeekGame[];
    games: GameData[];
    metadata: SelectorMetadataSet;
    extra?: number[];
}

export interface CollectionWithPlays extends Collection {
    plays: GamePlays[];
    lastYearPlays: GamePlays[];
}

export interface CollectionWithMonthlyPlays extends Collection {
    plays: MonthlyPlays[];
}

export interface MonthlyPlays {
    year: number;
    month: number;
    game: number;
    expansion: boolean;
    quantity: number;
}

export interface GeekSummary {
    warData: WarTableRow | undefined;
    rated: number;
    average: number;
    monthsPlayed: number;
    error?: string;
    geekId?: number;
}