// Fit-Flomo - Complete Fitness Application
// All functionality and data management

// Global variables
let currentWater = 0;
let totalCalories = 0;
let workoutsCompleted = 0;
let dayStreak = 0;
let bestStreak = 0;
let totalWorkouts = 0;
let avgWorkoutTime = 0;
let workoutHistory = [];
let activityFeed = [];
let currentExerciseIndex = 0;
let currentSet = 1;
let exerciseProgress = 0;
let isResting = false;
let restTimeRemaining = 0;
let exerciseInterval = null;
let restInterval = null;
let currentWorkoutStartTime = null;
let scannedFoodItem = null; // Store the last scanned food for recipe linking

// Enhanced food database with more products (simulating millions of foods)
const foodDatabase = {
    // Real UPC barcodes with comprehensive product data
    '049000006343': {
        name: 'Coca-Cola Classic',
        calories: 140,
        protein: 0,
        carbs: 39,
        fat: 0,
        description: 'Classic Coca-Cola soft drink with original formula. Contains caffeine and natural flavors.',
        recipe: 'coca_cola_recipe'
    },
    '049000006344': {
        name: 'Diet Coke',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        description: 'Zero-calorie diet cola with aspartame sweetener. Same great taste without the calories.',
        recipe: 'diet_coke_recipe'
    },
    '049000006345': {
        name: 'Coca-Cola Zero Sugar',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        description: 'Zero-sugar cola with natural flavors and caffeine. Tastes like the original.',
        recipe: 'coke_zero_recipe'
    },
    '049000006346': {
        name: 'Sprite Lemon-Lime',
        calories: 140,
        protein: 0,
        carbs: 38,
        fat: 0,
        description: 'Clear lemon-lime flavored soft drink. Crisp, clean, and caffeine-free.',
        recipe: 'sprite_recipe'
    },
    '049000006347': {
        name: 'Fanta Orange',
        calories: 160,
        protein: 0,
        carbs: 44,
        fat: 0,
        description: 'Bright orange flavored soft drink with natural orange flavors.',
        recipe: 'fanta_recipe'
    },
    '049000006348': {
        name: 'Mountain Dew',
        calories: 170,
        protein: 0,
        carbs: 46,
        fat: 0,
        description: 'Citrus-flavored soft drink with high caffeine content and bold taste.',
        recipe: 'mountain_dew_recipe'
    },
    '049000006349': {
        name: 'Pepsi Cola',
        calories: 150,
        protein: 0,
        carbs: 41,
        fat: 0,
        description: 'Classic Pepsi cola with refreshing taste and moderate caffeine.',
        recipe: 'pepsi_recipe'
    },
    '049000006350': {
        name: 'Pepsi Zero Sugar',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        description: 'Zero-sugar Pepsi with the same great taste as the original.',
        recipe: 'pepsi_zero_recipe'
    },
    '049000006351': {
        name: 'Dr Pepper',
        calories: 150,
        protein: 0,
        carbs: 40,
        fat: 0,
        description: 'Unique blend of 23 flavors creating a distinctive taste experience.',
        recipe: 'dr_pepper_recipe'
    },
    '049000006352': {
        name: '7UP',
        calories: 140,
        protein: 0,
        carbs: 38,
        fat: 0,
        description: 'Clear, crisp lemon-lime soft drink with natural flavors.',
        recipe: '7up_recipe'
    },
    // Snack foods
    '028400000001': {
        name: 'Lay\'s Classic Potato Chips',
        calories: 160,
        protein: 2,
        carbs: 15,
        fat: 10,
        description: 'Thinly sliced potato chips fried to golden perfection with sea salt.',
        recipe: 'lays_chips_recipe'
    },
    '028400000002': {
        name: 'Doritos Nacho Cheese',
        calories: 140,
        protein: 2,
        carbs: 18,
        fat: 7,
        description: 'Tortilla chips with bold nacho cheese flavoring and crunchy texture.',
        recipe: 'doritos_recipe'
    },
    '028400000003': {
        name: 'Cheetos Crunchy',
        calories: 150,
        protein: 2,
        carbs: 13,
        fat: 10,
        description: 'Crunchy cheese-flavored corn puffs with bright orange color.',
        recipe: 'cheetos_recipe'
    },
    '028400000004': {
        name: 'Pringles Original',
        calories: 150,
        protein: 1,
        carbs: 15,
        fat: 9,
        description: 'Stackable potato crisps with uniform shape and salty flavor.',
        recipe: 'pringles_recipe'
    },
    '028400000005': {
        name: 'Ruffles Original',
        calories: 160,
        protein: 2,
        carbs: 15,
        fat: 10,
        description: 'Ridged potato chips with extra crunch and classic salty taste.',
        recipe: 'ruffles_recipe'
    },
    // Candy and chocolate
    '034000000001': {
        name: 'Snickers Bar',
        calories: 250,
        protein: 4,
        carbs: 33,
        fat: 12,
        description: 'Chocolate bar with nougat, caramel, and peanuts. Satisfies hunger.',
        recipe: 'snickers_recipe'
    },
    '034000000002': {
        name: 'M&M\'s Milk Chocolate',
        calories: 240,
        protein: 2,
        carbs: 32,
        fat: 10,
        description: 'Colorful candy-coated milk chocolate pieces in a variety of colors.',
        recipe: 'mms_recipe'
    },
    '034000000003': {
        name: 'Kit Kat Bar',
        calories: 210,
        protein: 3,
        carbs: 27,
        fat: 11,
        description: 'Crispy wafer fingers covered in smooth milk chocolate.',
        recipe: 'kitkat_recipe'
    },
    '034000000004': {
        name: 'Twix Bar',
        calories: 250,
        protein: 2,
        carbs: 34,
        fat: 12,
        description: 'Cookie topped with caramel and covered in milk chocolate.',
        recipe: 'twix_recipe'
    },
    '034000000005': {
        name: 'Reese\'s Peanut Butter Cups',
        calories: 220,
        protein: 5,
        carbs: 25,
        fat: 13,
        description: 'Peanut butter filling surrounded by milk chocolate.',
        recipe: 'reeses_recipe'
    },
    // Cereals
    '038000000001': {
        name: 'Cheerios Honey Nut',
        calories: 110,
        protein: 3,
        carbs: 22,
        fat: 1,
        description: 'Whole grain oat cereal with honey and almond flavor.',
        recipe: 'honey_nut_cheerios_recipe'
    },
    '038000000002': {
        name: 'Frosted Flakes',
        calories: 110,
        protein: 1,
        carbs: 26,
        fat: 0,
        description: 'Corn flakes with sweet frosting for a delicious breakfast.',
        recipe: 'frosted_flakes_recipe'
    },
    '038000000003': {
        name: 'Lucky Charms',
        calories: 110,
        protein: 2,
        carbs: 24,
        fat: 0,
        description: 'Oat cereal with colorful marshmallow shapes and sweet taste.',
        recipe: 'lucky_charms_recipe'
    },
    '038000000004': {
        name: 'Cinnamon Toast Crunch',
        calories: 130,
        protein: 2,
        carbs: 25,
        fat: 3,
        description: 'Cinnamon and sugar flavored squares with crunchy texture.',
        recipe: 'cinnamon_toast_crunch_recipe'
    },
    '038000000005': {
        name: 'Raisin Bran',
        calories: 190,
        protein: 8,
        carbs: 47,
        fat: 1,
        description: 'Whole grain wheat and bran flakes with sweet raisins.',
        recipe: 'raisin_bran_recipe'
    },
    // Dairy products
    '041000000001': {
        name: 'Chobani Greek Yogurt Strawberry',
        calories: 120,
        protein: 12,
        carbs: 16,
        fat: 0,
        description: 'Thick and creamy Greek yogurt with real strawberry pieces.',
        recipe: 'chobani_strawberry_recipe'
    },
    '041000000002': {
        name: 'Yoplait Original Strawberry',
        calories: 150,
        protein: 5,
        carbs: 27,
        fat: 1,
        description: 'Smooth and creamy yogurt with sweet strawberry flavor.',
        recipe: 'yoplait_strawberry_recipe'
    },
    '041000000003': {
        name: 'Dannon Activia Vanilla',
        calories: 120,
        protein: 5,
        carbs: 20,
        fat: 3,
        description: 'Probiotic yogurt with vanilla flavor and digestive benefits.',
        recipe: 'activia_vanilla_recipe'
    },
    '041000000004': {
        name: 'Fage Total 2% Greek Yogurt',
        calories: 130,
        protein: 20,
        carbs: 8,
        fat: 4,
        description: 'Thick and creamy Greek yogurt with high protein content.',
        recipe: 'fage_greek_recipe'
    },
    '041000000005': {
        name: 'Siggi\'s Icelandic Skyr Vanilla',
        calories: 110,
        protein: 15,
        carbs: 9,
        fat: 0,
        description: 'Traditional Icelandic skyr with vanilla flavor and high protein.',
        recipe: 'siggis_vanilla_recipe'
    },
    // Frozen foods
    '044000000001': {
        name: 'Hot Pockets Pepperoni Pizza',
        calories: 300,
        protein: 12,
        carbs: 36,
        fat: 12,
        description: 'Microwaveable pizza sandwich with pepperoni and cheese filling.',
        recipe: 'hot_pockets_pepperoni_recipe'
    },
    '044000000002': {
        name: 'Lean Cuisine Chicken Alfredo',
        calories: 250,
        protein: 18,
        carbs: 32,
        fat: 8,
        description: 'Frozen meal with grilled chicken, fettuccine, and alfredo sauce.',
        recipe: 'lean_cuisine_alfredo_recipe'
    },
    '044000000003': {
        name: 'Stouffer\'s Mac & Cheese',
        calories: 350,
        protein: 14,
        carbs: 45,
        fat: 12,
        description: 'Creamy macaroni and cheese with rich cheddar sauce.',
        recipe: 'stouffers_mac_recipe'
    },
    '044000000004': {
        name: 'Amy\'s Organic Black Bean Burrito',
        calories: 280,
        protein: 10,
        carbs: 45,
        fat: 8,
        description: 'Organic vegetarian burrito with black beans, rice, and vegetables.',
        recipe: 'amys_burrito_recipe'
    },
    '044000000005': {
        name: 'Evol Chicken Enchilada',
        calories: 320,
        protein: 16,
        carbs: 38,
        fat: 12,
        description: 'Frozen enchilada with chicken, cheese, and authentic Mexican flavors.',
        recipe: 'evol_enchilada_recipe'
    },
    // Beverages
    '050000000001': {
        name: 'Starbucks Frappuccino Vanilla',
        calories: 200,
        protein: 3,
        carbs: 35,
        fat: 3,
        description: 'Coffee drink with vanilla flavor, milk, and whipped cream.',
        recipe: 'starbucks_frappuccino_recipe'
    },
    '050000000002': {
        name: 'Monster Energy Drink',
        calories: 210,
        protein: 0,
        carbs: 54,
        fat: 0,
        description: 'High-caffeine energy drink with taurine and B-vitamins.',
        recipe: 'monster_energy_recipe'
    },
    '050000000003': {
        name: 'Red Bull Energy Drink',
        calories: 110,
        protein: 0,
        carbs: 28,
        fat: 0,
        description: 'Energy drink with caffeine, taurine, and B-vitamins.',
        recipe: 'red_bull_recipe'
    },
    '050000000004': {
        name: 'Gatorade Lemon-Lime',
        calories: 80,
        protein: 0,
        carbs: 21,
        fat: 0,
        description: 'Sports drink with electrolytes for hydration during exercise.',
        recipe: 'gatorade_recipe'
    },
    '050000000005': {
        name: 'Vitamin Water Power-C',
        calories: 120,
        protein: 0,
        carbs: 32,
        fat: 0,
        description: 'Enhanced water with vitamin C and natural flavors.',
        recipe: 'vitamin_water_recipe'
    }
};

// Mobile detection and initialization
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// Track initialization to prevent multiple calls
let isInitialized = false;
let touchEventsSetup = false;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return; // Prevent multiple initializations
    
    // Initialize the app
    initializeApp();
    isInitialized = true;
});

function initializeApp() {
    try {
        // Load saved data
        loadData();
        
        // Setup navigation
        setupNavigation();
        
        // Update display
        updateDisplay();
        
        // Setup touch events (simplified) - only once
        setupTouchEvents();
        
        // Check streak reset
        checkStreakReset();
        
        // Update activity feed
        updateActivityFeed();
        
        // Update workout history
        updateWorkoutHistory();
        
        // Show welcome message
        showToast('Welcome to Fit-Flomo! 🚀', 'success');
        
    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Error initializing app. Please refresh the page.', 'error');
    }
}

// Enhanced mobile touch event handling
function setupTouchEvents() {
    if (touchEventsSetup) return; // Prevent multiple setups
    
    // Add touch event listeners for better mobile interaction
    document.addEventListener('touchstart', function(e) {
        // Add touch feedback to buttons
        if (e.target.matches('button, .nav-btn, .action-btn, .workout-card, .meal-card, .exercise-btn, .recipe-btn, .scanner-btn, .stats-card, .water-btn, .progress-btn')) {
            e.target.style.transform = 'scale(0.98)';
        }
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        // Remove touch feedback
        if (e.target.matches('button, .nav-btn, .action-btn, .workout-card, .meal-card, .exercise-btn, .recipe-btn, .scanner-btn, .stats-card, .water-btn, .progress-btn')) {
            e.target.style.transform = '';
        }
    }, { passive: true });
    
    // Prevent double-tap zoom on buttons
    document.addEventListener('touchend', function(e) {
        if (e.target.matches('button, .nav-btn, .action-btn, .workout-card, .meal-card, .exercise-btn, .recipe-btn, .scanner-btn, .stats-card, .water-btn, .progress-btn')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    touchEventsSetup = true;
}

// Data Management
function saveData() {
    const data = {
        currentWater,
        totalCalories,
        workoutsCompleted,
        dayStreak,
        bestStreak,
        totalWorkouts,
        avgWorkoutTime,
        workoutHistory,
        activityFeed,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('fitFlomoData', JSON.stringify(data));
}

function loadData() {
    const savedData = localStorage.getItem('fitFlomoData');
    if (savedData) {
        const data = JSON.parse(savedData);
        currentWater = data.currentWater || 0;
        totalCalories = data.totalCalories || 0;
        workoutsCompleted = data.workoutsCompleted || 0;
        dayStreak = data.dayStreak || 0;
        bestStreak = data.bestStreak || 0;
        totalWorkouts = data.totalWorkouts || 0;
        avgWorkoutTime = data.avgWorkoutTime || 0;
        workoutHistory = data.workoutHistory || [];
        activityFeed = data.activityFeed || [];
    }
}

function updateDisplay() {
    // Update dashboard stats
    document.getElementById('water-display').textContent = currentWater;
    document.getElementById('calories-burned').textContent = totalCalories;
    document.getElementById('workouts-completed').textContent = workoutsCompleted;
    document.getElementById('day-streak').textContent = dayStreak;
    
    // Update water circle
    document.getElementById('water-amount').textContent = currentWater;
    const waterFill = document.getElementById('water-fill');
    const waterPercentage = Math.min((currentWater / 2000) * 100, 100);
    waterFill.style.height = waterPercentage + '%';
    
    // Update progress section
    document.getElementById('total-workouts').textContent = totalWorkouts;
    document.getElementById('total-calories').textContent = totalCalories;
    document.getElementById('avg-time').textContent = avgWorkoutTime + ' min';
    document.getElementById('best-streak').textContent = bestStreak + ' days';
    
    // Update activity feed
    updateActivityFeed();
    
    // Update workout history
    updateWorkoutHistory();
}

// Navigation
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Update active states
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Water Tracking
function addWater(amount) {
    currentWater += amount;
    saveData();
    updateDisplay();
    showToast(`Added ${amount}ml of water! 💧`, 'success');
    addActivity(`Added ${amount}ml of water`, 'water');
    
    // Check if daily goal reached
    if (currentWater >= 2000 && currentWater - amount < 2000) {
        showToast('Daily water goal reached! 🎉', 'success');
        addActivity('Daily water goal achieved!', 'achievement');
    }
}

// Workout System
const workoutData = {
    'full-body': {
        name: 'Full Body Workout',
        duration: '30-45 min',
        calories: 250,
        exercises: [
            { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s' },
            { name: 'Squats', sets: 3, reps: '15-20', rest: '60s' },
            { name: 'Plank', sets: 3, reps: '30-45s', rest: '45s' },
            { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s' },
            { name: 'Mountain Climbers', sets: 3, reps: '20-30', rest: '45s' },
            { name: 'Burpees', sets: 3, reps: '8-12', rest: '90s' }
        ]
    },
    'upper-body': {
        name: 'Upper Body Workout',
        duration: '25-35 min',
        calories: 200,
        exercises: [
            { name: 'Push-ups', sets: 4, reps: '12-15', rest: '60s' },
            { name: 'Diamond Push-ups', sets: 3, reps: '8-12', rest: '60s' },
            { name: 'Tricep Dips', sets: 3, reps: '12-15', rest: '60s' },
            { name: 'Plank Hold', sets: 3, reps: '45-60s', rest: '45s' },
            { name: 'Arm Circles', sets: 3, reps: '30 each direction', rest: '30s' }
        ]
    },
    'lower-body': {
        name: 'Lower Body Workout',
        duration: '25-35 min',
        calories: 200,
        exercises: [
            { name: 'Squats', sets: 4, reps: '15-20', rest: '60s' },
            { name: 'Lunges', sets: 3, reps: '12 each leg', rest: '60s' },
            { name: 'Calf Raises', sets: 3, reps: '20-25', rest: '45s' },
            { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '60s' },
            { name: 'Wall Sit', sets: 3, reps: '30-45s', rest: '60s' }
        ]
    },
    'cardio': {
        name: 'Cardio Workout',
        duration: '20-30 min',
        calories: 300,
        exercises: [
            { name: 'Jumping Jacks', sets: 3, reps: '30-45', rest: '30s' },
            { name: 'High Knees', sets: 3, reps: '30-45', rest: '30s' },
            { name: 'Burpees', sets: 3, reps: '10-15', rest: '60s' },
            { name: 'Mountain Climbers', sets: 3, reps: '30-45', rest: '30s' },
            { name: 'Jump Rope (simulated)', sets: 3, reps: '60-90s', rest: '30s' }
        ]
    },
    'strength': {
        name: 'Strength Training',
        duration: '40-50 min',
        calories: 280,
        exercises: [
            { name: 'Push-ups (Wide)', sets: 4, reps: '12-15', rest: '90s' },
            { name: 'Squats (Deep)', sets: 4, reps: '15-20', rest: '90s' },
            { name: 'Pull-ups (Assisted)', sets: 3, reps: '8-12', rest: '90s' },
            { name: 'Deadlifts (Bodyweight)', sets: 3, reps: '12-15', rest: '90s' },
            { name: 'Plank Variations', sets: 3, reps: '45-60s each', rest: '60s' },
            { name: 'Diamond Push-ups', sets: 3, reps: '8-12', rest: '90s' }
        ]
    },
    'hiit': {
        name: 'HIIT Training',
        duration: '25-35 min',
        calories: 350,
        exercises: [
            { name: 'Burpees', sets: 4, reps: '15-20', rest: '30s' },
            { name: 'Mountain Climbers', sets: 4, reps: '30-45', rest: '30s' },
            { name: 'Jump Squats', sets: 4, reps: '15-20', rest: '30s' },
            { name: 'High Knees', sets: 4, reps: '30-45', rest: '30s' },
            { name: 'Plank Jacks', sets: 4, reps: '20-30', rest: '30s' },
            { name: 'Jumping Jacks', sets: 4, reps: '30-45', rest: '30s' }
        ]
    },
    'yoga': {
        name: 'Yoga Flow',
        duration: '30-40 min',
        calories: 150,
        exercises: [
            { name: 'Sun Salutation A', sets: 3, reps: '5 rounds', rest: '30s' },
            { name: 'Warrior Poses', sets: 2, reps: '30s each side', rest: '30s' },
            { name: 'Tree Pose', sets: 2, reps: '45s each side', rest: '30s' },
            { name: 'Downward Dog', sets: 3, reps: '30-45s', rest: '30s' },
            { name: 'Child\'s Pose', sets: 2, reps: '60s', rest: '30s' },
            { name: 'Corpse Pose', sets: 1, reps: '5 min', rest: '0s' }
        ]
    },
    'core': {
        name: 'Core Crusher',
        duration: '20-25 min',
        calories: 180,
        exercises: [
            { name: 'Crunches', sets: 3, reps: '20-25', rest: '45s' },
            { name: 'Plank Hold', sets: 3, reps: '45-60s', rest: '45s' },
            { name: 'Russian Twists', sets: 3, reps: '20 each side', rest: '45s' },
            { name: 'Leg Raises', sets: 3, reps: '15-20', rest: '45s' },
            { name: 'Bicycle Crunches', sets: 3, reps: '20-25', rest: '45s' },
            { name: 'Side Plank', sets: 2, reps: '30s each side', rest: '45s' }
        ]
    },
    'pilates': {
        name: 'Pilates Power',
        duration: '25-30 min',
        calories: 160,
        exercises: [
            { name: 'Hundred', sets: 1, reps: '100 breaths', rest: '30s' },
            { name: 'Roll Up', sets: 3, reps: '8-10', rest: '30s' },
            { name: 'Single Leg Stretch', sets: 3, reps: '10 each side', rest: '30s' },
            { name: 'Double Leg Stretch', sets: 3, reps: '8-10', rest: '30s' },
            { name: 'Scissors', sets: 3, reps: '10 each side', rest: '30s' },
            { name: 'Teaser', sets: 2, reps: '5-8', rest: '45s' }
        ]
    },
    'dance': {
        name: 'Dance Cardio',
        duration: '30-40 min',
        calories: 320,
        exercises: [
            { name: 'Grapevine', sets: 3, reps: '30-45s', rest: '30s' },
            { name: 'Cha-Cha Steps', sets: 3, reps: '30-45s', rest: '30s' },
            { name: 'Hip Hop Moves', sets: 3, reps: '30-45s', rest: '30s' },
            { name: 'Zumba Steps', sets: 3, reps: '30-45s', rest: '30s' },
            { name: 'Freestyle Dance', sets: 3, reps: '45-60s', rest: '30s' },
            { name: 'Cool Down Moves', sets: 2, reps: '30s each', rest: '30s' }
        ]
    },
    'quick': {
        name: 'Quick Workout',
        duration: '15-20 min',
        calories: 150,
        exercises: [
            { name: 'Push-ups', sets: 2, reps: '10-12', rest: '45s' },
            { name: 'Squats', sets: 2, reps: '15-20', rest: '45s' },
            { name: 'Plank', sets: 2, reps: '30s', rest: '30s' },
            { name: 'Jumping Jacks', sets: 2, reps: '20-25', rest: '30s' },
            { name: 'Mountain Climbers', sets: 2, reps: '20-25', rest: '30s' }
        ]
    }
};

function startWorkout(type) {
    const workout = workoutData[type];
    if (!workout) return;
    
    document.getElementById('workout-title').textContent = workout.name;
    const exercisesContainer = document.getElementById('workout-exercises');
    exercisesContainer.innerHTML = '';
    
    // Reset workout state
    currentExerciseIndex = 0;
    currentSet = 1;
    exerciseProgress = 0;
    isResting = false;
    restTimeRemaining = 0;
    currentWorkoutStartTime = Date.now();
    
    // Add exercise progress display
    const progressDisplay = document.createElement('div');
    progressDisplay.id = 'exercise-progress';
    progressDisplay.className = 'exercise-progress';
    progressDisplay.innerHTML = `
        <div class="progress-container">
            <div class="current-exercise-info">
                <h3 id="current-exercise-name">Ready to start!</h3>
                <p id="current-exercise-details">Click Start Workout to begin</p>
            </div>
            <div class="exercise-progress-bar">
                <div class="progress-bar">
                    <div id="exercise-progress-fill" class="progress-fill"></div>
                </div>
                <div class="progress-info">
                    <span id="exercise-progress-text">0% Complete</span>
                    <div class="exercise-stats">
                        <span id="exercise-number">Exercise: 0/${workout.exercises.length}</span>
                        <span id="set-number">Set: 0/3</span>
                    </div>
                </div>
            </div>
            <div class="exercise-controls">
                <button id="start-exercise" class="exercise-btn" onclick="startExercise()">
                    <i class="fas fa-play"></i> Start Workout
                </button>
                <button id="pause-exercise" class="exercise-btn" onclick="pauseExercise()" style="display: none;">
                    <i class="fas fa-pause"></i> Pause
                </button>
                <button id="next-exercise" class="exercise-btn" onclick="nextExercise()" style="display: none;">
                    <i class="fas fa-forward"></i> Next Exercise
                </button>
                <button id="complete-workout" class="exercise-btn" onclick="completeWorkout()" style="display: none;">
                    <i class="fas fa-check"></i> Complete Workout
                </button>
            </div>
            <div class="progress-update-controls">
                <button class="progress-btn" onclick="updateProgress(25)" type="button">
                    <i class="fas fa-plus"></i> +25% Progress
                </button>
                <button class="progress-btn" onclick="updateProgress(50)" type="button">
                    <i class="fas fa-plus"></i> +50% Progress
                </button>
                <button class="progress-btn" onclick="updateProgress(100)" type="button">
                    <i class="fas fa-check"></i> Complete Set
                </button>
                <button class="progress-btn" onclick="startManualRest()" type="button">
                    <i class="fas fa-clock"></i> Start Rest
                </button>
            </div>
        </div>
    `;
    exercisesContainer.appendChild(progressDisplay);
    
    // Display all exercises
    workout.exercises.forEach((exercise, index) => {
        const exerciseElement = document.createElement('div');
        exerciseElement.className = 'exercise-item';
        exerciseElement.id = `exercise-${index}`;
        exerciseElement.innerHTML = `
            <div class="exercise-header">
                <span class="exercise-name">${index + 1}. ${exercise.name}</span>
                <div class="exercise-details">
                    <span>${exercise.sets} sets</span>
                    <span>${exercise.reps}</span>
                    <span>Rest: ${exercise.rest}</span>
                </div>
            </div>
            <div class="exercise-progress-indicator" id="exercise-indicator-${index}">
                <div class="exercise-status">Not started</div>
            </div>
        `;
        exercisesContainer.appendChild(exerciseElement);
    });
    
    // Store current workout data
    window.currentWorkout = { type, ...workout };
    
    openModal('workout-modal');
}

function startQuickWorkout() {
    startWorkout('quick');
}

function completeWorkout() {
    if (!window.currentWorkout) return;
    
    // Clear all intervals
    if (exerciseInterval) {
        clearInterval(exerciseInterval);
        exerciseInterval = null;
    }
    if (restInterval) {
        clearInterval(restInterval);
        restInterval = null;
    }
    
    const workout = window.currentWorkout;
    let workoutDuration = 0;
    
    if (currentWorkoutStartTime) {
        workoutDuration = Math.floor((Date.now() - currentWorkoutStartTime) / 1000 / 60); // in minutes
    }
    
    // Calculate calories burned (rough estimate)
    const caloriesBurned = Math.floor(workoutDuration * 8); // ~8 calories per minute for moderate exercise
    
    // Update stats
    totalCalories += caloriesBurned;
    workoutsCompleted++;
    totalWorkouts++;
    
    // Update average workout time
    if (avgWorkoutTime === 0) {
        avgWorkoutTime = workoutDuration;
    } else {
        avgWorkoutTime = Math.floor((avgWorkoutTime + workoutDuration) / 2);
    }
    
    // Add to workout history
    const workoutRecord = {
        type: workout.name,
        duration: workoutDuration,
        calories: caloriesBurned,
        date: new Date().toISOString(),
        exercises: workout.exercises.length
    };
    workoutHistory.unshift(workoutRecord);
    
    // Keep only last 10 workouts
    if (workoutHistory.length > 10) {
        workoutHistory = workoutHistory.slice(0, 10);
    }
    
    // Update streak
    const today = new Date().toDateString();
    const lastWorkoutDate = localStorage.getItem('lastWorkoutDate');
    
    if (lastWorkoutDate !== today) {
        if (lastWorkoutDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
            dayStreak++;
        } else if (lastWorkoutDate !== today) {
            dayStreak = 1;
        }
        
        if (dayStreak > bestStreak) {
            bestStreak = dayStreak;
        }
        
        localStorage.setItem('lastWorkoutDate', today);
    }
    
    // Save data
    saveData();
    updateDisplay();
    
    // Show completion message
    showToast(`Workout completed! 🎉 Burned ${caloriesBurned} calories`, 'success');
    addActivity(`Completed ${workout.name} workout - ${caloriesBurned} calories burned`, 'workout');
    
    // Close modal
    closeModal('workout-modal');
    
    // Reset workout state
    window.currentWorkout = null;
    currentExerciseIndex = 0;
    currentSet = 1;
    exerciseProgress = 0;
    isResting = false;
    restTimeRemaining = 0;
    currentWorkoutStartTime = null;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Stop barcode scanner if scanner modal is closed
        if (modalId === 'scanner-modal') {
            if (typeof Quagga !== 'undefined') {
                Quagga.stop();
            }
        }
        
        // Stop exercise timers if workout modal is closed
        if (modalId === 'workout-modal') {
            if (exerciseInterval) {
                clearInterval(exerciseInterval);
                exerciseInterval = null;
            }
            if (restInterval) {
                clearInterval(restInterval);
                restInterval = null;
            }
        }
    }
}

// AI Workout Generator
function generateAIWorkout() {
    const workoutTypes = ['full-body', 'upper-body', 'lower-body', 'cardio', 'strength', 'hiit', 'yoga', 'core', 'pilates', 'dance'];
    const randomType = workoutTypes[Math.floor(Math.random() * workoutTypes.length)];
    startWorkout(randomType);
    showToast('AI workout generated! 🤖', 'success');
    addActivity('Generated AI workout', 'workout');
}

// Meal Planning
const mealData = {
    breakfast: [
        { name: 'Oatmeal with Berries', calories: 250, protein: '8g', recipe: 'Berry Oatmeal Bowl' },
        { name: 'Greek Yogurt Parfait', calories: 200, protein: '15g', recipe: 'Greek Yogurt Parfait' },
        { name: 'Avocado Toast', calories: 300, protein: '12g', recipe: 'Avocado Toast' },
        { name: 'Smoothie Bowl', calories: 280, protein: '10g', recipe: 'Protein Smoothie Bowl' },
        { name: 'Eggs and Whole Grain Toast', calories: 320, protein: '18g', recipe: 'Scrambled Eggs with Herbs' },
        { name: 'Protein Pancakes', calories: 350, protein: '20g', recipe: 'Protein Pancakes' },
        { name: 'Chia Pudding', calories: 220, protein: '8g', recipe: 'Chia Pudding' },
        { name: 'Breakfast Burrito', calories: 380, protein: '22g', recipe: 'Breakfast Burrito' },
        { name: 'French Toast', calories: 300, protein: '12g', recipe: 'French Toast' },
        { name: 'Breakfast Sandwich', calories: 340, protein: '16g', recipe: 'Breakfast Sandwich' },
        { name: 'Granola with Milk', calories: 280, protein: '10g', recipe: 'Homemade Granola' },
        { name: 'Fruit and Nut Bowl', calories: 240, protein: '6g', recipe: 'Fruit and Nut Bowl' },
        { name: 'Scrambled Eggs with Spinach', calories: 260, protein: '20g', recipe: 'Spinach and Feta Omelette' },
        { name: 'Breakfast Quesadilla', calories: 320, protein: '18g', recipe: 'Breakfast Quesadilla' },
        { name: 'Protein Oatmeal', calories: 290, protein: '22g', recipe: 'Protein Oatmeal' }
    ],
    lunch: [
        { name: 'Grilled Chicken Salad', calories: 350, protein: '25g', recipe: 'Grilled Chicken Salad' },
        { name: 'Quinoa Bowl', calories: 400, protein: '15g', recipe: 'Quinoa Power Bowl' },
        { name: 'Turkey Wrap', calories: 380, protein: '20g', recipe: 'Turkey Wrap' },
        { name: 'Salmon with Vegetables', calories: 420, protein: '28g', recipe: 'Baked Salmon with Herbs' },
        { name: 'Lentil Soup', calories: 280, protein: '12g', recipe: 'Lentil Soup' },
        { name: 'Tuna Salad Sandwich', calories: 360, protein: '18g', recipe: 'Tuna Salad' },
        { name: 'Vegetable Stir Fry', calories: 320, protein: '10g', recipe: 'Vegetable Stir Fry' },
        { name: 'Chicken Caesar Wrap', calories: 390, protein: '24g', recipe: 'Chicken Caesar Wrap' },
        { name: 'Bean and Rice Bowl', calories: 380, protein: '14g', recipe: 'Bean and Rice Bowl' },
        { name: 'Greek Salad', calories: 280, protein: '8g', recipe: 'Greek Salad' },
        { name: 'Tofu Buddha Bowl', calories: 340, protein: '16g', recipe: 'Tofu Buddha Bowl' },
        { name: 'Chicken Noodle Soup', calories: 300, protein: '20g', recipe: 'Chicken Noodle Soup' },
        { name: 'Veggie Burger', calories: 350, protein: '12g', recipe: 'Veggie Burger' },
        { name: 'Shrimp and Avocado Salad', calories: 320, protein: '22g', recipe: 'Shrimp and Avocado Salad' },
        { name: 'Mediterranean Pasta', calories: 380, protein: '14g', recipe: 'Mediterranean Pasta' },
        { name: 'Chicken and Rice', calories: 420, protein: '26g', recipe: 'Chicken and Rice' },
        { name: 'Vegetable Curry', calories: 340, protein: '10g', recipe: 'Vegetable Curry' },
        { name: 'Tuna Poke Bowl', calories: 360, protein: '24g', recipe: 'Tuna Poke Bowl' },
        { name: 'Chicken Fajitas', calories: 380, protein: '28g', recipe: 'Chicken Fajitas' }
    ],
    dinner: [
        { name: 'Grilled Fish with Rice', calories: 450, protein: '30g', recipe: 'Baked Salmon with Herbs' },
        { name: 'Lean Beef Stir Fry', calories: 480, protein: '35g', recipe: 'Beef Stir Fry' },
        { name: 'Vegetarian Pasta', calories: 380, protein: '12g', recipe: 'Vegetarian Pasta' },
        { name: 'Chicken Breast with Sweet Potato', calories: 420, protein: '32g', recipe: 'Chicken with Sweet Potato' },
        { name: 'Tofu Curry', calories: 350, protein: '18g', recipe: 'Tofu Curry' },
        { name: 'Salmon with Quinoa', calories: 460, protein: '32g', recipe: 'Salmon with Quinoa' },
        { name: 'Beef Tacos', calories: 420, protein: '28g', recipe: 'Beef Tacos' },
        { name: 'Chicken Stir Fry', calories: 400, protein: '30g', recipe: 'Chicken Stir Fry' },
        { name: 'Vegetable Lasagna', calories: 380, protein: '16g', recipe: 'Vegetable Lasagna' },
        { name: 'Pork Chops with Vegetables', calories: 440, protein: '34g', recipe: 'Pork Chops' },
        { name: 'Shrimp Scampi', calories: 420, protein: '26g', recipe: 'Shrimp Scampi' },
        { name: 'Lentil Curry', calories: 360, protein: '18g', recipe: 'Lentil Curry' },
        { name: 'Chicken Enchiladas', calories: 450, protein: '32g', recipe: 'Chicken Enchiladas' },
        { name: 'Beef and Broccoli', calories: 460, protein: '36g', recipe: 'Beef and Broccoli' },
        { name: 'Vegetable Soup', calories: 280, protein: '8g', recipe: 'Vegetable Soup' },
        { name: 'Fish Tacos', calories: 380, protein: '24g', recipe: 'Fish Tacos' },
        { name: 'Chicken Alfredo', calories: 480, protein: '28g', recipe: 'Chicken Alfredo' },
        { name: 'Beef Chili', calories: 420, protein: '32g', recipe: 'Beef Chili' },
        { name: 'Vegetable Risotto', calories: 380, protein: '12g', recipe: 'Vegetable Risotto' },
        { name: 'Lamb Kebabs', calories: 440, protein: '30g', recipe: 'Lamb Kebabs' },
        { name: 'Chicken Teriyaki', calories: 420, protein: '30g', recipe: 'Chicken Teriyaki' }
    ],
    snacks: [
        { name: 'Almonds', calories: 160, protein: '6g', recipe: 'Almond Energy Balls' },
        { name: 'Apple with Peanut Butter', calories: 200, protein: '4g', recipe: 'Apple with Peanut Butter' },
        { name: 'Protein Shake', calories: 180, protein: '20g', recipe: 'Protein Shake' },
        { name: 'Hummus with Carrots', calories: 120, protein: '4g', recipe: 'Hummus with Carrots' },
        { name: 'Greek Yogurt', calories: 100, protein: '15g', recipe: 'Greek Yogurt Parfait' },
        { name: 'Trail Mix', calories: 180, protein: '6g', recipe: 'Trail Mix' },
        { name: 'Celery with Peanut Butter', calories: 140, protein: '4g', recipe: 'Celery with Peanut Butter' },
        { name: 'Protein Bar', calories: 200, protein: '20g', recipe: 'Homemade Protein Bar' },
        { name: 'Cottage Cheese with Fruit', calories: 160, protein: '16g', recipe: 'Cottage Cheese with Fruit' },
        { name: 'Rice Cakes with Avocado', calories: 120, protein: '3g', recipe: 'Rice Cakes with Avocado' },
        { name: 'Hard Boiled Eggs', calories: 140, protein: '12g', recipe: 'Hard Boiled Eggs' },
        { name: 'Edamame', calories: 120, protein: '11g', recipe: 'Edamame' },
        { name: 'Banana with Almond Butter', calories: 220, protein: '6g', recipe: 'Banana with Almond Butter' },
        { name: 'Tuna on Crackers', calories: 160, protein: '12g', recipe: 'Tuna on Crackers' },
        { name: 'Smoothie', calories: 180, protein: '8g', recipe: 'Berry Smoothie' },
        { name: 'Popcorn', calories: 100, protein: '3g', recipe: 'Air Popped Popcorn' },
        { name: 'Dark Chocolate', calories: 150, protein: '2g', recipe: 'Dark Chocolate' },
        { name: 'Cheese and Crackers', calories: 180, protein: '8g', recipe: 'Cheese and Crackers' },
        { name: 'Fruit Salad', calories: 120, protein: '2g', recipe: 'Fruit Salad' },
        { name: 'Nuts and Seeds Mix', calories: 200, protein: '8g', recipe: 'Nuts and Seeds Mix' },
        { name: 'Protein Cookies', calories: 160, protein: '12g', recipe: 'Protein Cookies' }
    ]
};

function generateMealPlan() {
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = '';
    
    Object.keys(mealData).forEach(mealType => {
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        
        const randomMeal = mealData[mealType][Math.floor(Math.random() * mealData[mealType].length)];
        
        mealCard.innerHTML = `
            <h4>${mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h4>
            <div class="meal-item">
                <div class="meal-info">
                    <span class="meal-name">${randomMeal.name}</span>
                    <span class="meal-calories">${randomMeal.calories} calories</span>
                </div>
                <div class="meal-actions">
                    <span class="meal-protein">${randomMeal.protein} protein</span>
                    <button class="recipe-btn" onclick="showRecipeForMeal('${randomMeal.recipe}')" type="button">
                        <i class="fas fa-utensils"></i>
                        Recipe
                    </button>
                </div>
            </div>
        `;
        
        mealPlanContainer.appendChild(mealCard);
    });
    
    showToast('Meal plan generated! 🍽️', 'success');
    addActivity('Generated new meal plan', 'nutrition');
}

function showRecipeForMeal(recipeName) {
    const recipes = getRecipeForFood(recipeName);
    
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = `
        <div class="recipe-result">
            <h3>${recipeName}</h3>
            <div class="recipe-content">
                <h4>Ingredients:</h4>
                <ul>
                    ${recipes.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <h4>Instructions:</h4>
                <p>${recipes.instructions}</p>
            </div>
            <button class="meal-btn" onclick="generateMealPlan()">
                <i class="fas fa-arrow-left"></i>
                Back to Meal Plan
            </button>
        </div>
    `;
    
    showToast(`Recipe for ${recipeName} loaded! 📖`, 'success');
    addActivity(`Viewed recipe for ${recipeName}`, 'nutrition');
}

// Fitness Quiz
const quizQuestions = [
    {
        question: "What's your primary fitness goal?",
        options: [
            "Build muscle and strength",
            "Lose weight and tone up",
            "Improve cardiovascular fitness",
            "Maintain general health"
        ]
    },
    {
        question: "How often do you want to work out?",
        options: [
            "3-4 times per week",
            "5-6 times per week",
            "1-2 times per week",
            "Every day"
        ]
    },
    {
        question: "What equipment do you have access to?",
        options: [
            "No equipment (bodyweight only)",
            "Basic home equipment",
            "Full gym access",
            "Outdoor spaces"
        ]
    }
];

let quizAnswers = [];

function startFitnessQuiz() {
    quizAnswers = [];
    showQuizQuestion(0);
    openModal('quiz-modal');
}

function showQuizQuestion(questionIndex) {
    if (questionIndex >= quizQuestions.length) {
        showQuizResults();
        return;
    }
    
    const quizContent = document.getElementById('quiz-content');
    const question = quizQuestions[questionIndex];
    
    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>Question ${questionIndex + 1}: ${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" onclick="selectQuizOption(${questionIndex}, ${index})">
                        ${option}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function selectQuizOption(questionIndex, optionIndex) {
    quizAnswers[questionIndex] = optionIndex;
    
    // Add visual feedback
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    // Move to next question after delay
    setTimeout(() => {
        showQuizQuestion(questionIndex + 1);
    }, 1000);
}

function showQuizResults() {
    const quizContent = document.getElementById('quiz-content');
    
    const recommendations = generateQuizRecommendations();
    
    quizContent.innerHTML = `
        <div class="quiz-results">
            <h3>Your Personalized Fitness Plan</h3>
            <div class="quiz-recommendations">
                <h4>Based on your answers, we recommend:</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
                <button class="workout-btn" onclick="closeModal('quiz-modal')">
                    Start My Journey
                </button>
            </div>
        </div>
    `;
    
    addActivity('Completed fitness assessment', 'quiz');
}

function generateQuizRecommendations() {
    const recommendations = [
        "Focus on compound exercises for maximum efficiency",
        "Aim for 3-4 workouts per week for optimal results",
        "Include both strength training and cardio",
        "Track your progress to stay motivated",
        "Stay hydrated and maintain a balanced diet"
    ];
    
    // Customize based on answers
    if (quizAnswers[0] === 0) { // Build muscle
        recommendations.push("Prioritize progressive overload in your workouts");
        recommendations.push("Ensure adequate protein intake (1.6-2.2g per kg body weight)");
    } else if (quizAnswers[0] === 1) { // Lose weight
        recommendations.push("Create a moderate calorie deficit (300-500 calories)");
        recommendations.push("Include high-intensity interval training (HIIT)");
    }
    
    return recommendations;
}

// Real Food Scanner with Camera
let videoStream = null;
let videoElement = null;

function openFoodScanner() {
    openModal('scanner-modal');
    
    // Show coming soon message instead of scanner
    const scannerContainer = document.getElementById('scanner-container');
    scannerContainer.innerHTML = `
        <div class="coming-soon-container">
            <div class="coming-soon-icon">
                <i class="fas fa-barcode"></i>
            </div>
            <h2>Barcode Scanner</h2>
            <h3>Coming Soon!</h3>
            <p>We're working on an advanced barcode scanner that will recognize millions of food products instantly, just like Yuka!</p>
            <div class="coming-soon-features">
                <div class="feature">
                    <i class="fas fa-bolt"></i>
                    <span>Instant Recognition</span>
                </div>
                <div class="feature">
                    <i class="fas fa-database"></i>
                    <span>Millions of Products</span>
                </div>
                <div class="feature">
                    <i class="fas fa-mobile-alt"></i>
                    <span>Mobile Optimized</span>
                </div>
            </div>
            <button class="scanner-btn" onclick="closeModal('scanner-modal')">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;
}

// Automatic barcode scanner (like Yuka)
function initializeBarcodeScanner() {
    const scannerContainer = document.getElementById('scanner-container');
    scannerContainer.innerHTML = `
        <div class="scanner-viewport">
            <div id="interactive" class="viewport"></div>
            <div class="scanner-overlay">
                <div class="scanner-line"></div>
                <div class="scanner-instructions">
                    <p><i class="fas fa-camera"></i> Point camera at any barcode</p>
                    <p class="scanner-status">Scanning automatically...</p>
                </div>
            </div>
        </div>
        <div class="scanner-controls">
            <button class="scanner-btn" onclick="stopBarcodeScanner()">
                <i class="fas fa-stop"></i> Stop Scanner
            </button>
        </div>
    `;

    // Initialize Quagga with automatic scanning
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: "#interactive",
            constraints: {
                width: { min: 640 },
                height: { min: 480 },
                facingMode: "environment", // Use back camera
                aspectRatio: { min: 1, max: 2 }
            },
        },
        locator: {
            patchSize: "medium",
            halfSample: true
        },
        numOfWorkers: 4,
        frequency: 10, // Scan every 100ms for faster detection
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ]
        },
        locate: true
    }, function(err) {
        if (err) {
            console.error("Scanner initialization failed:", err);
            scannerContainer.innerHTML = `
                <div class="scanner-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Scanner Error</h3>
                    <p>Unable to access camera. Please check permissions.</p>
                    <button class="scanner-btn" onclick="initializeBarcodeScanner()">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            `;
            return;
        }
        
        // Start automatic scanning
        Quagga.start();
        showToast('Scanner started - point at any barcode!', 'success');
    });

    // Listen for barcode detection
    Quagga.onDetected(function(result) {
        const barcode = result.codeResult.code;
        console.log("Barcode detected:", barcode);
        
        // Stop scanning immediately when barcode is found
        Quagga.stop();
        
        // Look up product in database
        const product = foodDatabase[barcode];
        
        if (product) {
            // Product found - show immediately
            showScannedProduct(product);
            showToast(`Found: ${product.name}`, 'success');
        } else {
            // Product not found - show unknown product
            showUnknownProduct(barcode);
            showToast('Product not in database', 'info');
        }
    });

    // Add continuous scanning feedback
    Quagga.onProcessed(function(result) {
        const drawingCanvas = Quagga.canvas.dom.overlay;
        const drawingCtx = drawingCanvas.getContext('2d');
        
        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
                });
            }

            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "blue", lineWidth: 2 });
            }

            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
            }
        }
    });
}

function stopBarcodeScanner() {
    Quagga.stop();
    showToast('Scanner stopped!', 'info');
}

function showScannedProduct(product) {
    const scannerContent = document.querySelector('.scanner-placeholder');
    scannerContent.innerHTML = `
        <div class="scanned-product-result">
            <i class="fas fa-check-circle"></i>
            <h3>${product.name}</h3>
            <div class="nutrition-info">
                <p><strong>Calories:</strong> ${product.calories}</p>
                <p><strong>Protein:</strong> ${product.protein}</p>
                <p><strong>Carbs:</strong> ${product.carbs}</p>
                <p><strong>Fat:</strong> ${product.fat}</p>
            </div>
            <div class="product-actions">
                <button class="scanner-btn" onclick="showRecipeForScannedProduct()">
                    <i class="fas fa-utensils"></i>
                    View Recipe
                </button>
                <button class="scanner-btn" onclick="closeModal('scanner-modal')">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
    
    showToast(`Scanned: ${product.name}`, 'success');
    addActivity(`Scanned product: ${product.name}`, 'scanner');
}

function showRecipeForScannedProduct() {
    if (!scannedFoodItem) {
        showToast('No product scanned yet!', 'warning');
        return;
    }
    
    const recipeName = scannedFoodItem.recipe;
    const recipes = getRecipeForFood(recipeName);
    
    const scannerContent = document.querySelector('.scanner-placeholder');
    scannerContent.innerHTML = `
        <div class="recipe-result">
            <h3>${recipeName}</h3>
            <div class="recipe-content">
                <h4>Ingredients:</h4>
                <ul>
                    ${recipes.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <h4>Instructions:</h4>
                <p>${recipes.instructions}</p>
            </div>
            <button class="scanner-btn" onclick="closeModal('scanner-modal')">
                <i class="fas fa-times"></i>
                Close
            </button>
        </div>
    `;
    
    showToast(`Recipe for ${scannedFoodItem.name} loaded! 📖`, 'success');
    addActivity(`Viewed recipe for ${scannedFoodItem.name}`, 'nutrition');
}

function getRecipeForFood(foodName) {
    const recipeDatabase = {
        // Food database recipe mappings
        'coca_cola_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add caramel color, phosphoric acid, natural flavors, and caffeine. Bottle and serve chilled.'
        },
        'diet_coke_recipe': {
            ingredients: ['Carbonated water', 'Aspartame', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with aspartame sweetener, add caramel color, phosphoric acid, natural flavors, and caffeine. Bottle and serve chilled.'
        },
        'coke_zero_recipe': {
            ingredients: ['Carbonated water', 'Aspartame', 'Acesulfame potassium', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with aspartame and acesulfame potassium, add caramel color, phosphoric acid, natural flavors, and caffeine. Bottle and serve chilled.'
        },
        'sprite_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Citric acid', 'Natural lemon and lime flavors', 'Sodium citrate', 'Sodium benzoate'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add citric acid, natural lemon and lime flavors, sodium citrate, and sodium benzoate. Bottle and serve chilled.'
        },
        'fanta_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Citric acid', 'Natural orange flavors', 'Sodium benzoate', 'Yellow 6', 'Red 40'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add citric acid, natural orange flavors, sodium benzoate, and food coloring. Bottle and serve chilled.'
        },
        'mountain_dew_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Citric acid', 'Natural flavors', 'Sodium benzoate', 'Caffeine', 'Yellow 5'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add citric acid, natural flavors, sodium benzoate, caffeine, and food coloring. Bottle and serve chilled.'
        },
        'pepsi_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add caramel color, phosphoric acid, natural flavors, and caffeine. Bottle and serve chilled.'
        },
        'pepsi_zero_recipe': {
            ingredients: ['Carbonated water', 'Aspartame', 'Acesulfame potassium', 'Caramel color', 'Phosphoric acid', 'Natural flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with aspartame and acesulfame potassium, add caramel color, phosphoric acid, natural flavors, and caffeine. Bottle and serve chilled.'
        },
        'dr_pepper_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Caramel color', 'Phosphoric acid', 'Natural and artificial flavors', 'Caffeine'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add caramel color, phosphoric acid, natural and artificial flavors, and caffeine. Bottle and serve chilled.'
        },
        '7up_recipe': {
            ingredients: ['Carbonated water', 'High fructose corn syrup', 'Citric acid', 'Natural lemon and lime flavors', 'Sodium citrate', 'Sodium benzoate'],
            instructions: 'Mix carbonated water with high fructose corn syrup, add citric acid, natural lemon and lime flavors, sodium citrate, and sodium benzoate. Bottle and serve chilled.'
        },
        'lays_chips_recipe': {
            ingredients: ['Potatoes', 'Vegetable oil', 'Sea salt'],
            instructions: 'Slice potatoes thinly, fry in vegetable oil until golden and crispy, season with sea salt.'
        },
        'doritos_recipe': {
            ingredients: ['Corn masa flour', 'Vegetable oil', 'Nacho cheese seasoning', 'Salt', 'Spices'],
            instructions: 'Form corn masa into triangles, fry in vegetable oil, coat with nacho cheese seasoning, salt, and spices.'
        },
        'cheetos_recipe': {
            ingredients: ['Corn meal', 'Vegetable oil', 'Cheese powder', 'Salt', 'Spices'],
            instructions: 'Extrude corn meal into puffs, fry in vegetable oil, coat with cheese powder, salt, and spices.'
        },
        'pringles_recipe': {
            ingredients: ['Dried potatoes', 'Vegetable oil', 'Rice flour', 'Wheat starch', 'Salt'],
            instructions: 'Mix dried potatoes with rice flour and wheat starch, form into uniform shapes, fry in vegetable oil, season with salt.'
        },
        'ruffles_recipe': {
            ingredients: ['Potatoes', 'Vegetable oil', 'Sea salt'],
            instructions: 'Slice potatoes with ridges, fry in vegetable oil until golden and crispy, season with sea salt.'
        },
        'snickers_recipe': {
            ingredients: ['Milk chocolate', 'Caramel', 'Nougat', 'Peanuts'],
            instructions: 'Layer nougat, caramel, and peanuts, enrobe in milk chocolate, chill until set.'
        },
        'mms_recipe': {
            ingredients: ['Milk chocolate', 'Sugar', 'Cornstarch', 'Food coloring', 'Gum arabic'],
            instructions: 'Form milk chocolate into small pieces, coat with colored sugar shell using cornstarch and gum arabic.'
        },
        'kitkat_recipe': {
            ingredients: ['Milk chocolate', 'Wafer cookies', 'Sugar', 'Flour'],
            instructions: 'Layer wafer cookies, enrobe in milk chocolate, chill until set, break into fingers.'
        },
        'twix_recipe': {
            ingredients: ['Milk chocolate', 'Caramel', 'Shortbread cookie'],
            instructions: 'Top shortbread cookie with caramel, enrobe in milk chocolate, chill until set.'
        },
        'reeses_recipe': {
            ingredients: ['Milk chocolate', 'Peanut butter', 'Sugar', 'Salt'],
            instructions: 'Form peanut butter into cups, enrobe in milk chocolate, chill until set.'
        },
        'honey_nut_cheerios_recipe': {
            ingredients: ['Whole grain oats', 'Honey', 'Almond flavor', 'Sugar', 'Salt'],
            instructions: 'Mix whole grain oats with honey, almond flavor, sugar, and salt. Form into rings and bake until crispy.'
        },
        'frosted_flakes_recipe': {
            ingredients: ['Corn flakes', 'Sugar', 'Malt flavor', 'Salt'],
            instructions: 'Form corn into flakes, bake until crispy, coat with sugar, malt flavor, and salt.'
        },
        'lucky_charms_recipe': {
            ingredients: ['Oats', 'Sugar', 'Marshmallows', 'Food coloring', 'Natural flavors'],
            instructions: 'Mix oats with sugar, add colorful marshmallows in various shapes, bake until crispy.'
        },
        'cinnamon_toast_crunch_recipe': {
            ingredients: ['Wheat flour', 'Sugar', 'Cinnamon', 'Brown sugar', 'Salt'],
            instructions: 'Mix wheat flour with sugar, cinnamon, brown sugar, and salt. Form into squares and bake until crispy.'
        },
        'raisin_bran_recipe': {
            ingredients: ['Wheat bran', 'Raisins', 'Sugar', 'Salt', 'Molasses'],
            instructions: 'Mix wheat bran with raisins, sugar, salt, and molasses. Form into flakes and bake until crispy.'
        },
        'chobani_strawberry_recipe': {
            ingredients: ['Greek yogurt', 'Strawberries', 'Sugar', 'Pectin', 'Natural flavors'],
            instructions: 'Mix Greek yogurt with fresh strawberries, sugar, pectin, and natural flavors. Chill until set.'
        },
        'yoplait_strawberry_recipe': {
            ingredients: ['Cultured milk', 'Strawberries', 'Sugar', 'Modified corn starch', 'Natural flavors'],
            instructions: 'Mix cultured milk with strawberries, sugar, modified corn starch, and natural flavors. Chill until set.'
        },
        'activia_vanilla_recipe': {
            ingredients: ['Cultured milk', 'Vanilla extract', 'Sugar', 'Probiotic cultures', 'Pectin'],
            instructions: 'Mix cultured milk with vanilla extract, sugar, probiotic cultures, and pectin. Chill until set.'
        },
        'fage_greek_recipe': {
            ingredients: ['Cultured milk', 'Live active cultures', 'Salt'],
            instructions: 'Strain cultured milk to remove whey, add live active cultures and salt. Chill until thick and creamy.'
        },
        'siggis_vanilla_recipe': {
            ingredients: ['Skim milk', 'Vanilla extract', 'Live active cultures', 'Sugar', 'Pectin'],
            instructions: 'Mix skim milk with vanilla extract, live active cultures, sugar, and pectin. Chill until thick and creamy.'
        },
        'hot_pockets_pepperoni_recipe': {
            ingredients: ['Pizza dough', 'Pepperoni', 'Mozzarella cheese', 'Pizza sauce', 'Spices'],
            instructions: 'Fill pizza dough with pepperoni, mozzarella cheese, pizza sauce, and spices. Seal and bake until golden.'
        },
        'lean_cuisine_alfredo_recipe': {
            ingredients: ['Fettuccine pasta', 'Grilled chicken', 'Alfredo sauce', 'Parmesan cheese', 'Herbs'],
            instructions: 'Cook fettuccine pasta, add grilled chicken, alfredo sauce, parmesan cheese, and herbs. Heat until warm.'
        },
        'stouffers_mac_recipe': {
            ingredients: ['Macaroni pasta', 'Cheddar cheese', 'Milk', 'Butter', 'Breadcrumbs'],
            instructions: 'Cook macaroni pasta, mix with cheddar cheese sauce, top with breadcrumbs, and bake until bubbly.'
        },
        'amys_burrito_recipe': {
            ingredients: ['Black beans', 'Brown rice', 'Vegetables', 'Tortilla', 'Spices'],
            instructions: 'Fill tortilla with black beans, brown rice, vegetables, and spices. Roll up and heat until warm.'
        },
        'evol_enchilada_recipe': {
            ingredients: ['Chicken', 'Corn tortillas', 'Enchilada sauce', 'Cheese', 'Spices'],
            instructions: 'Fill corn tortillas with chicken, cheese, and spices. Top with enchilada sauce and bake until bubbly.'
        },
        'starbucks_frappuccino_recipe': {
            ingredients: ['Coffee', 'Milk', 'Sugar', 'Vanilla syrup', 'Whipped cream'],
            instructions: 'Blend coffee with milk, sugar, and vanilla syrup. Top with whipped cream and serve chilled.'
        },
        'monster_energy_recipe': {
            ingredients: ['Carbonated water', 'Taurine', 'Caffeine', 'B-vitamins', 'Sugar', 'Natural flavors'],
            instructions: 'Mix carbonated water with taurine, caffeine, B-vitamins, sugar, and natural flavors. Bottle and serve chilled.'
        },
        'red_bull_recipe': {
            ingredients: ['Carbonated water', 'Taurine', 'Caffeine', 'B-vitamins', 'Sugar', 'Natural flavors'],
            instructions: 'Mix carbonated water with taurine, caffeine, B-vitamins, sugar, and natural flavors. Bottle and serve chilled.'
        },
        'gatorade_recipe': {
            ingredients: ['Water', 'Sugar', 'Electrolytes', 'Natural flavors', 'Food coloring'],
            instructions: 'Mix water with sugar, electrolytes, natural flavors, and food coloring. Bottle and serve chilled.'
        },
        'vitamin_water_recipe': {
            ingredients: ['Water', 'Sugar', 'Vitamin C', 'Natural flavors', 'Food coloring'],
            instructions: 'Mix water with sugar, vitamin C, natural flavors, and food coloring. Bottle and serve chilled.'
        },
        // Original recipe database
        'Banana Smoothie Bowl': {
            ingredients: ['1 ripe banana', '1 cup frozen berries', '1/2 cup almond milk', '1 tbsp honey', '1 tbsp chia seeds'],
            instructions: 'Blend banana, berries, and almond milk until smooth. Pour into a bowl and top with honey and chia seeds.'
        },
        'Grilled Chicken Salad': {
            ingredients: ['4 oz chicken breast', '2 cups mixed greens', '1/4 cup cherry tomatoes', '1/4 cucumber', '1 tbsp olive oil', '1 tbsp balsamic vinegar'],
            instructions: 'Grill chicken until cooked through. Toss with greens, tomatoes, cucumber, olive oil, and balsamic vinegar.'
        },
        'Greek Yogurt Parfait': {
            ingredients: ['1 cup Greek yogurt', '1/4 cup granola', '1/4 cup mixed berries', '1 tbsp honey'],
            instructions: 'Layer Greek yogurt, granola, and berries in a glass. Drizzle with honey and serve.'
        },
        'Almond Energy Balls': {
            ingredients: ['1 cup almonds', '1/2 cup dates', '2 tbsp honey', '1 tbsp chia seeds', '1 tsp vanilla extract'],
            instructions: 'Process almonds in food processor until finely chopped. Add dates, honey, chia seeds, and vanilla. Roll into balls and refrigerate.'
        },
        'Baked Salmon with Herbs': {
            ingredients: ['4 oz salmon fillet', '1 tbsp olive oil', '1 tsp dried herbs', '1/2 lemon', 'salt and pepper to taste'],
            instructions: 'Preheat oven to 400°F. Place salmon on baking sheet, drizzle with olive oil, sprinkle herbs, salt, and pepper. Bake for 12-15 minutes.'
        },
        'Apple Cinnamon Oatmeal': {
            ingredients: ['1/2 cup oats', '1 cup water', '1 apple, diced', '1 tsp cinnamon', '1 tbsp honey'],
            instructions: 'Cook oats with water. Stir in diced apple, cinnamon, and honey. Cook until apples are tender.'
        },
        'Spinach and Feta Omelette': {
            ingredients: ['2 eggs', '1 cup fresh spinach', '1/4 cup feta cheese', '1 tbsp olive oil', 'salt and pepper to taste'],
            instructions: 'Whisk eggs in a bowl. Heat olive oil in pan, add spinach until wilted. Pour in eggs, add feta, fold and cook until set.'
        },
        'Quinoa Power Bowl': {
            ingredients: ['1/2 cup quinoa', '1/2 cup black beans', '1/4 avocado', '1 tbsp lime juice', '1 tbsp olive oil', 'salt to taste'],
            instructions: 'Cook quinoa according to package. Mix with beans, avocado, lime juice, olive oil, and salt.'
        },
        'Avocado Toast': {
            ingredients: ['2 slices whole grain bread', '1 ripe avocado', '1/4 tsp salt', '1/4 tsp pepper', 'red pepper flakes to taste'],
            instructions: 'Toast bread. Mash avocado with salt and pepper. Spread on toast and sprinkle with red pepper flakes.'
        },
        'Roasted Sweet Potato': {
            ingredients: ['1 sweet potato', '1 tbsp olive oil', '1 tsp cinnamon', '1/4 tsp salt'],
            instructions: 'Preheat oven to 400°F. Cut sweet potato into cubes, toss with olive oil, cinnamon, and salt. Roast for 25-30 minutes.'
        },
        'Berry Oatmeal Bowl': {
            ingredients: ['1/2 cup oats', '1 cup water', '1/2 cup mixed berries', '1 tbsp honey', '1 tbsp chopped nuts'],
            instructions: 'Cook oats with water. Top with fresh berries, honey, and chopped nuts.'
        },
        'Protein Smoothie Bowl': {
            ingredients: ['1 scoop protein powder', '1 cup frozen berries', '1/2 cup almond milk', '1 tbsp chia seeds', '1 tbsp granola'],
            instructions: 'Blend protein powder, berries, and almond milk. Pour into bowl and top with chia seeds and granola.'
        },
        'Protein Pancakes': {
            ingredients: ['1 cup oat flour', '1 scoop protein powder', '1 egg', '1/2 cup almond milk', '1 tsp baking powder', '1 tbsp honey'],
            instructions: 'Mix all ingredients. Cook on griddle until bubbles form, then flip and cook other side.'
        },
        'Chia Pudding': {
            ingredients: ['1/4 cup chia seeds', '1 cup almond milk', '1 tbsp honey', '1/2 tsp vanilla extract'],
            instructions: 'Mix all ingredients and refrigerate overnight. Top with fresh fruit before serving.'
        },
        'Breakfast Burrito': {
            ingredients: ['2 eggs', '1 whole wheat tortilla', '1/4 cup black beans', '1/4 cup cheese', '1 tbsp salsa'],
            instructions: 'Scramble eggs, warm tortilla, add beans and cheese, roll up and serve with salsa.'
        },
        'French Toast': {
            ingredients: ['2 slices whole grain bread', '1 egg', '1/4 cup milk', '1 tsp cinnamon', '1 tbsp maple syrup'],
            instructions: 'Whisk egg, milk, and cinnamon. Dip bread, cook on griddle until golden. Serve with maple syrup.'
        },
        'Breakfast Sandwich': {
            ingredients: ['1 whole grain English muffin', '1 egg', '1 slice cheese', '1 slice ham', '1 tbsp butter'],
            instructions: 'Toast muffin, cook egg, assemble sandwich with cheese and ham.'
        },
        'Homemade Granola': {
            ingredients: ['2 cups oats', '1/2 cup nuts', '1/4 cup honey', '2 tbsp olive oil', '1 tsp vanilla'],
            instructions: 'Mix ingredients, spread on baking sheet, bake at 350°F for 20-25 minutes until golden.'
        },
        'Fruit and Nut Bowl': {
            ingredients: ['1 cup mixed berries', '1/4 cup chopped nuts', '1 tbsp honey', '1 tbsp coconut flakes'],
            instructions: 'Combine all ingredients in a bowl and serve immediately.'
        },
        'Breakfast Quesadilla': {
            ingredients: ['2 whole wheat tortillas', '2 eggs', '1/4 cup cheese', '1/4 cup black beans', '1 tbsp salsa'],
            instructions: 'Scramble eggs, layer on tortilla with cheese and beans, top with second tortilla, cook until cheese melts.'
        },
        'Protein Oatmeal': {
            ingredients: ['1/2 cup oats', '1 scoop protein powder', '1 cup water', '1 tbsp peanut butter', '1 tbsp honey'],
            instructions: 'Cook oats with water, stir in protein powder, top with peanut butter and honey.'
        },
        'Turkey Wrap': {
            ingredients: ['1 whole wheat tortilla', '3 oz turkey breast', '1/4 cup mixed greens', '1 tbsp mustard', '1/4 avocado'],
            instructions: 'Spread mustard on tortilla, layer turkey, greens, and avocado, roll up tightly.'
        },
        'Tuna Salad': {
            ingredients: ['1 can tuna', '2 tbsp Greek yogurt', '1/4 cup diced celery', '1 tbsp mustard', 'salt and pepper'],
            instructions: 'Mix all ingredients in a bowl. Serve on bread or with crackers.'
        },
        'Vegetable Stir Fry': {
            ingredients: ['2 cups mixed vegetables', '1 tbsp olive oil', '2 tbsp soy sauce', '1 clove garlic', '1 tsp ginger'],
            instructions: 'Heat oil, add garlic and ginger, stir fry vegetables, add soy sauce and serve.'
        },
        'Chicken Caesar Wrap': {
            ingredients: ['1 whole wheat tortilla', '3 oz grilled chicken', '1/4 cup romaine lettuce', '2 tbsp Caesar dressing', '1 tbsp parmesan cheese'],
            instructions: 'Spread dressing on tortilla, layer chicken, lettuce, and parmesan, roll up tightly.'
        }
    };
    
    return recipeDatabase[foodName] || {
        ingredients: ['Recipe not available'],
        instructions: 'Recipe information is not available for this item.'
    };
}

// Recipes
function showRecipes() {
    const recipes = [
        {
            name: 'Protein Smoothie Bowl',
            ingredients: ['1 cup frozen berries', '1 scoop protein powder', '1/2 cup almond milk', '1 tbsp chia seeds'],
            instructions: 'Blend berries, protein powder, and almond milk. Top with chia seeds and fresh fruit.'
        },
        {
            name: 'Grilled Chicken Salad',
            ingredients: ['4 oz chicken breast', '2 cups mixed greens', '1/4 cup cherry tomatoes', '1 tbsp olive oil'],
            instructions: 'Grill chicken until cooked through. Toss with greens, tomatoes, and olive oil.'
        },
        {
            name: 'Quinoa Power Bowl',
            ingredients: ['1/2 cup quinoa', '1/2 cup black beans', '1/4 avocado', '1 tbsp lime juice'],
            instructions: 'Cook quinoa according to package. Mix with beans, avocado, and lime juice.'
        }
    ];
    
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = '';
    
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'meal-card';
        recipeCard.innerHTML = `
            <h4>${recipe.name}</h4>
            <div style="margin: 1rem 0;">
                <strong>Ingredients:</strong>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <strong>Instructions:</strong>
                <p style="margin: 0.5rem 0;">${recipe.instructions}</p>
            </div>
        `;
        mealPlanContainer.appendChild(recipeCard);
    });
    
    showToast('Recipes loaded! 📖', 'success');
    addActivity('Viewed healthy recipes', 'nutrition');
}

// Progress Management
function updateMetrics() {
    const newCalories = prompt('Enter new total calories burned:');
    const newWorkouts = prompt('Enter new total workouts completed:');
    
    if (newCalories && !isNaN(newCalories)) {
        totalCalories = parseInt(newCalories);
    }
    if (newWorkouts && !isNaN(newWorkouts)) {
        totalWorkouts = parseInt(newWorkouts);
    }
    
    saveData();
    updateDisplay();
    showToast('Metrics updated! 📊', 'success');
    addActivity('Updated progress metrics', 'progress');
}

function exportData() {
    const data = {
        waterIntake: currentWater,
        totalCalories: totalCalories,
        workoutsCompleted: workoutsCompleted,
        dayStreak: dayStreak,
        bestStreak: bestStreak,
        totalWorkouts: totalWorkouts,
        avgWorkoutTime: avgWorkoutTime,
        workoutHistory: workoutHistory,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fit-flomo-data.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showToast('Data exported successfully! 📁', 'success');
    addActivity('Exported fitness data', 'progress');
}

function viewCharts() {
    showToast('Charts feature coming soon! 📈', 'info');
    addActivity('Viewed progress charts', 'progress');
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        currentWater = 0;
        totalCalories = 0;
        workoutsCompleted = 0;
        dayStreak = 0;
        bestStreak = 0;
        totalWorkouts = 0;
        avgWorkoutTime = 0;
        workoutHistory = [];
        activityFeed = [];
        
        saveData();
        updateDisplay();
        showToast('Progress reset successfully! 🔄', 'success');
        addActivity('Reset all progress data', 'progress');
    }
}

// Activity Feed
function addActivity(message, type = 'info') {
    const activity = {
        message,
        type,
        timestamp: new Date().toLocaleTimeString()
    };
    
    activityFeed.unshift(activity);
    
    // Keep only last 20 activities
    if (activityFeed.length > 20) {
        activityFeed = activityFeed.slice(0, 20);
    }
    
    saveData();
}

function updateActivityFeed() {
    const activityList = document.getElementById('activity-feed');
    activityList.innerHTML = '';
    
    activityFeed.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        
        let icon = 'fas fa-info-circle';
        if (activity.type === 'workout') icon = 'fas fa-dumbbell';
        else if (activity.type === 'water') icon = 'fas fa-tint';
        else if (activity.type === 'nutrition') icon = 'fas fa-apple-alt';
        else if (activity.type === 'achievement') icon = 'fas fa-trophy';
        else if (activity.type === 'ai') icon = 'fas fa-robot';
        else if (activity.type === 'quiz') icon = 'fas fa-question-circle';
        else if (activity.type === 'scanner') icon = 'fas fa-barcode';
        else if (activity.type === 'progress') icon = 'fas fa-chart-line';
        
        activityItem.innerHTML = `
            <i class="${icon}"></i>
            <span>${activity.message}</span>
            <small style="margin-left: auto; color: #888;">${activity.timestamp}</small>
        `;
        activityList.appendChild(activityItem);
    });
}

function updateWorkoutHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (workoutHistory.length === 0) {
        historyList.innerHTML = '<p style="text-align: center; color: #888;">No workouts completed yet. Start your first workout!</p>';
        return;
    }
    
    workoutHistory.forEach(workout => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <strong>${workout.name}</strong>
                <div style="color: #888; font-size: 0.9rem;">${workout.date}</div>
            </div>
            <div style="text-align: right;">
                <div>${workout.calories} cal</div>
                <div style="color: #888; font-size: 0.9rem;">${workout.duration}</div>
            </div>
        `;
        historyList.appendChild(historyItem);
    });
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // Stop barcode scanner if scanner modal is closed
        if (modalId === 'scanner-modal') {
            if (typeof Quagga !== 'undefined') {
                Quagga.stop();
            }
        }
        
        // Stop exercise timers if workout modal is closed
        if (modalId === 'workout-modal') {
            if (exerciseInterval) {
                clearInterval(exerciseInterval);
                exerciseInterval = null;
            }
            if (restInterval) {
                clearInterval(restInterval);
                restInterval = null;
            }
        }
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

// Auto-save every 30 seconds
setInterval(() => {
    saveData();
}, 30000);

// Daily streak reset (if no workout for 24 hours)
function checkStreakReset() {
    const lastWorkout = localStorage.getItem('lastWorkoutDate');
    if (lastWorkout) {
        const lastDate = new Date(lastWorkout);
        const today = new Date();
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
            dayStreak = 0;
            saveData();
            updateDisplay();
        }
    }
}

// Check streak on page load
checkStreakReset();

function showUnknownProduct(barcode) {
    const scannerContent = document.querySelector('.scanner-placeholder');
    scannerContent.innerHTML = `
        <div class="unknown-product-result">
            <i class="fas fa-question-circle"></i>
            <h3>Product Not Found</h3>
            <p>Barcode: ${barcode}</p>
            <p>This product is not in our database yet.</p>
            <div class="product-actions">
                <button class="scanner-btn" onclick="initializeBarcodeScanner()">
                    <i class="fas fa-redo"></i>
                    Scan Another
                </button>
                <button class="scanner-btn" onclick="closeModal('scanner-modal')">
                    <i class="fas fa-times"></i>
                    Close
                </button>
            </div>
        </div>
    `;
    
    showToast('Product not found in database', 'warning');
    addActivity(`Scanned unknown product: ${barcode}`, 'scanner');
}

function addScannedFoodToMealPlan() {
    if (!scannedFoodItem) {
        showToast('No product scanned!', 'warning');
        return;
    }
    
    // Add the scanned food to the meal plan
    const mealPlanContainer = document.getElementById('meal-plan');
    const scannedCard = document.createElement('div');
    scannedCard.className = 'meal-card scanned-food-card';
    
    scannedCard.innerHTML = `
        <h4>Scanned Food</h4>
        <div class="meal-item">
            <div class="meal-info">
                <span class="meal-name">${scannedFoodItem.name}</span>
                <span class="meal-calories">${scannedFoodItem.calories} calories</span>
            </div>
            <div class="meal-actions">
                <span class="meal-protein">${scannedFoodItem.protein} protein</span>
                <button class="recipe-btn" onclick="showProductInfo()" type="button">
                    <i class="fas fa-info-circle"></i>
                    Info
                </button>
            </div>
        </div>
    `;
    
    // Add to the beginning of the meal plan
    mealPlanContainer.insertBefore(scannedCard, mealPlanContainer.firstChild);
    
    closeModal('scanner-modal');
    showToast(`${scannedFoodItem.name} added to meal plan!`, 'success');
    addActivity(`Added ${scannedFoodItem.name} to meal plan`, 'nutrition');
}

function showProductInfo() {
    if (!scannedFoodItem) {
        showToast('No product information available!', 'warning');
        return;
    }
    
    const mealPlanContainer = document.getElementById('meal-plan');
    mealPlanContainer.innerHTML = `
        <div class="product-info-result">
            <h3>${scannedFoodItem.name}</h3>
            <div class="product-info-content">
                <h4>Description:</h4>
                <p>${scannedFoodItem.description}</p>
                <h4>Nutrition Information:</h4>
                <ul>
                    <li><strong>Calories:</strong> ${scannedFoodItem.calories}</li>
                    <li><strong>Protein:</strong> ${scannedFoodItem.protein}</li>
                    <li><strong>Carbohydrates:</strong> ${scannedFoodItem.carbs}</li>
                    <li><strong>Fat:</strong> ${scannedFoodItem.fat}</li>
                </ul>
            </div>
            <button class="meal-btn" onclick="generateMealPlan()">
                <i class="fas fa-arrow-left"></i>
                Back to Meal Plan
            </button>
        </div>
    `;
    
    showToast(`Product info for ${scannedFoodItem.name}`, 'success');
}

// Exercise progression functions
function startExercise() {
    if (!window.currentWorkout) return;
    
    const workout = window.currentWorkout;
    const currentExercise = workout.exercises[currentExerciseIndex];
    
    if (!currentExercise) {
        completeWorkout();
        return;
    }
    
    // Update display
    document.getElementById('current-exercise-name').textContent = currentExercise.name;
    document.getElementById('current-exercise-details').textContent = `Set ${currentSet}/3 - ${currentExercise.reps}`;
    document.getElementById('exercise-number').textContent = `Exercise: ${currentExerciseIndex + 1}/${workout.exercises.length}`;
    document.getElementById('set-number').textContent = `Set: ${currentSet}/3`;
    
    // Update exercise indicator
    updateExerciseIndicator(currentExerciseIndex, 'active');
    
    // Show/hide buttons - keep progress controls visible
    document.getElementById('start-exercise').style.display = 'none';
    document.getElementById('pause-exercise').style.display = 'inline-block';
    document.getElementById('next-exercise').style.display = 'inline-block';
    // Progress controls are now always visible
    
    // Reset progress display to show manual progress
    exerciseProgress = 0;
    updateExerciseProgress();
    
    showToast(`Starting: ${currentExercise.name} - Set ${currentSet}`, 'success');
}

function pauseExercise() {
    // Clear any existing intervals
    if (exerciseInterval) {
        clearInterval(exerciseInterval);
        exerciseInterval = null;
    }
    
    if (restInterval) {
        clearInterval(restInterval);
        restInterval = null;
    }
    
    document.getElementById('pause-exercise').style.display = 'none';
    document.getElementById('start-exercise').style.display = 'inline-block';
    document.getElementById('start-exercise').innerHTML = '<i class="fas fa-play"></i> Resume';
    
    showToast('Workout paused', 'info');
}

function exerciseCompleted() {
    const workout = window.currentWorkout;
    const currentExercise = workout.exercises[currentExerciseIndex];
    
    if (currentSet < 3) {
        // Move to next set
        currentSet++;
        exerciseProgress = 0;
        updateExerciseProgress();
        
        // Update display for next set
        document.getElementById('current-exercise-details').textContent = `Set ${currentSet}/3 - ${currentExercise.reps}`;
        document.getElementById('set-number').textContent = `Set: ${currentSet}/3`;
        
        // Don't automatically start rest period - let user control it
        showToast(`Set completed! Ready for Set ${currentSet}`, 'success');
    } else {
        // Exercise completed, move to next
        exerciseProgress = 100;
        updateExerciseProgress();
        updateExerciseIndicator(currentExerciseIndex, 'completed');
        
        if (currentExerciseIndex < workout.exercises.length - 1) {
            // Move to next exercise
            setTimeout(() => {
                nextExercise();
            }, 1000);
        } else {
            // Workout completed
            setTimeout(() => {
                completeWorkout();
            }, 1000);
        }
    }
}

function startRestPeriod(restTime) {
    isResting = true;
    restTimeRemaining = parseRestTime(restTime);
    
    document.getElementById('current-exercise-name').textContent = 'Rest Period';
    document.getElementById('current-exercise-details').textContent = `Get ready for next set`;
    document.getElementById('exercise-progress-text').textContent = `Rest: ${restTimeRemaining}s`;
    
    // Start rest countdown
    restInterval = setInterval(() => {
        restTimeRemaining--;
        document.getElementById('exercise-progress-text').textContent = `Rest: ${restTimeRemaining}s`;
        
        if (restTimeRemaining <= 0) {
            clearInterval(restInterval);
            restInterval = null;
            isResting = false;
            
            // Start next set
            startExercise();
        }
    }, 1000);
}

function parseRestTime(restString) {
    // Parse rest time from strings like "60s", "45s", "90s"
    const match = restString.match(/(\d+)s/);
    return match ? parseInt(match[1]) : 60;
}

function nextExercise() {
    currentExerciseIndex++;
    currentSet = 1;
    exerciseProgress = 0;
    updateExerciseProgress();
    
    if (currentExerciseIndex < window.currentWorkout.exercises.length) {
        startExercise();
    } else {
        completeWorkout();
    }
}

function updateExerciseProgress() {
    const progressFill = document.getElementById('exercise-progress-fill');
    const progressText = document.getElementById('exercise-progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = exerciseProgress + '%';
        progressText.textContent = Math.round(exerciseProgress) + '% Complete';
    }
}

// Add manual progress update function
function updateProgress(amount = 25) {
    if (!window.currentWorkout) return;
    
    // Stop any running rest timer when manually updating progress
    if (restInterval) {
        clearInterval(restInterval);
        restInterval = null;
        isResting = false;
    }
    
    exerciseProgress = Math.min(exerciseProgress + amount, 100);
    updateExerciseProgress();
    
    // Show feedback
    const progressText = amount === 100 ? 'Set completed!' : `Progress: ${Math.round(exerciseProgress)}%`;
    showToast(progressText, 'success');
    
    if (exerciseProgress >= 100) {
        // Small delay to show completion
        setTimeout(() => {
            exerciseCompleted();
        }, 500);
    }
}

function updateExerciseIndicator(exerciseIndex, status) {
    const indicator = document.getElementById(`exercise-indicator-${exerciseIndex}`);
    if (!indicator) return;
    
    const statusElement = indicator.querySelector('.exercise-status');
    if (!statusElement) return;
    
    switch (status) {
        case 'active':
            statusElement.textContent = 'In Progress';
            statusElement.className = 'exercise-status active';
            break;
        case 'completed':
            statusElement.textContent = 'Completed';
            statusElement.className = 'exercise-status completed';
            break;
        default:
            statusElement.textContent = 'Not started';
            statusElement.className = 'exercise-status';
    }
}

function startManualRest() {
    if (!window.currentWorkout) return;
    
    const currentExercise = window.currentWorkout.exercises[currentExerciseIndex];
    if (currentExercise) {
        startRestPeriod(currentExercise.rest);
    }
}