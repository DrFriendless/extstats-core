import { UserConfig } from "../lib/user-config.mts";

const ud1 = new UserConfig({});
ud1.set("user.name", "John");
console.log(ud1.getAll());