// Generated from the selected real TypeScript module; see the support repository.
import { localDateTimeInTimeZoneToIso } from './management-local-time.js';
export function isFutureReservationStart(localDateTime, timeZone, now = Date.now()) {
    try {
        return Date.parse(localDateTimeInTimeZoneToIso(localDateTime, timeZone)) > now;
    }
    catch {
        return false;
    }
}
export function isFutureScheduleSlot(slot, timeZone, now = Date.now()) {
    const hour = String(Math.floor(slot.startMinute / 60)).padStart(2, '0');
    const minute = String(slot.startMinute % 60).padStart(2, '0');
    return isFutureReservationStart(`${slot.localDate}T${hour}:${minute}`, timeZone, now);
}
export function isPastOccupancy(endsAt, now = Date.now()) {
    const end = new Date(endsAt).getTime();
    return !Number.isFinite(end) || end <= now;
}
export function assertOccupancyNotPast(endsAt, now = Date.now()) {
    if (isPastOccupancy(endsAt, now))
        throw new Error('SCHEDULE_HISTORY_READ_ONLY');
}
