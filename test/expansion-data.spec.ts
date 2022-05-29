import {ExpansionData} from "../lib";

describe('isExpansion works', () => {
    it('should say yes or no', () => {
        const ed = new ExpansionData([ { basegame: 1, expansion: 10 }]);
        expect(ed.isExpansion(10)).toBe(true);
        expect(ed.isExpansion(1)).toBe(false);
        expect(ed.isExpansion(2)).toBe(false);
    })
});

describe('test indexing', () => {
   it('', () => {
       const ed = new ExpansionData([ { basegame: 1, expansion: 10 }]);
       expect(ed.getBasegames(10)).toStrictEqual([1]);
       expect(ed.getUniqueBasegame(10)).toBe(1);
       expect(ed.getUniqueBasegame(2)).toBe(undefined);
   })
});