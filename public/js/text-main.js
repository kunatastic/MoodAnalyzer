var form = document.getElementById("text-form");

const handleForm = async (event) => {
  event.preventDefault();
  console.log(textData.value);

  try {
    const response = await fetch("/text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1234567890,
        text: textData.value,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};
form.addEventListener("submit", handleForm);

const textData = document.getElementById("text-data");
