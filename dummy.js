document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".slider")
    const sliderTrack = document.querySelector(".slider-track")
    const prevButton = document.querySelector(".prev")
    const nextButton = document.querySelector(".next")
    const dotsContainer = document.querySelector(".slider-dots")
  
    const recipes = [
      { title: "Spaghetti Carbonara", description: "Classic Italian pasta dish" },
      { title: "Chicken Tikka Masala", description: "Creamy and spicy Indian curry" },
      { title: "Caesar Salad", description: "Fresh and crispy salad with Caesar dressing" },
      { title: "Beef Bourguignon", description: "Rich French beef stew" },
      { title: "Sushi Rolls", description: "Assorted Japanese sushi rolls" },
      { title: "Greek Moussaka", description: "Layered eggplant and meat casserole" },
      { title: "Thai Green Curry", description: "Aromatic and spicy Thai curry" },
      { title: "Apple Pie", description: "Classic American dessert" },
      { title: "Paella", description: "Spanish rice dish with seafood" },
    ]
  
    let slides = []
    let slideWidth = 0
    let slideIndex = 0
    let isDragging = false
    let startPos = 0
    let currentTranslate = 0
    let prevTranslate = 0
  
    function createSlide(recipe) {
      const slide = document.createElement("div")
      slide.classList.add("slide")
      slide.innerHTML = `
              <img src="/placeholder.svg?height=150&width=200" alt="${recipe.title}">
              <h3>${recipe.title}</h3>
              <p>${recipe.description}</p>
          `
      return slide
    }
  
    function setupSlider() {
      // Create initial slides
      recipes.forEach((recipe) => {
        const slide = createSlide(recipe)
        sliderTrack.appendChild(slide)
      })
  
      // Clone slides for infinite loop
      const slidesToClone = 3 // Number of slides to clone on each side
      for (let i = 0; i < slidesToClone; i++) {
        const cloneStart = createSlide(recipes[i])
        const cloneEnd = createSlide(recipes[recipes.length - 1 - i])
        sliderTrack.insertBefore(cloneEnd, sliderTrack.firstChild)
        sliderTrack.appendChild(cloneStart)
      }
  
      slides = Array.from(sliderTrack.children)
      slideWidth = slides[0].offsetWidth
  
      // Position the slider to show the first actual slide
      currentTranslate = -slideWidth * slidesToClone
      prevTranslate = currentTranslate
      setSliderPosition()
    }
  
    function createDots() {
      recipes.forEach((_, index) => {
        const dot = document.createElement("div")
        dot.classList.add("dot")
        dot.addEventListener("click", () => goToSlide(index))
        dotsContainer.appendChild(dot)
      })
    }
  
    function updateDots() {
      const dots = document.querySelectorAll(".dot")
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === slideIndex)
      })
    }
  
    function setSliderPosition() {
      sliderTrack.style.transform = `translateX(${currentTranslate}px)`
    }
  
    function goToSlide(index) {
      slideIndex = index
      currentTranslate = -slideWidth * (index + 3) // +3 because of cloned slides
      prevTranslate = currentTranslate
      setSliderPosition()
      updateDots()
    }
  
    function checkInfiniteLoop() {
      if (slideIndex === -1) {
        slideIndex = recipes.length - 1
        currentTranslate = -slideWidth * (slideIndex + 3)
        prevTranslate = currentTranslate
        setSliderPosition()
      } else if (slideIndex === recipes.length) {
        slideIndex = 0
        currentTranslate = -slideWidth * 3
        prevTranslate = currentTranslate
        setSliderPosition()
      }
    }
  
    prevButton.addEventListener("click", () => {
      slideIndex--
      goToSlide(slideIndex)
      checkInfiniteLoop()
    })
  
    nextButton.addEventListener("click", () => {
      slideIndex++
      goToSlide(slideIndex)
      checkInfiniteLoop()
    })
  
    function dragStart(e) {
      isDragging = true
      startPos = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX
      sliderTrack.style.cursor = "grabbing"
    }
  
    function dragging(e) {
      if (!isDragging) return
      const currentPosition = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX
      currentTranslate = prevTranslate + currentPosition - startPos
      setSliderPosition()
    }
  
    function dragEnd() {
      isDragging = false
      const movedBy = currentTranslate - prevTranslate
  
      if (movedBy < -100) {
        slideIndex++
      } else if (movedBy > 100) {
        slideIndex--
      }
  
      goToSlide(slideIndex)
      checkInfiniteLoop()
      sliderTrack.style.cursor = "grab"
    }
  
    sliderTrack.addEventListener("mousedown", dragStart)
    sliderTrack.addEventListener("touchstart", dragStart)
    sliderTrack.addEventListener("mousemove", dragging)
    sliderTrack.addEventListener("touchmove", dragging)
    sliderTrack.addEventListener("mouseup", dragEnd)
    sliderTrack.addEventListener("touchend", dragEnd)
    sliderTrack.addEventListener("mouseleave", dragEnd)
  
    window.addEventListener("resize", () => {
      slideWidth = slides[0].offsetWidth
      goToSlide(slideIndex)
    })
  
    // Initialize
    setupSlider()
    createDots()
    updateDots()
  })
  
  