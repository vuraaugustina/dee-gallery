const btnElem = document.getElementById("loadBtn"); // grab the html load gallery button
const gallerySection = document.getElementById("gallery-box"); //grab the html section


// create a function to fetch the data from api endpoint

async function loadPhotos() {
    // when we don't have our data yet, we want to display "Loading"
    gallerySection.innerHTML = "<p class='desc'>Loading...</p>";

    try {
        const response = await fetch ("https://jsonplaceholder.typicode.com/photos");

        if (!response.ok) {
            throw new Error("Server error:" + response.status);
        }

        const photos = await response.json();
        console.log(photos);

        const galleryCard = photos.map((photo) => {
            return `
              <div class="card">
              <h3 class="photo-title"> ${photo.albumId}. ${photo.title}</h3>
              <img src="${photo.url}" alt="" class="photo-img">
              </div>
            `
        }).join("");

        gallerySection.innerHTML =galleryCard;
    } catch (error) {
        gallerySection.innerHTML = `<p> Something went wrong: ${error.message}</p>`
    }
}

// attach event listener to the Load Gallery Button //
btnElem.addEventListener("click", loadPhotos);