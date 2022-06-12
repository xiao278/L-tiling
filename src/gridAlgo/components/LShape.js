import "./LShape.css"

export default function LShape ({hole, sqSize = 25}) {
    const {row, col} = hole;
    let rotation = "rotate(0deg)";
    if (!row && col) rotation = "rotate(90deg)";
    else if (row && !col) rotation = "rotate(270deg)";
    else if (row && col) rotation = "rotate(180deg)";
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