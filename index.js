const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Aigul Stetchi &copy; ${thisYear}`;
footer.appendChild(copyright);

document.addEventListener("DOMContentLoaded", function () {
    const homeSection = document.getElementById("home");
    const dogsSection = document.getElementById("dogs");
    const homeLink = document.getElementById("homeLink");
    const dogsLink = document.getElementById("dogsLink");
    const goToDogsButton = document.getElementById("goToDogs");
    const dogsImagesButton = document.getElementById("dogsImagesButton");
    const dogsBreedsButton = document.getElementById("dogsBreedsButton");

    // Navigation between Home and Dogs sections
    homeLink.addEventListener("click", function (event) {
        event.preventDefault();
        homeSection.style.display = "flex";
        dogsSection.style.display = "none";
    });

    dogsLink.addEventListener("click", function (event) {
        event.preventDefault();
        homeSection.style.display = "none";
        dogsSection.style.display = "flex";
        fetchDogs();
    });

    // Handle button click to go to the Dogs page
    goToDogsButton.addEventListener("click", function (event) {
        event.preventDefault();
        homeSection.style.display = "none";
        dogsSection.style.display = "flex";
        fetchDogs();
    });

    // Function to fetch dog images and breeds from API
    function fetchDogs() {
        const loadingSpinner = document.getElementById("loading-spinner");
        const dogContainer = document.getElementById("dog-container");

        loadingSpinner.style.display = "block";
        dogContainer.style.display = "none";

        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "DEMO-API-KEY"
        });

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=15", requestOptions)
            .then(response => response.json())
            .then(result => {
                dogContainer.innerHTML = ""; // Clear any previous content
                result.forEach(dog => {
                    const dogDiv = document.createElement('div');
                    dogDiv.classList.add('dog');

                    // Add image
                    const img = document.createElement('img');
                    img.src = dog.url;
                    img.alt = 'Dog';
                    dogDiv.appendChild(img);

                    // Add breed info (if available)
                    if (dog.breeds && dog.breeds.length > 0) {
                        const breedName = document.createElement('h4');
                        breedName.innerText = dog.breeds[0].name;
                        dogDiv.appendChild(breedName);

                        const breedInfo = document.createElement('p');
                        breedInfo.innerText = `Breed group: ${dog.breeds[0].breed_group || 'Unknown'}`;
                        dogDiv.appendChild(breedInfo);
                    }

                    dogContainer.appendChild(dogDiv);
                });

                loadingSpinner.style.display = "none";
                dogContainer.style.display = "flex";
            })
            .catch(error => {
                console.log('Error fetching dog data:', error);
                loadingSpinner.style.display = "none";
            });
    }

    // Function to fetch dog breeds from API
    function fetchBreeds() {
        const loadingSpinner = document.getElementById("loading-spinner");
        const dogContainer = document.getElementById("dog-container");

        loadingSpinner.style.display = "block";
        dogContainer.style.display = "none";

        const headers = new Headers({
            "Content-Type": "application/json",
            "x-api-key": "DEMO-API-KEY"
        });

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        fetch("https://api.thedogapi.com/v1/breeds", requestOptions)
            .then(response => response.json())
            .then(result => {
                dogContainer.innerHTML = ""; // Clear any previous content
                result.forEach(breed => {
                    const breedDiv = document.createElement('div');
                    breedDiv.classList.add('dog');

                    // Add breed name
                    const breedName = document.createElement('h4');
                    breedName.innerText = breed.name;
                    breedDiv.appendChild(breedName);

                    // Add breed image
                    if (breed.image) {
                        const img = document.createElement('img');
                        img.src = breed.image.url;
                        img.alt = breed.name;
                        breedDiv.appendChild(img);
                    }

                    // Add breed characteristics
                    const breedInfo = document.createElement('p');
                    breedInfo.innerText = breed.temperament || 'No description available';
                    breedDiv.appendChild(breedInfo);

                    // Add age and weight info if available
                    const ageInfo = document.createElement('p');
                    ageInfo.innerText = `Age: ${breed.age || 'Unknown'}`;
                    breedDiv.appendChild(ageInfo);

                    const weightInfo = document.createElement('p');
                    weightInfo.innerText = `Weight: ${breed.weight ? breed.weight.metric + ' kg' : 'Unknown'}`;
                    breedDiv.appendChild(weightInfo);

                    const heightInfo = document.createElement('p');
                    heightInfo.innerText = `Height: ${breed.height ? breed.height.metric + ' cm' : 'Unknown'}`;
                    breedDiv.appendChild(heightInfo);

                    dogContainer.appendChild(breedDiv);
                });
                loadingSpinner.style.display = "none";
                dogContainer.style.display = "flex";
            })
            .catch(error => {
                console.log('Error fetching breed data:', error);
                loadingSpinner.style.display = "none";
            });
    }

    // Handle Dogs Images button click
    dogsImagesButton.addEventListener("click", function (event) {
        event.preventDefault();
        fetchDogs(); // Fetch dog images
    });

    // Handle Dogs Breeds button click
    dogsBreedsButton.addEventListener("click", function (event) {
        event.preventDefault();
        fetchBreeds(); // Fetch dog breeds
    });
});