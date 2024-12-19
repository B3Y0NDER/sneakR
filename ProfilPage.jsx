import React, { useState, useEffect } from "react";

function ProfilePage() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:3000/user/1", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    };
    fetchUser();
  }, [token]);

  return (
    <div>
      <h2>Mon Profil</h2>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>
    </div>
  );
}

export default ProfilePage;
