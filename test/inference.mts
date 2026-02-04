import {
    coalescePlays, getProvableBasegames,
    loadExpansionData, loadGameNames,
    type NormalisedPlays,
    toWorkingPlay,
    type WorkingNormalisedPlays
} from "./library.mts";
import {ExpansionData} from "../lib/expansion-data.mts";
import { flatMap, mapValues, groupBy } from "lodash-es";

// test why sometimes we can't infer new plays

const ed = await loadExpansionData();
const bug2: NormalisedPlays[] = [
    {"month":12,"year":2016,"geek":871,"date":27,"game":311988,"quantity":1,"expansionPlay":false,"location":"iOS Device"},
    {"month":12,"year":2016,"geek":871,"date":27,"game":323382,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":871,"date":28,"game":311988,"quantity":1,"expansionPlay":false,"location":""},
    {"month":12,"year":2016,"geek":871,"date":28,"game":323382,"quantity":1,"expansionPlay":false,"location":"home"},
    {"month":12,"year":2016,"geek":871,"date":29,"game":323382,"quantity":1,"expansionPlay":false,"location":"Greenland"},
    {"month":12,"year":2016,"geek":871,"date":30,"game":323382,"quantity":1,"expansionPlay":false,"location":""},
]
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

function subtractPlays(src: WorkingNormalisedPlays[], played: number[], quantity: number) {
    src.forEach(p => {
        if (played.indexOf(p.game) >= 0)  p.quantity -= quantity;
    });
    return src.filter(p => p.quantity > 0);
}

function couldExpand(expansionData: ExpansionData, bgp: WorkingNormalisedPlays, e: WorkingNormalisedPlays): boolean {
    return (expansionData.isBasegameOf(bgp.game, e.game) || expansionData.isAnyBasegameOf(bgp.expansions, e.game)) &&
        bgp.expansions.indexOf(e.game) < 0;
}

function inferNewPlaysAtLocation(current: WorkingNormalisedPlays[], wildcards: WorkingNormalisedPlays[], expansionData: ExpansionData):
    { playsAtLocation: WorkingNormalisedPlays[], remainingWildcards: WorkingNormalisedPlays[], anyModification: boolean } {
    let baseGameWildcards = wildcards.filter(play => !play.isExpansion);
    let expansionWildcards = wildcards.filter(play => play.isExpansion);
    let expansionPlays = current.filter(play => play.isExpansion);
    const baseGamePlays = current.filter(play => !play.isExpansion);

    let anyModification = false;
    // allocate expansions to base game plays at the location
    let modified = true;
    while (modified) {
        modified = false;
        if (expansionWildcards.length === 0 && expansionPlays.length === 0) break;
        for (const bgp of baseGamePlays) {
            // look for expansion plays at the same location
            const eps = expansionPlays.filter(ep => couldExpand(expansionData, bgp, ep));
            // expansions for which we have found an expansion play
            const addedExpansions = eps.map(ep => ep.game);
            const weps = expansionWildcards
                .filter(wep => couldExpand(expansionData, bgp, wep))
                .filter(wep => addedExpansions.indexOf(wep.game) < 0);
            const min = Math.min(bgp.quantity, ...eps.map(ep => ep.quantity), ...weps.map(wep => wep.quantity));
            if ((eps.length > 0 || weps.length > 0) && min > 0) {
                modified = true;
                anyModification = true;
                let newBgp: WorkingNormalisedPlays | undefined = undefined;
                if (min < bgp.quantity) {
                    newBgp = {...bgp};
                    newBgp.quantity -= min;
                    bgp.quantity = min;
                }
                // update bgp in-situ
                eps.forEach(ep => bgp.expansions.push(ep.game));
                weps.forEach(wep => bgp.expansions.push(wep.game));
                expansionPlays = subtractPlays(expansionPlays, eps.map(ep => ep.game), min);
                expansionWildcards = subtractPlays(expansionWildcards, weps.map(wep => wep.game), min);
                if (newBgp) baseGamePlays.push(newBgp);
                break;
            }
        }
    }
    // allocate expansion plays at the location to wildcard base game plays
    modified = true;
    while (modified) {
        modified = false;
        if (expansionPlays.length === 0) break;
        for (const bgp of baseGameWildcards) {
            const eps = expansionPlays.filter(ep => couldExpand(expansionData, bgp, ep));
            if (eps.length > 0) {
                // expansions for which we have found an expansion play
                const addedExpansions = eps.map(ep => ep.game);
                const weps = expansionWildcards
                    .filter(wep => couldExpand(expansionData, bgp, wep))
                    .filter(wep => addedExpansions.indexOf(wep.game) < 0);
                const min = Math.min(bgp.quantity, ...eps.map(ep => ep.quantity), ...weps.map(wep => wep.quantity));
                if (min > 0) {
                    modified = true;
                    anyModification = true;
                    let newBgp: WorkingNormalisedPlays | undefined = undefined;
                    if (min < bgp.quantity) {
                        newBgp = {...bgp};
                        newBgp.quantity -= min;
                        bgp.quantity = min;
                    }
                    // update bgp in-situ
                    bgp.location = eps[0].location;
                    baseGamePlays.push(bgp);
                    baseGameWildcards = baseGameWildcards.filter(p => !p.location);
                    eps.forEach(ep => bgp.expansions.push(ep.game));
                    weps.forEach(wep => bgp.expansions.push(wep.game));
                    expansionPlays = subtractPlays(expansionPlays, eps.map(ep => ep.game), min);
                    expansionWildcards = subtractPlays(expansionWildcards, weps.map(wep => wep.game), min);
                    if (newBgp) baseGameWildcards.push(newBgp);
                    break;
                } else {
                    console.log("Sometjing went wrong");
                }
            }
        }
    }
    return { playsAtLocation: baseGamePlays.concat(expansionPlays), remainingWildcards: baseGameWildcards.concat(expansionWildcards), anyModification}
}


function inferExtraPlaysForLocation(input: WorkingNormalisedPlays[], wildcards: WorkingNormalisedPlays[], expansionData: ExpansionData, baseGameDefaults: Record<string, number>):
    { plays: WorkingNormalisedPlays[], wildcardRemainder: WorkingNormalisedPlays[] } {
    let current = input;
    let wildcardRemainder = wildcards;
    let iterations = 0;
    while (iterations < 10) {
        iterations++;
        const { playsAtLocation, remainingWildcards, anyModification } = inferNewPlaysAtLocation(current, wildcardRemainder, expansionData);
        if (!anyModification) break;
        current = playsAtLocation;
        wildcardRemainder = remainingWildcards;
    }
    // try to invent base game plays for the other expansion plays
    const expansionPlaysAtLocation = current.filter(play => play.isExpansion);
    current = current.filter(play => !play.isExpansion);
    const unresolvableExpansionPlays: WorkingNormalisedPlays[] = [];
    while (expansionPlaysAtLocation.length > 0) {
        const ep = expansionPlaysAtLocation[0];
        let uniqueBaseGame = expansionData.getUniqueBasegame(ep.game);
        if (uniqueBaseGame === undefined) uniqueBaseGame = baseGameDefaults[ep.game];
        if (uniqueBaseGame !== undefined) {
            const newBgp: WorkingNormalisedPlays = { ...ep, game: uniqueBaseGame, isExpansion: false, expansions: [ep.game] };
            iterations = 0;
            let newPlays = [ newBgp ];
            while (iterations < 10) {
                iterations++;
                const { playsAtLocation, remainingWildcards, anyModification } = inferNewPlaysAtLocation(newPlays, wildcardRemainder, expansionData);
                if (!anyModification) break;
                newPlays = playsAtLocation;
                wildcardRemainder = remainingWildcards;
            }
            current = current.concat(newPlays);
        } else {
            unresolvableExpansionPlays.push(ep);
        }
        expansionPlaysAtLocation.splice(0, 1);
    }
    return { plays: current.concat(unresolvableExpansionPlays), wildcardRemainder };
}

function playDate(play: NormalisedPlays): string {
    return (play.year * 10000 + play.month * 100 + play.date).toString();
}

function splitPlaysByDateAndLocation(plays: NormalisedPlays[]): Record<string, NormalisedPlays[]>[] {
    const splitByDate: NormalisedPlays[][] = Object.values(groupBy(plays, playDate));
    return splitByDate.map(plays => groupBy(plays, p => (p.location || "").trim()))
}

function wpToText(p: WorkingNormalisedPlays): string {
    return `${p.year}-${p.month}-${p.date} ${gameNames[p.game]} [${p.expansions.map(i => gameNames[i])}] @${p.location}`;
}

function inferExtraPlays(initialPlays: Record<string, NormalisedPlays[]>, expansionData: ExpansionData, baseGameDefaults: Record<string, number>): WorkingNormalisedPlays[] {
    // turn the value of initialPlays into coalesced working plays
    const current: Record<string, WorkingNormalisedPlays[]> = mapValues(mapValues(initialPlays,
        plays => plays.map(p => toWorkingPlay(expansionData,p))), coalescePlays);
    let wildcards = current[""] || [];
    delete current[""];

    let result: WorkingNormalisedPlays[] = [];
    Object.values(current).forEach(forLoc => {
            const { plays, wildcardRemainder } = inferExtraPlaysForLocation(forLoc, wildcards, expansionData, baseGameDefaults);
            result = result.concat(plays);
            wildcards = wildcardRemainder;
        }
    );
    const { plays, wildcardRemainder } = inferExtraPlaysForLocation(wildcards, [], expansionData, baseGameDefaults)
    result = result.concat(plays);
    // wildcardRemainder will be empty anyway
    return result;
}

function test(data: NormalisedPlays[]) {
    const byDate: Record<string, NormalisedPlays[]>[] = splitPlaysByDateAndLocation(data);
    const result = flatMap(byDate.map((plays: Record<string, NormalisedPlays[]>) => inferExtraPlays(plays, ed, {})));
    console.log(result.map(wpToText));
}

test(bug);
test(bug1);
test(bug2);
