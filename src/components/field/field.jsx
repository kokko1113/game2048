import { Cell } from "../cell/cell"

export const Field = ({ field }) => {
    return (
        <>
            <div className='field'>
                {
                    field.map((row, y) => {
                        return <div className='row' key={y}>
                            {
                                row.map((cell, x) => {
                                    return <Cell key={x} cell={cell}></Cell>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </>
    )
}