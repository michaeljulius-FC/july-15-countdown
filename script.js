const calendar = document.getElementById('calendar');
const celebration = document.getElementById('celebration');
const targetDate = new Date('2026-07-15T00:00:00');

// Load saved data from the browser's local memory
let completedDays = JSON.parse(localStorage.getItem('crossedDays')) || [];

function initCalendar() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare only dates
    
    // Calculate the total range: from today until July 15th
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    calendar.innerHTML = '';

    // Create a card for every day remaining
    for (let i = diffDays; i >= 0; i--) {
        const date = new Date(targetDate);
        date.setDate(targetDate.getDate() - i);
        
        const dateString = date.toDateString();
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day-card';
        
        // Check if this day was already crossed off previously
        if (completedDays.includes(dateString)) {
            dayDiv.classList.add('crossed');
        }
        
        // Display date as Month/Day (e.g., 7/15)
        dayDiv.innerHTML = `<div>${date.getMonth() + 1}/${date.getDate()}</div>`;
        
        // The tap/click logic
        dayDiv.onclick = () => crossOff(dateString, dayDiv);
        calendar.appendChild(dayDiv);
    }
}

function crossOff(dateString, element) {
    // Only trigger if the day isn't already crossed off
    if (!completedDays.includes(dateString)) {
        completedDays.push(dateString);
        
        // Save the updated list to local storage
        localStorage.setItem('crossedDays', JSON.stringify(completedDays));
        
        // Update the UI
        element.classList.add('crossed');
        showCelebration();
    }
}

function showCelebration() {
    celebration.classList.remove('hidden');
    
    // Professional touch: Auto-hide celebration after 3 seconds 
    // or let the user click the button.
    setTimeout(() => {
        // Optional: you can add a confetti trigger here later!
    }, 500);
}

function closePopup() {
    celebration.classList.add('hidden');
}

// Launch the calendar on page load
initCalendar();
