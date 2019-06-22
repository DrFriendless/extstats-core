export interface Identity {
  jwt: string;
}

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
  first?: boolean;
  config?: UserConfig;
  jwt?: Decoded;
  userName: string;
}

// this is everything that we store.
export interface PersonalData {
  userData: UserData | undefined;
  allData: object | undefined;
  error: string | undefined;
}

export interface Decoded {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: string;
  sub: string;
  aud: string;
  iat: number;
  exp: number;
  at_hash: string;
  nonce: string;
}

export interface UserConfig {
  usernames: string[];
  buddies: BuddySet[];
}

