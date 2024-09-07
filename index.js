// const url = 'https://dog.ceo/api/breeds/image/random';

// fetch(url)
//     .then(response => {
        
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
       
//         return response.json();
//     })
//     .then(data => {
        
//         console.log("Response data:", data);
//         const img = document.createElement('img');
//         img.src = data.message;
//         img.alt = 'Random Dog';
//         document.body.appendChild(img);
//     })
//     .catch(error => {
       
//         console.error("There was a problem with the fetch operation:", error);
//     });
const today = new Date();
const thisYear = today.getFullYear();
const footer = document.querySelector("footer");
const copyright = document.createElement("p");
copyright.innerHTML = `Aigul Stetchi &copy; ${thisYear}`;
footer.appendChild(copyright);


// Create the anchor element styled as a button
const button = document.createElement("a");
button.innerText = "Find your four-legged friend";
button.href = "/dogs"; // 
button.className = "find-friend-button";

// Add the button to a specific section of your page
document.getElementById("dogs").appendChild(button);


document.addEventListener("DOMContentLoaded", function () {
    const websiteName = document.getElementById("websiteName");
    const dogs = document.getElementById("dogs");
    
    websiteName.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("websiteName")
    // fetchData("");
    });
    
    dogs.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("dogs")
    // fetchData("");
    });
    
    // fetchData("");
    });





const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY" // 
  });
  
  const requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=10", requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Преобразование ответа в JSON
    })
    .then(result => {
      console.log(result); // Выводим JSON-данные в консоль
  
      // Опционально: отображаем изображение на странице
      if (result && result[0] && result[0].url) {
        const img = document.createElement('img');
        img.src = result[0].url;
        img.alt = 'Random Dog';
        img.style.maxWidth = '100%'; // Устанавливаем максимальную ширину изображения
        // document.body.appendChild(img);
      }
    })
    .catch(error => console.log('error', error));