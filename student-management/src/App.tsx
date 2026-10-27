import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
function App() {
  return (
    <div>
      <h1>Student Management</h1>
      <p>Manage your Students</p>
      <StudentList />
      <StudentForm />
    </div>
  );
}

export default App;
