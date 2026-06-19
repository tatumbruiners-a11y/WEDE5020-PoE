/* JavaScript Setup */
document.addEventListener('DOMContentLoaded', () => {
    initImageLightbox();
    initServicesSearch();
    initFormValidation();
});

/* Media Gallery Lightbox Engine */
function initImageLightbox() {
    const galleryImages = document.querySelectorAll('.grid-img.gallery-thumb');
    const lightbox = document.getElementById('lightboxModal');
    
    if (!lightbox) return; 

    const modalImg = document.getElementById('lightboxTargetImg') || document.getElementById('lightboxTargetImage'); 
    const captionText = document.getElementById('lightboxCaption');
    const closeBtn = lightbox.querySelector('.lightbox-close') || document.getElementById('lightboxClose'); 

    galleryImages.forEach(image => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.style.display = "block";
            if (modalImg) modalImg.src = this.src;
            if (captionText) captionText.textContent = this.alt || "SPCA Gallery Image";
            document.body.style.overflow = 'hidden'; 
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto'; 
        });
    }

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = 'auto';
        }
    });
}

/* Services Search Filter Engine */
function initServicesSearch() {
    const searchInput = document.getElementById("serviceSearch");
    const serviceCards = document.querySelectorAll(".flip-card-container");

    if (!searchInput) return; 

    searchInput.addEventListener("input", (e) => {
        const filterValue = e.target.value.toLowerCase().trim();

        serviceCards.forEach(card => {
            const cardTitleEl = card.querySelector(".card-front h2");
            if (!cardTitleEl) return;

            const cardTitle = cardTitleEl.textContent.toLowerCase();

            if (cardTitle.includes(filterValue)) {
                card.style.display = ""; 
                card.classList.remove("dimmed");
            } else {
                card.style.display = "none"; 
                card.classList.add("dimmed");
            }
        });
    });
}

/* Enquiry Form Record System */
function initFormValidation() {
    const enquiryForm = document.getElementById("spcaEnquiryForm");
    const alertBox = document.getElementById("enquiryAlertBox");

    if (!enquiryForm) return; 

    enquiryForm.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const enquiryType = document.getElementById("enquiry-type");
        const fullName = document.getElementById("full-name");
        const emailAddress = document.getElementById("email-address");
        const phoneNumber = document.getElementById("phone-number");
        const messageContent = document.getElementById("message-content");

        const fields = [enquiryType, fullName, emailAddress, phoneNumber, messageContent];
        let errors = [];

        fields.forEach(field => {
            if (field) field.classList.remove("input-error");
        });
        
        if (alertBox) {
            alertBox.style.display = "none";
            alertBox.className = "";
            alertBox.innerHTML = "";
        }

        if (enquiryType && !enquiryType.value) {
            errors.push("Please select an enquiry type.");
            enquiryType.classList.add("input-error");
        }

        if (fullName && !fullName.value.trim()) {
            errors.push("Full Name is required.");
            fullName.classList.add("input-error");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailAddress) {
            const emailValue = emailAddress.value.trim();
            if (!emailValue) {
                errors.push("Email Address is required.");
                emailAddress.classList.add("input-error");
            } else if (!emailRegex.test(emailValue)) {
                errors.push("Please enter a valid email address (e.g., user@domain.com).");
                emailAddress.classList.add("input-error");
            }
        }

        if (phoneNumber) {
            const phoneCleaned = phoneNumber.value.replace(/\s+/g, "");
            const phoneRegex = /^[0-9]{10}$/; 
            if (!phoneNumber.value.trim()) {
                errors.push("Contact Number is required.");
                phoneNumber.classList.add("input-error");
            } else if (!phoneRegex.test(phoneCleaned)) {
                errors.push("Please enter a valid 10-digit contact number (e.g., 0217004140).");
                phoneNumber.classList.add("input-error");
            }
        }

        if (messageContent && !messageContent.value.trim()) {
            errors.push("Detailed Message context cannot be left blank.");
            messageContent.classList.add("input-error");
        }

        if (alertBox) {
            if (errors.length > 0) {
                alertBox.classList.add("error-summary-box");
                
                let errorHTML = `<p>Please correct the following errors before submitting:</p><ul>`;
                errors.forEach(err => {
                    errorHTML += `<li>${err}</li>`;
                });
                errorHTML += `</ul>`;
                
                alertBox.innerHTML = errorHTML;
                alertBox.style.display = "block";
                
                alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
                alertBox.classList.add("success-alert-box");
                const selectedTypeName = enquiryType ? enquiryType.options[enquiryType.selectedIndex].text : "General Enquiry";
                const userDisplayName = fullName ? fullName.value.trim() : "Thank you";
                
                alertBox.innerHTML = `<p style="margin:0;">Thank you, ${userDisplayName}! Your enquiry regarding "${selectedTypeName}" has been successfully logged. An SPCA representative will contact you shortly.</p>`;
                alertBox.style.display = "block";

                enquiryForm.reset();
                alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });
}
