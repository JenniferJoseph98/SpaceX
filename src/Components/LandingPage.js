import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import "./landing.css";

function LandingPage() {
  let [details, setDetails] = useState([]);
  const [popupwindow, setPopupwindow] = useState(false);
  const [search, setSearch] = useState(true);
  const [popup, setPopup] = useState({
    company: "",
    country: "",
    wikipedia: "",
    description: "",
    engine: "",
  });
  const [searchDetails, setSearchDetails] = useState({
    rocketname: "",
    rockettype: "",
    launchdate: "",
  });

  function searchResult(e) {
    e.preventDefault();
    setSearch(!search);
    console.log(searchDetails);
  }
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/rockets")
      .then((response) => {
        console.log(response.data);
        setDetails(response.data);
      })
      .catch((error) => console.log(error));
    console.log(popup);
    console.log(details);
  }, []);
  return (
    <div id="page">
      <div className="banner">
        <div id="quotes">
          <span id="go">Go</span>
          <h1>confidently in </h1>
          <h1>the directions</h1>
          <h1>of your </h1>
          <span id="go">Dream</span>
        </div>
      </div>
      <div id="inputs">
        <input
          type="text"
          onChange={(e) =>
            setSearchDetails({ ...searchDetails, rocketname: e.target.value })
          }
          value={searchDetails.rocketname}
          className="search"
          placeholder="     Rocket Name"
        />
        <input
          value={searchDetails.rockettype}
          onChange={(e) =>
            setSearchDetails({ ...searchDetails, rockettype: e.target.value })
          }
          type="text"
          className="search"
          placeholder="     Rocket Type"
        />
        <input
          type="text"
          onChange={(e) =>
            setSearchDetails({ ...searchDetails, launchdate: e.target.value })
          }
          value={searchDetails.launchdate}
          className="search"
          placeholder="     Launch date"
        />
        <button
          className="search"
          onClick={(e) => searchResult(e)}
          id="searchbtn"
        >
          Search
        </button>
      </div>
      {popupwindow && (
        <>
          <div id="popupbox">
            <div className="popuptop">
              <h3>Rocket Name:- {popup.company}</h3>
              <h3>Rocket Name:- {popup.country}</h3>
              <h3>wikipedia Link:- {popup.wikipedia}</h3>
              <h6>Description:-{popup.description}</h6>
            </div>
            <div className="popupbottom">
              <button
                className="okaybtn"
                onClick={() => {
                  setPopupwindow(false);
                }}
              >
                Okay
              </button>
            </div>
          </div>
        </>
      )}
      {search ? (
        <>
          <div id="lists">
            {details.map((detail, index) => (
              <div
                key={index}
                className="tag"
                onClick={() => {
                  setPopup({
                    ...popup,
                    company: detail.company,
                    country: detail.country,
                    wikipedia: detail.wikipedia,
                    description: detail.description,
                    engine: detail.engines,
                  });
                  console.log("clicked");
                  console.log(popup);
                  setPopupwindow(true);
                }}
              >
                <div className="infopart">
                  <h2>Rocket Name:- {detail.rocket_name}</h2>
                  <h2>Rocket Type:- {detail.rocket_type}</h2>
                  <h2>Original Launch:- {detail.first_flight}</h2>
                </div>
                <div className="imagepart">
                  <img className="tagimage" src={detail.flickr_images[0]} />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        details.map((detail, index) => {
          if (
            searchDetails.launchdate === detail.first_flight &&
            searchDetails.rocketname === detail.rocket_name &&
            searchDetails.rockettype === detail.rocket_type
          ) {
            return (
              <div id="searchresult">
                <div className="infopart">
                  <h2>Rocket Name:- {detail.rocket_name}</h2>
                  <h2>Rocket Type:- {detail.rocket_type}</h2>
                  <h2>Original Launch:- {detail.first_flight}</h2>
                </div>
                <div className="imagepart">
                  <img className="tagimage" src={detail.flickr_images[0]} />
                </div>
              </div>
            );
          } else {
            <h1>No result found</h1>;
          }
        })
      )}
    </div>
  );
}

export default LandingPage;
