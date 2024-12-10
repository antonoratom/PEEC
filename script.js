//GSAP MOUSE MOVE EFFECT
const smallImages = document.querySelectorAll("[small-img]");
const mediumImages = document.querySelectorAll("[medium-img]");
const bigImages = document.querySelectorAll("[big-img]");
const globalParalax = document.querySelectorAll("[section-paralax]");

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const { innerWidth, innerHeight } = window;

  // Calculate percentage positions
  const percentX = clientX / innerWidth;
  const percentY = clientY / innerHeight;
  const gsapDuration = 5;

  // Map percentage positions to a range of -20px to 20px
  const offsetX = percentX * -160 + 80; // Maps 0% to -20px and 100% to 20px
  const offsetY = percentY * -160 + 80; // Maps 0% to -20px and 100% to 20px

  // Map percentage positions to a range of -10 to 10 for rotations
  const rotateX = percentY * -4 + 2;
  const rotateY = percentX * 2 - 1;

  globalParalax.forEach((element) => {
    gsap.to(element, {
      rotateX: rotateX,
      rotateY: rotateY,
      x: offsetX,
      y: offsetY,
      duration: gsapDuration, // Shorter duration for smoother transitions
      ease: "power1.out",
      overwrite: "auto", // Ensures smooth interruption
    });
  });

  // Map percentage positions to a range of -20px to 20px
  const offsetXImg = percentX * -100 + 50; // Maps 0% to -20px and 100% to 20px
  const offsetYImg = percentY * -70 + 35; // Maps 0% to -20px and 100% to 20px

  // Loop through each image and animate it
  smallImages.forEach((image) => {
    gsap.to(image, {
      x: offsetXImg / 3,
      y: offsetYImg / 3,
      duration: gsapDuration, // Shorter duration for smoother transitions
      ease: "power1.out",
      overwrite: "auto",
    });
  });

  mediumImages.forEach((image) => {
    gsap.to(image, {
      x: offsetXImg / 1.5,
      y: offsetYImg / 1.5,
      duration: gsapDuration, // Shorter duration for smoother transitions
      ease: "power1.out",
      overwrite: "auto",
    });
  });

  bigImages.forEach((image) => {
    gsap.to(image, {
      x: offsetXImg,
      y: offsetYImg,
      duration: gsapDuration, // Shorter duration for smoother transitions
      ease: "power1.out",
      overwrite: "auto",
    });
  });
});

let stickyBl = gsap.timeline({
  scrollTrigger: {
    trigger: "[photos-trigger]",
    start: "top 30%",
    end: "bottom 30%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});

// Animation for .contdown-imgs_for-paralax
stickyBl.from(
  ".contdown-imgs_for-paralax",
  {
    width: 0,
    height: 0,
    duration: 1,
    stagger: {
      amount: 0.5,
      from: "random",
    },
    ease: "power1.out",
  },
  0 // Align this animation with the start of the timeline
);

let bgBl = gsap.timeline({
  scrollTrigger: {
    trigger: "[bg-trigger]",
    start: "bottom 30%",
    end: "bottom 30%",
    toggleActions: "play none none reverse",
    // markers: true,
  },
});
bgBl.to(
  ".countdown_bg-fg-filled",
  {
    opacity: 1,
    duration: 0.6,
    ease: "power1.out",
  },
  0
);

//END OF GSAP

// Set the target date
const targetDate = new Date("February 15, 2025 00:00:00").getTime();

// Update the countdown every second
const countdownInterval = setInterval(() => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the distance between now and the target date
  const distance = targetDate - now;

  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update the countdown elements
  document.getElementById("days").innerHTML = `${days}`;
  document.getElementById("hours").innerHTML = `${hours}`;
  document.getElementById("minutes").innerHTML = `${minutes}`;
  document.getElementById("seconds").innerHTML = `${seconds}`;

  // If the countdown is finished, display a message
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "Countdown Finished!";
  }
}, 1000);
