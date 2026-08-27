/**
 * Generates and downloads a standard RFC 5545 compliant .ics (iCalendar) file
 * for appointments and bookings without requiring external cloud API credentials.
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "Morning (07:30 AM - 10:00 AM)" or "08:00 AM"
  bookingRef: string;
  organizerName: string;
}

export function downloadIcsFile(details: CalendarEventDetails) {
  try {
    const { title, description, location, startDate, timeSlot, bookingRef, organizerName } = details;

    // Parse date into YYYYMMDD
    const cleanDate = startDate.replace(/[^0-9]/g, '');
    const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    // Estimate start hour based on timeSlot text
    let startHour = '090000';
    let endHour = '103000';

    if (timeSlot.toLowerCase().includes('early') || timeSlot.includes('05:') || timeSlot.includes('06:')) {
      startHour = '060000';
      endHour = '073000';
    } else if (timeSlot.toLowerCase().includes('morning') || timeSlot.includes('07:') || timeSlot.includes('08:') || timeSlot.includes('09:')) {
      startHour = '080000';
      endHour = '093000';
    } else if (timeSlot.toLowerCase().includes('afternoon') || timeSlot.includes('12:') || timeSlot.includes('01:') || timeSlot.includes('02:') || timeSlot.includes('03:')) {
      startHour = '130000';
      endHour = '143000';
    } else if (timeSlot.toLowerCase().includes('evening') || timeSlot.includes('05:') || timeSlot.includes('06:') || timeSlot.includes('07:')) {
      startHour = '173000';
      endHour = '190000';
    } else if (timeSlot.toLowerCase().includes('night') || timeSlot.includes('08:') || timeSlot.includes('09:')) {
      startHour = '200000';
      endHour = '213000';
    }

    const dtStart = `${cleanDate}T${startHour}`;
    const dtEnd = `${cleanDate}T${endHour}`;

    const formattedDescription = `${description}\\n\\nBooking Reference: ${bookingRef}\\nHost: ${organizerName}`.replace(/\n/g, '\\n');

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//KSG DEMO GYM//Fitness Appointment//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${bookingRef}-${cleanDate}@ksgdemogym.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${formattedDescription}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT60M',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder for Gym Trial Session',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gym-trial-${bookingRef || 'booking'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error generating .ics file', error);
    return false;
  }
}
