import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
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
  let value;
  const handleChange = async (e) => {
    value = e.target.value;
    console.log(value);
    const result = await axios(
      `https://polar-temple-97573.herokuapp.com/dashboard/search?value=${value}&&email=${user?.email}`
    );

    setDisplay(result.data);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    data.email = user?.email;
    // console.log(data);
    const result = await axios(`https://polar-temple-97573.herokuapp.com/dashboard/search/all`, {
      params: { data },
    });
    // setDisplay(result.data)
    console.log(result.data);
    setDisplay(result.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3 my-4">
        <div className="col-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="search by name"
            onChange={handleChange}
          />
        </div>
        <div className="col-auto">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Age"
            {...register("age")}
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select form-control form-control-lg"
            // aria-label="Default select example"
            {...register("school", { required: true })}
          >
            <option defaultValue="select">School</option>
            <option value="Diu">Diu</option>
            <option value="abu Taleb">abu Taleb</option>
            <option value="model high school">model high school</option>
            <option value="kulalampur">kulalampur</option>
            <option value="primary school">primary school</option>
          </select>
          {errors.school && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("class", { required: true })}
          >
            <option defaultValue="select">class</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
            <option value="3">5</option>
            <option value="3">6</option>
            <option value="3">7</option>
            <option value="3">8</option>
            <option value="3">9</option>
            <option value="3">10</option>
          </select>
          {errors.class && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            aria-label="Default select example"
            {...register("division", { required: true })}
          >
            <option defaultValue="select">division</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          {errors.division && (
            <span className="text-danger">This field is required</span>
          )}
        </div>{" "}
        <div className="col-auto">
          <button className="btn btn-primary" type="submit">search</button>{" "}
        </div>
      </form>
      {/* extra form  */}
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
