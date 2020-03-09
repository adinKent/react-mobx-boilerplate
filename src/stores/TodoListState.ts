import { observable, action, IObservableArray } from 'mobx';

import TodoListDao from '../dao/TodoListDao';
import { ITodoItem } from '../interface/todoLIst';

const todoListDao = new TodoListDao();

export interface ITodoListStateProps {
  todoList: ITodoItem[];
}

/*
* This is the entry point for the app's state. All stores should go here.
*/
class TodoListState implements ITodoListStateProps {
  @observable todoList = todoListDao.getAll();
  sortOrder = observable.box(''); // ASC or DESC 

  @action addItem = (newItem : ITodoItem) => {
    todoListDao.add(newItem, this.todoList);
  }

  @action updateItem(updatedItem : ITodoItem, updatedFields: Object) {
    todoListDao.update(updatedItem, updatedFields, this.todoList);
  }

  @action removeItem(removedItem: ITodoItem) {
    todoListDao.delete(removedItem, this.todoList);
  }

  sort() {
    const order = this.sortOrder.get();
    if (!order || order === 'DESC') {
      this.sortByAsc();
    } else if (order === 'ASC') {
      this.sortByDesc();
    }
  }

  @action sortByDesc() {
    (this.todoList as IObservableArray<ITodoItem>).replace(this.todoList.slice().sort((item1: ITodoItem, item2: ITodoItem) => {
        return item2.dueDate.getTime() - item1.dueDate.getTime();
      })
    );
    todoListDao.updateAll(this.todoList);
    this.sortOrder.set('DESC');
  }

  @action sortByAsc() {
    (this.todoList as IObservableArray<ITodoItem>).replace(this.todoList.slice().sort((item1: ITodoItem, item2: ITodoItem) => {
        return item1.dueDate.getTime() - item2.dueDate.getTime();
      })
    );

    todoListDao.updateAll(this.todoList);
    this.sortOrder.set('ASC');
  }

  reload(store: TodoListState) {
    Object.assign(this, store);
    return this;
  }
}

export default TodoListState;