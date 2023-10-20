import { Request } from 'express';
import BaseService from './base.service';
import formidable from 'formidable';
import { dir } from '../constants';
import { Student, Attendance } from '../interfaces/main.interface';
import fs from 'fs';

class UtilsService extends BaseService {
    public async uploadFileAndInsert(req: Request): Promise<string> {
        try {
            const form = formidable({
                uploadDir: dir,
                keepExtensions: true,
                filename: (name, ext, part, form) => {
                    return `${part.originalFilename}`;
                }
            });

            form.parse(req, async (err, fields, files) => {
                if (err) throw new Error(err);
                const { file } = files;
                await this.formatFileContent(`${file?.[0].originalFilename}`);
            });
            return 'File uploaded successfully';
        } catch (error) {
            console.log(error);
            throw new Error();
        }
    }

    public readFile(fileName: string) {
        const readPath = `${dir}${fileName}`;
        return fs.readFileSync(readPath).toString();
    }

    public async formatFileContent(fileName: string) {
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
                    })
                }

                if (line.includes('Presence')) {
                    const arr = line.slice(9).split(' ');
                    attendances.push({
                        studentName: arr[0],
                        timeIn: arr[2],
                        timeOut: arr[3],
                        classroomCode: arr[4],
                        day: parseInt(arr[1])
                    });
                }
            }
            await this.insertRecords(names, attendances);
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong');
        }
    }

    public async insertRecords(names: Student[], attendances: Attendance[]) {
        try {
            const checkIfStudentsExist = await this.db.student.findMany({
                where: {
                    name: {
                        in: [ ...names.map((student) => student.name) ] 
                    }
                }
            })

            if (checkIfStudentsExist.length == 0) {
                await this.db.student.createMany({ data: names });
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
                            timeIn: item.timeIn,
                            timeOut: item.timeOut,
                            studentId: student?.id,
                            classroomCode: item.classroomCode,
                            day: item.day
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
            throw new Error('Something went wrong');
        }
    }
}

export { UtilsService };