import { Days } from '../enums/days.enum';

export interface Attendance {
    studentName: string;
    startTime: string;
    endTime: string;
    classroomCode: string;
    day: Days
}