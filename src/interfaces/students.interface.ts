import { Days } from "../enums/days.enum";

export interface Student {
    name: string;
}

export interface StudentReport {
    id: number;
    name: string;
    timeIn: string;
    timeOut: string;
    day: Days;
}

export interface StudentRateTime extends Student {
    studentId: number;
    day: Days;
    minutes: number;
}