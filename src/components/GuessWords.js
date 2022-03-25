import { useEffect, useState } from "react";


const GuessWordList = (props) => {    

    const blockStyle = {
        color: "#090909",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        width: "100%",
        height: "100%",
        fontSize:"20px",
        textTransform: "uppercase",
        boxSizing: "border-box",
        fontFamily: "Courier New, Courier, monospace",
    }

    const innerStyle= {
        fontFamily: "Courier New, Courier, monospace",
        textTransform: "uppercase",
        justifyContent: "center",
        alignItems: "center",
        display: "grid",
        gridTemplateRows: "repeat(5, 15%)"
    }

    return <div>
        <div style={blockStyle}>
            <p>TOP 5 BEST GUESSES</p>
        </div>
        <div style={innerStyle}>
            {props.allState.topWords.map((word)=>{
                return <p key={Math.random()}>{word}</p>
            })}
        </div>
    </div>
}

export default GuessWordList;