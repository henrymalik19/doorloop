import { ChangeEvent, KeyboardEvent } from 'react'

interface TypingInputProps {
    attempt: string
    handleAttemptChange: (e: ChangeEvent<HTMLInputElement>) => void
    handleKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void
}

const TypingInput = ({ attempt, handleAttemptChange, handleKeyUp }: TypingInputProps) => {
  return (
    
    <div className="Typing_Container">
    <input type="text" id="Typing_Area" placeholder="Enter Text Here..." value={attempt} onChange={handleAttemptChange} onKeyUp={handleKeyUp} />
  </div>
  )
}

export default TypingInput