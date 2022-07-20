// components
import Word from './components/Word'
import Header from './components/Header'

// hooks
import useTyping from './hooks/useTyping'
import useTimer from './hooks/useTimer'

// styles
import './App.css'
import TypingInput from './components/TypingInput'

function App() {
  const { attempt, words, currentWord, attemptHistory, mistakesHistory, hasStarted, handleAttemptChange, handleKeyUp, resetState } = useTyping()
  const { timer } = useTimer({ start: 60, shouldStart: hasStarted, onEnd: () => resetState() })

  return (
    <div className="App_Container">
      <div className="App">
        <Header mistakesHistory={mistakesHistory} attemptHistory={attemptHistory} timer={timer} />
        <div className="words">
          {words.map((word: string, idx: number) => (
            <Word key={word} word={word} isActive={word === currentWord} attempt={(word === currentWord) ? attempt : attemptHistory[idx]} />
          ))}
        </div>
        <TypingInput attempt={attempt} handleAttemptChange={handleAttemptChange} handleKeyUp={handleKeyUp} />
      </div>
    </div>
  );
}

export default App;
