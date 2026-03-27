export class BuddySet {
    private name: string;
    private buddies: string[];

    constructor(name: string, buddies: string[]) {
        this.name = name;
        this.buddies = buddies;
    }

    public getName(): string {
        return this.name;
    }

    public getBuddies(): string[] {
        return this.buddies;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setBuddies(buddies: string[]) {
        this.buddies = buddies;
    }
}

export class UserConfig {
    constructor(private data: any) {
    }

    private locatePath(path: string) {
        const fields = path.split(".", 100);
        let curr = this.data;
        let parent = undefined;
        let f: string | undefined = undefined;
        for (const field of fields) {
            if (curr === undefined) {
                curr = {};
                parent[f!] = curr;
            }
            f = field;
            if (curr.hasOwnProperty(field)) {
                parent = curr;
                curr = curr[field] as object;
            } else {
                parent = curr;
                curr = undefined;
            }
        }
        return {curr, parent, f};
    }

    set<T>(path: string, value: T): void {
        let {curr, parent, f} = this.locatePath(path);
        parent[f!] = value;
    }

    maybeSet<T>(path: string, value: T): boolean {
        let {curr, parent, f} = this.locatePath(path);
        if (curr && value) {
            if ((typeof value === "string" || typeof value === "number") && (typeof value === typeof curr) && value === curr) return false;
        }
        parent[f!] = value;
        return true;
    }

    getAll(): any {
        return this.data;
    }

    get<T>(path: string, defolt: T): T {
        let {curr, parent, f} = this.locatePath(path);
        if (curr === undefined) {
            return defolt;
        } else {
            return curr;
        }
    }
}
