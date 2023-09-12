import {cast, flow, getParent, onSnapshot, types} from 'mobx-state-tree'
import {v4 as uuidv4} from 'uuid';
import {User} from "@/store/users";
import api from "@/api";

const Task = types.model('Task', {
    id: types.identifier,
    title: types.string,
    description: types.maybe(types.string),
    assignee: types.safeReference(User)
})

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(Task),
}).actions(self => ({
    load: flow(function* () {
        const {id: board_id}: { id: number } = getParent(self, 2)
        const {id: status}: { id: string | number } = self
        const {tasks} = yield api.get(`boards/${board_id}/tasks/${status}`);

        self.tasks = cast(tasks);
        onSnapshot(self, self.save);
    }),
    afterCreate() {
        self.load()
    },
    save: flow(function* ({tasks}) {
        const {id: board_id}: { id: string } = getParent(self, 2)
        const {id: status_id}: { id: string } = self

        yield api.put(`boards/${board_id}/tasks/${status_id}`, {tasks})
    }),
    addTask(payload: any) {
        self.tasks.push(payload)
    }
}))


const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection)
}).actions(self => ({
    addTask(section_id: string, payload: any) {
        const section = self.sections.find(section => section.id === section_id)

        section?.tasks.push({
            id: uuidv4(),
            ...payload
        })
    },
    moveTask(task_id: string, source: { droppable_id: string }, destination: { index: string, droppable_id: string }) {
        const from_section = self.sections.find(section => section.id === source.droppable_id)
        const to_section = self.sections.find(section => section.id === destination.droppable_id)
        const task_to_move_index = from_section.tasks.findIndex(task => task.id === task_id)
        const [task] = from_section.tasks.splice(task_to_move_index, 1)
        to_section.tasks.splice(destination.index, 0, task.toJSON())
    }
}))

const BoardStore = types.model('BoardStore', {
    active: types.safeReference(Board),
    boards: types.array(Board),
}).actions((self => ({
    load: flow(function* () {
        self.boards = yield api.get('boards')
    }),
    afterCreate() {
        self.load()
    },
    selectBoard(id: string) {
        self.active = id
    }
})))

export default BoardStore