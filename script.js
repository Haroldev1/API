const httpStatusCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406,
  407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423,
  424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507,
  508, 510, 511,
];

const totalImages = httpStatusCodes.length;
let imagesPerPage = 6;
let totalPages = Math.ceil(totalImages / imagesPerPage);
const container = document.getElementById("images-container");
const pagination = document.getElementById("pagination");

function loadImages(page, httpStatusCodes, pImagesPerPage) {
  container.innerHTML = "";

  const startIndex = (page - 1) * pImagesPerPage;
  const endIndex = Math.min(startIndex + pImagesPerPage, totalImages);

  for (let i = startIndex; i < endIndex; i++) {
    if (i >= httpStatusCodes.length) break;

    const statusCode = httpStatusCodes[i];
    const imageUrl = `https://http.cat/${statusCode}`;
    const image = document.createElement("img");
    image.role = "button";
    image.dataset.status = statusCode;
    image.className = "d-flex align-items-center img-all";
    image.src = imageUrl;
    container.appendChild(image);
  }
}

function generatePagination(tpages, pImagesPerPage) {
  pagination.innerHTML = "";

  for (let i = 1; i <= tpages; i++) {
    const div = document.createElement("div");
    div.className =
      "container-number d-flex align-items-center justify-content-center";

    const link = document.createElement("a");
    link.href = "#";
    link.textContent = i;
    link.addEventListener("click", () => {
      loadImages(i, httpStatusCodes, pImagesPerPage);
    });
    div.appendChild(link);
    pagination.appendChild(div);
  }
}

// Cargar la primera página de imágenes al cargar la página
loadImages(1, httpStatusCodes, imagesPerPage);

// Generar la paginación
generatePagination(totalPages, imagesPerPage);

const inputSearch = document.getElementById("input-search");
const btnSeeAgain = document.getElementById("btn-see-again");
const pageAll = document.getElementById("page-all");
const pageSearch = document.getElementById("page-search");
const imgSearched = document.getElementById("img-searched");
const imgAlls = document.querySelectorAll(".img-all");
const sectionSee = document.getElementById("section-see");
const select = document.getElementById("select");

inputSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && inputSearch.value) {
    imgSearched.src = `https://http.cat/${inputSearch.value}`;
    pageAll.hidden = true;
    sectionSee.classList.add("invisible");
    console.log(sectionSee);
    pageSearch.hidden = false;
  }
});

btnSeeAgain.addEventListener("click", function (event) {
  pageAll.hidden = false;
  pageSearch.hidden = true;
  sectionSee.classList.remove("invisible");
  inputSearch.value = "";
});

select.addEventListener("change", (e) => {
  console.log(e.target.value);
  const imagesPerPage = e.target.value;
  let totalPages = Math.ceil(totalImages / imagesPerPage);
  loadImages(1, httpStatusCodes, imagesPerPage);

  generatePagination(totalPages, imagesPerPage);
});
