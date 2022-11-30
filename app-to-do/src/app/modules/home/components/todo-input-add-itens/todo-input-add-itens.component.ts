import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-todo-input-add-itens',
  templateUrl: './todo-input-add-itens.component.html',
  styleUrls: ['./todo-input-add-itens.component.scss']
})
export class TodoInputAddItensComponent implements OnInit {
  //Evento que exporta o valor vindo do input.
  @Output() public emitItemTaskList = new EventEmitter();
  public addItemTaskList: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  //Método que envia os dados preenchido no campo de input para adicionar itens na lista.
  public submitItemTaskList() {
    this.addItemTaskList = this.addItemTaskList.trim(); // remove todos os espaços, não podendo adicionar string com espaços vazios. no inicio e no fim do input.
    if(this.addItemTaskList) { //se o input não estiver preenchido não adicionar a lista.
      this.emitItemTaskList.emit(this.addItemTaskList);
      this.addItemTaskList = "";
    }
  }
}
