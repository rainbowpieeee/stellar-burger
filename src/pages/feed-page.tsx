import React, { FunctionComponent } from "react";
import { OrderFeed } from "../components/order-feed/order-feed";
import { ScoreBoard } from "../components/scoreboard/scoreboard";
import { useDispatch } from "../services/types/hooks";
import { WS_CONNECTION_START, WS_CLOSE_CONNECTION} from "../services/constants";
import styles from './feed-page.module.css'



export const FeedPage:FunctionComponent = () => {
  const dispatch = useDispatch();


  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START })

    return () => {
      dispatch({ type: WS_CLOSE_CONNECTION })
    }
  }, [dispatch])


  return (
    <div className={styles.conteiner}>
      <OrderFeed />
      <ScoreBoard />
    </div>

  )
}
