import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createReadStream } from 'fs';
import { Subject, SubjectDocument } from './domain/subject.model';
import { parse } from 'csv-parse';
import { join } from 'path';
import { Model } from 'mongoose';
import { SubjectDto } from 'src/subject/domain/subject.dto';
import { SubjectMultipleDto } from './domain/subject-multiple.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) {}

  async getFindAll(): Promise<Subject[]> {
    return this.subjectModel.find().populate('prerequisite').exec();
  }

  async getFindOneSubject(id: string): Promise<Subject> {
    return this.subjectModel.findById(id).exec();
  }

  async postCreateSubject(subjectDto: SubjectDto): Promise<Subject> {
    const createSubject = new this.subjectModel(subjectDto);
    return createSubject.save();
  }

  async postCreateMultipleSubjects(subjectDto: Array<SubjectMultipleDto>): Promise<Array<Subject>> {
    const subjets : Array<SubjectDto> = subjectDto.map(subject  => {
      
      const array : Array<SubjectDto> = [];
        subject.prerequisite.forEach(element => {
              return array.push(subject[element]);
        })

        return {
          ...subject,
          prerequisite: array
        }
    });

    const result = this.subjectModel.insertMany(subjets, {ordered: true});
    return result;
  }

  async putUpdateSubject(subjectDto: SubjectDto, id: string): Promise<Subject> {
    const subject = this.subjectModel
      .findByIdAndUpdate(id, subjectDto, { returnOriginal: false })
      .exec();
    return subject;
  }

  async deleteRemoveSubject(id: string) {
    this.subjectModel.findByIdAndDelete(id).exec();
  }

  async postUploadMockSyllabus(): Promise<Subject[]> {
    const promise: Subject[] = await Promise.resolve(getFileMock());
    return this.subjectModel.insertMany(promise);
  }

  async getMockFile(): Promise<Subject[]> {
    const promise = getFileMock();
    return promise.then((value) => {
      return value;
    });
  }
}

function getFileMock() {
  return new Promise<Subject[]>((resolve, reject) => {
    const parsedCsv = parse({ columns: true, delimiter: ';' });
    const response = createReadStream(
      join(__dirname, '..', 'public', 'base.csv'),
    ).pipe(parsedCsv);

    const fetchArray: Subject[] = [];
    response.on('data', (row: Subject) => {
      fetchArray.push(row);
    });
    response.on('end', () => resolve(fetchArray));
    response.on('error', reject);
  });
}
