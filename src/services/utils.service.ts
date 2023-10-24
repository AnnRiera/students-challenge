import { Request } from 'express';
import BaseService from './base.service';
import formidable from 'formidable';
import { dir } from '../constants';
import { Student, Attendance } from '../interfaces/main.interface';
import { BadRequestError, InternalError } from '../errors/main.error';
import fs from 'node:fs';

class UtilsService extends BaseService {
    // Upload and calls the formatted.
    public async uploadFileAndInsert(req: Request): Promise<string> {
        const form = formidable({
            uploadDir: dir,
            keepExtensions: true,
            filename: (name, ext, part, form) => {
                return `${part.originalFilename}`;
            }
        });

        try {
            const files = await form.parse(req);
            const { file } = files[1];
            // Here is where the formatted is call.
            await this.formatFileContent(`${dir}${file?.[0].originalFilename}`);
            return 'File uploaded successfully';
        } catch (error) {
            console.error(error);
            if (error instanceof Error) throw new BadRequestError(error.message, []);
            throw new InternalError;
        }
    }

    // Reads the uploaded file and converted into a string.
    public readFile(filePath: string) {
        if (filePath.length <= 0) throw new BadRequestError('File path is required');
        return fs.readFileSync(filePath).toString();
    }

    // This function will fill arrays with the students info and their attendance.
    public async formatFileContent(fileName: string): Promise<void> {
        const names: Student[] = [];
        const attendances: Attendance[] = [];
        const content = this.readFile(fileName);

        try {
            const lines = content.split('\n');
            
            for (let line of lines) {
                if (line.includes('Student')) {
                    const studentName = line.slice(8);
                    names.push({
                        name: studentName,
                    });
                }

                if (line.includes('Presence')) {
                    const arr = line.slice(9).split(' ');
                    attendances.push({
                        studentName: arr[0],
                        startTime: arr[2],
                        endTime: arr[3],
                        classroomCode: arr[4],
                        day: parseInt(arr[1])
                    });
                }
            }
            // This is where the insertion takes place.
            await this.insertRecords(names, attendances);
        } catch (error) {
            console.error(error);
            throw new  InternalError();
        }
    }

    // This function create the data in database.
    public async insertRecords(names: Student[], attendances: Attendance[]): Promise<void> {
        try {
            const studentsExist = await this.db.student.findMany({
                where: {
                    name: {
                        in: [ ...names.map((student) => student.name) ] 
                    }
                }
            });

            if (studentsExist.length < names.length) {
                const newStudents = names.filter((value) => !studentsExist.find((element) => element.name === value.name));
                await this.db.student.createMany({ 
                    data: newStudents
                });
            }
            
            for (let item of attendances) {
                const student = await this.db.student.findFirst({
                    where: {
                        name: item.studentName,
                    }
                 });

                if (student) {
                    await this.db.attendance.create({
                        data: {
                            startTime: item.startTime,
                            endTime: item.endTime,
                            studentId: student?.id,
                            classroomCode: item.classroomCode,
                            day: item.day
                        }
                    });
                }
            }
        } catch (error) {
            console.error(error);
            throw new InternalError();
        }
    }
}

export { UtilsService };