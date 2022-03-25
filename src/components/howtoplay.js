const HowTo = () => {
    const style={
        color: "#090909",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        width: "100%",
        height: "100%",
        fontSize:"18px",
        textTransform: "uppercase",
        boxSizing: "border-box",
        fontFamily: "Courier New, Courier, monospace",
    }

    return <div style={style}>
        <h3>HOW TO USE?</h3>
        <div style={{
            fontSize: "15px"
        }}>
            <p>
                <a href="https://www.nytimes.com/games/wordle/index.html">WORDLE</a> is a 5-letter word guessing game developed by <a href="https://www.powerlanguage.co.uk">Josh Wardle</a> which took the INTERNET by storm.
            </p>
            <p>
                You can use my solution to play along with the game & get better suggestion to solve this word puzzle.
                <ol>
                    <li>Type in a 5 letter guess for any word (My personal favourite is WATER)</li>
                    <li>Click on the cells to update status of the letter<p style={{
                        color: "#86888a"
                    }}>GRAY - letter absent</p><p style={{
                        color: "#c9b458"
                    }}>YELLOW - letter present but wrong position</p> <p style={{
                        color: "#6aaa64"
                    }}>GREEN - correct letter and in position</p></li>
                    <li>UN-WORDLE generates top 5 word suggestion that you can try to play in Wordle.</li>
                    <li>Repeat above steps until you win :) </li>
                </ol>
                Want to learn more about code? Head over to my Github: <a href="https://github.com/rahuldshetty/un-wordle">
                <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="HTML tutorial" style={{
                    width: "18px",
                    height: "18px"
                }}/>
                </a>
            </p>
        </div>
    </div>
}

export default HowTo