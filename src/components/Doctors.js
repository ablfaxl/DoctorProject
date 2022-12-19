import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Doctors.css";
import Profile from "./Profile";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
// import ReactDOM from "react-dom";

//...

function Doctors() {
  const [doctorData, setDoctorData] = useState();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [list, setList] = useState();
  const [search, setSearch] = useSearchParams();

  //   const [list, setList] = useEffect();
  // console.log(doctorData);
  const fetchDoctor = (page) => {
    fetch(`https://www.tebinja.com/api/v1/doctors/searchi?page=${page}`)
      .then((res) => res.json())
      .then((data) => setDoctorData(data), setLoading(true));
  };

  useEffect(() => {
    const x = search.get(`page`);
    fetchDoctor(x ? x : 0);
  }, []);
  if (!loading) return <h1>Please Wait... </h1>;
  {
    openModal && (
      <Profile
        list={list}
        setOpenModal={setOpenModal}
        doctorData={doctorData}
      />
    );
  }
  const handlePageClick = (e) => {
    fetchDoctor(e.selected);
    setSearch(`page = ${e.selected}`);
  };
  return (
    <div className="container">
      {doctorData &&
        doctorData.doctors.hits.map((item, i) => {
          return (
            <div key={i} className="container">
              <div
                onClick={() => {
                  setList(item.message_id);
                  setOpenModal(true);
                }}
                className="Docotor-container"
              >
                <img
                  onError={(e) => {
                    e.target.src =
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJmxjl0K_BmnUf3Ja0NjJXVxYmXWcWTkSudccFj7TE9w&s";
                    e.target.onError = null;
                  }}
                  alt="Doctor Photos"
                  className="img"
                  src={`https://www.tebinja.com/img/uploads/doctors/thumbnails/${item._source.url}`}
                />
                <h4 className="itemText">
                  {item._source.fname} {item._source.lname}
                </h4>
                <p className="pText">
                  {item._source.spUnis.map((item) => item.specialty.name)}
                </p>
                <Link
                  className="link"
                  to={`/profile/${item._id}page${search.get("page") || 0}`}
                >
                  اطلاعات بیشتر
                </Link>
              </div>
            </div>
          );
        })}
      <div className="pageHandler">
        <ReactPaginate
          className="pages"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={999}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default Doctors;
