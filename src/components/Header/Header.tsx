import { useEffect, useState } from "react"
import styles from "./Header.module.css"

interface HeaderProps {
  mistakesHistory: number[]
  attemptHistory: string[]
  timer: number
}
const Header = ({ mistakesHistory, attemptHistory, timer }: HeaderProps) => {
  const [cpm, setCpm] = useState<number>(0)

  useEffect(() => {
    const totalChars = attemptHistory.join("").length
    const totalMistakes = mistakesHistory.reduce((prev: number, curr: number) => prev + curr, 0)

    setCpm((totalChars - totalMistakes) / (60 - timer) * 60)
  }, [mistakesHistory, attemptHistory])

  return (
    <div className={styles.Header}>
        <div className={styles.Header_Item}>Corrected CPM:  <div className={styles.Header_Item_Value}>{isNaN(cpm) ? "?" : cpm}</div></div>
        <div className={styles.Header_Item}>WPM:  <div className={styles.Header_Item_Value}>{isNaN(Math.round(cpm / 5)) ? "?" : Math.round(cpm / 5)}</div></div>
        <div className={styles.Header_Item}>Time left: <div className={styles.Header_Item_Value}>{timer}</div></div>
    </div>
  )
}

export default Header