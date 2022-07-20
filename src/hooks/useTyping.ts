import { useEffect, useState } from "react"

// types
import type { ChangeEvent, KeyboardEvent } from "react"

const WORD_BANK = ["account", "act", "addition", "adjustment", "advertisement", "agreement", "air", "amount", "amusement", "animal", "answer", "apparatus", "approval", "argument", "art", "attack", "attempt", "attention", "attraction", "authority", "back", "balance", "base", "behavior", "belief", "birth", "bit", "bite", "blood", "blow", "body", "brass", "bread", "breath", "brother", "building", "burn", "burst", "business", "butter", "canvas", "care", "cause", "chalk", "chance", "change", "cloth", "coal", "color", "comfort", "committee", "company", "comparison", "competition", "condition", "connection", "control", "cook", "copper", "copy", "cork", "cotton", "cough", "country", "cover", "crack", "credit", "crime", "crush", "cry", "current", "curve", "damage", "danger", "daughter", "day", "death", "debt", "decision", "degree", "design", "desire", "destruction", "detail", "development", "digestion", "direction", "discovery", "discussion", "disease", "disgust", "distance", "distribution", "division", "doubt", "drink", "driving", "dust", "earth", "edge", "education", "effect", "end", "error", "event", "example", "exchange", "existence", "expansion", "experience", "expert", "fact", "fall", "family", "father", "fear", "feeling", "fiction", "field", "fight", "fire", "flame", "flight", "flower", "fold", "food", "force", "form", "friend", "front", "fruit"]

const shuffleWords = (array: string[]) :string[] => {
    const result = Array.from(array);
  
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = result[i]
        result[i] = result[j]
        result[j] = temp
    }
  
    return result;
}
export default function useTyping() {
    const [words, setWords] = useState<string[]>([])
    const [wordIndex, setWordIndex] = useState<number>(0)
    const [attempt, setAttempt] = useState<string>("")
    const [attemptHistory, setAttemptHistory] = useState<string[]>([])
    const [mistakes, setMistakes] = useState<number>(0)
    const [mistakesHistory, setMistakesHistory] = useState<number[]>([])
    const [hasStarted, setHasStarted] = useState<boolean>(false)

    const nextWord = () => { if (wordIndex + 1 < words.length) setWordIndex(wordIndex + 1) }
    const prevWord = () => { if (wordIndex - 1 >= 0) setWordIndex(wordIndex - 1) }

    const handleAttemptChange = (e: ChangeEvent<HTMLInputElement>) => setAttempt(e.target.value.trim())

    const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (!hasStarted) {
            setHasStarted(true)
        }
        
        if (e.code === "Space") {
            setAttemptHistory((prevAttemptHistory: string[]) => {
                const newAttemptHistory = Array.from(prevAttemptHistory)
                newAttemptHistory.push(attempt)
                return newAttemptHistory
            })
            setMistakesHistory((prevMistakesHistory: number[]) => {
                const newMistakesHistory = Array.from(prevMistakesHistory)
                newMistakesHistory.push(mistakes)
                return newMistakesHistory
            })

            setAttempt("")
            setMistakes(0)
            nextWord()
        } else if (e.code === "Backspace") {
            if (attempt.length === 0) {
                setAttemptHistory((prevAttemptHistory: string[]) => {
                    const newAttemptHistory = Array.from(prevAttemptHistory)
                    newAttemptHistory.pop()
                    return newAttemptHistory
                })
                setMistakesHistory((prevMistakesHistory: number[]) => {
                    const newMistakesHistory = Array.from(prevMistakesHistory)
                    newMistakesHistory.pop()
                    return newMistakesHistory
                })

                setAttempt(attemptHistory[attemptHistory.length-1] ?? "")
                setMistakes(mistakesHistory[attemptHistory.length-1] ?? 0)
                prevWord()
            }
        } else {
            if (attempt) {
                let mistakeCount = 0
                for (let i = 0; i < words[wordIndex].length; i++) {
                    if (i === attempt.length) break;
                    else if (words[wordIndex][i] !== attempt[i]) {
                        mistakeCount++
                    }
                }
                setMistakes(mistakeCount)
            }
        }
    }

    const resetState = () => {
        setWords(shuffleWords(WORD_BANK))
        setWordIndex(0)
        setAttempt("")
        setAttemptHistory([])
        setMistakes(0)
        setMistakesHistory([])
        setHasStarted(false)
    }

    useEffect(() => {
        setWords(shuffleWords(WORD_BANK))
    }, [])

    return {
        hasStarted,
        attempt,
        attemptHistory,
        words,
        currentWord: words[wordIndex],
        mistakesHistory,
        handleAttemptChange,
        handleKeyUp,
        resetState
    }
}