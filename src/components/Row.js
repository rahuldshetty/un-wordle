import Cell from "./Cell";

const Row = (props) => {
    const word = props.word;
    const cellStates = props.cellStates;

    const rowStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(5, 62px)",
        gridGap: "2px"
    }

    const createCells = (word) => {
        let cells = []
        for(var i=0;i<word.length;i++){
            cells.push(
                <Cell key={Math.random()} character={word[i]} cellState={cellStates[i]} row={props.row} col={i} updateCellStyle={props.updateCellStyle}/>
            )
        }
        return cells;
    }

    return <div style={rowStyle}>
        {createCells(word)}
    </div>
}

export default Row