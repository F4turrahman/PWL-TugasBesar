import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Layout from "./Layout";
import { useDispatch ,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    dispatch(getMe());
  },[dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;