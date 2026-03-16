export interface WarTableDatabaseRow {
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
    gindex: number;
    hrindex: number;
    preordered: number;
}

export interface RankingTableDatabaseRow {
    game: number;
    game_name: string;
    total_ratings: number;
    num_ratings: number;
    bgg_ranking: number;
    bgg_rating: number;
    normalised_ranking: number;
    total_plays: number;
    ranking: number;
    hindex: number;
    gindex: number;
}
