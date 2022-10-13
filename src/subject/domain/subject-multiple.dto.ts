import { Term } from './subject.term.dto';

class SubjectMultipleDto {
  term: Term;
  code: string;
  uv: number;
  name: string;
  description: string;
  weight: number;
  prerequisite: Array<number>;

  constructor(
    term: Term,
    code: string,
    uv: number,
    name: string,
    description: string,
    weight: number,
    prerequisite: Array<number>,
  ) {
    this.term = term;
    this.code = code;
    this.uv = uv;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.prerequisite = prerequisite;
  }
}

export { SubjectMultipleDto };
