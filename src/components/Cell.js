import { useState } from "react"

const Cell = (props) => {
    // CellState  - Meaning
    // -1 - Default
    // 0 - Wrong Character
    // 1 - Correct Character but invalid position
    // 2 - Correct character & Position
    const cellState = props.cellState;

    const cellStyle = {
        border: "2px solid #878a8c",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        height: "62px",
        width: "62px",
        fontSize: "2rem",
        textTransform: "uppercase",
        boxSizing: "border-box",
        fontWeight: "bold",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif",
        "cursor": "pointer"
    }

    if(cellState==0){
        cellStyle.border =  "2px solid #86888a"
        cellStyle.background = "#86888a"
        cellStyle.color = "#fff"
    }
    else if(cellState==1){
        cellStyle.border =  "2px solid #c9b458"
        cellStyle.background = "#c9b458"
        cellStyle.color = "#fff"
    }
    else if(cellState==2){
        cellStyle.border =  "2px solid #6aaa64"
        cellStyle.background = "#6aaa64"
        cellStyle.color = "#fff"
    }
    
    return <div style={cellStyle} onMouseDown={()=>props.updateCellStyle(props.row, props.col)}>
        {props.character}
    </div>
}

export default Cell