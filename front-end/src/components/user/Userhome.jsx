import React, { useEffect } from "react";
import { useParallax } from "react-scroll-parallax";
import "./Userhome.css";
import "aos/dist/aos.css";
import AOS from "aos";
import { useNavigate } from "react-router-dom";

// const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

const Userhome = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("Token");

  const parallax0 = useParallax({
    scale: [1, 5, "easeInQuad"],
    // translateX: isChrome ? ["660px", "-1000px"] : ["500px", "-800px"],

    translateX: ["660px", "-1000px"],
    // speed:10
    rotate: [-240, 360],
  });
  const parallax1 = useParallax({
    scale: [1, 5, "easeInQuad"],
    translateY: ["670px", "-1000px"],
    rotate: [-240, 360],

    // speed:-10
  });
  const parallax2 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [240, -360],
    // rotate: [41, -960],

    translateX: ["660px", "-1000px"],
    // speed:30
  });
  const parallax3 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [240, -360],
    // rotate: [41, -960],

    translateY: ["670px", "-1000px"],

    // speed:50
  });
  const parallax4 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [240, -360],
    // rotate: [41, -960],

    translateX: ["-660px", "1000px"],
    // speed:-10
  });
  const parallax5 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [-240, 360],
    translateY: ["670px", "-1000px"],
    // speed:-10
  });
  const parallax6 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [-240, 360],

    translateX: ["-660px", "1000px"],
    // speed:-10
  });
  const parallax7 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [240, -360],
    // rotate: [41, -960],

    translateY: ["670px", "-1000px"],
    // speed:-10
  });
  const parallax8 = useParallax({
    scale: [1, 5, "easeInQuad"],
    rotate: [-240, 360],

    translateX: ["-660px", "1000px"],
    // speed:-10
  });
  useEffect(() => {
    AOS.init();
  }, []);

  //Servide Button
  const service = () => {
    if (token != null) {
      navigate("/login");
    } else {
      navigate("/user/donate");
    }
  };
  return (
    <div className="userhome-body">
      <div className="userhome-content">
        <div className="userhome-parallax-sec">
          <div ref={parallax0.ref} className="userhome-parallax">
            H{" "}
          </div>
          <div ref={parallax1.ref} className="userhome-parallax">
            E
          </div>
          <div ref={parallax2.ref} className="userhome-parallax">
            M{" "}
          </div>
          <div ref={parallax3.ref} className="userhome-parallax">
            O{" "}
          </div>
          <div ref={parallax4.ref} className="userhome-parallax">
            G{" "}
          </div>
          <div ref={parallax5.ref} className="userhome-parallax">
            L{" "}
          </div>
          <div ref={parallax6.ref} className="userhome-parallax">
            O{" "}
          </div>
          <div ref={parallax7.ref} className="userhome-parallax">
            B{" "}
          </div>
          <div ref={parallax8.ref} className="userhome-parallax">
            E{" "}
          </div>
        </div>
        <h1 className="userhome-h1" data-aos="fade-up">
          {" "}
          Blood Basics
        </h1>
        <p data-aos="fade-up">
          {" "}
          Blood is a specialized body fluid. It has four main components:
          plasma, red blood cells, white blood cells, and platelets. Blood has
          many different functions, including:
        </p>
        <div className="userhome-image">
          <img
            src="/home-doctor.png"
            alt=""
            className="userhome-image-img"
            data-aos="fade-up"
          />
        </div>
        <ul style={{ listStyleType: "circle" }} data-aos="fade-up">
          <li> transporting oxygen and nutrients to the lungs and tissues</li>
          <li>forming blood clots to prevent excess blood loss</li>
          <li> carrying cells and antibodies that fight infection</li>
          <li>
            {" "}
            bringing waste products to the kidneys and liver, which filter and
            clean the blood
          </li>
          <li> regulating body temperature</li>
        </ul>
        <div className="userhome-image">
          <img
            src="/bloodgroup-match.jpeg"
            alt=""
            className="userhome-image-img"
            data-aos="fade-up"
          />
        </div>
        <p data-aos="fade-up">
          The blood that runs through the veins, arteries, and capillaries is
          known as whole blood, a mixture of about 55 percent plasma and 45
          percent blood cells. About 7 to 8 percent of your total body weight is
          blood. An average-sized man has about 12 pints of blood in his body,
          and an average-sized woman has about nine pints.{" "}
        </p>{" "}
        <div className="userhome-animation" data-aos="fade-right">
          <video width={500} height={284} autoPlay muted>
            <source
              src="/istockphoto-1292468456-640_adpp_is.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="userhome-animation-small" data-aos="fade-right">
          <video width={300} height={160} autoPlay muted>
            <source
              src="/istockphoto-1292468456-640_adpp_is.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <h1 className="userhome-h1" data-aos="fade-up">
          The Components of Blood and Their Importance
        </h1>
        <p data-aos="fade-up">
          {" "}
          Many people have undergone blood tests or donated blood, but
          hematology - the study of blood - encompasses much more than this.
          Doctors who specialize in hematology (hematologists) are leading the
          many advances being made in the treatment and prevention of blood
          diseases.
        </p>
        <p data-aos="fade-up">
          If you or someone you care about is diagnosed with a blood disorder,
          your primary care physician may refer you to a hematologist for
          further testing and treatment.
        </p>
        <h1 className="userhome-h1" data-aos="fade-up">
          {" "}
          Plasma
        </h1>
        <p data-aos="fade-up">
          {" "}
          The liquid component of blood is called plasma, a mixture of water,
          sugar, fat, protein, and salts. The main job of the plasma is to
          transport blood cells throughout your body along with nutrients, waste
          products, antibodies, clotting proteins, chemical messengers such as
          hormones, and proteins that help maintain the body's fluid balance.
        </p>
        <div className="userhome-mid" data-aos="fade-up">
          <img src="/blood.jpg" alt="" className="userhome-mid-img" />
        </div>
        <h1 className="userhome-h1" data-aos="fade-up">
          {" "}
          Red Blood Cells (also called erythrocytes or RBCs)
        </h1>
        <p data-aos="fade-up">
          Known for their bright red color, red cells are the most abundant cell
          in the blood, accounting for about 40 to 45 percent of its volume. The
          shape of a red blood cell is a biconcave disk with a flattened center
          - in other words, both faces of the disc have shallow bowl-like
          indentations (a red blood cell looks like a donut).
        </p>
        <p data-aos="fade-up">
          Production of red blood cells is controlled by erythropoietin, a
          hormone produced primarily by the kidneys. Red blood cells start as
          immature cells in the bone marrow and after approximately seven days
          of maturation are released into the bloodstream. Unlike many other
          cells, red blood cells have no nucleus and can easily change shape,
          helping them fit through the various blood vessels in your body.
          However, while the lack of a nucleus makes a red blood cell more
          flexible, it also limits the life of the cell as it travels through
          the smallest blood vessels, damaging the cell's membranes and
          depleting its energy supplies. The red blood cell survives on average
          only 120 days.
        </p>
        <p data-aos="fade-up">
          Red cells contain a special protein called hemoglobin, which helps
          carry oxygen from the lungs to the rest of the body and then returns
          carbon dioxide from the body to the lungs so it can be exhaled. Blood
          appears red because of the large number of red blood cells, which get
          their color from the hemoglobin. The percentage of whole blood volume
          that is made up of red blood cells is called the hematocrit and is a
          common measure of red blood cell levels.
        </p>
        <h3 className="userhome-h3" data-aos="fade-up">
          Host country for World Blood Donor Day 2023 :
        </h3>
        <p data-aos="fade-up">
          The host country for the global event of World Blood Donor Day 2023 is
          Algeria through its National Blood Transfusion Service.
        </p>
        <div className="userhome-service-head" data-aos="fade-up">
          OUR SERVICE
        </div>
        <div className="userhome-service-content" data-aos="fade-up">
          <div className="userhome-service-carousel-sec" data-aos="fade-right">
            <img src="service2.png" alt="" className="userhome-service-img" />
            <img src="service1.png" alt="" className="userhome-service-img" />
            <img src="service3.png" alt="" className="userhome-service-img" />
            <img src="service4.png" alt="" className="userhome-service-img" />
          </div>

          <div className="userhome-service-summary" data-aos="fade-left">
            Experience seamless blood donation with Hemoglobe's website. Easily
            schedule appointments for donation. Upon hospital approval, secure a
            designated donation date. Post-donation, celebrate your contribution
            with an achievement certificate. Hemoglobe streamlines the entire
            process, ensuring a smooth and rewarding experience for donors. Join
            our mission to save lives and make a difference today.
            <button className="userhome-service-btn" onClick={service} data-aos="fade-left">
              More details 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userhome;
