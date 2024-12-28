import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  template: `Home`
})
export class HomeComponent {

}

interface TodoItem {
  id: number;
  text: string;
  checked: boolean;
  edit?:boolean;
  originalText?: string;
}

@Component({
  selector: 'todo-items',
  imports: [FormsModule],
  template: `
   <fieldset>
    <legend>дело</legend>
<ol>
    @for(item of items; track item ){
      
      <li >
        <div class="block-text">
      <input type="checkbox" [(ngModel)]="item.checked"/>
       <div [hidden]="item.edit">{{item.text}}</div> 
        <input 
             [hidden]="!item.edit"
            [(ngModel)]="item.text" 
            (blur)="saveEdit(item)" 
            [readonly]="!item.edit" 
            (focus)="startEditing(item)" 
        />
        </div>
        <div class="block-button">
        <button (click)="saveEdit(item)" [hidden]="!item.edit">Сохранить</button>
        <button (click)="cancelEdit(item)" [hidden]="!item.edit">Отменить</button>
        <button (click)="startEditing(item)" [hidden]="item.edit">Редактировать</button>
      <button (click)="remove.emit(item.id)" [hidden]="item.edit">Удалить</button>
      </div>
      </li>
    }
    
</ol>
</fieldset>  
  `
})
export class ItemsComponent {
  @Input() items: TodoItem[] = [];
  @Output() remove = new EventEmitter;
  startEditing(item: TodoItem) {
    item.originalText = item.text; 
    item.edit = true; 
  }

  saveEdit(item: TodoItem) {
    item.edit = false; 
  }

  cancelEdit(item: TodoItem) {
    if (item.originalText) {
      item.text = item.originalText;
    }
    item.edit = false; 
  }
}


@Component({
  selector: 'form-add',
  imports: [FormsModule],
  template: `
  <input type="text" [(ngModel)]="task"> 
  <button (click)="addTask()" (click)="out.emit(task)">Добавить</button>
  `
})
export class AddFormComponent {
  task = '';
  @Output() out = new EventEmitter;

  addTask() {
    this.out.emit(this.task);
    this.task = '';
  }
}




@Component({
  imports: [AddFormComponent, FormsModule, ItemsComponent,],
  templateUrl: './main.component.html'
})
export class ToDoComponent {
  arr: TodoItem[] = [];
  private nextId = 1;
  addTask(item: string) {
    if (item) {
      const newItem: TodoItem = { id: this.nextId++, text: item, checked: false };
      this.arr.push(newItem);
      console.log('Добавлено:', newItem);
    }
  }
  deletTask(id: number) {
    const deletedItem = this.arr.find(item => item.id === id);
    this.arr = this.arr.filter(item => item.id !== id);
    if (deletedItem) {
      console.log('Удалено:', deletedItem);
    }
  }
  deleteCheckedTasks() {
    const checkedItems = this.arr.filter(item => item.checked);
    this.arr = this.arr.filter(item => !item.checked);
    checkedItems.forEach(item => {
      console.log('Удалено:', item);
    });
  }

}

