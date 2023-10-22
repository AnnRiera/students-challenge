import { Days } from "../enums/days.enum";

export interface Student {
    name: string;
}

export interface StudentReport {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
    day: Days;
    classroomCode: string;
}

export interface StudentRateTime extends Student {
    studentId: number;
    day: Days;
    minutes: number;
    daysCount: number;
}