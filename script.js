// Inicializace stránky
document.addEventListener('DOMContentLoaded', function() {
    const gridContainer = document.getElementById('photoGrid');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Vytvoření gridu s fotografiemi
    photoData.forEach((photoUrl, index) => {
        const photoCell = document.createElement('div');
        photoCell.className = 'photo-cell';
        photoCell.setAttribute('data-index', index);
        
        const img = document.createElement('img');
        img.src = photoUrl;
        img.alt = `Fotografie ${index + 1}`;
        img.loading = 'lazy';
        
        photoCell.appendChild(img);
        gridContainer.appendChild(photoCell);
        
        // Přidání události pro kliknutí
        photoCell.addEventListener('click', togglePhotoExpansion);
    });
    
    // Inicializace slideru pro superelipsu
    initSuperellipseSlider();
    
    // Přidání události pro zavření při kliknutí na overlay
    overlay.addEventListener('click', closeExpandedPhoto);
    
    // Přidání události pro zavření při stisknutí klávesy ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeExpandedPhoto();
        }
    });
});

// Funkce pro inicializaci slideru superelipsy
function initSuperellipseSlider() {
    const slider = document.getElementById('superellipseSlider');
    const valueDisplay = document.getElementById('superellipseValue');
    
    // Nastavení počáteční hodnoty
    updateSuperellipseShape(slider.value);
    valueDisplay.textContent = slider.value;
    
    // Přidání události pro změnu slideru
    slider.addEventListener('input', function() {
        const value = this.value;
        updateSuperellipseShape(value);
        valueDisplay.textContent = value;
    });
}

// Funkce pro aktualizaci tvaru superelipsy
function updateSuperellipseShape(exponent) {
    // Převod na absolutní hodnotu (záporné hodnoty vytváří zajímavé tvary)
    const absExponent = Math.abs(exponent);
    
    // Nastavení CSS proměnné pro všechny fotky
    document.documentElement.style.setProperty('--superellipse-exponent', absExponent);
    
    // Vysvětlení hodnot pro uživatele
    const valueDisplay = document.getElementById('superellipseValue');
    let shapeDescription = '';
    
    if (exponent <= 0.5) {
        shapeDescription = ' (téměř čtverec)';
    } else if (exponent <= 1.5) {
        shapeDescription = ' (diamant)';
    } else if (exponent <= 2.5) {
        shapeDescription = ' (superelipsa)';
    } else if (exponent <= 4) {
        shapeDescription = ' (zaoblený čtverec)';
    } else {
        shapeDescription = ' (téměř kruh)';
    }
    
    valueDisplay.textContent = exponent + shapeDescription;
}

// Funkce pro rozbalení/sbalení fotografie
function togglePhotoExpansion(e) {
    const photoCell = e.currentTarget;
    const isExpanded = photoCell.classList.contains('expanded');
    const overlay = document.querySelector('.overlay');
    
    if (isExpanded) {
        // Sbalení fotografie
        photoCell.classList.remove('expanded');
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        // Zavření všech ostatních rozbalených fotek
        const expandedPhotos = document.querySelectorAll('.photo-cell.expanded');
        expandedPhotos.forEach(photo => {
            photo.classList.remove('expanded');
        });
        
        // Rozbalení aktuální fotografie
        photoCell.classList.add('expanded');
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Funkce pro zavření rozbalené fotografie
function closeExpandedPhoto() {
    const expandedPhotos = document.querySelectorAll('.photo-cell.expanded');
    const overlay = document.querySelector('.overlay');
    
    expandedPhotos.forEach(photo => {
        photo.classList.remove('expanded');
    });
    
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}