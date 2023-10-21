import BaseService from './base.service';
import { StudentReport, StudentRateTime } from '../interfaces/students.interface';

class StudentsService extends BaseService {
    public async getReportPerStudent() {
        try {
            const query = await this.db.$queryRaw<StudentReport[]>`
                SELECT S.id, S."name", A."timeIn", A."timeOut", A."day"
                FROM "Student" S
                INNER JOIN "Attendance" A ON A."studentId" = S.id
            `;
            const arr: StudentRateTime[] = [];
            for (let student of query) { 
                arr.push({
                    studentId: student.id,
                    name: student.name,
                    day: student.day,
                    minutes: this.calculateMinutes(student.timeIn, student.timeOut)
                });
            }

            this.formattingOutput(arr);

            return query;
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    public formattingOutput(data: StudentRateTime[]) {
        //const resultado = `Marco: ${totalMinutos} minutes in ${totalDias} days`;
        const arr: StudentRateTime[] = [];
        // const result = data.reduce((acc, current) => {
        //     acc.minutes = (acc.studentId === current.studentId && acc.day !== current.day) ? acc.minutes + current.minutes : acc.minutes;
        //     return acc;
        // });
        let minutesCount = 0;
        let daysCount = 0;
        const final: StudentRateTime[] = [];
        // for (let i = 0; i <= data.length; i++) {
        //     if (data[i].studentId === data[i+1].studentId && data[i].day !== data[i+1].day) {
        //         data[i].minutes += data[i+1].minutes;
        //         daysCount += data[i].day;
        //         final.push(data[i]);
        //     }
        // }

        console.log(final)
    }

    public calculateMinutes(start: string, end: string) {
        const [ startHour, startMinute ] = start.split(':').map(Number);
        const [ endHour, endMinute ] = end.split(':').map(Number);
        
        const startMinutes = (startHour * 60) + startMinute;
        const endMinutes = (endHour * 60) + endMinute;
        
        return endMinutes - startMinutes;
    }
}

export { StudentsService };