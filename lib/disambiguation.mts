export interface DisambiguationGame {
    bggid: number;
    name: string;
}

export interface DisambiguationItem {
    expansion: DisambiguationGame;
    basegames: DisambiguationGame[];
}

export interface AmbiguousPlay extends DisambiguationGame {
    year: number;
}

export interface DisambiguationData {
    geek: string;
    items: DisambiguationItem[];
    plays: AmbiguousPlay[];
}