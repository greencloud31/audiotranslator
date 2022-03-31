import React, { useState } from "react";
import Input from "./input";
import { updateUser } from "../services/userService";
import auth from "../services/authService";
import Joi from "joi";
import { toast } from "react-toastify";

const ProfileUpdate = (props) => {
  const [user, setUser] = useState({
    firstName: props.user.first_name,
    lastName: props.user.last_name,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const account = { ...user };
    account[input.name] = input.value;
    setUser(account);
  };

  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    password: Joi.string().min(8).required().label("Password"),
    confirmPassword: Joi.any()
      .equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Password does not match" }),
  });

  const validate = () => {
    const result = schema.validate(user, { abortEarly: false });

    if (!result.error) {
      return null;
    }
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) {
      return;
    }
    try {
      await updateUser(
        props.user.user_id,
        user.firstName,
        user.lastName,
        user.password
      );
      auth.logout();
      await auth.login(props.user.email, user.password);
      window.location = "/";
    } catch (ex) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="First Name"
        name="firstName"
        onChange={handleChange}
        value={user.firstName}
        error={errors.firstName}
      />
      <Input
        type="text"
        placeholder="Last Name"
        name="lastName"
        onChange={handleChange}
        value={user.lastName}
        error={errors.lastName}
      />
      <Input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={user.password}
        error={errors.password}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        onChange={handleChange}
        value={user.confirmPassword}
        error={errors.confirmPassword}
      />
      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default ProfileUpdate;
