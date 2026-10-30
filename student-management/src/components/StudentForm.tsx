import { useState } from "react";

interface StudentFormData {
  name: string;
  age: number;
  grade: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function StudentForm() {
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
      [name]: name === "age" ? Number(value) : value,
    }));

    //react automatically update the property which name was transferred
  }

  // Form submission handler, is shown when submit is pressed
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("New student:", formData);
    console.log("Age is a number:", typeof formData.age === "number");
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
          <option value="A">1</option>
          <option value="B">2</option>
          <option value="C">3</option>
          <option value="A">4</option>
          <option value="B">5</option>
          <option value="C">6</option>
        </select>
      </div>

      <button className="submit-button" type="submit">
        Save Student <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
