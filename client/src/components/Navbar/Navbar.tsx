import styles from "./Navbar.module.css";
import chatIcon from "../../assets/chatIcon.svg"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";
import { useSelector } from "react-redux";
import { iState } from "../../interface";

function Navbar() {

  const { user, isAuthenticated, logout } = useAuth0()
  const {loginUser} = useLogin()
  
  const UserLoged = useSelector( (state:iState) => state.UserLoged)

  return (
    <nav className={styles.Navbar_Container}>
      <Link className={styles.Navbar_leftSide} to={"/"}> 
        <img src={chatIcon} />
        <h1>Charla<strong>Express</strong></h1>
      </Link>
      <div className={styles.Navbar_rigthSide}>
        {
          isAuthenticated &&
            <p>{user?.nickname}</p>
        }
        {
          isAuthenticated && 
            <img onClick={() => logout()} src={user?.picture} />
        }
        {
          !isAuthenticated &&
            <button onClick={loginUser}>Login</button>
        }
      </div>
    </nav>
  );
}

export default Navbar;
