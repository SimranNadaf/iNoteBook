import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Signup(props) {
  const {alert} = props
  const [credential, setcredential] = useState({name:"", email: "", password: "" });
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    console.log(credential);
    // API call
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      alert("Created Acoount Successfully","success");

    } else {
      alert("Please enter valid crediatials","danger");
    }
  };
  const onChange = (e) => {
    setcredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="container pt-3" style={{ paddingLeft: "50px" }}>
        <form onSubmit={handleClick}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              onChange={onChange}
              aria-describedby="namefield"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={onChange}
              name="password"
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Signup
