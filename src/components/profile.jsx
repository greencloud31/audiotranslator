const Profile = ({ user }) => {
  return (
    <div className="profile">
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">First Name</div>
          <div>{user.first_name}</div>
        </div>
        <div className="col-12 col-md-5">
          <div className="label">Last Name</div>
          <div>{user.last_name}</div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-0 col-md-1"></div>
        <div className="col-12 col-md-5">
          <div className="label">Email</div>
          <div>{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
