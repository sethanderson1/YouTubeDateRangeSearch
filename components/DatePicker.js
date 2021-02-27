import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { FormContext } from '../context/FormContext';
import moment from 'moment';

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

export default function DatePicker({ label }) {
    console.log('%cDatePicker renders', 'color:green')
    const classes = useStyles();
    const context = useContext(FormContext);
    const { start, setStart, end, setEnd, date, setDate } = context;

    useEffect(() => {
        label === 'start' ? setDate(start) : setDate(end);
    }, [])

    const handleDateChange = (e) => {

        if (label === 'start') {
            let start = e.target.value;
            if (!moment(start).isBefore(end)) {
                start = moment(end).subtract(1, "days").format("YYYY-MM-DD");
            }
            setStart(start);
        } else {
            let end = e.target.value;
            if (!moment(start).isBefore(end)) {
                end = moment(start).add(1, "days").format("YYYY-MM-DD");
            }
            setEnd(end);
        }


    }

    return (
        <TextField
            id="date"
            label={label}
            type="date"
            value={label === 'start' ? start : end}
            className={classes.textField}
            InputLabelProps={{
                shrink: true,
            }}
            onChange={handleDateChange}
        />
    );
}
