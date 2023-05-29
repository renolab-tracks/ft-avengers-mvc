/* ======= Model ======= */

var model = {
  currentAvenger: null,
  adminShow: false, //hides the admin display area.
  avengers: [
    {
      clickCount: 0,
      name: "Iron Man",
      imgSrc:
        "https://cdn.pixabay.com/photo/2021/07/20/14/59/iron-man-6480952_1280.jpg",
    },
    {
      clickCount: 0,
      name: "Captain America",
      imgSrc:
        "https://cdn.pixabay.com/photo/2021/11/12/14/33/captain-america-6789190_1280.jpg",
    },
    {
      clickCount: 0,
      name: "Spiderman",
      imgSrc:
        "https://cdn.pixabay.com/photo/2021/12/12/13/32/spiderman-6865194_1280.jpg",
    },
    {
      clickCount: 0,
      name: "Hulk",
      imgSrc:
        "https://cdn.pixabay.com/photo/2022/09/21/23/29/the-incredible-hulk-7471339_1280.jpg",
    },
    {
      clickCount: 0,
      name: "Black Widow",
      imgSrc:
        "https://illustman.com/wp-content/uploads/2019/07/black-widow-ss-2.jpg",
    },
  ],
};

/* ======= controller ======= */

var controller = {
  //init function initalizes with the begining data. Keep out of the DOM.
  init: function () {
    //set the current avenger to the first one on the list
    model.currentAvenger = model.avengers[0];

    //tell our views to initialize.
    avengerListView.init();
    avengerView.init();
    adminView.init();
    adminView.hide();
  },

  getCurrentAvenger: function () {
    return model.currentAvenger;
  },

  //calls the array of avengers.
  getAvengers: function () {
    // return model.avengers.reverse();
    return model.avengers;
  },

  //sets the new avenger.
  setCurrentAvenger: function (avenger) {
    model.currentAvenger = avenger;
  },

  //increments the counter for the currently-selected avenger.
  incrementCounter: function () {
    model.currentAvenger.clickCount++;
    avengerView.render();
  },
  //function runs when 'Admin' button is clicked.
  adminDisplay: function () {
    if (model.adminShow === false) {
      model.adminShow = true;
      adminView.render(); //displays the admin input boxes and buttons
      adminView.show(); //displays the admin input boxes and buttons
    } else if (model.adminShow === true) {
      model.adminShow = false;
      adminView.hide(); // hides the admin input boxes and buttons
    }
  },

  //hides admin display when cancel button is clicked.
  adminCancel: function () {
    adminView.hide();
  },

  //hides admin display and saves new avenger data when save button is clicked.
  adminSave: function () {
    model.currentAvenger.name = adminAvengerName.value;
    model.currentAvenger.imgSrc = adminAvengerURL.value;
    model.currentAvenger.clickCount = adminAvengerClicks.value;
    avengerView.render();
    avengerListView.render();
    adminView.hide();
  },
};

/* ======= Views ======= */
var avengerView = {
  init: function () {
    this.avengerImage = document.getElementById("avengerImage"); //the avenger image
    this.name = document.getElementById("avengerName"); //the avenger's name above the image
    this.clickCount = document.getElementById("displayClicks"); //display for number of times this avenger was clicked
    //on click, increment the current avenger's click count
    this.avengerImage.addEventListener("click", function () {
      controller.incrementCounter();
    });
    this.render();
  },

  render: function () {
    var currentAvenger = controller.getCurrentAvenger(); //calls the current avenger from controller
    this.clickCount.textContent =
      "Number of times this avenger was clicked: " + currentAvenger.clickCount;
    this.name.textContent = currentAvenger.name;
    this.avengerImage.src = currentAvenger.imgSrc;
  },
};

var avengerListView = {
  avengerList: [],
  init: function () {
    //store the DOM element for easy access.
    this.avengerList = document.getElementById("names");

    //update the DOM elements with the right values.
    this.render();
  },

  render: function () {
    var i, avenger, avengerElem;

    //call the array of avengers from controller
    var avengers = controller.getAvengers();

    this.avengerList.innerHTML = "";

    //loop over each avenger in our array of avengers
    for (i = 0; i < avengers.length; i++) {
      //This is the avenger number that we are on
      avenger = avengers[i];

      //create a DOM element for each avenger
      avengerElem = document.createElement("li"); //create li element
      var avengerImgElem = document.createElement("img");
      avengerImgElem.src = avenger.imgSrc;
      // avengerImgElem.style.width = "100px";
      avengerImgElem.style.height = "100px";
      avengerImgElem.className = "img-fluid img-thumbnail rounded mx-auto";
      avengerElem.className = "mb-3";
      avengerElem.appendChild(avengerImgElem);
      // avengerElem.textContent = avenger.name;

      //fills the content of li with the avenger's name

      function bindEvent(avenger) {
        //when the avenger's name in the list is clicked, update the avenger's picture
        avengerElem.addEventListener("click", function () {
          controller.setCurrentAvenger(avenger);
          avengerView.render();
          // controller.incrementCounter(); //increments avenger clicker
        });
      }
      bindEvent(avenger);

      this.avengerList.appendChild(avengerElem); //append li elements to the list
    }
  },
};

var adminView = {
  init: function () {
    this.adminAvengerName = document.getElementById("adminAvengerName");
    this.adminAvengerURL = document.getElementById("adminAvengerURL");
    this.adminAvengerClicks = document.getElementById("adminAvengerClicks");
    var admin = document.getElementById("admin");

    this.adminBtn = document.getElementById("adminBtn");
    this.adminCancel = document.getElementById("adminCancel");
    this.adminSave = document.getElementById("adminSave");

    this.adminBtn.addEventListener("click", function () {
      //shows the admin display.
      controller.adminDisplay();
    });

    this.adminCancel.addEventListener("click", function () {
      //hides the admin display without saving any new avenger data.
      controller.adminCancel();
    });

    this.adminSave.addEventListener("click", function () {
      //hides the admin display and saves new avenger data.
      controller.adminSave();
    });

    this.render();
  },

  render: function () {
    var currentAvenger = controller.getCurrentAvenger(); //calls current avenger
    this.adminAvengerName.value = currentAvenger.name;
    this.adminAvengerURL.value = currentAvenger.imgSrc;
    this.adminAvengerClicks.value = currentAvenger.clickCount;
  },

  show: function () {
    admin.style.display = "block"; //shows the admin div on index.html
  },

  hide: function () {
    admin.style.display = "none";
  },
};

//make it go!
controller.init();
