console.log("Client side javascript is loaded!");

// fetch("weather?address=Avondale").then((res) => {
//   res
//     .json()
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

// messageOne.textContent = "Dat";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const location = search.value;
  // console.log(location);
  fetch(`/weather?address=${location}`).then((res) => {
    res
      .json()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
});

// fetch("http://puzzle.mead.io/puzzle").then((respond) => {
//   respond.json().then((data) => {
//     console.log(data);
//   });
// });

// const getPuzzle = async (callback) => {
//   try {
//     let data = await axios.get("http://puzzle.mead.io/puzzle");
//     callback(data);
//   } catch (e) {
//     console.log(e);
//   }
// };

// getPuzzle((data) => {
//   console.log(data.data);
// });
