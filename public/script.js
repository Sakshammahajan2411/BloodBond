// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });

  // 🚀 Donate Form Submission (Save to MongoDB Atlas with Dialog Box)
  const donateForm = document.getElementById("donateForm");
  if (donateForm) {
    donateForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(donateForm);
      const donorData = {
        name: formData.get("name"),
        bloodGroup: formData.get("bloodGroup"),
        age: formData.get("age"),
        location: formData.get("location"),
        phone: formData.get("phone"),
        email: formData.get("email"),
      };

      try {
        const response = await fetch("http://localhost:3000/api/donors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(donorData),
        });

        if (response.ok) {
          // ✅ Show the success dialog box
          const modal = document.getElementById("successModal");
          if (modal) {
            modal.style.display = "flex";
          }
          
          donateForm.reset();
        } else {
          alert("❌ Failed to save donor!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Something went wrong!");
      }
    });
  }

  // 🚀 Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const modal = document.getElementById("messageModal");
      if (modal) {
        modal.style.display = "flex";
      }
      contactForm.reset();
    });
  }

  // Close Modal
  const closeButtons = document.querySelectorAll(".close, .modal-btn");
  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal");
      modals.forEach((modal) => {
        modal.style.display = "none";
      });
    });
  });

  // 🚀 Search Donors (Retrieve from MongoDB Atlas)
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const bloodGroup = document.getElementById("searchBloodGroup").value;
      const location = document.getElementById("searchLocation").value.toLowerCase();

      try {
        const response = await fetch("http://localhost:3000/api/donors");
        const donors = await response.json();

        let filteredDonors = donors;

        if (bloodGroup) {
          filteredDonors = filteredDonors.filter((donor) => donor.bloodGroup === bloodGroup);
        }

        if (location) {
          filteredDonors = filteredDonors.filter((donor) =>
            donor.location.toLowerCase().includes(location)
          );
        }

        displaySearchResults(filteredDonors);
      } catch (error) {
        console.error("Failed to fetch donors:", error);
        alert("❌ Could not fetch donors .");
      }
    });
  }

  // 🚀 Display Search Results from MongoDB
  function displaySearchResults(donors) {
    const resultsContainer = document.getElementById("resultsContainer");
    if (!resultsContainer) return;

    resultsContainer.innerHTML = "";

    if (donors.length === 0) {
      resultsContainer.innerHTML = "<p>No donors found matching your criteria.</p>";
      return;
    }

    donors.forEach((donor) => {
      const donorCard = document.createElement("div");
      donorCard.className = "glass-card donor-card";

      donorCard.innerHTML = `
        <span class="donor-blood-type">${donor.bloodGroup}</span>
        <h3>${donor.name}</h3>
        <div class="donor-info">
          <p><strong>Location:</strong> ${donor.location}</p>
          <p><strong>Age:</strong> ${donor.age}</p>
        </div>
        <a href="tel:${donor.phone}" class="btn btn-primary">Contact Donor</a>
      `;

      resultsContainer.appendChild(donorCard);
    });
  }

  // Blood Compatibility Checker
  const bloodTypeSelector = document.getElementById("bloodTypeSelector");
  if (bloodTypeSelector) {
    bloodTypeSelector.addEventListener("change", function () {
      const selectedBloodType = this.value;
      if (!selectedBloodType) return;

      const compatibilityResults = document.getElementById("compatibilityResults");
      const canReceiveFrom = document.getElementById("canReceiveFrom");
      const canDonateTo = document.getElementById("canDonateTo");

      if (compatibilityResults && canReceiveFrom && canDonateTo) {
        canReceiveFrom.innerHTML = "";
        canDonateTo.innerHTML = "";

        const compatibility = {
          "A+": { canReceiveFrom: ["A+", "A-", "O+", "O-"], canDonateTo: ["A+", "AB+"] },
          "A-": { canReceiveFrom: ["A-", "O-"], canDonateTo: ["A+", "A-", "AB+", "AB-"] },
          "B+": { canReceiveFrom: ["B+", "B-", "O+", "O-"], canDonateTo: ["B+", "AB+"] },
          "B-": { canReceiveFrom: ["B-", "O-"], canDonateTo: ["B+", "B-", "AB+", "AB-"] },
          "O+": { canReceiveFrom: ["O+", "O-"], canDonateTo: ["A+", "B+", "AB+", "O+"] },
          "O-": { canReceiveFrom: ["O-"], canDonateTo: ["A+", "B+", "AB+", "O+"] },
        };

        compatibility[selectedBloodType].canReceiveFrom.forEach((type) => {
          const span = document.createElement("span");
          span.textContent = type;
          canReceiveFrom.appendChild(span);
        });

        compatibility[selectedBloodType].canDonateTo.forEach((type) => {
          const span = document.createElement("span");
          span.textContent = type;
          canDonateTo.appendChild(span);
        });

        compatibilityResults.style.display = "block";
      }
    });
  }
});