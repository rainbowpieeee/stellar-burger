import React, { FunctionComponent } from "react";
import { FormElement } from "../components/form-element/form-element";
import styles from './profile.module.css';

import { refreshMainToken } from "../utils/utils";

import { ProfileNav } from "../components/profile-nav/profile-nav";


export const ProfilePage: FunctionComponent = () => {


  React.useEffect(() => {
    const interval = setInterval(refreshMainToken, 100000)
    return () => {
      clearInterval(interval)
    }
  },[])


  return (
    <div className={styles.profileconteiner}>
      <ProfileNav navconteiner={styles.navconteiner} text='В этом разделе вы можете&nbsp;  изменить свои персональные данные'/>
      <FormElement />
    </div>

  )

}




