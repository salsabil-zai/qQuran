
const apiUrl = "https://mp3quran.net/api/v3/reciters";

async function getReciters() {
    const chooseReciters = document.querySelector('#chooseReciters');
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
       
        const data = await res.json();
        chooseReciters.innerHTML = '<option value="">اختر القارئ</option>';
       
        data.reciters.forEach(reciter => {
            chooseReciters.innerHTML += `<option value="${reciter.id}">${reciter.name}</option>`;
        });

        chooseReciters.addEventListener('change', e => getMoshaf(e.target.value));

    } catch (error) {
        console.error("❌ حدث خطأ أثناء جلب القراء:", error);
    }
}

async function getMoshaf(reciterId) {
    const chooseMoshaf = document.querySelector('#chooseMoshaf');
    if (!reciterId) return;

    try {
        const res = await fetch(`https://mp3quran.net/api/v3/reciters?language=ar&reciter=${reciterId}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
       
        const data = await res.json();
        chooseMoshaf.innerHTML = '<option value="">اختر الرواية</option>';

        const reciterData = data.reciters[0];
        if (!reciterData || !reciterData.moshaf || reciterData.moshaf.length === 0) {
            chooseMoshaf.innerHTML += `<option value="">لا توجد روايات متاحة</option>`;
            return;
        }

        reciterData.moshaf.forEach(moshaf => {
            chooseMoshaf.innerHTML += `<option value="${moshaf.id}" data-server="${moshaf.server}" data-surahlist="${moshaf.surah_list}">${moshaf.name}</option>`;
        });

    } catch (error) {
        console.error("❌ حدث خطأ أثناء جلب الروايات:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const chooseMoshaf = document.querySelector("#chooseMoshaf");
    const choosesurah = document.querySelector("#choosesurah");

    if (!chooseMoshaf || !choosesurah) {
        console.error("❌ خطأ: عناصر القائمة غير موجودة في HTML.");
        return;
    }

    chooseMoshaf.addEventListener("change", () => {
        const selectedMoshaf = chooseMoshaf.options[chooseMoshaf.selectedIndex];
        const surahServer = selectedMoshaf.dataset.server;
        const surahList = selectedMoshaf.dataset.surahlist;

        if (surahServer && surahList) {
            getSurah(surahServer, surahList);
        } else {
            console.error("❌ خطأ: بيانات `surahServer` أو `surahList` مفقودة.");
        }
    });
});

async function getSurah(surahServer, surahList) {
    const choosesurah = document.querySelector('#choosesurah');
    choosesurah.innerHTML = ''; // تفريغ القائمة قبل إضافة السور

    try {
        const res = await fetch('https://mp3quran.net/api/v3/suwar');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
       
        const data = await res.json();
        const surahNames = data.suwar;

        surahList.split(',').forEach(surah => {
            const padSurah = surah.padStart(3, '0');
            const foundSurah = surahNames.find(s => s.id == surah);

            if (foundSurah) {
                choosesurah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${foundSurah.name}</option>`;
            }
        });

    } catch (error) {
        console.error("❌ حدث خطأ أثناء جلب السور:", error);
    }
}

document.querySelector("#choosesurah").addEventListener("change", function () {
    const selectedSurah = this.value;
    if (selectedSurah) {
        playSurah(selectedSurah);
    }
});

function playSurah(surahMp3) {
    const audioplayer = document.querySelector('#audioplayer');
    audioplayer.src = surahMp3;
    audioplayer.play();
}

// ✅ تشغيل البث المباشر
function playlive(channel) {
    const video = document.getElementById('livevideo');

    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(channel);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = channel;
        video.play();
    } else {
        console.error("❌ جهازك لا يدعم تشغيل HLS.");
    }
}

// تشغيل الكود عند تحميل الصفحة

    getReciters();
//Radios
  // جلب البيانات من API
  fetch("https://mp3quran.net/api/v3/radios?language=eng")
  .then(response => response.json())
  .then(data => {
      const radioList = document.getElementById("radioList");

      // ملء قائمة المحطات
      data.data.forEach(radio => {
          const option = document.createElement("option");
          option.value = radio.url;
          option.textContent = radio.name; // اسم المحطة
          radioList.appendChild(option);
      });

      // تشغيل المحطة عند الاختيار
      radioList.addEventListener("change", (event) => {
          const audioPlayer = document.getElementById("audioPlayer");
          const audioSource = document.getElementById("audioSource");
          audioSource.src = event.target.value;
          audioPlayer.load(); // إعادة تحميل مشغل الصوت
          audioPlayer.play(); // تشغيل الصوت
      });
  })
  .catch(error => console.error("خطأ في جلب البيانات:", error));
  getReciters();