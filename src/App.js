
import Row from "./components/Row";
import GuessWordList from "./components/GuessWords";

import { useState, useEffect } from "react";

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
    currentColumn: 0
  })

  const titleStyle = {
    fontFamily: "Courier New, Courier, monospace",
    textAlign: "center"
  }

  const updateCellStyle = (i, j) => {
    setState((state)=>{
      let cellState = state.cellStates[i][j];
      if(cellState==-1)
        return state

      cellState = (cellState + 1) % 3;

      let cellStateList = [...state.cellStates[i]];
      cellStateList[j] = cellState;

      let cellStateArray = [...state.cellStates];
      cellStateArray[i] = cellStateList;

      return {
        ...state,
        cellStates: cellStateArray
      }
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
          return {
            texts: texts,
            currentRow: state.currentRow + 1,
            currentColumn: 0,
            cellStates: cellStates
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
            cellStates: state.cellStates
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
              cellStates: state.cellStates
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
    <div>
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
        
        <GuessWordList cellStates={state.cellStates} guesses={state.texts}/>

    </div>
  )


}

export default App;
