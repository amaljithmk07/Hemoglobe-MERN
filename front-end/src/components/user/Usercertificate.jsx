import React, { useEffect } from "react";
import CertificateGenerator from "./CertificateGenerator";
import "./Usercertificate.css";
import { useDispatch, useSelector } from "react-redux";
import { userview } from "../../redux/reducer/UserviewSlice";

const Usercertificate = () => {
  ///////////////////
  const token = sessionStorage.getItem("Token");
  // console.log(token);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userview(token));
  }, []);

  const approveddate = useSelector((state) => state.user.userdata);

  ////////////////
  if (approveddate[0]?.status == "donated") {
    var name = approveddate[0]?.name.toUpperCase();
  }
  ////////////////

  const currentdate = new Date();
  const day = currentdate.getDate();
  const month = currentdate.getMonth() + 1;
  const year = currentdate.getFullYear();
  /////////////////////
  const date = day + "/" + month + "/" + year;

  ///////////////////////

  console.log(name);
  return (
    <div className="usercertificate-main-body">
      <div className="usercertificate-sub-body">
        <div className="usercertificate-title-sec">
          Certificate of Achievement
        </div>
        <div className="usercertificate-content-sec">
          <p>
            {" "}
            This certificate bears testament to the profound altruism
            demonstrated through an act of exceptional kindness — blood
            donation. The anonymous donor, whose identity remains undisclosed,
            has illuminated our community with a selfless commitment to
            enhancing the well-being of others. This noble endeavor, though
            often carried out without fanfare, encapsulates the very essence of
            compassion and community service.
          </p>{" "}
          <p>
            In generously contributing blood, this individual has bestowed a
            lifeline upon those in need, embodying the true spirit of altruism.
            The impact of such a benevolent act resonates far beyond the
            confines of anonymity, leaving an indelible mark on the collective
            well-being of our community. This recognition serves as a heartfelt
            expression of gratitude, acknowledging the invaluable support
            provided by the donor and underscoring the significance of unity in
            fostering a healthier and more resilient community.
          </p>{" "}
          <p>
            The act of blood donation, while often performed without seeking
            recognition, underscores a shared responsibility for the welfare of
            our fellow community members. It represents a tangible commitment to
            making a positive difference in the lives of those facing health
            challenges. As we extend our appreciation, we acknowledge that this
            act, unattributed though it may be, has played a pivotal role in
            elevating the quality of life for individuals in need.
          </p>{" "}
          <p>
            This certificate, symbolic of both gratitude and recognition, serves
            as a testament to the profound generosity exhibited by an anonymous
            donor. It marks not only a singular act of kindness but also
            signifies the beginning of a brighter, healthier future for those
            who benefit from this selfless gesture. In celebrating this unnamed
            contributor, we honor the spirit of giving and inspire others to
            follow suit, fostering a culture of compassion and community service
            within our midst.
          </p>{" "}
          {name ? (
            <>
              <p>
                Access your downloadable certificate here. Click to download and
                celebrate your accomplishment!
              </p>
              <div className="usercertificate-download-btn-sec">
                <CertificateGenerator name={name} date={date} />
              </div>
            </>
          ) : (
            <>
              You can only download your blood donation certificate after
              completing your blood donation.
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usercertificate;
