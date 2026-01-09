// ===== Reward videos =====
const rewardVideos = [
  "assets/videos/Dragon3.mp4",
  "assets/videos/Dragon4.mp4",
  "assets/videos/Dragon5.mp4",
];

// Pick random video
function getRandomVideo() {
  const index = Math.floor(Math.random() * rewardVideos.length);
  return rewardVideos[index];
}

// Check if all tasks are done
function checkReward() {
  const tasks = [...document.querySelectorAll(".practice-task")];
  if (!tasks.length) return;

  const allDone = tasks.every(t => t.checked);
  if (!allDone) return;

  const modal = document.querySelector(".reward-modal");
  const video = modal.querySelector(".reward-video");

  video.src = getRandomVideo();
  modal.classList.add("is-open");

  video.load();
}

// Listen for checkbox changes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("practice-task")) {
    checkReward();
  }
});

// Close modal
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("reward-close")) {
    const modal = document.querySelector(".reward-modal");
    const video = modal.querySelector(".reward-video");

    video.pause();
    video.currentTime = 0;
    modal.classList.remove("is-open");
  }
});
