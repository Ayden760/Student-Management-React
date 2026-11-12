import { useState, useEffect } from "react";
import type { Student } from "../types/student";
import "../styles/StudentForm.css";

interface StudentFormData {
  name: string;
  age: number;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
}
// Props interface
// Defines the props required by the StudentForm component.
// onAddStudent is a callback function that receives a Student object

interface StudentFormProps {
  editingStudent: Student | null;
  onAddStudent: (student: Omit<Student, "id">) => Promise<void>;
  onUpdateStudent: (student: Student) => void;
  onCancelEdit: () => void;
}
// Destructures the onAddStudent callback from the component's props.
// StudentFormProps defines the expected type of these props.

//Destructuring:
//function StudentForm(props: StudentFormProps) {
//  const onAddStudent = props.onAddStudent;

//same:
//function StudentForm({ onAddStudent }: StudentFormProps) {

export default function StudentForm({
  onAddStudent,
  editingStudent,
  onCancelEdit,
  onUpdateStudent,
}: StudentFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    age: 0,
    grade: 1,
  });
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        age: editingStudent.age,
        grade: editingStudent.grade,
      });
    } else {
      setFormData({
        name: "",
        age: 0,
        grade: 1,
      });
    }
  }, [editingStudent]);
  // Shared handler for input and select elements
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormError(null);
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
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate inputs

    const name = formData.name.trim();

    if (!name) {
      setFormError("Please enter the student's name.");
      return;
    }

    if (
      !Number.isInteger(formData.age) ||
      formData.age < 1 ||
      formData.age > 120
    ) {
      setFormError("Please enter an age between 1 and 120.");
      return;
    }

    if (![1, 2, 3, 4, 5, 6].includes(formData.grade)) {
      setFormError("Please select a valid grade.");
      return;
    }

    setFormError(null);

    // Add student to parent component
    //onAddStudent(newStudent);
    if (editingStudent) {
      onUpdateStudent({
        ...editingStudent,

        ...formData,
        name: name,
      });
    } else {
      try {
        await onAddStudent({
          ...formData,
          name,
        });
        setFormData({ name: "", age: 0, grade: 1 });
      } catch {
        // Keep the entered values so the user can retry after a save failure.
      }
    }
  }

  return (
    <form className="student-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingStudent ? "Edit Student" : "Create a New Student"}</h2>
      <p className="form-description">
        {editingStudent
          ? `Update the details for ${editingStudent.name}.`
          : "Enter the details below to add a student."}
      </p>
      {formError && (
        <p className="form-error-message" role="alert">
          <span aria-hidden="true">!</span>
          {formError}
        </p>
      )}

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

      <div className={`form-actions${editingStudent ? " is-editing" : ""}`}>
        <button className="submit-button" type="submit">
          {editingStudent ? "Save Changes" : "Save Student"}
          <span aria-hidden="true">→</span>
        </button>
        {editingStudent && (
          <button
            className="cancel-button"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
