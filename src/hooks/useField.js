import { useEffect, useState } from "react"
import { FirldObject } from "../../constans/object"

export const useField = () => {
    const [field, setField] = useState([])
    const [isFinish, setIsFinish] = useState(false)
    const { OBJECT } = FirldObject()//constant

    const getField = () => {
        const init = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]
        let firstY1
        let firstY2
        let firstX1
        let firstX2
        do {
            firstY1 = Math.floor(Math.random() * 4)
            firstY2 = Math.floor(Math.random() * 4)
            firstX1 = Math.floor(Math.random() * 4)
            firstX2 = Math.floor(Math.random() * 4)
        } while (firstX1 === firstX2 || firstY1 === firstY2)
        init[firstY1][firstX1]++
        init[firstY2][firstX2]++
        setField(init)
    }

    const moveLeft = () => {
        // 動きがあったかどうかのフラグ
        let isMove = false
        // let moveCount = 0
        setField(prev => {
            const newField = structuredClone(prev)
            // 同じブロックを結合
            for (let y = 0; y < newField.length; y++) {
                for (let x = 0; x < newField[y].length; x++) {
                    if (newField[y][x] != 0 && newField[y][x] === newField[y][x + 1]) {
                        for (let i = x + 1; i < newField[y].length; i++) {
                            if (newField[y][x] === newField[y][i]) {
                                newField[y][x]++
                                newField[y][x + 1] = OBJECT.none
                                x++
                                isMove = true
                            } else if (newField[y][i] != OBJECT.none) {
                                break
                            }
                        }
                    }
                }
            }
            // ブロックを左に寄せる
            for (let y = 0; y < newField.length; y++) {
                for (let x = 1; x < newField[y].length; x++) {
                    if (newField[y][x] != OBJECT.none)
                        for (let i = x; i > 0; i--) {
                            if (newField[y][i - 1] != OBJECT.none) {
                                break
                            }
                            newField[y][i - 1] = newField[y][i]
                            newField[y][i] = OBJECT.none
                            isMove = true
                        }
                }
            }
            return newField
        })
        if (isMove) {//　動きがあったら新しいブロックを生成
            createNewBlock()
        }
    }
    const moveRight = () => {
        setField(prev => {
            const newField = structuredClone(prev)
            // 動きがあったかどうかのフラグ
            let isMove = false
            // 同じブロックを結合
            for (let y = 0; y < newField.length; y++) {
                for (let x = newField[y].length - 2; x >= 0; x--) {
                    if (newField[y][x] != 0 && newField[y][x] === newField[y][x + 1]) {
                        newField[y][x]++
                        newField[y][x + 1] = OBJECT.none
                        x--
                        isMove = true
                    }
                }
            }
            // ブロックを右に寄せる
            for (let y = 0; y < newField.length; y++) {
                for (let x = newField[y].length - 2; x >= 0; x--) {
                    if (newField[y][x] != OBJECT.none)
                        for (let i = x; i < newField[y].length - 1; i++) {
                            if (newField[y][i + 1] != OBJECT.none) {
                                break
                            }
                            newField[y][i + 1] = newField[y][i]
                            newField[y][i] = OBJECT.none
                            isMove = true
                        }
                }
            }
            if (isMove) {//　動きがあったら新しいブロックを生成
                createNewBlock()
            }
            return newField
        })
    }
    const moveUp = () => {
        setField(prev => {
            const newField = structuredClone(prev)
            let isMove = false
            // 同じブロックを結合
            for (let x = 0; x < newField.length; x++) {
                for (let y = 0; y < newField.length - 1; y++) {
                    if (newField[y][x] != 0 && newField[y][x] === newField[y + 1][x]) {
                        newField[y][x]++
                        newField[y + 1][x] = OBJECT.none
                        y++
                        isMove = true
                    }
                }
            }
            // ブロックを上に寄せる
            for (let y = 1; y < newField.length; y++) {
                for (let x = 0; x < newField[y].length; x++) {
                    if (newField[y][x] != OBJECT.none)
                        for (let i = y; i > 0; i--) {
                            if (newField[i - 1][x] != OBJECT.none) {
                                break
                            }
                            newField[i - 1][x] = newField[i][x]
                            newField[i][x] = OBJECT.none
                            isMove = true
                        }
                }
            }
            if (isMove) {
                createNewBlock()
            }
            return newField
        })
    }
    const moveDown = () => {
        setField(prev => {
            let isMove = false
            const newField = structuredClone(prev)
            // 同じブロックを結合
            for (let x = 0; x < newField.length; x++) {
                for (let y = newField.length - 1; y > 0; y--) {
                    if (newField[y][x] != 0 && newField[y][x] === newField[y - 1][x]) {
                        newField[y][x]++
                        newField[y - 1][x] = OBJECT.none
                        y--
                        isMove = true
                    }
                }
            }
            // ブロックを下に寄せる
            for (let y = newField.length - 2; y >= 0; y--) {
                for (let x = 0; x < newField[y].length; x++) {
                    if (newField[y][x] != OBJECT.none)
                        for (let i = y; i < newField[y].length - 1; i++) {
                            if (newField[i + 1][x] != OBJECT.none) {
                                break
                            }
                            newField[i + 1][x] = newField[i][x]
                            newField[i][x] = OBJECT.none
                            isMove = true
                        }
                }
            }
            if (isMove) {
                createNewBlock()
            }
            return newField
        })
    }

    const checkIsFinish = () => {
        let isGameOver = true
        const direction = [
            { x: 0, y: -1 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
        ]
        setField(prev => {
            const newField = structuredClone(prev)
            for (let y = 1; y < newField.length - 1; y++) {
                for (let x = 1; x < newField[y].length - 1; x++) {
                    for (let i = 0; i < direction.length; i++) {
                        const checkY = direction[i].y
                        const checkX = direction[i].x
                        console.log(checkY, checkX);
                        if (newField[y - checkY][x - checkX] === newField[y][x]) { //
                            isGameOver = false
                        }
                    }
                }
            }
            return newField
        })
        if (isGameOver) {
            setIsFinish(true)
        }
    }

    const createNewBlock = () => {
        const emptyBlocks = []
        setField(prev => {
            const newField = structuredClone(prev)
            for (let y = 0; y < newField.length; y++) {
                for (let x = 0; x < newField[y].length; x++) {
                    if (newField[y][x] === 0) {
                        emptyBlocks.push({ y: y, x: x })
                    }
                }
            }
            if (emptyBlocks.length === 0) {
                checkIsFinish()
            } else {
                const rand = Math.floor(Math.random() * emptyBlocks.length)
                newField[emptyBlocks[rand].y][emptyBlocks[rand].x] = 1
            }
            return newField
        })
    }

    const handleKeyDown = (e) => {
        switch (e.key) {
            case "ArrowLeft":
                moveLeft()
                break;
            case "ArrowRight":
                moveRight()
                break;
            case "ArrowUp":
                moveUp()
                break;
            case "ArrowDown":
                moveDown()
                break;
        }
        // checkIsFinish()
    }

    useEffect(() => {
        getField()
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    return { field, isFinish }
}