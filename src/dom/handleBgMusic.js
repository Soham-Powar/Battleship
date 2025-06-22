import bgMusicFile from "../assets/music.mp3";
const bgMusic = new Audio(bgMusicFile);
bgMusic.loop = true;
bgMusic.volume = 0.3;

let isPlaying = false;

export default function handleBgMusic() {
  const musicToggleBtn = document.querySelector(".toggle-music");

  musicToggleBtn.addEventListener("click", (e) => {
    // e.stopPropagation(); // Prevent triggering document click
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    isPlaying = !isPlaying;
    updateButton(isPlaying);
  });

  function startMusicOnce() {
    if (!isPlaying) {
      bgMusic.play();
      isPlaying = true;
      updateButton(true);
    }
    document.removeEventListener("click", startMusicOnce);
  }
  document.addEventListener("click", startMusicOnce);

  function updateButton(playing) {
    musicToggleBtn.textContent = playing ? "🔊" : "🔇";
    musicToggleBtn.title = playing ? "Pause Music" : "Play Music";
  }
}
