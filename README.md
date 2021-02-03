# To Do App
Hi! This is an angular project that I developed to showcase my skillset. 

# Technologies 
 - Angular Framework
 - Typescript
 - Cloud Firestore
 - HTML
 - CSS

# Libraries

 - Angular Material
 - RXJS
 - Bootstrap
 - Router
 - Fire Auth

# Features
## Sorting To Do Items

    sort(option: string){
    switch (option){
      case 'CreatedDate': 
        this.toDoArray.sort((todo1, todo2) => {
          return todo1.toDoCreated - todo2.toDoCreated});
        this.todoArrayNext.next(this.toDoArray);  
        break;

      case 'DueDate':
        this.toDoArray.sort((todo1, todo2) => {
          return todo1.toDoCompleteBy - todo2.toDoCompleteBy});
        this.todoArrayNext.next(this.toDoArray);
        break;

      case 'OverdueStatus':
        this.toDoArray.sort((todo1, todo2) => {
        if (todo1.toDoOverdue === true)
          {return -1;} 
        if (todo2.toDoOverdue === false)
          {return 1;} 
          return 0;});
          this.todoArrayNext.next(this.toDoArray);
          break;

      default: 
          this.todoArrayNext.next(this.toDoArray);

    }
    }


 - 

## Authentication
Fire auth is utilized so that user credentials can be sent to firestore DB for validation. Depending on what option the user chooses, they can either sign up or login to view existing Todos. 

## Date fields and overdue flag
When a user created a Todo item, they must select a date via the datepicker component. When a Todo is retrieved, its checked against the date to see weather its overdue and sets a flag appropriately. 
