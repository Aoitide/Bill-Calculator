// Example of event data
let events = [
  { name: 'Skint Night - January', date: '2025-01-25T18:00:00' },
  { name: 'Skint Night - February', date: '2025-02-27T18:00:00' },
  { name: 'Recharge Day', date: '2025-03-15T09:00:00' },
  { name: 'Christmas', date: '2025-12-25T00:00:00' }
];

// Fetch event data from a remote server (API simulation)
function fetchEventData() {
  // In a real scenario, you would fetch this data from an actual backend
  // Here we just simulate fetching event data from the server
  // You can use the Fetch API to interact with an actual server later
  console.log("Fetching event data...");

  // Simulate server response after a delay (e.g., 1 second)
  setTimeout(() => {
    updateCountdowns(); // Update countdowns after fetching data
  }, 1000);
}

// Update the countdown for each event
function updateCountdowns() {
  const now = new Date();

  events.forEach(event => {
    const eventDate = new Date(event.date);
    const timeDiff = eventDate - now;

    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      document.getElementById(event.name).innerText = `${event.name}: ${days}d ${hours}h ${minutes}m ${seconds}s remaining.`;
    } else {
      document.getElementById(event.name).innerText = `${event.name}: Event has passed.`;
    }
  });
}

// Handle the form submission for updating event dates
document.getElementById('admin-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const eventName = document.getElementById('event-name').value;
  const eventDate = document.getElementById('event-date').value;

  // In a real scenario, you would send this to the backend via an AJAX request
  console.log(`Updating ${eventName} date to ${eventDate}`);

  // For now, let's just update the event data locally
  const updatedEvent = events.find(e => e.name === eventName);
  if (updatedEvent) {
    updatedEvent.date = eventDate; // Update the date
  }

  fetchEventData(); // Re-fetch and update the countdowns
});

// Initial fetch of event data
fetchEventData();
