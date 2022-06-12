import "./base.css";
import LShape from "./components/LShape";
import { useEffect, useRef, useState } from "react";

export default function AlgoGrid () {
    const sqSize = 25;
    const n = 4;
    const sideLength = Math.pow(2, n);
    const area = Math.pow(sideLength, 2);
    const [showShapes, dispatchShowShapes] = useState({
        ready: false,
    });

    return (
        <div className="grid" style={{
            height: sqSize * sideLength,
            width: sqSize * sideLength
        }}>
        {
            [...Array(area)].map((nothing, i) => {
                const row = Math.floor(i/sideLength);
                const column = i % sideLength;
                return (
                    <div style={{
                        gridRowStart: row + 1,
                        gridRowEnd: row + 2,
                        gridColumnStart: column + 1,
                        gridColumnEnd: column + 2,
                        height: sqSize,
                        width: sqSize
                    }} className="grid-square" key={i}>
                        {
                            (showShapes.ready) ? <LShape /> : <></>
                        }
                    </div>
                )
            })
        }
        </div>
    )
}

