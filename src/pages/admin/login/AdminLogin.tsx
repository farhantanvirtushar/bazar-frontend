/* eslint-disable */
import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "./style.css";
import { LoginReqAdmin } from "../../../models/auth/LoginReqAdmin";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

import { AxiosError } from "axios";
import { getRequest, postRequest } from "../../../axios/Axios";
import { AdminAuthRes } from "../../../models/auth/AdminAuthRes";
import { ErrorRes } from "../../../models/auth/ErrorRes";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginReqAdmin>();

  const admin_login_url = "/api/auth/admin-login";

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginReqAdmin> = async (
    data: LoginReqAdmin
  ) => {
    try {
      const adminRes: AdminAuthRes = await postRequest<AdminAuthRes>(
        admin_login_url,
        data
      );
      localStorage.setItem("token", adminRes.token);
      localStorage.setItem("user_type", "ADMIN");
      navigate("/admin/dashboard");
    } catch (errorRes: any) {
      const error: AxiosError<ErrorRes> = errorRes;

      const error_message: any = error.response?.data;

      if (error_message.message === "username") {
        setError("username", {
          type: "server",
          message: "wrong username",
        });
      }
      if (error_message.message === "password") {
        setError("password", {
          type: "server",
          message: "wrong password",
        });
      }
    }
  };
  return (
    <div className="body">
      <div className="login-container">
        <div className="title"> Admin Login</div>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <TextField
              fullWidth
              label="username"
              variant="outlined"
              {...register("username", { required: "username is required" })}
            />
          </div>

          <div className="error">
            {errors.username && errors.username.message}
          </div>

          <div className="form-item">
            <TextField
              fullWidth
              type="password"
              label="password"
              variant="outlined"
              {...register("password", { required: "password is required" })}
            />
          </div>

          <div className="error">
            {errors.password && errors.password.message}
          </div>

          {isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button fullWidth variant="contained" type="submit">
              Sign In
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
