import "./base.css";
import LShape from "./components/LShape";
import { useEffect, useRef, useState } from "react";

export default function AlgoGrid () {
    const sqSize = 25;
    const n = 2;
    const sideLength = Math.pow(2, n);
    const area = Math.pow(sideLength, 2);
    const [showShapes, setShowShapes] = useState({
        ready: false,
        placement: {}
    });

    function resetGrid () {
        setShowShapes({
            ready: false,
            placement: {}
        })
    }

    function gen (hole) {
        return recGen(hole, {row: 0, col: 0}, sideLength);
    }

    //hole is abs position of the hole
    //pos is the abs pos of the top left most corner
    //siez is sidelength
    //returns an object that setstate can use
    function recGen(hole, pos, size) {
        const halfSize = Math.round(size / 2);
        const holeRelPos = {
            row: hole.row - pos.row,
            col: hole.col - pos.col,
        }
        //false = 0, true = 1
        const q = {
            row: holeRelPos.row >= halfSize,
            col: holeRelPos.col >= halfSize
        }
        if (size <= 2) {
            let obj = {};
            obj[pos.col + pos.row * sideLength] = q
            return obj;
        }
        else {
            let temp = {};
            let recCalls = {
                tl: {
                    hole: {
                        row: pos.row + halfSize - 1, col: pos.col + halfSize - 1
                    },
                    pos: {
                        row: pos.row, col: pos.col
                    }
                },
                tr: {
                    hole: {
                        row: pos.row + halfSize - 1, col: pos.col + halfSize
                    },
                    pos: {
                        row: pos.row, col: pos.col + halfSize
                    }
                },
                bl: {
                    hole: {
                        row: pos.row + halfSize, col: pos.col + halfSize - 1
                    },
                    pos: {
                        row: pos.row + halfSize, col: pos.col
                    }
                },
                br: {
                    hole: {
                        row: pos.row + halfSize, col: pos.col + halfSize
                    },
                    pos: {
                        row: pos.row + halfSize, col: pos.col + halfSize
                    }
                }
            }
            const placeShapeAt = pos.col + halfSize - 1 + (pos.row + halfSize - 1) * sideLength;
            if (!q.row && !q.col) {
                recCalls.tl.hole = hole;
            }
            else if (!q.row && q.col) {
                recCalls.tr.hole = hole;
            }
            else if (q.row && !q.col) {
                recCalls.bl.hole = hole;
            }
            else {
                recCalls.br.hole = hole;
            }
            temp[placeShapeAt] = q;
            return {
                ...temp,
                ...recGen(recCalls.tl.hole, recCalls.tl.pos, halfSize),
                ...recGen(recCalls.tr.hole, recCalls.tr.pos, halfSize),
                ...recGen(recCalls.bl.hole, recCalls.bl.pos, halfSize),
                ...recGen(recCalls.br.hole, recCalls.br.pos, halfSize)
            };
        }
    }

    useEffect(() => {
        setShowShapes({
            ready: true,
            placement: gen({row: 2, col: 2})
        });
    }, []);


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
                            (showShapes.ready && showShapes.placement[i]) ? <LShape hole={showShapes.placement[i]} /> : <></>
                        }
                    </div>
                )
            })
        }
        </div>
    )
}

