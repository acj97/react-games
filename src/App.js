import React from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  const [dictionary, setDictionary] = React.useState([])
  const [finalWord, setFinalWord] = React.useState('')
  const [answers, setAnswer] = React.useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ])
  const [inputValue, setInputValue] = React.useState('')
  const [index, setIndex] = React.useState(0)
  const [error, setError] = React.useState('')
  const [isWin, setIsWin] = React.useState(false)
  React.useEffect(() => {
    getWords()
  }, [])

  async function getWords() {
    let tempDictionary = ''
    await fetch('/words.txt')
    .then((r) => r.text())
    .then(text  => {
      tempDictionary = text
    }) 

    tempDictionary = tempDictionary.split("\n")
    setDictionary(tempDictionary)

    let randomWord = tempDictionary[Math.floor(Math.random()*tempDictionary.length)];

    setFinalWord(randomWord)

  }

  function wordCheck(word, index) {
    if(finalWord.includes(word) && finalWord[index] == word) {
      return 'green'
    } else if(finalWord.includes(word) && finalWord[index] != word) {
      return 'orange'
    } else {
      return 'grey'
    }
  }

  function Word({word, index}) {
    return(
      <div 
        className={word == '' ? 'blank' : wordCheck(word, index)}
        style={{
          width: '75px',
          height: '75px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px',
          color: 'white',
          fontSize: '20px'
        }}
      >
        <b>{word}</b>
      </div>
    )
  }

  function submit() {
    if(dictionary.includes(inputValue)) {
      if(index < 5) {
        let arr = []
        for(let i=0; i<inputValue.length; i++) {
          arr.push(inputValue[i])
        }
        let arrAnswer = answers
        
        arrAnswer[index] = arr
        setAnswer(arrAnswer)
        setIndex(index + 1)
        setError('')

        if(inputValue == finalWord) setIsWin(true)
      }
    } else {
      setError('your word is not an actual word!')
    }
    
  }

  return (
    <div className="App">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '20px'
      }}>
        {/* <h3>{finalWord}</h3> */}
        {
          isWin ?
          <h1>YOU WIN!</h1>
          :
          <>
            <input 
              value={inputValue} 
              maxLength="5"
              onChange={(e) => {setInputValue(e.target.value)}}
            ></input>
            <button 
              onClick={() => submit()}
              className="primary-button"
              style={{marginTop: '20px'}}
            >
              <b>Add Answer</b>
            </button>
          </>
        }
        <h4 style={{color: 'red'}}>{error}</h4>
        {
          answers.map((answer,i) => 
            <div 
              key={i}
              style={{
                display: 'flex'
              }}
            >
              {answer.map((word, j) => 
                <Word 
                  word={word}
                  index={j} 
                  key={j}
                >
                </Word>
              )}
            </div>
          )
        }
      </div>
      

      
    </div>
  );
}

export default App;
