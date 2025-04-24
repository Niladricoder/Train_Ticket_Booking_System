// Read booking info from URL
const urlParams = new URLSearchParams(window.location.search);
const bookingData = {
    trainName: urlParams.get("train"),
    from: urlParams.get("from"),
    to: urlParams.get("to"),
    date: urlParams.get("date"),
    travelClass: urlParams.get("class"),
};

// Display booking summary
if (bookingData.trainName) {
    document.getElementById("booking-summary").innerHTML = `
        <p><strong>Train:</strong> ${bookingData.trainName}</p>
        <p><strong>From:</strong> ${bookingData.from}</p>
        <p><strong>To:</strong> ${bookingData.to}</p>
        <p><strong>Date:</strong> ${bookingData.date}</p>
        <p><strong>Class:</strong> ${bookingData.travelClass}</p>
        <hr>
    `;
}

document.getElementById("passenger-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("passenger-name").value;
    const age = document.getElementById("passenger-age").value;
    const gender = document.getElementById("passenger-gender").value;
    const contact = document.getElementById("passenger-contact").value;
    const count = parseInt(document.getElementById("passenger-count").value);

    // Generate seat numbers dynamically
    let seats = [];
    for (let i = 1; i <= count; i++) {
        seats.push(`S${Math.floor(Math.random() * 100) + 1}`); // Assign random seat numbers
    }

    // Update seat count in local storage
    let trainData = JSON.parse(localStorage.getItem("trainData")) || [];
    trainData = trainData.map(train => {
        if (train.trainName === bookingData.trainName) {
            train.availableSeats = Math.max(0, train.availableSeats - count);
        }
        return train;
    });
    localStorage.setItem("trainData", JSON.stringify(trainData));

    // Save ticket info
    const ticketData = {
        trainName: bookingData.trainName,
        from: bookingData.from,
        to: bookingData.to,
        date: bookingData.date,
        travelClass: bookingData.travelClass,
        passengerName: name,
        seats: seats,
        age,
        gender,
        contact,
        count
    };

    // Store multiple tickets in an array
    let allTickets = JSON.parse(localStorage.getItem("allTickets")) || [];
    allTickets.push(ticketData);
    localStorage.setItem("allTickets", JSON.stringify(allTickets));

    // Also store the latest ticket separately
    localStorage.setItem("ticketDetails", JSON.stringify(ticketData));

    // Redirect to payment page
    window.location.href = "payment.html";
});

// Cancel Booking
document.getElementById("cancel-booking").addEventListener("click", function () {
    alert("Booking Canceled!");
    window.location.href = "index.html";
});