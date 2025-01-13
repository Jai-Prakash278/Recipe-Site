function toggleMenu() {
    const menuList = document.getElementById('menuList');
    menuList.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menuList = document.getElementById('menuList');
    const hamburger = document.querySelector('.hamburger');
    
    if (!menuList.contains(e.target) && !hamburger.contains(e.target) && menuList.classList.contains('active')) {
        menuList.classList.remove('active');
    }
});

