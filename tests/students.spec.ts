import chai from 'chai';
import { student, minutesStudent, studentEqualTimes, studentEntryReport, studentOutputReport, studentEmptyReport } from './assets/data.asset';
import { StudentsService } from '../src/services/students.service';

const studentsServices = new StudentsService();
const { expect } = chai;

describe('Students services tests', () => {
    describe('calculateMinutes', () => {
        it('TC-01: should get minutes in numbers', () => {
            const results = studentsServices.calculateMinutes(student.startTime, student.endTime, student);
            expect(results).to.exist;
            expect(results).not.be.NaN;
            expect(results).eq(minutesStudent);
        });

        it('TC-02: should get zero if startTime is equal to endTime', () => {
            const results = studentsServices.calculateMinutes(studentEqualTimes.startTime, studentEqualTimes.endTime, studentEqualTimes);
            expect(results).to.exist;
            expect(results).not.be.NaN;
            expect(results).eq(0);
        });
    
        it('TC-03: should rise an exception if startTime is greater than endTime', () => {
            try {
                studentsServices.calculateMinutes(student.endTime, student.startTime, student);
            } catch (error) {
                expect(error).to.exist;
                expect(error).instanceOf(Error);
            }
        });
    });

    describe('formattingOutput', () => {
        it('TC-01: should get formatted data', () => {
            const results = studentsServices.formattingOutput(studentEntryReport);
            expect(results).instanceOf(Array);
            expect(results).to.have.length(1);
            expect(results[0].daysCount).to.eq(studentOutputReport[0].daysCount);
            expect(results[0].minutes).to.eq(studentOutputReport[0].minutes);
        });

        it('TC-02: should get an empty array', () => {
            const results = studentsServices.formattingOutput(studentEmptyReport);
            expect(results).instanceOf(Array);
            expect(results).to.have.length(0);
        });
    });
});