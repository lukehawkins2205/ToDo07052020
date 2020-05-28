

export class ToDo {

constructor(
    public toDoUid: string,
    public toDoCollectionUid: string,
    public toDoName: string,
    public toDoCompleted: boolean,
    public toDoCompleteBy,
    public toDoCreated,
    public toDoOverdue: boolean  ,
    public daysRemaining?: number
    ){}

}
