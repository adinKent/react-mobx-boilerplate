import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import TodoStatistic from './TodoStatistic';

const useStyles = makeStyles(theme => ({
    root: {
        width: 760,
        textAlign: 'right'
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        width: 800,
        height: 425
    }
}));

const TodoItemToolbar = observer(({state, sortOrder, todoList}) => {
    const [ isModalOpen, changeModalOpen ] = useState(false);
    const classes = useStyles();
    const handleSort = () => {
        state.sort();
    };
    const openStatistic = () => {
        changeModalOpen(true);
    };
    const closeStatistic = () => {
        changeModalOpen(false);
    };
    const order = sortOrder.get();
    const disabled = todoList.length === 0;
    return (
        <>
            <div className={classes.root}>
                <Button
                    disabled={disabled}
                    size="small"
                    endIcon={!order || order === 'DESC' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                    onClick={handleSort}
                >
                    Sort
                </Button>
                <IconButton edge="end" aria-label="delete" onClick={openStatistic} disabled={disabled}>
                    <TimelineIcon />
                </IconButton>      
            </div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={isModalOpen}
                onClose={closeStatistic}
            >   
                <Paper className={classes.modal} elevation={3}>
                    <TodoStatistic todoList={todoList} />
                </Paper>
            </Modal>
        </>
    );
});

export default TodoItemToolbar;