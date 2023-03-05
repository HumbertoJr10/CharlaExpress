import { hook_Home } from './hook_Home';
import styles from './Home.module.css';
import { useAuth0 } from '@auth0/auth0-react';

function Home() {

  const { user, loginWithRedirect } = useAuth0()
  

  return (
    <div className={styles.Home_Container}>
      <h1>hola</h1>
      <button onClick={()=> loginWithRedirect()}>Login</button>
      
    </div>
  )
}

export default Home