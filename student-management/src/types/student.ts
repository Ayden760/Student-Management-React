
interface Student{
    id:number;
    name:string;
    age:number;
    grade:Grade;
}
//type Grade can only have the values 1-6
type Grade = 1| 2|3|4|5|6;

//creates Array of 3 students of type student
const students: Student[] = [

  {

    id: 1,

    name: "Max",

    age: 17,

    grade: 2,

  },

  {

    id: 2,

    name: "Lisa",

    age: 16,

    grade: 1,

  },

  {

    id: 3,

    name: "Tim",

    age: 18,

    grade: 3,

  },

];

export type { Student, Grade };

export { students };