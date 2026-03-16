export interface FileToProcess {
    id: number;
    processMethod: string;
    url: string;
    bggid: number;
    geek: string;
    month: number;
    year: number;
    geekid: number;
}

export interface PlaysToProcess {
    url: string;
    processMethod: string;
    geek: string;
    startYmdInc: string;
    endYmdInc: string;
    geekid: number;
}

export interface ToProcessElement extends FileToProcess {
    lastUpdate: any;
    nextUpdate: any;
    description: string;
    lastattempt: any;
    last_scheduled: any;
}