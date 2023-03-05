import { hook_Home } from './hook_Home';
import styles from './Home.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import girlSms from "../../assets/girl-sms.png";
import { Link } from 'react-router-dom';

function Home() {

  const { user, loginWithRedirect } = useAuth0()

  return (
    <div className={styles.Home_Container}>
      <div className={styles.textSide}>
        <p>Bienvenidos a CharlaExpress, un espacio donde puedes conectarte con personas de todo el mundo y compartir tus pensamientos, ideas y experiencias. Ya sea que busques conocer gente nueva, discutir temas de interés o simplemente pasar un buen rato, nuestro chat es el lugar perfecto para ti. Únete a nuestra comunidad amigable y disfruta de la diversión y el entretenimiento que ofrecemos. ¡Esperamos verte pronto en nuestro chat!</p>
        <Link to={"/chat"}>
          <button>Chatear</button>
        </Link>
      </div>
      <div className={styles.imgSide}>
        <div className={styles.imgDecoration}></div>
        <img src={girlSms} />
      </div>
    </div>
  )
}

export default Home