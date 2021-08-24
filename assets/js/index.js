if (window.SimpleSlide) {
  new SimpleSlide({
    slide: "cats", // nome do atributo data-slide="principal"
    time: 5000, // tempo de transição dos slides
    pauseOnHover: true, // pausa a transição automática
    nav: true,
  });
}

if (window.SimpleAnime) {
  new SimpleAnime();
}

listCats();
loadDashboard();

function listCats() {
  Promise.all([getCats()]).then(function (gatos) {
    for (var i = 0; i < 12; i++) {
      var list = document.getElementById("cat-list");
      list.innerHTML +=
        "<li><img src='" +
        gatos[0].data[i].image.url +
        "'/><div class='info'>" +
        "<h1>" +
        gatos[0].data[i].name +
        "</h1><p>" +
        gatos[0].data[i].description +
        "</p></div></li>";
    }
  });
}

var backgroundColors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

var borderColors = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

function loadDashboard() {
  var nomes = [];
  var inteligente = [];
  var energia = [];
  Promise.all([getCats()]).then(function (gatos) {
    for (var i = 0; i < 12; i++) {
      nomes.push(gatos[0].data[i].name);
      inteligente.push(gatos[0].data[i].intelligence);
      energia.push(gatos[0].data[i].energy_level);
    }

    var title = "Intelligence level by breed";
    var options = {
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };
    var data = {
      labels: nomes,
      datasets: [
        {
          data: inteligente,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };

    var intelligence = document.getElementById("intelligence").getContext("2d");

    var intelligence = new Chart(intelligence, {
      type: "bar",
      data: data,
      options: options,
    });

    var title = "Energy level by breed";
    var options = {
      plugins: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };
    var data = {
      labels: nomes,
      datasets: [
        {
          data: energia,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    };
    var energy = document.getElementById("energy").getContext("2d");
    var energy = new Chart(energy, {
      type: "bar",
      data: data,
      options: options,
    });
  });
}

function getCats() {
  return axios.get("https://api.thecatapi.com/v1/breeds/");
}
