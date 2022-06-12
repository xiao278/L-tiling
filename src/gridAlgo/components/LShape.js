import "./LShape.css"

export default function LShape ({hole, sqSize = 25}) {
    const blocksize = sqSize - 1;
    const {row, col} = hole;
    let rotation = "rotate(0deg)";
    if (!row && col) rotation = "rotate(90deg)";
    else if (row && !col) rotation = "rotate(270deg)";
    else if (row && col) rotation = "rotate(180deg)";
    return(
        <div className="L-shape-wrapper" style={{
            width: sqSize * 2,
            height: sqSize * 2,
            transform: rotation,
        }}>
            <div className="L-base L-blocks" style={{
                width: blocksize,
                height: blocksize
            }}></div>
            <div className="L-top L-blocks" style={{
                width: blocksize,
                height: blocksize
            }}>
            </div>
            <div className="L-left L-blocks" style={{
                width: blocksize,
                height: blocksize
            }}>
            </div>
        </div>
    )
}