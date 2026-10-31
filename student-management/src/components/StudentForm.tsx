import { useState } from "react";
import type { Student } from "../types/student";

interface StudentFormData {
  name: string;
  age: number;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
}
// Props interface
// Defines the props required by the StudentForm component.
// onAddStudent is a callback function that receives a Student object

interface StudentFormProps {
  onAddStudent: (student: Student) => void;
}
// Destructures the onAddStudent callback from the component's props.
// StudentFormProps defines the expected type of these props.

//Destructuring:
//function StudentForm(props: StudentFormProps) {
//  const onAddStudent = props.onAddStudent;

//same:
//function StudentForm({ onAddStudent }: StudentFormProps) {

export default function StudentForm({ onAddStudent }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    age: 0,
    grade: 1,
  });

  // Shared handler for input and select elements
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    //name is the type (name,age,grade) value is what it contains
    const { name, value } = event.target;
    //same :
    //const name = event.target.name;
    //const value = event.target.value;

    setFormData((prev) => ({
      ...prev,
      //value of the variable is used as property name
      //const name = "age";
      //[name]: 17 === age: 17
      [name]: name === "age" || name === "grade" ? Number(value) : value,
    }));

    //react automatically update the property which name was transferred
  }

  // Form submission handler, is shown when submit is pressed
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate inputs

    const name = formData.name.trim();

    if (
      !name ||
      !Number.isInteger(formData.age) ||
      formData.age < 1 ||
      formData.age > 120
    ) {
      alert("Please enter a valid name and age.");

      return;
    }

    if (![1, 2, 3, 4, 5, 6].includes(formData.grade)) {
      alert("Please select a valid grade.");

      return;
    }

    // Create a new student

    const newStudent: Student = {
      id: Date.now(),

      name: name,

      age: formData.age,

      grade: formData.grade,
    };

    // Add student to parent component
    onAddStudent(newStudent);

    setFormData({
      name: "",
      age: 0,
      grade: 1,
    });
  }

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Create a New Student</h2>
      <p className="form-description">
        Enter the details below to add a student.
      </p>

      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age === 0 ? "" : formData.age}
          onChange={handleChange}
          min="1"
          max="120"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="grade">Grade:</label>
        <select
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>

      <button className="submit-button" type="submit">
        Save Student <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
