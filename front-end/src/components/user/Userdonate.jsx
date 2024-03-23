import React, { useEffect, useState } from "react";
import "./Userdonate.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URI from "../constant/Constants";
import { useDispatch, useSelector } from "react-redux";
import { userview } from "../../redux/reducer/UserviewSlice";

const Userdonate = () => {
  const [input, setinput] = useState("");
  const [newApproveddate, setNewapproveddate] = useState([]);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");

  //Image Upload

  const imageUpload = (e) => {
    const { name } = e.target;
    setinput({ ...input, [name]: e.target.files[0] });
  };

  //Input Handler

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setinput({ ...input, [name]: value });
  };

  //Booking date

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const currentDate = date + "/" + month + "/" + year;

  //Submit User Details

  const detailsSubmit = (e) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes,Approve",
        cancelButtonText: " cancel",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("name", input.name);
          formData.append("image", input.image);
          formData.append("blood_group", input.blood_group);
          formData.append("gender", input.gender);
          formData.append("date_of_birth", input.date_of_birth);
          formData.append("phone_number", input.phone_number);
          formData.append("address", input.address);
          formData.append("booking_date", currentDate);
          axios
            .post(`${BASE_URI}/api/user/add`, formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((data) => {
              console.log(data);
              setTimeout(() => {
                toast.success("data.data");
              }, 1500);
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status == 401) {
                toast.error("err.data");
                sessionStorage.clear();
                navigate("/login");
              }
            });

          swalWithBootstrapButtons.fire({
            title: "Request Sent",
            text: "Your Request has been sent.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your request cancelled",
            icon: "error",
          });
        }
      });
    e.preventDefault();
  };

  // Checking user status

  const dispatch = useDispatch();
  const approveddate = useSelector((state) => state.user.userdata);
  const error = useSelector((state) => state.user.error);

  // REDUX AREA

  useEffect(() => {
    dispatch(userview(token));

    if (error == 401) {
      setTimeout(() => {
        toast.error("Session Time out");
        sessionStorage.clear();
        navigate("/login");
      }, 3000);
    }
  }, []);

  const isEligibleToDonate = () => {
    if (approveddate.length !== 0 && approveddate[0].donation_date !== null) {
      const donateddate = new Date(approveddate[0].donation_date);
      const currentDate = new Date();
      // console.log(donateddate);
      // console.log(currentDate - donateddate);
      const differenceInDays = Math.floor(
        (currentDate - donateddate) / (1000 * 60 * 60 * 24)
      );
      console.log(differenceInDays);
      return differenceInDays >= 60;
    }

    // If there is no booking, user is eligible to donate
    return true;
  };
  return (
    <>
      <div className="userdonate-body">
        <Toaster position="bottom-center" />

        {approveddate.length !== 0 &&
        approveddate[0]?.status !== null &&
        !isEligibleToDonate() ? (
          <>
            <div className="userdonate-warning-sec">
              <div className="userdonate-heading">
                <>WARNING !</>
              </div>
              <div className="userdonate-warning">
                Your blood donation date booking has been confirmed, and it's
                important to note that you are unable to schedule another
                donation within the next 60 days. This restriction is in place
                to ensure the well-being of the donor, allowing sufficient time
                for the body to replenish its blood supply and recover fully
                from the previous donation. Your commitment to this waiting
                period is crucial for maintaining both your health and the
                effectiveness of future donations. We appreciate your
                understanding and dedication to the blood donation process, as
                it plays a vital role in saving lives and supporting those in
                need of life-saving transfusions.
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="userdonate-content">
              <>
                <div className="userdonate-heading">
                  <>DONOR &nbsp;DETAILS</>
                </div>
                <form encType="multipart/form-data" className="userdonate-form">
                  {" "}
                  <div className="userdonate-upload-sec">
                    <input
                      type="file"
                      name="image"
                      id="file"
                      hidden
                      onChange={imageUpload}
                    />
                    <label htmlFor="file">
                      <img
                        src="/profile.png"
                        alt=""
                        className="userdonate-uploadimage"
                      />
                    </label>
                    {input.image != null ? (
                      <div className="Userdonate-file-uploaded">
                        {input.image.name}
                        <img
                          src="/blue-tick.png"
                          alt=""
                          className="Userdonate-blue-tick"
                        />
                      </div>
                    ) : (
                      <>Image Upload Here</>
                    )}
                  </div>
                  <div className="userdonate-input-sec">
                    <div className="userdonate-inputfield">
                      Full Name
                      <input
                        type="text"
                        className="userdonate-input"
                        onChange={inputHandler}
                        name="name"
                      />
                    </div>
                    <div className="userdonate-inputfield">
                      Date of Birth
                      <input
                        onChange={inputHandler}
                        type="date"
                        className="userdonate-input"
                        name="date_of_birth"
                      />
                    </div>
                    <div className="userdonate-inputfield">
                      {" "}
                      Blood Group
                      <select
                        name="blood_group"
                        id=""
                        className="userdonate-input"
                        onChange={inputHandler}
                        style={{
                          fontSize: ".9rem",
                          fontWeight: "700",
                          color: "rgb(158, 0, 0)",
                          letterSpacing: 1,
                        }}
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="A_positive">A+ve</option>
                        <option value="A_negative">A-ve</option>
                        <option value="B_positive">B+ve</option>
                        <option value="B_negative">B-ve</option>
                        <option value="O_positive">O+ve</option>
                        <option value="O_negative">O-ve</option>
                        <option value="AB_positive">AB+ve</option>
                        <option value="AB_negative">AB-ve</option>
                      </select>
                    </div>
                    <div className="userdonate-inputfield">
                      {" "}
                      Phone
                      <input
                        type="tel"
                        className="userdonate-input"
                        name="phone_number"
                        onChange={inputHandler}
                        minLength={3}
                        maxLength={10}
                      />
                    </div>
                    <div className="userdonate-inputfield">
                      Gender
                      <select
                        name="gender"
                        id=""
                        className="userdonate-input"
                        onChange={inputHandler}
                        style={{
                          fontSize: ".9rem",
                          fontWeight: "700",
                        }}
                      >
                        <option value="" selected disabled>
                          Select
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Not Specify">Not Specify</option>
                      </select>
                    </div>
                    <div className="userdonate-inputfield">
                      Address
                      <input
                        type="text"
                        className="userdonate-input"
                        onChange={inputHandler}
                        name="address"
                      />
                    </div>
                  </div>
                  <div className="userdonate-submit-sec">
                    <button
                      type="button"
                      id="userdonate-btn"
                      onClick={detailsSubmit}
                    >
                      SUBMIT{" "}
                    </button>
                  </div>
                </form>
              </>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Userdonate;
