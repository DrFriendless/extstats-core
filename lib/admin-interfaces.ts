export interface TypeCount {
   type: string;
   existing: number;
   waiting: number;
   unprocessed: number;
}

export interface SystemStats {
    userRows: number;
    gameRows: number;
    geekGamesRows: number;
    expansionRows: number;
    mechanics: number;
    categories: number;
    gameMechanics: number;
    gameCategories: number;
    notGames: number;
    fileRows: TypeCount[];
    ggForZero: number;
    distinctGGOwners: number;
    playsRows: number;
    normalisedPlaysRows: number;
}

export interface FAQCount {
    day: number;
    week: number;
    month: number;
    year: number;
    ever: number;
}

export interface NewsItem {
    id: number;
    date: string;
    html: string;
}

export interface FileToProcess {
    processMethod: string;
    url: string;
    bggid: number;
    geek: string;
    month: number;
    year: number;
    geekid: number;
}

export interface ToProcessElement extends FileToProcess {
    lastUpdate: any;
    nextUpdate: any;
    description: string;
    lastattempt: any;
    last_scheduled: any;
}