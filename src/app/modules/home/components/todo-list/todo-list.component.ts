import { Component, DoCheck } from '@angular/core';

// Interface
import { TaskList } from './../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  constructor() { }

  //Todos os itens marcados como checked vão para o fim da lista.
  ngDoCheck() {
    this.setLocalStorage();
   }

  //Método que recupera o valor recebido do @Output do componente todo-input-add-itens. E adiciona ele a lista.
  public setEmitTaskList(event: string) {
    this.taskList.push({task: event, checked: false});
  }

  //Método que deleta um item de cada vez da lista atraves do seu posicionamento no Array.
  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1); //remove o item da lista a partir do seu index no Array
  }

  //Método que Deleta todos os itens dentro da lista.
  public deleteAllTaskList() {
    const confirm = window.confirm("Você deseja realmente Deletar tudo?"); //um alert para confirmação de remoção de todos os item da lista.

    if(confirm) { //se o usuário confirmar sera removido todos os itens da lista.
      this.taskList = [];
    }
  }

  //Método que verifica se o input está preenchido, caso não esteja ele pergunta se quer deletar.
  public validationInput(event: string, index: number) {
    if(!event.length) {
      const confirm = window.confirm("Task está vazia, deseja deletar?");
      if(confirm) {
        this.deleteItemTaskList(index);
      }
    }
  }

  //Método que salva os dados preenchidos no input para o browser.
  public setLocalStorage() {
    if(this.taskList) {
      this.taskList.sort( (first, last) => Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList)); //Converte os dados do Array para uma string.
    }
  }
}
