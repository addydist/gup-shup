import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  const navigate=useNavigate();
  const [value, setValue] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const toastOption = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
      const { Password, Username, Email } = value;
      const {data}= await axios.post(registerRoute,{
        Username,
        Email,
        Password
      });
      if(data.status===false){
        toast.error(data.msg,toastOption)
      }
      if(data.status===true){
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
      navigate('/');
    }
      
    }
  };
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { Password, ConfirmPassword, Username, Email } = value;
    if (Password !== ConfirmPassword) {
      toast.error("Password and ConfirmPassword different!!", toastOption);
      return false;
    }
    else if(Username.length<4){
      toast.error("Username should be greater than 4 character!!", toastOption);
      return false;
    }
    else if(Password.length<4){
      toast.error("Password should be greater than 8 character!!", toastOption);
      return false;
    }
    else if(Email===""){
      toast.error('Email is required!!',toastOption);
      return false;

    }
    return true;
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>GupSup🪶</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="Username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="Password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="ConfirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            already have an account? <a href="/login">Login</a>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register;
