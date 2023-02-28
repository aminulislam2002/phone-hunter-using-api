const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerText = "";

  // Display 10 phone only
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }

  // Display no phone found
  const noPhoneFoundMessage = document.getElementById("no-phone-found-message");
  if (phones.length === 0) {
    noPhoneFoundMessage.classList.remove("d-none");
  } else {
    noPhoneFoundMessage.classList.add("d-none");
  }

  // Display all phones
  phones.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
    <div class="card p-4">
      <h1>Brand: ${phone.brand} </h1>
      <img class="w-50 mx-auto" src="${phone.image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Phone Name: ${phone.phone_name}/h5>
      </div>
      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
    </div>
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  // Stop Loader
  toggleSpinner(false);
};

const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};

// Handle search button click
document.getElementById("btn-search").addEventListener("click", function () {
  // Start Loader
  processSearch(10);
});

// Search input field enter key handler
document.getElementById("search-field").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    processSearch(10);
  }
});

const toggleSpinner = (isLoading) => {
  const loaderDiv = document.getElementById("loader");
  if (isLoading) {
    loaderDiv.classList.remove("d-none");
  } else {
    loaderDiv.classList.add("d-none");
  }
};

// not the best solution to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
  processSearch();
});

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const modalTitel = document.getElementById("phoneDetailsModalLabel");
  modalTitel.innerText = phone.name;
  console.log(phone);
  const modalBody = document.getElementById("phone-details");
  modalBody.innerHTML = `
  <img src="${phone.image}" alt="" />
  <h5>Brand: ${phone.brand}</h5>
  <p>Release Date: ${phone.releaseDate ? phone.releaseDate : "No release date found!"}</p>
  <p>Chipset: ${phone.mainFeatures ? phone.mainFeatures.chipSet : "No chipset found!"}</p>
  <p>Display Size: ${phone.mainFeatures ? phone.mainFeatures.displaySize : "No display Size found!"}</p>
  <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : "No memory found!"}</p>
  <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : "No storage found!"}</p>
  <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : "No sensors found!"}</p>
  <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : "No bluetooth found!"}</p>
  <p>GPS: ${phone.others ? phone.others.GPS : "No GPS found!"}</p>
  <p>NFC: ${phone.others ? phone.others.NFC : "No NFC found!"}</p>
  <p>Radio: ${phone.others ? phone.others.Radio : "No radio found!"}</p>
  <p>USB: ${phone.others ? phone.others.USB : "No USB found!"}</p>
  <p>WLAN: ${phone.others ? phone.others.WLAN : "No WLAN found!"}</p>
  `;
};
loadPhones("apple");
