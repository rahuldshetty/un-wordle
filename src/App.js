
import Row from "./components/Row";
import HowTo from "./components/howtoplay";
import GuessWordList from "./components/GuessWords";


import { useState, useEffect } from "react";

import data from "./components/data";

const App = () => {
  const MAX_COLUMN = 5;
  const [state, setState] = useState({
    "texts": [
      ["","","","",""]
    ],
    cellStates: [
      [-1,-1,-1,-1,-1]
    ],
    currentRow: 0,
    currentColumn: 0,

    topWords:[],
    includedChars: [],
    excludedChars: [],
    perfectChars: ["", "", "", "", ""]
  })

  const titleStyle = {
    fontFamily: "Courier New, Courier, monospace",
    textAlign: "center"
  }

  const shuffleWordsByFreq = (words) => {
    const TEXR_MAP = {  
      E:	56.88,	
      M	:15.36,
      A:	43.31	,
      H	:15.31,
      R:	38.64	,
      G	:	12.59,
      I	:	38.45	,
      B	:10.56,
      O	:36.51	,
      F	:	9.24,
      T	:35.43	,
      Y	:	9.06,
      N	:	33.92,	
      W	:	6.57,
      S	:29.23	,
      K	:5.61,
      L	:	27.98,	
      V	:5.13,
      C	:23.13	,
      X	:	1.48,
      U:	18.51	,
      Z	:1.39,
      D	:17.25,	
      J	:1.00,
      P	:16.14,	
      Q	:1
    }

    const calculateScore=(word)=>{
      let sc=0;
      for(var i=0;i<word.length;i++)
      {
        sc += TEXR_MAP[word[i].toUpperCase()]
      }
      return sc
    }

    return words.sort((a, b)=>{
      return calculateScore(b) - calculateScore(a)
    })
  } 

  const generateWords = (state) => {
      // console.log("State", state)
      let possibleWords = [];

      const allPossibleWords = data.filter((word)=>{
          return word.length == 5 && (new Set(word).size) == 5
      })

      for(var i=0;i<allPossibleWords.length;i++){
          const word = allPossibleWords[i];
          let isPossible=true

          for(var j=0;j<word.length;j++){
            const ch = word[j]
            const perfCh = state.perfectChars[j]
            if(state.excludedChars.includes(ch)){
                  isPossible=false
                  break
            }

            if(perfCh!="" && perfCh!=ch){
                  isPossible=false
                  break
            }
          }

          for(var j=0;j<state.includedChars.length;j++){
              const ch = state.includedChars[j]
              if(!word.includes(ch)){
                  isPossible=false
                  break
              }
          }
          
          if(isPossible){
              possibleWords.push(word)
          }
      }

      // return possibleWords.slice(0, 5)
    
      return shuffleWordsByFreq(possibleWords).slice(0, 5);
  }

  const updateWords=(state)=>{
    // const lastUpdatedRow = (state.texts.length - 2);
    let perfectChars=["", "", "", "", ""]

    // find characters that included
    let included=[];
    let excluded=[];
    // let lastWord = state.texts[lastUpdatedRow]
    // let cellStates = state.cellStates[lastUpdatedRow]

    for(var jc=0;jc<state.texts.length-1;jc++){
      let lastWord = state.texts[jc]
      let cellStates = state.cellStates[jc]

      for(var i=0;i<lastWord.length;i++){
        const ch = lastWord[i]
        const cell = cellStates[i]
        if(cell==0){
            excluded.push(ch)
        }
        else if(cell>=1)
        {
            included.push(ch)
        }
        if(cell==2)
        {
            perfectChars[i] = ch
        }
      }  
    }  


    const newState = {
        includedChars: included,
        excludedChars: excluded,
        perfectChars: perfectChars,
        topWords: generateWords({
          includedChars: included,
          excludedChars: excluded,
          perfectChars: perfectChars,
        }),

        texts: state.texts,
        cellStates: state.cellStates,
        currentRow: state.currentRow,
        currentColumn: state.currentColumn,
    }
    return newState
  }

  const updateCellStyle = (i, j) => {
    setState((state)=>{
      let cellState = state.cellStates[i][j];
      if(cellState==-1)
        return state

      cellState = (cellState + 1) % 3;

      let newCellStates = [...state.cellStates]
      newCellStates[i][j] = cellState;

      const statePre={
        cellStates: newCellStates,
        ...state
      }

      const newState = updateWords(statePre)

      return newState
    })
  }

  const handleKeyPress = (event) => {
      let char = event.key;
      setState((state)=>{
        if (event.keyCode == 13 && state.currentColumn == MAX_COLUMN){
          let texts = [...state.texts];
          texts.push(["","","","",""])

          let cellStates = [...state.cellStates];

          // mark previous cellState to be editable for suggestion
          cellStates[state.currentRow] = [0,0,0,0,0]

          cellStates.push(
            [-1,-1,-1,-1,-1]
          )

          const excluded = [...state.excludedChars]

          let tw = [...state.topWords]

          if(tw.length==0){
            const prevText = texts[texts.length - 2]
            tw = generateWords({
              includedChars: [],
              excludedChars: prevText,
              perfectChars: ["","","","",""],
            })
            // console.log("TP:", prevText, tw)  
          }

          return {
            texts: texts,
            currentRow: state.currentRow + 1,
            currentColumn: 0,
            cellStates: cellStates,

            topWords: tw,
            includedChars: [...state.includedChars],
            excludedChars: excluded,
            perfectChars: [...state.perfectChars]
          }
        }

        if ( event.keyCode == 8 && state.currentColumn > 0){
          let texts = [...state.texts];
          let cur_text = texts[state.currentRow];
          cur_text[state.currentColumn - 1] = "";
          texts[state.currentRow] = cur_text;
          return {
            texts: texts,
            currentRow: state.currentRow,
            currentColumn: state.currentColumn - 1,
            cellStates: state.cellStates,

            topWords:[...state.topWords],
            includedChars: [...state.includedChars],
            excludedChars: [...state.excludedChars],
            perfectChars: [...state.perfectChars]
          }
        }

        if(state.currentColumn < MAX_COLUMN){
          // Alphabet upper case or lower case
          if ( (event.keyCode >= 65 && event.keyCode <= 90) ||  (event.keyCode >= 97 && event.keyCode <= 122) ){
            let texts = [...state.texts];
            let cur_text = texts[state.currentRow];
            cur_text[state.currentColumn] = char;
            texts[state.currentRow] = cur_text;
            return {
              texts: texts,
              currentRow: state.currentRow,
              currentColumn: state.currentColumn + 1,
              cellStates: state.cellStates,

              topWords:[...state.topWords],
              includedChars: [...state.includedChars],
              excludedChars: [...state.excludedChars],
              perfectChars: [...state.perfectChars]
            }
          } 
        }
        return state
      })
  }

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyPress);
    return ()=>{
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return (
      <div style={{
        height: "100%"
      }}>
        <h1 style={titleStyle}>UN-WORDLE</h1>  
        <div style={{
          justifyContent: "center",
          alignItems: "center",
          display: "grid",
          gridTemplateRows: "repeat(1, 62px)",
          gridGap: "2px",
          width: "100%"
        }}>
          {state.texts.map((text, i) => {
            return <Row key={Math.random()} row={i} word={text} cellStates={state.cellStates[i]} updateCellStyle={updateCellStyle}/>
          })}
        </div>
        <GuessWordList allState={state} />
        <HowTo/>
      </div>
  )


}

export default App;
