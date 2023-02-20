import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.Navbar_Container}>
      <div className={styles.Navbar_leftSide}>
        <h1>TITLE</h1>
      </div>
      <div className={styles.Navbar_rigthSide}>
        <h2>item1</h2>
        <h2>item2</h2>
        <h2>item3</h2>
      </div>
    </nav>
  );
}

export default Navbar;
