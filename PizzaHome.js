// Navbar
const hamEle = document.querySelector(".ham")
const closeEle = document.querySelector(".close")
const hiddenEle = document.querySelector(".hidden")

hamEle.addEventListener("click", ()=>{
  hiddenEle.style.display = "flex"
})

closeEle.addEventListener("click", ()=> {
  hiddenEle.style.display = "none"
})




document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider")
  const sliderTrack = document.querySelector(".slider-track")
  const slides = document.querySelectorAll(".slide")
  const prevButton = document.querySelector(".prev")
  const nextButton = document.querySelector(".next")
  const dotsContainer = document.querySelector(".slider-dots")

  let slideWidth = slides[0].offsetWidth
  let slideIndex = 0
  let isDragging = false
  let startPos = 0
  let currentTranslate = 0
  let prevTranslate = 0

  function setupInfiniteLoop() {
    const slidesToClone = 3 // Number of slides to clone on each side
    for (let i = 0; i < slidesToClone; i++) {
      const cloneStart = slides[i].cloneNode(true)
      const cloneEnd = slides[slides.length - 1 - i].cloneNode(true)
      sliderTrack.insertBefore(cloneEnd, sliderTrack.firstChild)
      sliderTrack.appendChild(cloneStart)
    }

    // Position the slider to show the first actual slide
    currentTranslate = -slideWidth * slidesToClone
    prevTranslate = currentTranslate
    setSliderPosition()
  }

  function createDots() {
    slides.forEach((_, index) => {
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
      slideIndex = slides.length - 1
      currentTranslate = -slideWidth * (slideIndex + 3)
      prevTranslate = currentTranslate
      setSliderPosition()
    } else if (slideIndex === slides.length) {
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
  setupInfiniteLoop()
  createDots()
  updateDots()
})