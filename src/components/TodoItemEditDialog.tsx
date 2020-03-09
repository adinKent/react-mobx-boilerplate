import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import {
    KeyboardDatePicker,
} from '@material-ui/pickers';

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function TodoItemEditDialog({ state, item, open, handleClose }) {
    if (!item) {
        return null;
    }

    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [dueDate, setDueDate] = useState(item.dueDate);
    const handleUpdateItem = () => {
        state.updateItem(item, {
            title,
            description,
            dueDate
        });
        handleClose();
    };

    const handleSetTitle = (e)=> {
        setTitle(e.target.value);
    };

    const handleSetDescription = (e)=> {
        setDescription(e.target.value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogContent dividers>
                <form noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={handleSetTitle}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows="4"
                        value={description}
                        onChange={handleSetDescription}
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
                            onChange={setDueDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button size="small" color="secondary" onClick={handleClose}>Cancel</Button>
                <Button size="small" variant="contained" color="primary" onClick={handleUpdateItem}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}