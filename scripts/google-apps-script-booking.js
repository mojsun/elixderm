/**
 * Elixderm — Discovery Call Booking Detector
 * ─────────────────────────────────────────────────────────────────────────
 * Paste this entire file into https://script.google.com (new project).
 * Then set up a time-based trigger to run checkNewBookings every 5 minutes.
 *
 * SETUP STEPS:
 *  1. Paste this script into script.google.com
 *  2. Edit the CONFIG block below with your actual API URL
 *  3. Click Run → checkNewBookings (once, to authorize calendar access)
 *  4. Click Triggers (clock icon) → Add Trigger:
 *       Function: checkNewBookings
 *       Event source: Time-driven
 *       Type: Minutes timer → Every 5 minutes
 *  5. Add BOOKING_WEBHOOK_SECRET in Vercel environment variables
 */

// ── CONFIG ─────────────────────────────────────────────────────────────────
var CONFIG = {
  CALENDAR_ID: 'hello@elixderm.com',
  API_URL: 'https://www.elixderm.com/api/booking-confirmed',  // Update to your live domain
  SECRET: 'elixderm-booking-secret-2026',
  EVENT_PREFIX: 'Discovery Call',
  LOOK_BACK_MINUTES: 10,  // Check events created in the last 10 min (covers any 5-min delay)
};

// ── MAIN FUNCTION (runs every 5 minutes) ────────────────────────────────────
function checkNewBookings() {
  var calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  if (!calendar) {
    Logger.log('ERROR: Calendar not found — check CALENDAR_ID in CONFIG');
    return;
  }

  var now = new Date();
  var lookBackMs = CONFIG.LOOK_BACK_MINUTES * 60 * 1000;

  // Look 7 days ahead for upcoming bookings created in the last 10 minutes
  var searchStart = now;
  var searchEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  var events = calendar.getEvents(searchStart, searchEnd);

  var props = PropertiesService.getScriptProperties();
  var processedKey = 'PROCESSED_EVENT_IDS';
  var processedRaw = props.getProperty(processedKey) || '[]';
  var processedIds = JSON.parse(processedRaw);

  var newProcessed = [];

  events.forEach(function(event) {
    var eventId = event.getId();
    var title = event.getTitle();
    var created = event.getLastUpdated(); // closest we have to creation time

    // Only process Discovery Call events created/updated in the last 10 minutes
    var ageMs = now.getTime() - created.getTime();
    var isRecent = ageMs <= lookBackMs;
    var isDiscoveryCall = title.indexOf(CONFIG.EVENT_PREFIX) === 0;
    var isNew = processedIds.indexOf(eventId) === -1;

    if (isDiscoveryCall && isRecent && isNew) {
      Logger.log('New booking detected: ' + title);

      var guests = event.getGuestList();
      if (guests.length === 0) {
        Logger.log('No guests on event — skipping: ' + title);
        newProcessed.push(eventId);
        return;
      }

      var meetLink = event.getHangoutLink() || '';

      guests.forEach(function(guest) {
        var guestEmail = guest.getEmail();
        var guestName = guest.getName() || extractNameFromTitle(title) || guestEmail;

        Logger.log('Notifying API for: ' + guestEmail);
        callBookingAPI(guestName, guestEmail, title, event.getStartTime().toISOString(), meetLink);
      });

      newProcessed.push(eventId);
    }
  });

  // Persist processed IDs (keep last 200 to avoid unbounded growth)
  var allProcessed = processedIds.concat(newProcessed).slice(-200);
  props.setProperty(processedKey, JSON.stringify(allProcessed));
}

// ── CALL THE NEXT.JS API ────────────────────────────────────────────────────
function callBookingAPI(guestName, guestEmail, eventTitle, eventStart, meetLink) {
  var payload = JSON.stringify({
    guestName: guestName,
    guestEmail: guestEmail,
    eventTitle: eventTitle,
    eventStart: eventStart,
    meetLink: meetLink || '',
    secret: CONFIG.SECRET,
  });

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  };

  try {
    var response = UrlFetchApp.fetch(CONFIG.API_URL, options);
    var code = response.getResponseCode();
    var body = response.getContentText();
    Logger.log('API response (' + code + '): ' + body);
  } catch (e) {
    Logger.log('ERROR calling API: ' + e.toString());
  }
}

// ── HELPER: Extract name from event title ──────────────────────────────────
// e.g. "Discovery Call (Narmin Azizova)" → "Narmin Azizova"
function extractNameFromTitle(title) {
  var match = title.match(/\(([^)]+)\)/);
  return match ? match[1] : null;
}
