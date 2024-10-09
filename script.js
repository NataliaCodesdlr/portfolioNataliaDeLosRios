// Modal Elements
const modal = document.getElementById("myModal");
const closeBtn = document.querySelector(".close-icon");
const cardImages = document.querySelectorAll(".card-image");
const modalContent = document.querySelector(".modal-content");
const modalTitle = modalContent.querySelector("h2");
const modalDescription = modalContent.querySelector("p");
const contactForm = document.getElementById("contactForm");
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.querySelector('.icon-sun');
const moonIcon = document.querySelector('.icon-moon');
let currentSlide = 0; // Only declare once

// Open Modal Function
function openModal(title, description, showForm = false) {
    modalTitle.textContent = title;
    modalDescription.innerHTML = ''; // Clear previous content

    // Set specific content based on the modal title
    if (title === "Contact") {
        modalDescription.innerHTML = `
            <p class="contact-phrase">Let's Get In Touch!</p>
            <span class="color-word" style="color: var(--green);">natal@DESKTOP-4KOMHAV</span>
            <span class="color-word" style="color: var(--violet);">MINGW64</span>
            <span class="color-word" style="color: var(--yellow);">~/Desktop/portfolioNataliaDeLosRios</span>
        `;

        // Add input fields to the contact form
        contactForm.innerHTML = `
            <label for="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required>
            <label for="subject">Subject:</label>
            <input type="text" id="subject" placeholder="Enter the subject" required>
            <label for="message">Message:</label>
            <textarea id="message" placeholder="Enter your message" required></textarea>
            <button type="submit">Send</button>
        `;
        contactForm.style.display = "block"; // Show the contact form
    } else if (title === "Portfolio") {
        modalDescription.innerHTML = `
            <p>${description}</p>
            <div class="slider-container">
                <div class="slider">
                    <div class="slide"><img src="Assets/portfolio1.png" alt="Project 1"></div>
                    <div class="slide"><img src="Assets/portfolio2.png" alt="Project 2"></div>
                    <div class="slide"><img src="Assets/portfolio3.png" alt="Project 3"></div>
                </div>
                <button class="prev">Previous</button>
                <button class="next">Next</button>
            </div>
        `;
        contactForm.style.display = "none"; // Hide the contact form for portfolio modal
        initSlider(); // Initialize the slider functionality
    } else {
        modalDescription.innerHTML = description; // Default description for "About" modal
        contactForm.style.display = "none"; // Hide the contact form for other modals
    }

    modal.style.display = "block"; // Show the modal
}

// Close Modal Function
function closeModal() {
    modal.style.display = "none"; // Hide the modal
    modalContent.classList.remove("contact-modal"); // Reset styles
}

// Initialize Event Listeners for Card Images
function initCardListeners() {
    cardImages.forEach((image, index) => {
        image.addEventListener("click", function() {
            switch (index) {
                case 0: // About card
                    openModal(
                        "About Me",
                        `<p class="about-phrase">Hi <span id="waveHand">🖐</span> I'm Natalia</p>
                        <ul class="about-list">
                            <li><img src="Assets/desarrollo-web-1.png" class="about-icon"><span>FULL STACK DEVELOPER</span></li>
                            <li><img src="Assets/diseno-grafico-1.png" class="about-icon"><span>UI/UX DESIGN, WIREFRAMING & PROTOTYPING</span></li>
                            <li><img src="Assets/desarrollo-web-2.png" class="about-icon"><span>HTML5, CSS3, JAVASCRIPT, TYPESCRIPT, ANGULAR, REACT</span></li>
                            <li><img src="Assets/desarrollo-web-3.png" class="about-icon"><span>JAVA, SPRINGBOOT, SQL, MONGODB, NODE.JS, EXPRESS, WORDPRESS</span></li>
                        </ul>`
                    );
                    break;
                case 1: // Portfolio card
                    openModal("Portfolio", "These are my projects.");
                    break;
                case 2: // Contact card
                    openModal("Contact", "Let's get in touch!", true);
                    modalContent.classList.add("contact-modal"); // Apply specific styling
                    break;
            }
        });
    });
}

// Close Modal on Click Outside
function initCloseModalListeners() {
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}

// Prevent Default Form Submission
function initFormListener() {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;
        const mailtoLink = `mailto:natal@DESKTOP-4KOMHAV?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0AFrom: ${name} (${email})`;
        window.location.href = mailtoLink; // Open the mailto link
        closeModal();
    });
}

// Homepage Icon
const modalIcon = document.querySelector(".modal-icon");
modalIcon.src = "Assets/cuervo-1.png";  // Update to use your new icon

// Theme Toggle Functionality
themeToggle.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    sunIcon.style.display = isDarkMode ? 'none' : 'inline-block';
    moonIcon.style.display = isDarkMode ? 'inline-block' : 'none';
    updateCardIcons(isDarkMode ? 'Assets/white-icon.png' : 'Assets/file-and-folder-1.png');
}

// Update Card Icons Based on the Theme
function updateCardIcons(iconPath) {
    cardImages.forEach((image) => {
        image.src = iconPath; // Change the source of the card images
    });
}

// Portfolio Image Slider
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Next button event listener
    document.querySelector('.next').addEventListener('click', function() {
        moveToNextSlide(totalSlides);
    });

    // Previous button event listener
    document.querySelector('.prev').addEventListener('click', function() {
        moveToPrevSlide(totalSlides);
    });

    updateSlidePosition(); // Initialize the slide position
}

function updateSlidePosition() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveToNextSlide(totalSlides) {
    currentSlide = (currentSlide + 1) % totalSlides; // Loop to the first slide
    updateSlidePosition();
}

function moveToPrevSlide(totalSlides) {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; // Loop to the last slide
}

// Book Page Turning Logic
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const book = document.querySelector("#book");
const papers = document.querySelectorAll(".paper");
let currentLocation = 1;
const numOfPapers = papers.length;

prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

function openBook() {
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";
}

function closeBook(isAtBeginning) {
    if (isAtBeginning) {
        book.style.transform = "translateX(0%)";
    } else {
        book.style.transform = "translateX(100%)";
    }
    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";
}

function goNextPage() {
  if (currentLocation < numOfPapers) {
      switch (currentLocation) {
          case 1:
              openBook();
              papers[0].classList.add("flipped");
              papers[0].style.zIndex = 1;
              break;
          case 2:
              papers[1].classList.add("flipped");
              papers[1].style.zIndex = 2;
              break;
          case 3:
              papers[2].classList.add("flipped");
              papers[2].style.zIndex = 3;
              break;
          case 4:
              papers[3].classList.add("flipped");
              papers[3].style.zIndex = 4;
              break;
          // Add more cases if you have more pages
      }
      currentLocation++;
  }

  if (currentLocation === numOfPapers) {
      closeBook(false); // Close the book, indicating end of pages
  }
}

function goPrevPage() {
  if (currentLocation > 1) {
      currentLocation--;
      switch (currentLocation) {
          case 1:
              papers[0].classList.remove("flipped");
              papers[0].style.zIndex = 0;
              closeBook(true); // Close the book if on the first page
              break;
          case 2:
              papers[1].classList.remove("flipped");
              papers[1].style.zIndex = 1;
              break;
          case 3:
              papers[2].classList.remove("flipped");
              papers[2].style.zIndex = 2;
              break;
          case 4:
              papers[3].classList.remove("flipped");
              papers[3].style.zIndex = 3;
              break;
          // Add more cases if you have more pages
      }
  }
}

// Initialize Event Listeners
function initialize() {
  initCardListeners();
  initCloseModalListeners();
  initFormListener();
  initSlider(); // Call the slider initialization if required
}

initialize(); // Start all initializations
