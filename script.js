const output = document.getElementById("output");
const getAllBtn = document.getElementById("getAllBtn");
const filterForm = document.getElementById("filterForm");

const API_URL = "https://rickandmortyapi.com/api/character";

function renderCharacters(characters) {
  output.innerHTML = "";
  characters.forEach(char => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${char.image}" alt="${char.name}">
      <h3>${char.name}</h3>
      <p><strong>Status:</strong> ${char.status}</p>
      <p><strong>Species:</strong> ${char.species}</p>
      <p><strong>Gender:</strong> ${char.gender}</p>
    `;
    output.appendChild(card);
  });
}

function showError(message) {
  output.innerHTML = `<p style="color:red;">${message}</p>`;
}

getAllBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderCharacters(data.results);
  } catch (error) {
    showError("Error al obtener los personajes.");
  }
});

filterForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const status = document.getElementById("status").value.trim();
  const species = document.getElementById("species").value.trim();
  const type = document.getElementById("type").value.trim();
  const gender = document.getElementById("gender").value.trim();

  const queryParams = new URLSearchParams();
  if (name) queryParams.append("name", name);
  if (status) queryParams.append("status", status);
  if (species) queryParams.append("species", species);
  if (type) queryParams.append("type", type);
  if (gender) queryParams.append("gender", gender);

  try {
    const res = await fetch(`${API_URL}/?${queryParams.toString()}`);
    if (!res.ok) throw new Error("Personaje no encontrado");
    const data = await res.json();
    renderCharacters(data.results);
  } catch (error) {
    showError("No se encontraron resultados para los filtros ingresados.");
  }
});
