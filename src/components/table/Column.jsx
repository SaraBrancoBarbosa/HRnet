const Column = ({column, value}) => {
    if(column.type === "date") return value instanceof Date ? value.tableDate() : value.toString()
    if(column.type === "number") return "" +value
    if(!(typeof value === "string")) return JSON.stringify(value)

    return value
}

export default Column