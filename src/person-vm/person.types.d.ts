export type Person = {
    id:number;
    name: string;
    age: number;
}

type Person = {
    person:Person;
}
export interface PersonVm {
    persons:Person[] | null;
    person:Person | null;
  }