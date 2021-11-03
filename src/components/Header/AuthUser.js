import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import userAction from "../../store/users-slice";

// icons
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'
import { VscClose} from 'react-icons/vsc'
// styles
import styles from './Header.module.css'

const AuthUser = () => {
  const { authUser } = useSelector((state) => state.users);
  const [showMenu, setShowMenu] = useState(false)

  const dispatch = useDispatch();

  const token = authUser && authUser.token;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(userAction.requestLogout(token));
  };

  const onWindowResized = (e) => {
    if(e.target.innerWidth > 600){
      setShowMenu(false)
    }
  }

  useEffect(()=>{
    window.addEventListener('resize', onWindowResized)
    return ()=> window.removeEventListener('resize', onWindowResized)
  }, [])

  return (
    <div className={`${styles.menu__wrapper}`}>
      <div className={styles.toggle__wrapper} onClick={() => setShowMenu(true)}>
        <AiOutlineMenu className={styles.toggle__btn} />
      </div>
      <div
        className={`${styles.user__auth} ${
          showMenu && styles.menu__wrapper_show
        }`}
      >
        {authUser ? (
          <p className={styles.user__info}>
            <span className={styles.user__greeting}>
              {" "}
              Welcome, {authUser.username}{" "}
            </span>
            <Link
              to="account/password_change"
              className={styles.user__password_change}
            >
              Change password
            </Link>
            <a
              href="no-route"
              onClick={logoutHandler}
              className={styles.logout__btn}
            >
              <AiOutlineLogout
                className={styles.logout__icon}
                title="Log out"
              />
            </a>
            <div className={styles.menu__close_btn} onClick={()=>setShowMenu(false)}>
              <VscClose className={styles.menu__close_icon} />
            </div>
          </p>
        ) : (
          <Link to="account/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default AuthUser;
