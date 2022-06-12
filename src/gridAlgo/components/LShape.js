import "./LShape.css"

export default function LShape ({row, col, sqSize = 25}) {
    let rotation = "rotate(0deg)";
    if (row === 0 && col === 1) rotation = "rotate(90deg)";
    else if (row === 1 && col === 0) rotation = "rotate(270deg)";
    else if (row === 1 && col === 1) rotation = "rotate(180deg)";
    return(
        <div className="L-shape-wrapper" style={{
            width: sqSize * 2 + 1.5,
            height: sqSize * 2 + 1.5,
            transform: rotation,
        }}>
            <div className="L-base L-blocks" style={{
                width: sqSize,
                height: sqSize
            }}></div>
            <div className="L-top L-blocks" style={{
                width: sqSize,
                height: sqSize
            }}>
            </div>
            <div className="L-left L-blocks" style={{
                width: sqSize,
                height: sqSize
            }}>
            </div>
        </div>
    )
}