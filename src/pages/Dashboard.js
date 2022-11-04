import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import { UserDetailsApi } from "../services/Api";
import { logout, isAuthenticated } from "../services/Auth";

export default function DashboardPage() {
  const navigate = useHistory();

  const [user, setUser] = useState({ name: "", email: "", localId: "" });

  useEffect(() => {
    if (isAuthenticated()) {
      UserDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logoutUser = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NavBar logoutUser={logoutUser} />
      <main role="main" className="container mt-5">
        <div className="container">
          <div className="text-center mt-5">
            <h3>Dashboard page</h3>
            {user.name && user.email && user.localId ? (
              <div>
                <p className="text-bold ">
                  Hi {user.name}, your Firebase ID is {user.localId}
                </p>
                <p>Your email is {user.email}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
