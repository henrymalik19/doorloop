import React, { useEffect } from 'react'

// styles
import styles from "./Word.module.css"

interface WordProps {
    word: string
    isActive: boolean
    attempt: string
}

const Word = ({ word, isActive, attempt }: WordProps) => {
    const getClasses = () => {
        const classes = [styles.word]

        if (isActive) classes.push(styles.active_word)
        else if (attempt) {
            if (word.match(attempt)) classes.push(styles.correct_word)
            else classes.push(styles.incorrect_word)
        }

        return classes.join(" ")
    }

    return (
        <span className={getClasses()}>
            {Array.from(word).map((letter: string, idx: number) => {
                if (!isActive || !attempt[idx]) return letter
                
                if (letter !== attempt[idx]) return <span key={`${idx}-${letter}`} className={styles.incorrect_letter}>{letter}</span>
                else return <span key={`${idx}-${letter}`} className={styles.correct_letter}>{letter}</span>
            })}
        </span>
    )
}

export default Word