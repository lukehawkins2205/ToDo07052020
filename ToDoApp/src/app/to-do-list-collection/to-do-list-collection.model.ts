import {ToDoListItem} from '../to-do-list/to-do-list-item.model'

export class ToDoListCollection {
    constructor(public toDoCollectionName: string, public toDoListCollection: ToDoListItem[], public userId: string, public collectionUid: string) {}
}