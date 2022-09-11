import { IReportInfo } from "../types"

const useTime = () => {
  const setTime = (report: IReportInfo) => {
    const year = report.date.slice(6, 10)
    const month = report.date.slice(3, 5)
    const day = report.date.slice(0, 2)
    const hours = report.date.slice(11, 13)
    const minutes = report.date.slice(14, 16)
    const seconds = report.date.slice(17)

    const datestring = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+03:00`
    const date = new Date(Date.parse(datestring))

    const getHours = `${date.getHours()}`.length === 1
      ? `0${date.getHours()}`
      : date.getHours()

    const getMinutes = `${date.getMinutes()}`.length === 1
      ? `0${date.getMinutes()}`
      : date.getMinutes()

    const getDate = `${date.getDate()}`.length === 1
      ? `0${date.getDate()}`
      : date.getDate()

    const getMonth = `${date.getMonth()}`.length === 1
      ? `0${date.getMonth()}`
      : date.getMonth()

    return {
      ...report,
      date: `${getHours}:${getMinutes} ${getDate}.${getMonth}.${date.getFullYear()}`
    }
  }

  return { setTime }
}

export default useTime
