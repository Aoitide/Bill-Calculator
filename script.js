document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  // Example of event data
  let events = [
    { name: 'Skint Night - January', date: '2025-01-25T18:00:00' },
    { name: 'Skint Night - February', date: '2025-02-27T18:00:00' },
    { name: 'Recharge Day', date: '2025-03-15T09:00:00' },
    { name: 'Christmas', date: '2025-12-25T00:00:00' }
  ];

  console.log("Events array initialized:", events);

  // Fetch event data from a remote server (API simulation)
  function fetchEventData() {
    console.log("Fetching event data...");

    // Simulate server response after a delay
    setTimeout(() => {
      displayClosestEvent(); // Update and display the closest event
    }, 1000);
  }

  // Display the closest upcoming event
  function displayClosestEvent() {
    const now = new Date();
    console.log("Current date:", now);

    // Filter and sort events by date
    const upcomingEvents = events
      .filter(event => new Date(event.date) > now) // Only future events
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Closest first

    console.log("Upcoming events:", upcomingEvents);

    // If there are upcoming events, display the closest one
    const eventElement = document.getElementById('closest-event');
    if (upcomingEvents.length > 0) {
      const closestEvent = upcomingEvents[0];
      eventElement.innerText = `Next Event: ${closestEvent.name}`;
      startCountdown(new Date(closestEvent.date));
    } else {
      eventElement.innerText = "No upcoming events!";
      document.getElementById('countdown').innerText = "";
    }
  }

  // Start and update the countdown for the closest event
  function startCountdown(targetDate) {
    const countdownElement = document.getElementById('countdown');
    console.log("Starting countdown to:", targetDate);

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

  // Initial fetch of event data
  fetchEventData();
});
