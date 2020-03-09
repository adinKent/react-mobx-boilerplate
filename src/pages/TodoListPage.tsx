import * as React from 'react';
import * as styles from './TodoListPage.css';

import TodoItemForm from '../components/TodoItemForm';
import TodoToolbar from '../components/TodoToolbar';
import TodoItemList from '../components/TodoItemList';
import TodoListState from '../stores/TodoListState';

class TodoList extends React.Component {
    private _todoListState;

    constructor(props) {
        super(props);
        this._todoListState = new TodoListState();
    }

    render() {
        return (
            <>
                <div className={styles.title}>
                    <h1>TODO List</h1>
                </div>
                <TodoItemForm state={this._todoListState} />
                <div className={styles.todoListContainer}>
                    <TodoToolbar state={this._todoListState} sortOrder={this._todoListState.sortOrder} todoList={this._todoListState.todoList} />
                    <TodoItemList state={this._todoListState} todoList={this._todoListState.todoList} />
                </div>
            </>
        );
    }
};

export default TodoList;
