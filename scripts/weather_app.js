const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;

    const apiKey = "YOUR_API_KEY"; //Removed API key for safety
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    try {
        const response = await fetch(url);
        if (response.status === 404) {
            throw new Error("City not found!");
        }

        if (response.status === 401) {
            throw new Error("Invalid API key.");
        }

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        resultDiv.innerHTML = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/payload/api/media/file/ow_logo.svg" alt="${description}" />
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>`;

        resultDiv.classList.remove("hidden");
    } catch (error) {
        resultDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
        resultDiv.classList.remove("hidden");
    }
})