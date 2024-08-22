import {UserStore} from "./UserStore";

export class RootStore {
    public readonly user: UserStore = new UserStore();
}

const rootStore: RootStore = new RootStore();
export default rootStore;