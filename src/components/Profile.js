import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "./Profile.css";
import Doctors from "./Doctors";

//https://www.tebinja.com/api/v1/doctors/${id}
// useEffect(() => {
//   fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
//     .then((res) => res.json())
//     .then((data) => {
//       setDoctorData(data);
//       setLoading(false);
//     });
// }, []);
function Profile() {
  const { id } = useParams();
  //   console.log(id);
  const [search, setSearch] = useSearchParams();
  const [doctorData, setDoctorData] = useState();
  const [loading, setLoading] = useState(true);

  const fetchDoctor = (id) => {
    fetch(`https://www.tebinja.com/api/v1/doctors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDoctorData(data);
        setLoading(false);
      });
  };
  useEffect(() => {
    const x = search.get(`page=${search}`);
    fetchDoctor(x ? x : 0);
  }, []);
  if (loading || !doctorData) return <h1>Please Wait... </h1>;

  if (!doctorData.success) return <h1>moshkeli pish amade kasakam</h1>;
  //   console.log("************");
  //   console.log(doctorData);
  //   console.log(doctorData.doctor);

  return (
    <div className="container0">
      <div className="container1">
        <img
          onError={(e) => {
            e.target.src =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJmxjl0K_BmnUf3Ja0NjJXVxYmXWcWTkSudccFj7TE9w&s";
            e.target.onError = null;
          }}
          alt="Doctor Photos"
          className="img1"
          src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${doctorData.doctor.url}`}
        />
        {doctorData && (
          <h3 className="nameDoctor">
            {doctorData.doctor.fname} {doctorData.doctor.lname}
          </h3>
        )}
        {doctorData && (
          <p className="nameDoctor">
            متخصص:
            {doctorData.doctor.spUnis[0].specialty.name}
          </p>
        )}
        {doctorData && (
          <p className="nameDoctor">
            آدرس: {doctorData.doctor.clinics[0].address}
          </p>
        )}
      </div>
      <Link className="back-btn1" to={`/page+=${search}`}>
        بازگشت
      </Link>
    </div>
  );
}
export default Profile;
// {doctorData && (
//   <p className="nameDoctor">
//     دانشگاه: {doctorData.doctor.spUnis[0].university.name}
//   </p>
// )}
