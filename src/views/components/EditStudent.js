import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
const EditStudent = () => {
  const { user } = useAuth();
  const [Data, setData]  = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { id } = useParams();
 const navigate = useNavigate();
  useEffect(()=>{
    const singleStu = async () => {
      const res = await fetch(
        `https://polar-temple-97573.herokuapp.com/dashboard/singleData/${id}`
      );
      const result = await res.json()
      await setData(result);
      console.log(result)
    }
    singleStu()
  },[id])
  const onSubmit = async (data) => {
    console.log(data);
    const newEvent = {
      name : data.name,
      school : data.school,
      class : data.class,
      status : data.status,
      divison : data.divison,
      age : data.age
    }
    const result = await axios.put(
      `https://polar-temple-97573.herokuapp.com/dashboard/edit/${id}`,
      newEvent
    );
    if (result.data.modifiedCount) {
      swal({
        title: "Edited successfully",
        icon: "success",
        timer: 1500,
      });
      reset();
      navigate('/dashboard')
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            Full Name
          </label>
          <div className="col-sm-10 col-lg-6">
            <input
              defaultValue={Data?.name}
              placeholder="Name"
              {...register("name",{ required: true })}
              className="form-control"
              type="text"
             />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            Date of Birth
          </label>
          <div className="col-sm-10 col-lg-6">
            <input
              placeholder="mm/dd/yyyy"
              {...register("date",{ required: true })}
              className="form-control"
              type="date"
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            School
          </label>
          <div className="col-sm-10 col-lg-6">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("school",{ required: true })}
            >
              <option defaultValue={Data?.school}>{Data?.school}</option>
              <option value="Diu">Diu</option>
              <option value="abu Taleb">abu Taleb</option>
              <option value="model high school">model high school</option>
              <option value="kulalampur">kulalampur</option>
              <option value="primary school">primary school</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            Class
          </label>
          <div className="col-sm-10 col-lg-6">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("class",{ required: true })}
            >
              <option value={Data?.class} selected>{Data?.class}</option>
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
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            Age
          </label>
          <div className="col-sm-10 col-lg-6">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("age", { required: true })}
            >
            <option value={Data?.age} selected>{Data?.age}</option>
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="16">16</option>
              <option value="18">18</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            division
          </label>
          <div className="col-sm-10 col-lg-6">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("division",{ required: true })}
            >
             <option value={Data?.division} selected>{Data?.division}</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-lg-1 col-form-label"
          >
            status
          </label>
          <div className="col-sm-10 col-lg-6">
            <input
              className="form-check-input mx-2"
              type="radio"
              {...register("status")}
              value="Active"
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Active
            </label>
            <input
              className="form-check-input mx-2"
              type="radio"
              {...register("status")}
              value="Invoice"
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
              Invoice
            </label>
            {/* {errors.status && (
              <span className="text-danger">This field is required</span>
            )} */}
          </div>
        </div>

        <input
          type="submit"
          value="Edit and Update"
          className="btn btn-danger w-25"
        />
      </form>
    </div>
  );
};

export default EditStudent;
