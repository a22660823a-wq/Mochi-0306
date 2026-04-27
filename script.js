// 照片設定 - 輪播用照片
const photoPath = "images/";
const totalPhotos = 40;

// 建立照片陣列
const photos = [];
for (let i = 1; i <= totalPhotos; i++) {
    photos.push(`${photoPath}照片/LINE_ALBUM_20251004～1008日本大阪🇯🇵_260423_${i}.jpg`);
}
// 加入額外的照片
photos.push(`${photoPath}照片/笑死 這是在做什麼.jpg`);

// 影片列表 - 下方影片牆用
const videos = [
    "影片/不知道你在跑什麼😂.MOV",
    "影片/吉.MOV",
    "影片/咻~~~.MOV",
    "影片/在駕訓班開車的你.MOV",
    "影片/奶昔.MOV",
    "影片/好罪惡的麻醬麵🫣.MOV",
    "影片/專業飼養員.MOV",
    "影片/我在命令童工嗎？？？.MOV",
    "影片/捲捲薯🍟.MOV",
    "影片/新年第一吃？.MP4",
    "影片/派克雞排.MOV",
    "影片/突然看到你在搖呼啦圈😆.MOV",
    "影片/第一次一起去好市多.MOV",
    "影片/第一次一起去看海.MOV",
    "影片/第一次一起吃好罪惡的披薩.MOV",
    "影片/第一次一起看煙火.mp4",
    "影片/第一次一起組積木.MP4",
    "影片/第一次一起遛豆ㄓ.MP4",
    "影片/第一次一起騎腳踏車.MOV",
    "影片/第一次去市場買東西😆.MOV",
    "影片/第一次坐你開的車！.MOV",
    "影片/第一次調酒嗎？.MOV",
    "影片/第一次開箱盲盒.MOV",
    "影片/第一次陪你開箱新手機.MOV",
    "影片/第一次騎大白的你.MOV",
    "影片/超絕.MOV",
    "影片/這麼可愛的嗎.MOV",
    "影片/飆仔🐷.MOV",
    "影片/高主廚👩‍🍳.MOV",
    "影片/🐷🦶.MOV",
    "影片/第一次搭飛機，也是我們的最後一次的第一次.MOV"
];

// 建立影片路徑陣列
const videoItems = videos.map(video => `images/${video}`);

// 美食路線影片
const foodVideos = [
    "美食路線/魷魚羹來回路線影片(去程一路直直騎).mp4",
    "美食路線/魷魚羹來回路線影片(回程回到公司).mp4",
    "美食路線/土城(去程).mp4",
    "美食路線/土城(回程).mp4"
];

const foodVideoItems = foodVideos.map(video => `images/${video}`);

let currentSlide = 0;

// 背景音樂播放清單
const playlist = [
    "images/音樂/(1).mp3",
    "images/音樂/(2).mp3",
    "images/音樂/(3).mp3"
];

let currentTrack = 0;
let bgMusic;
let musicBtn;

// 上一首
function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    bgMusic.src = playlist[currentTrack];
    bgMusic.play();
    musicBtn.classList.add('playing');
}

// 下一首
function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    bgMusic.src = playlist[currentTrack];
    bgMusic.play();
    musicBtn.classList.add('playing');
}

// 倍速切換
let speedIndex = 1;
const speeds = [0.75, 1, 1.25, 1.5];

function changeSpeed() {
    speedIndex = (speedIndex + 1) % speeds.length;
    bgMusic.playbackRate = speeds[speedIndex];
    document.getElementById('speedBtn').textContent = `${speeds[speedIndex]}x`;
}

function initMusic() {
    bgMusic = document.getElementById('bgMusic');
    musicBtn = document.getElementById('musicBtn');
    
    // 設定適合的背景音量
    bgMusic.volume = 0.35;
    bgMusic.src = playlist[0];
    bgMusic.preload = 'auto';
    
    // 絕對保證播放下一首
    function playNext() {
        currentTrack = (currentTrack + 1) % playlist.length;
        bgMusic.src = playlist[currentTrack];
        bgMusic.load();
        
        // 用使用者互動權限播放
        setTimeout(() => {
            bgMusic.play().catch(err => {
                // 萬一失敗 3秒後重試
                setTimeout(() => bgMusic.play(), 3000);
            });
        }, 200);
    }
    
    bgMusic.addEventListener('ended', playNext);
    
    // 每1秒檢查是否播放完畢 最強制的作法
    setInterval(() => {
        if (!bgMusic.paused && bgMusic.currentTime > 0 && bgMusic.currentTime >= bgMusic.duration - 0.5) {
            playNext();
        }
    }, 1000);
    
    // 預先載入下一首
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.currentTime > bgMusic.duration - 30) {
            const next = (currentTrack + 1) % playlist.length;
            const preload = new Audio();
            preload.src = playlist[next];
            preload.preload = 'auto';
        }
    });
    
    // 點擊任何地方就開始播放音樂
    document.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        }
    }, { once: true });

    // 音樂按鈕開關
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.classList.add('playing');
        } else {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
        }
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
    initCarousel();
    initPhotoWall();
    initFoodWall();
    startTimer();
    initMusic();
    setInterval(autoSlide, 5000);
});

// 飄落愛心效果
function createFallingHearts() {
    const container = document.getElementById('hearts-container');
    const heartEmojis = ['💕', '💖', '💗', '💓', '💘', '❤️', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 13000);
    }, 300);
}

// 初始化輪播 - 顯示照片
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('dotsContainer');
    
    photos.forEach((photo, index) => {
        // 建立投影片
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `<img src="${photo}" alt="照片 ${index + 1}">`;
        track.appendChild(slide);
        
        // 建立點點
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % photos.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + photos.length) % photos.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

function autoSlide() {
    nextSlide();
}

// 初始化影片牆
function initPhotoWall() {
    const wall = document.getElementById('photoWall');
    
    videoItems.forEach((video, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        const title = videos[index].replace(/\.(mov|mp4)$/i, '').replace('影片/', '');
        item.innerHTML = `
            <video src="${video}" controls style="width: 100%; height: calc(100% - 40px); object-fit: cover;"></video>
            <p style="padding: 8px; font-size: 0.8rem; text-align: center; background: white; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</p>
        `;
        wall.appendChild(item);
    });
}

// 初始化美食路線影片牆
function initFoodWall() {
    const wall = document.getElementById('foodWall');
    
    foodVideoItems.forEach((video, index) => {
        const item = document.createElement('div');
        item.className = 'photo-item';
        const title = foodVideos[index].replace(/\.(mov|mp4)$/i, '').replace('美食路線/', '');
        item.innerHTML = `
            <video src="${video}" controls style="width: 100%; height: calc(100% - 40px); object-fit: cover;"></video>
            <p style="padding: 8px; font-size: 0.8rem; text-align: center; background: white; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${title}</p>
        `;
        wall.appendChild(item);
    });
}

// 戀愛計時器 - 時間停在最後一天
function startTimer() {
    // 2022.03.06 - 2026.02.28 = 1455天
    document.getElementById('days').textContent = '1455';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}