import "./cell.css"

export const Cell = ({ cell }) => {
    return (
        <>
            <div className={`cell cell${cell}`}>
                {cell != 0 && 2 ** cell}
            </div>
        </>
    )
}