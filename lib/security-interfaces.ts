export interface Identity {
  jwt: string;
}

export interface UserData {
  username: string | undefined;
  first: boolean;
  config: UserConfig;
  jwt: Decoded;
}

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

