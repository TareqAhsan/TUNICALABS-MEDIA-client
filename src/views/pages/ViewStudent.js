import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
const ViewStudent = () => {
  const [allStudent, setAllStudent] = useState();
  const [display, setDisplay] = useState();
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(0);
  const size = 5;
  const { user } = useAuth();
  useEffect(() => {
    const getStudent = async () => {
      const result = await fetch(
        `https://polar-temple-97573.herokuapp.com/dashboard/viewstudent/?email=${user?.email}&&page=${page}&&size=${size}`
      );
      const data = await result.json();
      // console.log(data.result);
      setAllStudent(data.result);
      setDisplay(data.result);
      const count = data.count;
      const pageNumber = Math.ceil(count / size);
      setPageCount(pageNumber);
    };
    getStudent();
  }, [user?.email, page]);

  const handleDelete = async (id) => {
    const procees = window.confirm("Are you want to delete this?");
    if (procees) {
      const result = await axios.delete(
        `https://polar-temple-97573.herokuapp.com/dashboard/viewstudent/${id}`
      );
      // console.log(result?.data);
      if (result?.data?.deletedCount > 0) {
        // console.log("hii");
        // console.log(result?.data);
        const stuData = allStudent.filter((student) => student._id !== id);
        setDisplay(stuData);
        swal({
          title: "deleted",
          icon: "success",
          timer: 1500,
        });
      }
    }
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    const result = await axios(
      `https://polar-temple-97573.herokuapp.com/dashboard/search?value=${value}&&email=${user?.email}`
    );

    setDisplay(result.data);
  };
  return (
    <div>
      <form className="row g-3 my-4">
        <div className="col-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="search by name"
            onChange={handleChange}
          />
        </div>
      </form>
      <Table striped bordered hover id="table-to-xls">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Age</th>
            <th>School</th>
            <th>Class</th>
            <th>Division</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {display?.map((data, index) => (
            <tr key={data._id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data?.age}</td>
              <td>{data.school}</td>
              <td>{data.class}</td>
              <td>{data.division}</td>
              <td>{data.status}</td>
              <td>
                <Link to={`/dashboard/edit/${data._id}`}>
                  {" "}
                  <span className="me-2">
                    <FontAwesomeIcon icon={faEdit} />
                    edit
                  </span>
                </Link>
                <span
                  className="ms-2 cursor-pointer"
                  role="button"
                  onClick={() => handleDelete(data._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="my-3">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            key={number}
            className={
              number === page ? "btn btn-primary mx-1" : "btn btn-danger"
            }
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-danger"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
    </div>
  );
};

export default ViewStudent;
