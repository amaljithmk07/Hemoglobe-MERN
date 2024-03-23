import React, { useEffect } from "react";
import "./UserdateAccepted.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userview } from "../../redux/reducer/UserviewSlice";

const UserdateAccept = () => {
  // const [approveddate, setApproveddate] = useState([]);
  const token = sessionStorage.getItem("Token");
  const navigate = useNavigate();

  //REDUX AREA

  const dispatch = useDispatch();
  const approveddate = useSelector((state) => state.user.userdata);

  // REDUX AREA

  useEffect(() => {
    dispatch(userview(token));
  }, []);
  console.log(approveddate.length);
  return (
    <div className="UserdateAccept-body">
      {approveddate.length !== 0 && approveddate[0]?.status == "donated" ? (
        <div className="UserdateAccept-content">
          <div className="UserdateAccept-content-heading-sec">
            Blood Donation Date
          </div>
          Dear {approveddate[0].name},
          <br />
          {/* DONATED */}
          We express our sincere appreciation for your active participation in
          our blood donation drive held on {approveddate[0].donation_date},
          organized by the Medical College, Calicut. Your selfless contribution
          has made a significant impact on saving lives within our community.
          Your involvement in this compassionate endeavor has been instrumental
          in the success of this noble cause. We are delighted to inform you
          that, as a token of our gratitude, we will be presenting you with a
          Blood Donation Certificate. The completed blood donation event at the
          Medical College, Calicut, has indeed made a difference and extended a
          helping hand to those in need. Your support as a life-saving hero is
          truly appreciated. Thank you for your dedication and commitment to
          this crucial cause. We look forward to presenting you with the
          certificate and expressing our gratitude in person.
          <br />
          Sincerely,
          <br />
          Calicut Medical College
        </div>
      ) : (
        <>
          {approveddate[0]?.status == "booking_approved" ? (
            <div className="UserdateAccept-content">
              <div className="UserdateAccept-content-heading-sec">
                Blood Donation Date
              </div>
              Dear {approveddate[0].name},
              <br />
              {/* BOOKING  */}
              APPROVED You are cordially invited to participate in our blood
              donation drive on {approveddate[0].donation_date}, hosted by the
              Medical College, Calicut. Your invaluable contribution can make a
              profound impact on saving lives in our community. Join us in this
              compassionate endeavor as we come together for a noble cause. Your
              presence at the Medical College, Calicut, is crucial to the
              success of this initiative. Let's make a difference and extend a
              helping hand to those in need. Your support is greatly
              appreciated, and we look forward to seeing you at the event. Thank
              you for being a life-saving hero!,
              <br />
              Calicut Medical College
            </div>
          ) : (
            // <>
            <div className="UserdateAccept-content">
              <div className="UserdateAccept-content-heading-sec">
                Blood Donation Update{" "}
              </div>
              Dear Sir/Madam,
              <br />
              {/* PENDING */}
              As of now, there is no information available regarding blood
              donation dates at Calicut Medical College. Despite ongoing efforts
              to obtain the schedule, specific details remain elusive. It is
              advisable to regularly check the official channels of Calicut
              Medical College or contact their relevant departments for the most
              accurate and up-to-date information on upcoming blood donation
              events. Staying informed through official announcements will
              ensure that potential donors are aware of any opportunities to
              contribute to this crucial and life-saving cause at Calicut
              Medical College.
            </div>

            // <div className="UserdateAccept-content">
            //   <div className="UserdateAccept-content-heading-sec">
            //     Blood Donation{" "}
            //   </div>
            //   Dear Sir/Madam,
            //   <br />
            //   NOT BOOKED YET Not Booked yet Regrettably, at present, we have not
            //   received any booking for blood donation from your side. Your
            //   willingness to contribute is highly commendable, and we encourage
            //   you to consider scheduling a donation in the near future. Your
            //   participation is crucial in saving lives, and we look forward to
            //   welcoming you at Calicut Medical College for this noble cause. To
            //   stay informed about upcoming events, please check our official
            //   channels or contact relevant departments. Your support is greatly
            //   valued, and we appreciate your consideration in making a positive
            //   impact on our community's health. Thank you for your potential
            //   contribution to this life-saving initiative.
            // </div>

            // {/* </> */}
          )}
        </>
      )}
    </div>
  );
};

export default UserdateAccept;
