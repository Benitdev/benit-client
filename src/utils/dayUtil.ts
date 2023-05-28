import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)
export function formatDateTime(dateTime: string) {
  const currentDateTime = dayjs()
  const eventDateTime = dayjs(dateTime)

  // Check if the event is within the last 1 week
  const isRecentEvent = eventDateTime.isAfter(
    currentDateTime.subtract(1, "week")
  )

  if (isRecentEvent) {
    // Event is within the last 1 week, use "time ago"
    return eventDateTime.fromNow()
  } else {
    // Events that are not within the last 1 week, use normal date and time format
    return eventDateTime.format("DD-MM-YYYY HH:mm")
  }
}
