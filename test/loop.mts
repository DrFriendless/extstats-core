import {
    coalescePlays, getProvableBasegames,
    loadExpansionData, loadGameNames,
    type NormalisedPlays,
    toWorkingPlay,
    type WorkingNormalisedPlays
} from "./library.mts";
import {ExpansionData} from "../lib/expansion-data.mts";
import { flatten } from "lodash-es";

// test why sometimes we can't infer new plays

const ed = await loadExpansionData();
const bug1: NormalisedPlays[] = [
    {"month":12,"year":2016,"geek":871,"date":27,"game":149758,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":146631,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":150072,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":149925,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":146632,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":142423,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":144873,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":149261,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":150074,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":133038,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":139037,"quantity":1,"expansionPlay":false,"location":"iOS Device"}
];
const bug: NormalisedPlays[] = [
    {"month":12,"year":2016,"geek":927,"date":13,"game":13928,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":77423,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":98113,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":176058,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":137773,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":158969,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":95338,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":134946,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":174565,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":188228,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":119640,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":129480,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":107933,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":102875,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":112064,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":121900,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":191436,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":160464,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":178862,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":142875,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":139413,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":100092,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":180695,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":133167,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":153130,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":182930,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":98634,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":130715,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":123695,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":94288,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":177163,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":117929,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":164313,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":140917,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":158019,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":110193,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":147723,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":132020,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":189625,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":154493,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":177608,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":164665,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":146574,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":172680,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":114351,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":156416,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":927,"date":13,"game":19988,"quantity":1,"expansionPlay":false,"location":""}
];
const gameNames: Record<number, string> = await loadGameNames();

// figure out the canonical list of plays for a single geek on a single date
function inferExtraPlays(initialPlays: NormalisedPlays[], expansionData: ExpansionData): WorkingNormalisedPlays[] {
    let current = initialPlays.map(play => toWorkingPlay(expansionData, play));
    console.log("Starting with:");
    current.forEach(p => console.log(wpToText(p)));
    console.log();
    current = coalescePlays(current);
    let iterations = 0;
    while (iterations < 50) {
        iterations++;
        const newPlays = inferNewPlays(current, expansionData);
        if (!newPlays) return current;
        console.log("Now we have:");
        newPlays.forEach(p => console.log(wpToText(p)));
        console.log();
        current = newPlays;
    }
    console.log("Too many iterations");
    console.log(JSON.stringify(initialPlays));
    return current;
}

function wpToText(p: WorkingNormalisedPlays): string {
    return `${p.year}-${p.month}-${p.date} ${gameNames[p.game]} [${p.expansions}]`;
}

function inferNewPlays(current: WorkingNormalisedPlays[], expansionData: ExpansionData): WorkingNormalisedPlays[] | undefined {
    const expansionPlays = current.filter(play => play.isExpansion);
    for (const expansionPlay of expansionPlays) {
        for (const basegamePlay of current.filter(p => !Object.is(expansionPlay, p))) {
            const couldExpand = expansionData.isBasegameOf(basegamePlay.game, expansionPlay.game) ||
                expansionData.isAnyBasegameOf(basegamePlay.expansions, expansionPlay.game);
            if (couldExpand && basegamePlay.expansions.indexOf(expansionPlay.game) < 0) {
                // basegamePlay could have included expansionPlay as an expansion, so we're going to say that it did
                const newQuantity = Math.min(expansionPlay.quantity, basegamePlay.quantity);
                expansionPlay.quantity -= newQuantity;
                basegamePlay.quantity -= newQuantity;
                const newPlay: WorkingNormalisedPlays = {
                    quantity: newQuantity,
                    game: basegamePlay.game,
                    geek: basegamePlay.geek,
                    date: basegamePlay.date,
                    month: basegamePlay.month,
                    year: basegamePlay.year,
                    location: basegamePlay.location,
                    isExpansion: basegamePlay.isExpansion,
                    expansions: flatten([expansionPlay.game, expansionPlay.expansions, basegamePlay.expansions])
                };
                const newPlays = current.filter(p => !Object.is(p, basegamePlay) && !Object.is(p, expansionPlay));
                newPlays.push(newPlay);
                if (expansionPlay.quantity > 0) newPlays.push(expansionPlay);
                if (basegamePlay.quantity > 0) newPlays.push(basegamePlay);
                return newPlays;
            }
        }
        // we couldn't find a play which might be a basegame play - can we guess one?
        const basegame = expansionData.getUniqueBasegame(expansionPlay.game);
        if (basegame) {
            const expansions = expansionPlay.expansions.slice();
            expansions.push(expansionPlay.game);
            const newPlay: WorkingNormalisedPlays = {
                quantity: expansionPlay.quantity,
                game: basegame,
                geek: expansionPlay.geek,
                date: expansionPlay.date,
                month: expansionPlay.month,
                year: expansionPlay.year,
                location: expansionPlay.location,
                isExpansion: expansionData.isExpansion(basegame),
                expansions
            };
            const newPlays = current.filter(p => !Object.is(p, expansionPlay));
            newPlays.push(newPlay);
            return newPlays;
        } else {
            const provable = getProvableBasegames(expansionPlay.game, expansionData);
            if (provable.length > 0) {
                const basegame = provable[0];
                const expansions = expansionPlay.expansions.slice();
                expansions.push(expansionPlay.game);
                expansions.push(...provable.slice(1));
                const newPlay: WorkingNormalisedPlays = {
                    quantity: expansionPlay.quantity,
                    game: basegame,
                    geek: expansionPlay.geek,
                    date: expansionPlay.date,
                    month: expansionPlay.month,
                    year: expansionPlay.year,
                    location: expansionPlay.location,
                    isExpansion: expansionData.isExpansion(basegame),
                    expansions
                };
                const newPlays = current.filter(p => !Object.is(p, expansionPlay));
                newPlays.push(newPlay);
                return newPlays;
            }
        }
    }
    return undefined;
}

inferExtraPlays(bug, ed);