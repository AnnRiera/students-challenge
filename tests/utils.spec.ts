import chai from 'chai';
import { UtilsService } from '../src/services/utils.service';
import { path } from './assets/data.asset';

const utilsService = new UtilsService();
const { expect } = chai;

describe('Utils service tests', () => {
    describe('readFile', () => {
        it('TC-01: should get a string from a readed file', () => {
            const results: string = utilsService.readFile(`${path}/test.txt`);
            expect(results).not.be.empty;
            expect(results).have.lengthOf.above(0);
        });

        it('TC-02: should rise an exception for empty string', () => {
            try {
                utilsService.readFile('');
            } catch (error) {
                expect(error).to.exist;
                expect(error).instanceOf(Error);
            }
        });

        it('TC-03: should rise an exception for trying to read a non-existing file', () => {
            try {
                utilsService.readFile(`${path}/another_test.txt`);
            } catch (error) {
                expect(error).to.exist;
                expect(error).instanceOf(Error);
            }
        });
    });
});