const musicRef = document.querySelector("audio");
const prevRef = document.getElementById("prev");
const nextRef = document.getElementById("next");
const playRef = document.getElementById("play");

const progContainerRef = document.getElementById("progress-container");
const progressRef = document.getElementById("progress");

const artistRef = document.getElementById("artist");
const titleRef = document.getElementById("title");
const imgRef = document.querySelector("img");
const durationRef = document.getElementById("duration");
const currentTimeRef = document.getElementById("current-time");

const musicArray = [
  {
    title: "Mix-1",
    fileName: "jacinto-1",
    artist: "Eswar Prasad Kona",
  },
  {
    title: "Mix-2",
    fileName: "jacinto-2",
    artist: "Eswar Prasad Kona",
  },
  {
    title: "Mix-3",
    fileName: "jacinto-3",
    artist: "Eswar Prasad Kona",
  },
  {
    title: "Mix-4",
    fileName: "metric-1",
    artist: "Eswar Prasad Kona",
  },
];

let isPlaying = false;
let songIndex = 0;
function toggleAudio() {
  isPlaying ? musicRef.pause() : musicRef.play();
  isPlaying
    ? (playRef.classList.replace("fa-pause", "fa-play"),
      playRef.setAttribute("title", "play"))
    : (playRef.classList.replace("fa-play", "fa-pause"),
      playRef.setAttribute("title", "pause"));
  isPlaying = !isPlaying;
}

playRef.addEventListener("click", toggleAudio);
prevRef.addEventListener("click", () => {
  songIndex =
    songIndex == 0 ? (songIndex = musicArray.length - 1) : songIndex - 1;
  changeMusic(musicArray[songIndex]);
  isPlaying = false;
  toggleAudio();
});
nextRef.addEventListener("click", () => {
  songIndex = songIndex == musicArray.length - 1 ? 0 : songIndex + 1;
  changeMusic(musicArray[songIndex]);
  isPlaying = false;
  toggleAudio();
});

progContainerRef.addEventListener("click", setProgressBar);

function setProgressBar(e) {
  musicRef.currentTime = (e.offsetX / this.clientWidth) * musicRef.duration;
}

function updateProgress(e) {
  if (isPlaying) {
    calculateTiming(durationRef, e, "duration");
    calculateTiming(currentTimeRef, e, "currentTime");
  }
}

function calculateTiming(ref, e, type) {
  const { duration, currentTime } = e.srcElement;
  let temp = type == "duration" ? duration : currentTime;
  let seconds = Math.floor(temp % 60);
  if (!!seconds) {
    ref.textContent = `${Math.floor(temp / 60)}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  }
  progressRef.style.width = `${(currentTime / duration) * 100}%`;
}
musicRef.addEventListener("timeupdate", updateProgress);

function changeMusic(song) {
  titleRef.textContent = song.title;
  artistRef.textContent = song.artist;
  musicRef.src = `./music/${song.fileName}.mp3`;
  imgRef.src = `./img/${song.fileName}.jpg`;
}

changeMusic(musicArray[songIndex]);
