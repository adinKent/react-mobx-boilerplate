import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

const useCardStyles = makeStyles({
    root: {
        minWidth: 375,
        maxWidth: 600,
        margin: '0 auto'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardActionsRoot: {
        display: 'block',
        textAlign: 'right'
    }
});

function getToday() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export default function TodoItemForm({state}) {
    const classes = useCardStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(getToday());
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDateChange = (date) => {
        setDueDate(date);
    };

    const handleResetForm = () => {
        setTitle('');
        setDescription('');
        setDueDate(getToday());
    };

    const handleAddItem = () => {
        state.addItem({
            title,
            description,
            dueDate: new Date(dueDate),
            isCompleted: false
        });
        handleResetForm();
    };

    return (
        <Container>
            <Card className={classes.root}>
                <CardContent>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            id="standard-basic"
                            label="Title"
                            fullWidth
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows="4"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <div>
                            <KeyboardDatePicker
                                autoOk={true}
                                type="date"
                                disableToolbar
                                variant="inline"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="date-picker-inline"
                                label="Due date"
                                value={dueDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </div>
                    </form>
                </CardContent>
                <CardActions className={classes.cardActionsRoot}>
                    <Button size="small" color="secondary" onClick={handleResetForm}>Reset</Button>
                    <Button size="small" variant="contained" color="primary" onClick={handleAddItem}>Add</Button>
                </CardActions>
            </Card>
        </Container>
    );
}