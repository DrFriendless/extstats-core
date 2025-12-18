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

export interface UserData {
  config: any;
  userName: string;
  created: Date;
  lastLogin: Date | undefined;
  loginCount: number;
}

