const url = 'https://dog.ceo/api/breeds/image/random';

fetch(url)
    .then(response => {
        
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
       
        return response.json();
    })
    .then(data => {
        
        console.log("Response data:", data);
        const img = document.createElement('img');
        img.src = data.message;
        img.alt = 'Random Dog';
        document.body.appendChild(img);
    })
    .catch(error => {
       
        console.error("There was a problem with the fetch operation:", error);
    });