import {startOfMonth,startOfWeek, addDays,} from 'date-fns';

export const getMatrix  = (date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const allDays = [];

    for (let i = 0; i < 42; i++) {
        allDays.push(addDays(start, i));
    }

    const matrix = [];
    for (let i = 0; i < 6; i++) {
        matrix.push(allDays.slice(i * 7, (i + 1) * 7));
    }
    return matrix;
};
