import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default function DatePicker({ defaultDate, label }) {
    const classes = useStyles();

    const [date, setDate] = useState(defaultDate);

    return (
            <TextField
                id="date"
                label={label}
                type="date"
                value={date}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => setDate(e.target.value)}
            />
    );
}
