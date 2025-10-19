// RSV Club House Survey App
let currentChoiceSet = 0;
let responses = {};
let residentInfo = {};
let deferredPrompt;

// GitHub Configuration
const GITHUB_CONFIG = {
    owner: 'YOUR_GITHUB_USERNAME',  // Replace with your GitHub username
    repo: 'rsv-survey-responses',    // Replace with your repository name
    token: 'YOUR_GITHUB_TOKEN',      // Replace with your GitHub Personal Access Token
    branch: 'main'
};

// PWA Install Prompt
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installPrompt').classList.add('show');
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            document.getElementById('installPrompt').classList.remove('show');
        });
    }
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service Worker registered');
    }).catch(error => {
        console.log('Service Worker registration failed:', error);
    });
}

// Start Survey
function startSurvey() {
    const villaNo = document.getElementById('villaNo').value.trim();
    const residentName = document.getElementById('residentName').value.trim();
    const phoneNo = document.getElementById('phoneNo').value.trim();
    const errorMsg = document.getElementById('errorMessage');

    // Validation
    if (!villaNo || !residentName || !phoneNo) {
        errorMsg.textContent = 'Please fill in all required fields';
        errorMsg.style.display = 'block';
        return;
    }

    if (!/^\d{10}$/.test(phoneNo)) {
        errorMsg.textContent = 'Please enter a valid 10-digit phone number';
        errorMsg.style.display = 'block';
        return;
    }

    residentInfo = {
        villaNo,
        residentName,
        phoneNo,
        timestamp: new Date().toISOString()
    };

    // Hide resident info, show survey
    document.getElementById('residentInfoSection').classList.add('section-hidden');
    document.getElementById('surveySection').classList.remove('section-hidden');
    
    // Initialize first choice set
    renderChoiceSet();
    updateProgress();
}

// Render Choice Set
function renderChoiceSet() {
    const container = document.getElementById('choiceSetsContainer');
    const choiceSet = choiceSets[currentChoiceSet];
    
    container.innerHTML = `
        <div class="choice-set">
            <div class="choice-set-title">
                Choice Set ${currentChoiceSet + 1} of ${choiceSets.length}
            </div>
            
            <div class="options-grid">
                ${choiceSet.options.map(option => `
                    <div class="option-card" onclick="selectOption(${currentChoiceSet}, '${option.id}')">
                        <input type="radio" name="choice${currentChoiceSet}" value="${option.id}" id="choice${currentChoiceSet}_${option.id}">
                        <div class="option-header">Option ${option.id}</div>
                        <div class="attribute-row">
                            <span class="attribute-label">Facilities:</span>
                            <span class="attribute-value">${option.facilities}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">Package Type:</span>
                            <span class="attribute-value">${option.packageType}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">Timings:</span>
                            <span class="attribute-value">${option.timings}</span>
                        </div>
                        <div class="attribute-row">
                            <span class="attribute-label">Guest Access:</span>
                            <span class="attribute-value">${option.guestAccess}</span>
                        </div>
                    </div>
                `).join('')}
                
                <div class="none-option" onclick="selectOption(${currentChoiceSet}, 'None')">
                    <input type="radio" name="choice${currentChoiceSet}" value="None" id="choice${currentChoiceSet}_None">
                    ❌ None of these options
                </div>
            </div>
        </div>
    `;

    // Restore previous selection if exists
    if (responses[currentChoiceSet]) {
        const selectedId = responses[currentChoiceSet];
        const radio = document.getElementById(`choice${currentChoiceSet}_${selectedId}`);
        if (radio) {
            radio.checked = true;
            radio.parentElement.classList.add('selected');
        }
    }

    // Update button visibility
    document.getElementById('prevBtn').classList.toggle('section-hidden', currentChoiceSet === 0);
    document.getElementById('nextBtn').textContent = currentChoiceSet === choiceSets.length - 1 ? 'Submit ✓' : 'Next →';
}

// Select Option
function selectOption(choiceSetIndex, optionId) {
    // Clear previous selection
    document.querySelectorAll(`input[name="choice${choiceSetIndex}"]`).forEach(radio => {
        radio.parentElement.classList.remove('selected');
    });

    // Mark new selection
    const radio = document.getElementById(`choice${choiceSetIndex}_${optionId}`);
    radio.checked = true;
    radio.parentElement.classList.add('selected');

    // Store response
    responses[choiceSetIndex] = optionId;

    // Clear error
    document.getElementById('surveyError').style.display = 'none';
}

// Next Choice
function nextChoice() {
    // Validate selection
    if (!responses[currentChoiceSet]) {
        const errorMsg = document.getElementById('surveyError');
        errorMsg.textContent = 'Please select an option to continue';
        errorMsg.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Check if last question
    if (currentChoiceSet === choiceSets.length - 1) {
        submitSurvey();
        return;
    }

    // Move to next choice set
    currentChoiceSet++;
    renderChoiceSet();
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Previous Choice
function previousChoice() {
    if (currentChoiceSet > 0) {
        currentChoiceSet--;
        renderChoiceSet();
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Update Progress
function updateProgress() {
    const progress = ((currentChoiceSet + 1) / choiceSets.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    document.getElementById('currentStep').textContent = currentChoiceSet + 1;
    document.getElementById('totalSteps').textContent = choiceSets.length;
}

// Submit Survey to GitHub
async function submitSurvey() {
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;
    nextBtn.innerHTML = '<span class="loading"></span> Submitting...';

    try {
        const surveyData = {
            residentInfo,
            responses: Object.keys(responses).map(index => ({
                choiceSet: parseInt(index) + 1,
                selectedOption: responses[index]
            })),
            submittedAt: new Date().toISOString()
        };

        const responseId = generateResponseId();
        const fileName = `response_${responseId}.json`;
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(surveyData, null, 2))));

        // Save to GitHub
        const response = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/responses/${fileName}`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_CONFIG.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Survey response from ${residentInfo.villaNo}`,
                content: content,
                branch: GITHUB_CONFIG.branch
            })
        });

        if (!response.ok) {
            throw new Error('Failed to submit survey');
        }

        // Also save to local storage as backup
        saveToLocalStorage(responseId, surveyData);

        // Show success screen
        showSuccess(responseId);

    } catch (error) {
        console.error('Submission error:', error);
        
        // Save locally if GitHub fails
        const responseId = generateResponseId();
        saveToLocalStorage(responseId, {
            residentInfo,
            responses: Object.keys(responses).map(index => ({
                choiceSet: parseInt(index) + 1,
                selectedOption: responses[index]
            })),
            submittedAt: new Date().toISOString(),
            savedLocally: true
        });

        alert('Response saved locally. Please ensure you have internet connection. Your response ID: ' + responseId);
        showSuccess(responseId);
    }
}

// Save to Local Storage
function saveToLocalStorage(responseId, data) {
    try {
        localStorage.setItem(`rsv_response_${responseId}`, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save to local storage:', e);
    }
}

// Generate Response ID
function generateResponseId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${residentInfo.villaNo.replace(/[^a-zA-Z0-9]/g, '')}_${timestamp}_${random}`;
}

// Show Success
function showSuccess(responseId) {
    document.getElementById('surveySection').classList.add('section-hidden');
    document.getElementById('successSection').classList.remove('section-hidden');
    document.getElementById('responseId').textContent = responseId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize total steps
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('totalSteps').textContent = choiceSets.length;
});
