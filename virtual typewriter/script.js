const bgMusic = document.getElementById("bg-music");
let started = false;

function startMusic() {
    if (!started) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(() => { });
        started = true;
    }
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
document.addEventListener("keydown", startMusic);

document.addEventListener("DOMContentLoaded", () => {

    const hint = document.querySelector(".seal-hint");

    if (hint) {
        setTimeout(() => {
            hint.style.opacity = "0";

            setTimeout(() => {
                hint.style.display = "none";
            }, 1200); // wait for fade
        }, 3000); // visible for 1 seconds
    }

    /* ===============================
       TYPEWRITER SETUP
    =============================== */
    const typeSound = document.getElementById("typeSound");

    let i = 0;
    const speed = 160;

    const content = `
Dear V,

I miss you a lot. I hope you’re back soon.

P.S. Take care of your health and don’t skip meals.
Love 3000 :3

— shru xoxo:)
`;

    const textEl = document.getElementById("text");

    function typeWriter() {
        if (!textEl) return;

        if (i <= content.length) {
            textEl.innerHTML =
                content.slice(0, i) + '<span class="cursor">|</span>';

            // 🔊 play typing sound (skip spaces & new lines)
            const char = content[i];
            if (char !== " " && char !== "\n") {
                typeSound.currentTime = 0;
                typeSound.volume = 0.4;
                typeSound.playbackRate = 0.9 + Math.random() * 0.2; // natural feel
                typeSound.play();
            }

            i++;
            setTimeout(typeWriter, speed + Math.random() * 40);
        }
    }


    /* ===============================
       PETALS ANIMATION
    =============================== */

    const petalContainer = document.querySelector(".petals");

    function createPetal() {
        if (!petalContainer) return;

        const petal = document.createElement("div");
        petal.classList.add("petal");

        petal.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 15 + 15;
        petal.style.width = size + "px";
        petal.style.height = size + "px";

        const duration = Math.random() * 10 + 10;
        petal.style.animationDuration = duration + "s";
        petal.style.animationDelay = Math.random() * 5 + "s";

        petalContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, duration * 1400);
    }

    setInterval(createPetal, 300);

    document.addEventListener("mousemove", (e) => {
        document.querySelectorAll(".petal").forEach(petal => {
            const moveX = (e.clientX / window.innerWidth - 0.5) * 100;
            petal.style.transform = `translateX(${moveX}px)`;
        });
    });

    /* ===============================
       WAX SEAL CLICK → START LETTER
    =============================== */

    const wax = document.getElementById("waxSeal");
    const envelopeScreen = document.getElementById("envelopeScreen");
    const letter = document.getElementById("letter");

    if (wax) {
        wax.addEventListener("click", () => {
            console.log("Wax clicked");

            envelopeScreen.style.opacity = "0";

            setTimeout(() => {
                envelopeScreen.style.display = "none";

                letter.style.opacity = "1";
                letter.style.zIndex = "20";

                i = 0;
                textEl.innerHTML = "";

                typeWriter(); // 🔥 START TYPING
            }, 800);
        });
    }

});






