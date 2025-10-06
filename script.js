const songs = [
  { title: "Música 1", src: "music/musica1.mp3", cover: "images/retro1.jpg" },
  { title: "Música 2", src: "music/musica2.mp3", cover: "images/retro2.jpg" },
  { title: "Música 3", src: "music/musica3.mp3", cover: "images/retro3.jpg" }
];

let index = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volumeSlider = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(song) {
  title.textContent = song.title;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  cover.style.animationPlayState = "running";
}

function pauseSong() {
  audio.pause();
  cover.style.animationPlayState = "paused";
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(songs[index]);
  playSong();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(songs[index]);
  playSong();
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, "0");
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, "0");
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
});

audio.addEventListener("ended", nextSong);

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

loadSong(songs[index]);
audio.volume = 0.5;