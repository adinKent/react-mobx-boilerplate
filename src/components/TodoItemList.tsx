import React, { useState } from 'react';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import { observer } from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import { formatDate } from '../helpers/date';
import TodoItemEditDailog from './TodoItemEditDialog';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 760,
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    completed: {
        textDecoration: 'line-through'
    },
    expiredItem: {
        backgroundColor: 'rgba(244, 143, 177, 0.15)'
    }
}));

const TodoItemList = observer(({ state, todoList }) => {
    const classes = useStyles();
    const [editItem, setEditItem] = useState(null);
    const handleToggle = (item) => {
        return (e) => {
            state.updateItem(item, { isCompleted: e.target.checked });
        };
    };

    const handleEdit = (item) => {
        return (e)=> {
            setEditItem(item);
        }
    };

    const handleCloseEdit = () => {
        setEditItem(null);
    };

    const handleDelete = (item) => {
        return (e) => {
            state.removeItem(item);
        };
    };

    if (todoList.length > 0) {
        const lastIndex = todoList.length - 1;
        const today = new Date().getTime();

        return (
            <>
                <TodoItemEditDailog state={state} item={editItem} handleClose={handleCloseEdit} open={!!editItem} />
                <List className={classes.root}>
                    {todoList.map((item, index) => {
                        const {
                            isCompleted,
                            dueDate
                        } = item;
                        const isExpired = !isCompleted && dueDate.getTime() < today;
                        const css = cx({
                            [classes.completed]: isCompleted,
                            [classes.expiredItem]: isExpired
                        });
                        return (
                            <div key={item.id}>
                                <ListItem className={css} alignItems="center">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="end"
                                            onChange={handleToggle(item)}
                                            checked={item.isCompleted}
                                            color="primary"
                                        />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        secondary={item.description}
                                    />
                                    <ListItemSecondaryAction>
                                        <Chip label={formatDate(item.dueDate)} color={(isExpired ? 'secondary' : 'default')} />
                                        <IconButton edge="end" aria-label="edit" onClick={handleEdit(item)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={handleDelete(item)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {index !== lastIndex && <Divider />}
                            </div>
                        );
                    })
                }
                </List>
            </>
        );
    }
    return <Box color="text.secondary">Oh, please add a new item first ...</Box>;
});

export default TodoItemList;