// Example of event data
let events = [
  { name: 'Skint Night - January', date: '2025-01-25T18:00:00' },
  { name: 'Skint Night - February', date: '2025-02-27T18:00:00' },
  { name: 'Recharge Day', date: '2025-03-15T09:00:00' },
  { name: 'Christmas', date: '2025-12-25T00:00:00' }
];

// Fetch event data from a remote server (API simulation)
function fetchEventData() {
  console.log("Fetching event data...");

  // Simulate server response after a delay (e.g., 1 second)
  setTimeout(() => {
    displayClosestEvent(); // Update and display the closest event
  }, 1000);
}

// Display the closest upcoming event
function displayClosestEvent() {
  const now = new Date();

  // Filter and sort events by date
  const upcomingEvents = events
    .filter(event => new Date(event.date) > now) // Only future events
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Closest first

  // If there are upcoming events, display the closest one
  if (upcomingEvents.length > 0) {
    const closestEvent = upcomingEvents[0];
    const eventElement = document.getElementById('closest-event');

    eventElement.innerText = `Next Event: ${closestEvent.name}`;
    startCountdown(new Date(closestEvent.date));
  } else {
    // No upcoming events
    document.getElementById('closest-event').innerText = "No upcoming events!";
    document.getElementById('countdown').innerText = "";
  }
}

// Start and update the countdown for the closest event
function startCountdown(targetDate) {
  const countdownElement = document.getElementById('countdown');

  function updateCountdown() {
    const now = new Date();
    const timeDiff = targetDate - now;

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s remaining.`;
    } else {
      countdownElement.innerText = "The event has started!";
      clearInterval(intervalId); // Stop the countdown
    }
  }

  updateCountdown(); // Initial call
  const intervalId = setInterval(updateCountdown, 1000); // Update every second
}

// Handle the form submission for updating event dates
document.getElementById('admin-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const eventName = document.getElementById('event-name').value;
  const eventDate = document.getElementById('event-date').value;

  console.log(`Updating ${eventName} date to ${eventDate}`);

  // Update event data locally
  const updatedEvent = events.find(e => e.name === eventName);
  if (updatedEvent) {
    updatedEvent.date = eventDate; // Update the date
  }

  fetchEventData(); // Re-fetch and update the display
});

// Initial fetch of event data
fetchEventData();
