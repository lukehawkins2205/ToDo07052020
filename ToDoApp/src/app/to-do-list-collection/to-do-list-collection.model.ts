import {ToDoListItem} from '../to-do-list/to-do-list-item.model'

export class ToDoListCollection {
    constructor(public collectionName: string, public toDoListUid: string[], public userUid: string, public collectionUid: string, public selected: boolean) {}
}