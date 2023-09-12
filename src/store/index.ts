import {types} from 'mobx-state-tree';
import BoardStore from "@/store/board";
import UsersStore from "@/store/users";

const RootStore = types.model('RootStore', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {}),
});

export default RootStore;