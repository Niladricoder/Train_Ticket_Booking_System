document.getElementById("train-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
    const date = document.getElementById("date").value;
    const travelClass = document.getElementById("class").value;

    const availableTrains = searchTrains(from, to, date, travelClass);
    displayTrains(availableTrains, from, to, date, travelClass);
});

// Train Data with Individual Seat Counts
const trainData = [
    { trainName: "12254 - Rajdhani Express", from: "Delhi", to: "Mumbai", time: "08:00 PM", classes: ["1A", "2A", "3A"], seats: { "1A": 120, "2A": 80, "3A": 100 } },
    { trainName: "23654 - Jan Shatabdi Express", from: "Delhi", to: "Mumbai", time: "06:00 AM", classes: ["1A", "2A", "3A"], seats: { "1A": 150, "2A": 100, "3A": 120 } },
    { trainName: "85694 - Yuva Express", from: "Delhi", to: "Mumbai", time: "08:00 PM", classes: ["1A", "2A", "3A"], seats: { "1A": 100, "2A": 80, "3A": 90 } },
    { trainName: "85423 - Duronto Express", from: "Delhi", to: "Mumbai", time: "06:00 AM", classes: ["1A", "2A", "3A"], seats: { "1A": 130, "2A": 100, "3A": 110 } },
    { trainName: "54868 - Shatabdi Express", from: "Delhi", to: "Mumbai", time: "07:00 AM", classes: ["1A", "2A"], seats: { "1A": 80, "2A": 60 } },
    { trainName: "54225 - Garib Rath", from: "Mumbai", to: "Jaipur", time: "11:00 PM", classes: ["3A", "SL"], seats: { "3A": 200, "SL": 150 } },
    { trainName: "53631 - Karnataka Express", from: "Bangalore", to: "Delhi", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "69815 - Kolkata Express", from: "kolkata", to: "Delhi", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "69854 - Mumbai Express", from: "Mumbai", to: "kolkata", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "98754 - Chennai Express", from: "Chennai", to: "Bangalore", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "82245 - Howrah Express", from: "Howrah", to: "Chandigarh", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "22556 - Howrah Jhargram Memo", from: "Howrah", to: "Jhargram", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "21145 - Agra Express", from: "Agra", to: "Delhi", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "14556 - Lucknow Express", from: "Lucknow", to: "Agra", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1452 - Lucknow Express", from: "Pune", to: "Lucknow", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1545 - Pune Express", from: "Goa", to: "Pune", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1258 - Goa Express", from: "Pune", to: "Goa", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "3569 - Amritsar Express", from: "Jammu", to: "Amritsar", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1235 - Pune Express", from: "Amritsar", to: "Pune", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2548 - Kolkata Express", from: "Delhi", to: "Kolkata", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2365 - Ahmedabad SF Express", from: "Howrah", to: "Ahmedabad", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1286 - SMVT Bengaluru SF Express", from: "Howrah", to: "Bangalore", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2287 - Mysuru Weekly SF Express", from: "Howrah", to: "Bangalore", time: "11:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "1245 - SMVT Bengaluru Duronto Express", from: "Howrah", to: "Bangalore", time: "4:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "5242 - Ahmedabad SF Express", from: "Howrah", to: "Ahmedabad", time: "11:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "12379 - Amritsar Jallianwala Bagh Express", from: "Howrah", to: "Amritsar", time: "09:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "13005 - Howrah - Amritsar Mail", from: "Howrah", to: "Amritsar", time: "08:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2364 - Amritsar SF Express", from: "Howrah", to: "Amritsar", time: "12:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2364 - Jaipur SF Express", from: "Howrah", to: "Jaipur", time: "09:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "12495 - Pratap SF Express", from: "Howrah", to: "Jaipur", time: "07:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "12987 - Ajmer SF Express", from: "Howrah", to: "Jaipur", time: "12:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "22307 - Bikaner SF Express", from: "Howrah", to: "Jaipur", time: "06:30 AM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
    { trainName: "2364 - Ahmedabad SF Express", from: "Howrah", to: "Ahmedabad", time: "09:30 PM", classes: ["1A", "2A", "3A", "SL"], seats: { "1A": 180, "2A": 140, "3A": 120, "SL": 100 } },
];

// Function to search trains
function searchTrains(from, to, date, travelClass) {
    from = from.trim().toLowerCase();
    to = to.trim().toLowerCase();
    travelClass = travelClass.trim().toUpperCase();

    return trainData.filter(train =>
        train.from.trim().toLowerCase() === from &&
        train.to.trim().toLowerCase() === to &&
        train.classes.includes(travelClass)
    );
}

// Function to display available trains
function displayTrains(trains, from, to, date, travelClass) {
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (trains.length > 0) {
        results.innerHTML = "<h2>Available Trains</h2>";
        trains.forEach(train => {
            const availableSeats = train.seats[travelClass] ?? 0; // Ensure we get a valid seat count

            const trainDiv = document.createElement("div");
            trainDiv.classList.add("train-card");
            trainDiv.innerHTML = `
                <p><strong>Train Name:</strong> ${train.trainName}</p>
                <p><strong>Departure Time:</strong> ${train.time}</p>
                <p><strong>Class:</strong> ${travelClass}</p>
                <p><strong>Available Seats:</strong> <span id="seats-${train.trainName}-${travelClass}">${availableSeats}</span></p>
                <button class="btn book-btn" 
                    data-train="${train.trainName}" 
                    data-class="${travelClass}" 
                    data-from="${from}" 
                    data-to="${to}" 
                    data-date="${date}">
                    Book Now
                </button>
                <hr>
            `;
            results.appendChild(trainDiv);
        });

        document.querySelectorAll(".book-btn").forEach(button => {
            button.addEventListener("click", function () {
                const trainName = this.getAttribute("data-train");
                const travelClass = this.getAttribute("data-class");
                const from = this.getAttribute("data-from");
                const to = this.getAttribute("data-to");
                const date = this.getAttribute("data-date");

                redirectToPassengerForm(trainName, travelClass, from, to, date);
            });
        });

    } else {
        results.innerHTML = "<p>No trains found for the selected route.</p>";
    }
}

// Function to redirect to passenger form
function redirectToPassengerForm(trainName, travelClass, from, to, date) {
    const url = `passenger.html?train=${encodeURIComponent(trainName)}&class=${encodeURIComponent(travelClass)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
    window.location.href = url;
}

// Reset Form
function resetForm() {
    document.getElementById("train-form").reset();
    document.getElementById("results").innerHTML = "";
}