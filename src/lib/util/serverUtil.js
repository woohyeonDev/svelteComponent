
export const makeTelexHeader = (telexId, maxSeq , data) => {
    
    return {
        header: {
            telexId,
            lastSeq: maxSeq,
            count: data.length,
        },
        data
    };
}

export const makeErrorResponse = (status, error)=>{ 
    return {
        status,
        message: error.message,
        ok:false,
    }
}

const formatNumber = (num) => num.toString().padStart(2, '0')

export const getDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = formatNumber(today.getMonth() + 1)
    const date = formatNumber(today.getDate())
    const day = today.getDay()
    const hours = formatNumber(today.getHours())
    const minutes = formatNumber(today.getMinutes())
    const seconds = formatNumber(today.getSeconds())

    return { year, month, date, day, hours, minutes, seconds }
}

/** YYYYMMDD 형식의 날짜 */
export const getDate8 = () => {
    const { year, month, date } = getDate()
    return `${year}${month}${date}`
}

/**YYYYMMDDHH24MISS 형식의 날짜 */
export const getDate14 = () => {
    const { year, month, date, hours, minutes, seconds } = getDate()
    return `${year}${month}${date}${hours}${minutes}${seconds}`
}
