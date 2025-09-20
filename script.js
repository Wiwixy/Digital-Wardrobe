// Digital Wardrobe - Interactive Closet Application
// Main JavaScript functionality for sustainable fashion awareness

// Clothing items data with environmental impact information
const clothingItems = [
    { 
        name: "Jeans", 
        emoji: "👖", 
        info: "I was produced with 7,500 liters of water - enough for one person to drink for 7 years!", 
        water: 7500, 
        co2: 33 
    },
    { 
        name: "Cotton Dress", 
        emoji: "👗", 
        info: "My wear rate is only 40% - I'm barely used but taking up space!", 
        water: 2700, 
        co2: 15 
    },
    { 
        name: "Wool Sweater", 
        emoji: "🧥", 
        info: "I generate 27kg of CO2 - equivalent to driving 145km in a car!", 
        water: 6000, 
        co2: 27 
    },
    { 
        name: "T-Shirt", 
        emoji: "👕", 
        info: "I used 2,700 liters of water - equivalent to what you drink in 3 years!", 
        water: 2700, 
        co2: 8 
    },
    { 
        name: "Sneakers", 
        emoji: "👟", 
        info: "My production created 14kg of CO2 and I'm worn only twice a month!", 
        water: 8000, 
        co2: 14 
    },
    { 
        name: "Leather Jacket", 
        emoji: "🧥", 
        info: "I used 17,000 liters of water and generated 110kg of CO2!", 
        water: 17000, 
        co2: 110 
    },
    { 
        name: "Blazer", 
        emoji: "👔", 
        info: "I hang unworn 80% of the time but required massive resources to make!", 
        water: 3000, 
        co2: 20 
    },
    { 
        name: "Skirt", 
        emoji: "👗", 
        info: "I'm made from polyester and will take 200+ years to decompose!", 
        water: 1500, 
        co2: 9 
    },
    { 
        name: "Scarf", 
        emoji: "🧣", 
        info: "I'm a fast fashion item worn 3 times on average before disposal!", 
        water: 1200, 
        co2: 5 
    },
    { 
        name: "Hat", 
        emoji: "🎩", 
        info: "I represent impulse buying - purchased but rarely worn!", 
        water: 800, 
        co2: 3 
    }
];

// AI-generated tips for sustainable fashion practices
const aiTips = [
    "Consider the 30-wear rule: Will you wear this item at least 30 times?",
    "Quality over quantity: One well-made item beats 5 cheap ones.",
    "Check your closet utilization: Most people wear only 20% of their clothes regularly.",
    "Seasonal rotation: Store off-season items to see what you actually miss.",
    "The one-in-one-out rule: For every new item, donate one existing piece.",
    "Mix and match: Choose items that work with multiple outfits.",
    "Repair and upcycle: Small fixes can extend clothing life significantly."
];

// Facts about textile pollution and fashion industry impact
const pollutionFacts = [
    "The fashion industry produces 92 million tons of textile waste annually - equivalent to a garbage truck of clothes every second.",
    "Polyester clothing sheds 700,000 microplastic fibers per wash, polluting our oceans and food chain.",
    "It takes 2,000 gallons of water to make ONE pair of jeans - the same amount a person drinks in 5-6 years.",
    "The fashion industry accounts for 8-10% of global carbon emissions - more than aviation and shipping combined.",
    "Less than 1% of used clothing is recycled into new garments due to technological limitations.",
    "Textile dyeing is the second-largest polluter of water globally, contaminating rivers in production countries.",
    "The average person buys 60% more clothing than 15 years ago but keeps items for half as long."
];

// Global application state
let stats = {
    donated: 0,
    waterSaved: 0,
    co2Saved: 0,
    impactScore: 0
};

// Drag and drop state management
let draggedItem = null;
let infoCard = null;
let donatedItems = [];

/**
 * Initialize the application
 * Sets up DOM elements and event listeners
 */
function init() {
    // Get reference to info card element
    infoCard = document.getElementById('infoCard');
    
    // Populate all sections
    populateCloset();
    populateAITips();
    populatePollutionFacts();
    setupEventListeners();
    
    console.log('Digital Wardrobe application initialized successfully');
}

/**
 * Populate the virtual closet with clothing items
 * Creates draggable elements for each clothing item
 */
function populateCloset() {
    const grid = document.getElementById('clothesGrid');
    
    if (!grid) {
        console.error('Clothes grid element not found');
        return;
    }
    
    clothingItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'clothing-item';
        itemElement.draggable = true;
        itemElement.dataset.index = index;
        itemElement.innerHTML = `
            <span class="clothing-emoji">${item.emoji}</span>
            <div class="clothing-name">${item.name}</div>
        `;
        grid.appendChild(itemElement);
    });
}

/**
 * Display random AI tips for sustainable fashion
 * Shows 3 randomly selected tips
 */
function populateAITips() {
    const tipsList = document.getElementById('aiTipsList');
    
    if (!tipsList) {
        console.error('AI tips list element not found');
        return;
    }
    
    // Shuffle and select 3 random tips
    const shuffledTips = [...aiTips].sort(() => Math.random() - 0.5).slice(0, 3);
    
    shuffledTips.forEach(tip => {
        const tipElement = document.createElement('div');
        tipElement.className = 'tip-item';
        tipElement.textContent = tip;
        tipsList.appendChild(tipElement);
    });
}

/**
 * Display random pollution facts
 * Shows 3 randomly selected environmental facts
 */
function populatePollutionFacts() {
    const factsList = document.getElementById('pollutionFactsList');
    
    if (!factsList) {
        console.error('Pollution facts list element not found');
        return;
    }
    
    // Shuffle and select 3 random facts
    const shuffledFacts = [...pollutionFacts].sort(() => Math.random() - 0.5).slice(0, 3);
    
    shuffledFacts.forEach(fact => {
        const factElement = document.createElement('div');
        factElement.className = 'fact-item';
        factElement.textContent = fact;
        factsList.appendChild(factElement);
    });
}

/**
 * Set up all event listeners for drag and drop functionality
 * Handles clothing item interactions and donation box events
 */
function setupEventListeners() {
    const clothingElements = document.querySelectorAll('.clothing-item');
    const donationBox = document.getElementById('donationBox');
    
    if (!donationBox) {
        console.error('Donation box element not found');
        return;
    }
    
    // Add event listeners to clothing items
    clothingElements.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('mouseenter', showInfo);
        item.addEventListener('mouseleave', hideInfo);
    });
    
    // Add event listeners to donation box
    donationBox.addEventListener('dragover', handleDragOver);
    donationBox.addEventListener('drop', handleDrop);
    donationBox.addEventListener('dragleave', handleDragLeave);
}

/**
 * Handle drag start event
 * @param {DragEvent} e - The drag event
 */
function handleDragStart(e) {
    draggedItem = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

/**
 * Handle drag end event
 * @param {DragEvent} e - The drag event
 */
function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

/**
 * Handle drag over event for donation box
 * @param {DragEvent} e - The drag event
 */
function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.getElementById('donationBox').classList.add('drag-over');
}

/**
 * Handle drag leave event for donation box
 * @param {DragEvent} e - The drag event
 */
function handleDragLeave(e) {
    document.getElementById('donationBox').classList.remove('drag-over');
}

/**
 * Handle drop event when item is dropped on donation box
 * @param {DragEvent} e - The drop event
 */
function handleDrop(e) {
    e.preventDefault();
    const donationBox = document.getElementById('donationBox');
    donationBox.classList.remove('drag-over');
    
    if (draggedItem) {
        const itemIndex = parseInt(draggedItem.dataset.index);
        const item = clothingItems[itemIndex];
        
        // Process the donation
        processDonation(item, draggedItem);
    }
}

/**
 * Process a clothing item donation
 * @param {Object} item - The clothing item being donated
 * @param {HTMLElement} element - The DOM element of the item
 */
function processDonation(item, element) {
    // Add to donated items array
    donatedItems.push(item);
    
    // Update statistics
    stats.donated++;
    stats.waterSaved += item.water;
    stats.co2Saved += item.co2;
    stats.impactScore += Math.floor((item.water / 100) + (item.co2 * 2));
    
    // Animate item removal
    element.style.transform = 'scale(0)';
    element.style.transition = 'transform 0.3s ease';
    
    setTimeout(() => {
        element.remove();
        updateDisplay();
        showCelebration(item);
    }, 300);
    
    // Add to donation box display
    addDonatedItemDisplay(item);
    
    console.log(`Donated: ${item.name}, Water saved: ${item.water}L, CO2 saved: ${item.co2}kg`);
}

/**
 * Show information tooltip for clothing item
 * @param {MouseEvent} e - The mouse event
 */
function showInfo(e) {
    const itemIndex = parseInt(e.target.dataset.index);
    const item = clothingItems[itemIndex];
    const rect = e.target.getBoundingClientRect();
    
    if (!infoCard) return;
    
    infoCard.textContent = item.info;
    infoCard.style.left = rect.left + 'px';
    infoCard.style.top = (rect.top - 60) + 'px';
    infoCard.classList.add('show');
}

/**
 * Hide information tooltip
 */
function hideInfo() {
    if (infoCard) {
        infoCard.classList.remove('show');
    }
}

/**
 * Add visual representation of donated item to donation box
 * @param {Object} item - The donated clothing item
 */
function addDonatedItemDisplay(item) {
    const donatedItemsContainer = document.getElementById('donatedItems');
    
    if (!donatedItemsContainer) return;
    
    const itemElement = document.createElement('div');
    itemElement.className = 'donated-item bounce';
    itemElement.textContent = `${item.emoji} ${item.name}`;
    donatedItemsContainer.appendChild(itemElement);
}

/**
 * Update the statistics display
 */
function updateDisplay() {
    const elements = {
        donatedCount: document.getElementById('donatedCount'),
        waterSaved: document.getElementById('waterSaved'),
        co2Saved: document.getElementById('co2Saved'),
        impactScore: document.getElementById('impactScore')
    };
    
    // Update each element if it exists
    if (elements.donatedCount) {
        elements.donatedCount.textContent = stats.donated;
    }
    if (elements.waterSaved) {
        elements.waterSaved.textContent = stats.waterSaved.toLocaleString() + 'L';
    }
    if (elements.co2Saved) {
        elements.co2Saved.textContent = stats.co2Saved + 'kg';
    }
    if (elements.impactScore) {
        elements.impactScore.textContent = stats.impactScore;
    }
}

/**
 * Show celebration message when item is donated
 * @param {Object} item - The donated item
 */
function showCelebration(item) {
    const celebration = document.getElementById('celebration');
    const message = document.getElementById('celebrationMessage');
    
    if (!celebration || !message) return;
    
    const messages = [
        `Great choice! You've saved ${item.water.toLocaleString()}L of water!`,
        `Amazing! That's ${item.co2}kg less CO2 in the atmosphere!`,
        `Fantastic! Someone will love wearing this ${item.name}!`,
        `Keep going! You're making a real difference!`
    ];
    
    // Show random celebration message
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    message.textContent = randomMessage;
    celebration.classList.add('show');
    
    // Hide celebration after 3 seconds
    setTimeout(() => {
        celebration.classList.remove('show');
    }, 3000);
}

/**
 * Get current application statistics
 * @returns {Object} Current stats object
 */
function getStats() {
    return { ...stats };
}

/**
 * Reset the application to initial state
 */
function resetApp() {
    stats = {
        donated: 0,
        waterSaved: 0,
        co2Saved: 0,
        impactScore: 0
    };
    
    donatedItems = [];
    
    // Clear donated items display
    const donatedItemsContainer = document.getElementById('donatedItems');
    if (donatedItemsContainer) {
        donatedItemsContainer.innerHTML = '';
    }
    
    // Repopulate closet
    const grid = document.getElementById('clothesGrid');
    if (grid) {
        grid.innerHTML = '';
        populateCloset();
        setupEventListeners();
    }
    
    updateDisplay();
    console.log('Application reset to initial state');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        getStats,
        resetApp,
        clothingItems,
        aiTips,
        pollutionFacts
    };
}