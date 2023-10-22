import BaseService from './base.service';
import { StudentReport, StudentRateTime } from '../interfaces/students.interface';
import { BadRequestError, InternalError } from '../errors/main.error';
class StudentsService extends BaseService {
    public async getReportPerStudent(): Promise<string[]> {
        const arr: StudentRateTime[] = [];
        
        try {
            const query = await this.db.$queryRaw<StudentReport[]>`
                SELECT S.id, S."name", A."startTime", A."endTime", A."day", A."classroomCode"
                FROM "Student" S
                INNER JOIN "Attendance" A ON A."studentId" = S.id
            `;
            
            for (let student of query) { 
                arr.push({
                    studentId: student.id,
                    name: student.name,
                    day: student.day,
                    minutes: this.calculateMinutes(student.startTime, student.endTime, student),
                    daysCount: 0
                });
            }

            const reports = this.formattingOutput(arr).map((value) => {
                if (value.minutes > 0) {
                    const pluralOrSingular = (value.daysCount > 1) ? 'days' : 'day';
                    return `${value.name}: ${value.minutes} minutes in ${value.daysCount} ${pluralOrSingular}`;
                }
                return '';
            }).filter((value) => value.length !== 0);

            return reports;
        } catch (error) {
            console.error(error);
            if (error instanceof BadRequestError) throw new BadRequestError(error.message, error.data);
            throw new InternalError();
        }
    }

    public formattingOutput(data: StudentRateTime[]): StudentRateTime[]  {
        const results: StudentRateTime[] = [];
        for (let info of data) {
            const studentExist = results.find((value) => value.studentId === info.studentId);
            
            if (!studentExist) {
                results.push({ ...info, daysCount: 1 });
            } else {
                results.map((value)=> {
                    if (info.studentId === value.studentId) {
                        value.minutes += info.minutes;
                        value.daysCount += 1;
                        return value;
                    }
                });
            }
        }
        return results;
    }

    public calculateMinutes(start: string, end: string, student: StudentReport): number {
        const [ startHour, startMinute ] = start.split(':').map(Number);
        const [ endHour, endMinute ] = end.split(':').map(Number);

        if (startHour === endHour && startMinute === endMinute) return 0;
        if (startHour > endHour) throw new BadRequestError(
            `Start time is greater than end date in ${student.name}'s record`,
            [
                student
            ]
        );
        
        const startMinutes = (startHour * 60) + startMinute;
        const endMinutes = (endHour * 60) + endMinute;
        
        return endMinutes - startMinutes;
    }
}

export { StudentsService };