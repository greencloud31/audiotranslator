import React from "react";
import Modal from "./modal";
import ProfileUpdate from "./profileUpdate";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <Modal id="modalUpdate">
        <ProfileUpdate user={user} />
      </Modal>
      <div
        className="ri-pencil-fill ri-2x"
        data-bs-toggle="modal"
        data-bs-target="#modalUpdate"
      ></div>
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">First Name</div>
          <div className="value">{user.first_name}</div>
        </div>
        <div className="col-12 col-md-5">
          <div className="label">Last Name</div>
          <div className="value">{user.last_name}</div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">Email</div>
          <div className="value">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
