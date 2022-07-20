import { useState, useRef, useEffect } from 'react'

interface TimerProps {
    start: number
    shouldStart: boolean
    onEnd: () => void
}

const useTimer = ({ start, shouldStart, onEnd }: TimerProps) => {
    const [timer, setTimer] = useState<number>(start)
    const intervalIdRef = useRef<number| null>(null)

    useEffect(() => {
        if (shouldStart && !intervalIdRef.current) {
            intervalIdRef.current = window.setInterval(() => {
                setTimer((prev: number) => prev - 1)
            }, 1000);
        }
    }, [shouldStart])

    useEffect(() => {
        if (timer < 0) {
          clearInterval(intervalIdRef.current as number);
          intervalIdRef.current = null;

          setTimer(start);
          alert("View Stats!\nClick 'OK' to restart");
          onEnd();
        }
    }, [timer])

    return {
        timer
    }
}

export default useTimer