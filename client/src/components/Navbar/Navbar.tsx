import styles from "./Navbar.module.css";
import chatIcon from "../../assets/chatIcon.svg"
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {

  const { user, isAuthenticated } = useAuth0()

  console.log(user)

  return (
    <nav className={styles.Navbar_Container}>
      <div className={styles.Navbar_leftSide}>
        <img src={chatIcon} />
        <h1>Charla<strong>Express</strong></h1>
      </div>
      <div className={styles.Navbar_rigthSide}>
        {
          isAuthenticated &&
            <p>{user?.nickname}</p>
        }
        {
          isAuthenticated && 
            <img src={user?.picture} />
        }
      </div>
    </nav>
  );
}

export default Navbar;
