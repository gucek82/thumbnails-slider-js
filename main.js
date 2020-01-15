const imgs = [
  {
    img:
      "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704_960_720.jpg",
    txt: "Pierwszy text",
    button: "Button 1"
  },

  {
    img:
      "https://cdn.pixabay.com/photo/2013/07/18/20/26/boat-164989_960_720.jpg",
    txt: "Drugi text",
    button: "Button 2"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2014/03/03/16/12/cinque-terre-279013_960_720.jpg",
    txt: "Trzeci text",
    button: "Button 3"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2014/11/21/03/26/scotland-540119_960_720.jpg",
    txt: "Czwarty text",
    button: "Button 4"
  },
  {
    img:
      "https://cdn.pixabay.com/photo/2014/11/21/03/24/landscape-540115_960_720.jpg",
    txt: "Piąty text",
    button: "Button 5"
  }
];

const img = document.querySelector("img");
const h1 = document.querySelector("div.content h1");
const btn = document.querySelector("div.content button");
const thumb = document.querySelector("div.thumbs");
const stopBtn = document.querySelector("header button.stop");

const time = 5000;
let active = 0;

setThumbs = () => {
  for (let i = 0; i < imgs.length; i++) {
    // if (active <= imgs.length - 1) {
    const span = document.createElement("span");
    span.style.backgroundImage = `url(${imgs[i].img})`;
    span.style.backgroundPosition = "center";
    span.style.backgroundSize = "cover";
    span.style.backgroundRepeat = "no-repeat";
    span.style.margin = " 0 2px";
    span.setAttribute("id", i);
    span.style.width = "70px";
    span.style.height = "70px";

    thumb.appendChild(span);

    // }
  }
};
setThumbs();

const span = [...document.querySelectorAll("div.thumbs span")];

changeThumb = () => {
  const activeThumb = span.findIndex(item => item.classList.contains("active"));
  span[active].classList.add("active");
  span[activeThumb].classList.remove("active");
};

imgChange = () => {
  active++;
  if (active == imgs.length) active = 0;
  img.setAttribute("src", imgs[active].img);
  h1.textContent = imgs[active].txt;
  btn.textContent = imgs[active].button;

  changeThumb();
};

let showImages = setInterval(imgChange, time);
let set = true;
stopStart = () => {
  if (set) {
    clearInterval(showImages);
    stopBtn.innerHTML = '<i class="far fa-play-circle fa-2x"></i>';
    set = !set;
  } else {
    setInterval(imgChange, 3000);
    stopBtn.innerHTML = '<i class="far fa-stop-circle fa-2x">';
    set = !set;
  }
};

stopBtn.addEventListener("click", stopStart);

switchImage = e => {
  clearInterval(showImages);
  const index = e.target.id;
  img.setAttribute("src", imgs[index].img);
  h1.textContent = imgs[index].txt;
  btn.textContent = imgs[index].button;
  const activeThumb = span.findIndex(item => item.classList.contains("active"));
  span[index].classList.add("active");
  span[activeThumb].classList.remove("active");
  active = index;
  showImages = setInterval(imgChange, 3000);
};

span.forEach(item => item.addEventListener("click", switchImage));
