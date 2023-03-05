import styles from "./Navbar.module.css";
import chatIcon from "../../assets/chatIcon.svg"
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function Navbar() {

  const { user, isAuthenticated, loginWithRedirect } = useAuth0()

  console.log(user)

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
            <img src={user?.picture} />
        }
        {
          !isAuthenticated &&
            <button onClick={()=> loginWithRedirect()}>Login</button>
        }
      </div>
    </nav>
  );
}

export default Navbar;
