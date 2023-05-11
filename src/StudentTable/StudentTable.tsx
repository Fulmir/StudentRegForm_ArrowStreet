import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import Student from '../DataTypes/DataTypes';
import ReactInputMask from 'react-input-mask';

const columns: GridColDef[] = [
  { field: 'studentId', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'dateOfBirth', headerName: 'Date of Birth', type: 'date', width: 90 },
  { field: 'studentSSN', headerName: 'SSN', width: 90 }
];

let nextStudentId = 1;

function objectToStudent(formDataEntries: any): Student {
  let outStudent: Student = {
    studentId: nextStudentId,
    name: formDataEntries.Name,
    dateOfBirth: new Date(Date.parse(formDataEntries.DoB)),
    studentSSN: (formDataEntries.SSN as string).split('-')[2]
  };
  nextStudentId++;

  return outStudent;
}

function StudentTable() {


  function addStudent(newStudent: Student) {
    console.log(students.forEach((student) => { return student.name }));

    setStudents([...students, newStudent]);

    console.log(students.length)
  }

  const [students, setStudents] = useState<Student[]>([]);

  //useEffect(() => {
  //  const getStudents = async () => {
  //    const internalStudents: Student[] = [...students,]
  //    internalStudents.forEach((student) => {
  //      console.log(student.studentSSN)
  //      setStudents((row) => [
  //        ...row,
  //        {
  //          studentId: student.studentId,
  //          name: student.name,
  //          dateOfBirth: student.dateOfBirth,
  //          studentSSN: student.studentSSN
  //        },
  //      ]);
  //    });
  //  };

  //  getStudents();
  //}, []);

  function submitStudent(studentForm: any): any {
    studentForm.preventDefault();

    const formData = new FormData(studentForm.target);
    const newStudent: Student = objectToStudent(Object.fromEntries(formData.entries()));
    addStudent(newStudent);

    studentForm.target.reset();
  }

  return (
    <div>
      <form onSubmit={submitStudent}>
        <label>Name: </label> <input name="Name" type="text" required />
        <br />
        <label>SSN: </label> <ReactInputMask name="SSN" type="text" mask="999-99-9999" required placeholder="111-11-1111" />
        <br />
        <label>Date of Birth: </label> <input name="DoB" type="date" required placeholder="MM-DD-YYYY" />
        <br />
        <input type="submit" value="Add Student" />
      </form>
      <DataGrid
        rows={students}
        columns={columns}
        pageSizeOptions={[10, 25, 50, 100]}
        getRowId={(row) => row.studentId}
      />
    </div>
  );
}

export default StudentTable;
