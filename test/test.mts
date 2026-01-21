import {loadExpansionData} from "./library.mts";

const ed = await loadExpansionData();
console.log(ed.getBasegames(137762));
