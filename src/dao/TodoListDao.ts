import storage from 'local-storage-fallback';
import { v1 as uuidv1 } from 'uuid';

import {
  ITodoItem
} from '../interface/todoList';

const cacheKey: string = 'todoList';

class TodoListDao {
  private _localStorage;

  constructor() {
    if ('localStorage' in window) {
      this._localStorage = window.localStorage;
    } else {
      this._localStorage = storage;
    }
  }

  getAll(): ITodoItem[] {
    const json = this._localStorage.getItem(cacheKey);
    if (json) {
      const list = JSON.parse(json);
      return list.map((item)=> {
        item.dueDate = new Date(item.dueDate);
        return item;
      });
    }

    return [];
  }

  add(newItem: ITodoItem, list: ITodoItem[]): void {
    newItem.id = uuidv1();
    list.unshift(newItem);
    this._localStorage.setItem(cacheKey, JSON.stringify(list));
  }

  updateAll(list: ITodoItem[]): void {
    this._localStorage.setItem(cacheKey, JSON.stringify(list));
  }

  update(updatedItem: ITodoItem, updatedFields: Object, list: ITodoItem[]): void {
    
    const index = list.findIndex((item: ITodoItem)=>{
      return item.id === updatedItem.id;
    });
    
    if (index !== -1) {
      Object.assign(updatedItem, updatedFields);
      // list.splice(index, 1, updatedItem);
      this._localStorage.setItem(cacheKey, JSON.stringify(list));  
    }
  }

  delete(updatedItem: ITodoItem, list: ITodoItem[]): void {
    const index = list.findIndex((item: ITodoItem)=>{
      return updatedItem.id === item.id;
    });

    if (index !== -1) {
      list.splice(index, 1);
      this._localStorage.setItem(cacheKey, JSON.stringify(list));  
    }
  }
}

export default TodoListDao;