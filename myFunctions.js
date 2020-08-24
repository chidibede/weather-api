const kelvinToCelsius = (temp_in_k) => {
  const temp_in_c = temp_in_k - 273;
  return temp_in_c;
};

const appendHTML = (data) => {
  const root = document.getElementById("root");

  const container = document.createElement("div");
  container.setAttribute("class", "container");

  root.appendChild(container);
  container.appendChild(data)
};
module.exports = kelvinToCelsius;
module.exports =appendHTML;
