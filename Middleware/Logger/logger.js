const getActualRequestionDurationInMilliseconds = start => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const LoggerMiddleware = (req, res, next) => {
    res.on('finish', () => {
        let current_datetime = new Date()
        let formatted_date =
            current_datetime.getFullYear() + "-" +
            (current_datetime.getMonth() + 1) + "-" +
            current_datetime.getDate() + " " +
            current_datetime.getHours() + ":" +
            current_datetime.getMinutes() + ":" +
            current_datetime.getSeconds()
        let method = req.method
        let url = req.url
        let status = res.statusCode
        let ip = req.socket.remoteAddress
        const start = process.hrtime()
        const durationInMilliseconds = getActualRequestionDurationInMilliseconds(start)
        console.log(`[\x1b[34m${formatted_date}\x1b[0m] ${method}: ${url} \x1b[33m${status}\x1b[0m \x1b[94m${ip}\x1b[0m \x1b[31m${durationInMilliseconds.toLocaleString()} ms\x1b[0m`)
    })
    next()
}

export default LoggerMiddleware