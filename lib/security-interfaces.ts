export interface Identity {
  jwt: string;
}

export class BuddySet {
    private readonly name: string;
    private readonly buddies: string[];

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
}

export interface UserData {
  username: string | undefined;
  first: boolean;
  buddies: BuddySet[];
  config: UserConfig;
  jwt: Decoded;
}

// this is everything that we store.
export interface PersonalData {
  userData: UserData | undefined;
  allData: object | undefined;
  error: string | undefined;
}

export interface Decoded {
  nickname: string;
  sub: string;
}

export class UserConfig {

}

