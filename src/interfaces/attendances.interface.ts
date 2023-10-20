import { Days } from '../enums/days.enum';

export interface Attendance {
    studentName: string;
    timeIn: string;
    timeOut: string;
    classroomCode: string;
    day: Days
}