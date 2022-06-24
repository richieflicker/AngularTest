import { Component } from '@angular/core';
import { CrudHttpService } from './crud-http.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Test';

  users:any = [];
  constructor(private crudHttpService: CrudHttpService){}
  
  ngOnInit(): void {
    this.listTodos();
  }

  listTodos(){
    this.crudHttpService.list().subscribe((response)=>{
      this.users = response;
    },(error=>{

    }));
  }

  createTodo(){
    const input = document.getElementById("userName") as HTMLInputElement;
    const value = input?.value;
    console.log(value)
    if (value != "") {
      let todo = {
        id: new Date().getTime(),
        name:value
      }
      this.crudHttpService.create(todo).subscribe((response)=>{
        this.listTodos();
      },(error=>{
  
      }));
    }else{
      input.classList.add('error')
    }
    
  }

  editTodo(todo: any){
    const input = document.getElementById(todo.id) as HTMLInputElement | null;
    const value = input?.value;
    let data = {
      id: new Date().getTime(),
      name:value 
    }
    this.crudHttpService.update(todo.id,data).subscribe((response)=>{
      this.listTodos();
    },(error=>{

    }));
  }

  deleteTodo(id: any){
    this.crudHttpService.delete(id).subscribe((response)=>{
      this.listTodos();
    },(error=>{
    }));
  }

  
}
