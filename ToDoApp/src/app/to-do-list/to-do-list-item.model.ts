

export class ToDo {

constructor(
    public toDoUid: string,
    public toDoCollectionUid: string,
    public toDoName: string,
    public toDoCompleted: boolean,
    public toDoCompleteBy: Date,
    public toDoCreated: Date,
    public toDoOverdue: boolean  
    ){}

}
