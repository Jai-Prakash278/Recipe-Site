document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        tabContents.forEach((content) => content.classList.remove("active"));
  
        // Add active class to the clicked button and its content
        button.classList.add("active");
        const targetTab = button.dataset.tab;
        document.getElementById(targetTab).classList.add("active");
      });
    });
  });
  