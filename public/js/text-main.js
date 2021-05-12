const form = document.getElementById("text-form");

const textdata = document.getElementById("text");

form.addEventListener("submit", (event) => {
  // submit event detected
  event.preventDefault();

  console.log(textdata.value);
});
