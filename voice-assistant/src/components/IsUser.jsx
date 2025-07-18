import React, { Children } from "react";
import { useGetMyprofileQuery } from "../../reduxApi/user";
import { useNavigate } from "react-router-dom";

const IsUser = ({ children }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyprofileQuery();
  if (isLoading) return <div>Loading...</div>;
  if (data) {
    navigate("/", { replace: true });
  }
  return children;
};

export default IsUser;
