import { StudentRateTime, StudentReport } from '../../src/interfaces/main.interface';

export const student: StudentReport = {
    name: 'Marco',
    startTime: '09:12',
    endTime: '10:17',
    id: 1,
    day: 1,
    classroomCode: 'R100'
};

export const studentEqualTimes: StudentReport = {
    name: 'Marco',
    startTime: '11:00',
    endTime: '11:00',
    id: 1,
    day: 1,
    classroomCode: 'R100'
};

export const studentWrongTimes: StudentReport = {
    name: 'Marco',
    startTime: '00:00',
    endTime: '25:00',
    id: 1,
    day: 1,
    classroomCode: 'R100'
};

export const studentEntryReport: StudentRateTime[] = [
    {
        studentId: 1,
        day: 1,
        minutes: 75,
        daysCount: 0,
        name: 'Marco'
    },
    {
        studentId: 1,
        day: 3,
        minutes: 67,
        daysCount: 0,
        name: 'Marco'
    }
];

export const studentOutputReport: StudentRateTime[] = [
    {
        studentId: 1,
        day: 1,
        minutes: 142,
        daysCount: 2,
        name: 'Marco'
    }
];

export const studentEmptyReport: StudentRateTime[] = [];
export const minutesStudent: number = 65;
export const path = __dirname;