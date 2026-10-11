import { validateStayDates } from './stayRequest';
import { parisIsoDay } from './localCalendar';

export function validateInquiry(value: unknown, capacity = 100) {
  if (!value || typeof value !== 'object') throw new Error('INVALID_INQUIRY');
  const v = value as Record<string, unknown>;
  for (const [key, max] of [['name', 100], ['email', 254], ['phone', 40], ['message', 3000]] as const) {
    if (typeof v[key] !== 'string' || v[key].length > max || (key !== 'phone' && !v[key].trim())) throw new Error('INVALID_INQUIRY');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v.email).trim())) throw new Error('INVALID_INQUIRY');
  if (typeof v.arrival !== 'string' || typeof v.departure !== 'string' || typeof v.guests !== 'number' || !Number.isInteger(v.guests)) throw new Error('INVALID_INQUIRY');
  if (validateStayDates({ arrival: v.arrival, departure: v.departure, guests: String(v.guests) }, capacity, parisIsoDay())) throw new Error('INVALID_INQUIRY');
  if (typeof v.villaId !== 'string' || !/^(property|villa)-[a-zA-Z0-9-]{1,100}$/.test(v.villaId) || v.consent !== true || (v.website !== undefined && v.website !== '')) throw new Error('INVALID_INQUIRY');
  return { villaId: v.villaId, name: String(v.name).trim(), email: String(v.email).trim().toLowerCase(), phone: String(v.phone).trim(), message: String(v.message).trim(), arrival: v.arrival, departure: v.departure, guests: v.guests };
}
