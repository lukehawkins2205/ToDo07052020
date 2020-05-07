import {ToDoListItem} from './to-do-list-item.model'

export class ToDoListContainer {
    constructor(public toDoContainerName: string, public toDoListContainter: ToDoListItem[], public userId: string) {}
}