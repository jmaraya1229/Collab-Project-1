// will's code
//grant_type=client_credentials&client_id=du5LZGcyZhM51weBA55R5wexC39ZP2goVW2i7TAcayFnkDUtX4&client_secret=AStWV6OJyCylpnWHlOZh4HfR3w2zTiLWoCya9HAD https://api.petfinder.com/v2/oauth2/token

// let token = new petfinder.Client({apiKey: "du5LZGcyZhM51weBA55R5wexC39ZP2goVW2i7TAcayFnkDUtX4", secret:"AStWV6OJyCylpnWHlOZh4HfR3w2zTiLWoCya9HAD"})

const client = new petfinder.Client({
  apiKey: "du5LZGcyZhM51weBA55R5wexC39ZP2goVW2i7TAcayFnkDUtX4",
  secret: "AStWV6OJyCylpnWHlOZh4HfR3w2zTiLWoCya9HAD",
});

// async function showAnimals(animalType, searchBreed) {
//   let page = 1;
//   do {
//     apiResult = await client.animal.search({
//       type: animalType,
//       breed: searchBreed,
//       page,
//       limit: 100,
//     });
//     let dogIdx = (page - 1) * 100;
//     apiResult.data.animals.forEach(function(animal) {
//       console.log(` -- ${++dogIdx}: ${animal.name} id: ${animal.id} url: ${animal.url}`);
//     });

//     page++;
//   } while(apiResult.data.pagination && apiResult.data.pagination.total_pages >= page);
// }
// showAnimals("dog", "chihuahua")

async function getpics() {
  let randompic = await client.animal.search({
    limit: 10,
  });

  console.log(randompic);
  console.log(randompic.data.animals[0]);

  let animal = randompic.data.animals[0];

  document.getElementById("randomname").textContent = animal.name;

  document.getElementById("randomdesc").textContent = animal.description;

  console.log(animal.primary_photo_cropped);

  let randomphoto = animal.primary_photo_cropped.medium;
  
  console.log(randomphoto);

  document.getElementById("random-pic").src = randomphoto;
}

getpics();
// trent's code
document.addEventListener("DOMContentLoaded", () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add("is-active");
  }

  function closeModal($el) {
    $el.classList.remove("is-active");
  }

  function closeAllModals() {
    (document.querySelectorAll(".modal") || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll(".js-modal-trigger") || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener("click", () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (
    document.querySelectorAll(
      ".modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener("keydown", (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) {
      // Escape key
      closeAllModals();
    }
  });
});
