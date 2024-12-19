import React, { useState, useEffect } from "react";
import { getAdminData } from "../services/api";

function Admin() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await getAdminData(token);
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Accès interdit ou erreur serveur.");
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Espace Admin</h2>
      <p>{message}</p>
    </div>
  );
}

export default Admin;
