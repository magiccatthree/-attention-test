// Test configuration
const CONFIG = {
    totalTrials: 40,          // Total number of stimuli
    targetCount: 12,          // Fixed number of targets for standardization
    stimulusDuration: 500,    // Display/sound duration in ms
    interStimulusInterval: 1500, // Time between stimuli
    responseWindow: 2000,     // Total time to respond (stimulus + ISI)
    minReactionTime: 100,     // Minimum valid reaction time (ms)
    maxReactionTime: 1000,    // Maximum valid reaction time (ms)
    countdownDuration: 3      // Countdown before test starts
};

// Test state
let testState = {
    currentTrial: 0,
    totalTrials: CONFIG.totalTrials,
    targetCount: CONFIG.targetCount,
    correctResponses: 0,
    missedTargets: 0,
    falseAlarms: 0,
    reactionTimes: [],
    stimulusStartTime: null,
    responded: false,
    isTarget: false,
    testRunning: false,
    stimuli: [],
    responseWindowTimer: null
};

// Audio context for generating tones
let audioContext = null;
let currentSource = null;

// Initialize audio context
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.warn('Web Audio API not supported', e);
    }
}

// Generate a tone
function playTone(frequency, duration) {
    if (!audioContext) return;

    // Stop any currently playing sound
    if (currentSource) {
        try {
            currentSource.stop();
        } catch (e) {
            // Ignore errors
        }
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    // Fade in/out to avoid clicks
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + duration / 1000 - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);

    currentSource = oscillator;
}

// Generate test stimuli sequence
function generateStimuli() {
    const stimuli = [];
    const numTargets = CONFIG.targetCount;
    const numNonTargets = CONFIG.totalTrials - numTargets;

    // Create targets (1) and non-targets (2-9)
    for (let i = 0; i < numTargets; i++) {
        stimuli.push({ value: 1, isTarget: true });
    }

    for (let i = 0; i < numNonTargets; i++) {
        const nonTargetValue = Math.floor(Math.random() * 8) + 2; // 2-9
        stimuli.push({ value: nonTargetValue, isTarget: false });
    }

    // Shuffle array
    for (let i = stimuli.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [stimuli[i], stimuli[j]] = [stimuli[j], stimuli[i]];
    }

    return stimuli;
}
        [stimuli[i], stimuli[j]] = [stimuli[j], stimuli[i]];
    }

    return stimuli;
}

// Show visual stimulus
function showVisualStimulus(value) {
    const visualStimulus = document.getElementById('visual-stimulus');
    visualStimulus.textContent = value;
    visualStimulus.style.opacity = '1';
}

// Hide visual stimulus
function hideVisualStimulus() {
    const visualStimulus = document.getElementById('visual-stimulus');
    visualStimulus.style.opacity = '0';
}

// Present stimulus based on test mode
function presentStimulus(stimulus) {
    testState.isTarget = stimulus.isTarget;
    testState.responded = false;
    testState.stimulusStartTime = Date.now();

    if (TEST_MODE === 'visual' || TEST_MODE === 'combined') {
        showVisualStimulus(stimulus.value);
    }

    if (TEST_MODE === 'auditory' || TEST_MODE === 'combined') {
        // High tone (800 Hz) for target, low tone (400 Hz) for non-target
        const frequency = stimulus.isTarget ? 800 : 400;
        playTone(frequency, CONFIG.stimulusDuration);
    }

    // Hide stimulus after duration
    setTimeout(() => {
        hideVisualStimulus();
    }, CONFIG.stimulusDuration);

    // Set response window - check for missed targets at the end
    testState.responseWindowTimer = setTimeout(() => {
        if (!testState.responded && testState.isTarget) {
            testState.missedTargets++;
        }
    }, CONFIG.responseWindow);

    // Move to next trial after response window
    setTimeout(() => {
        nextTrial();
    }, CONFIG.responseWindow);
}

// Handle next trial
function nextTrial() {
    testState.currentTrial++;
    updateProgress();

    if (testState.currentTrial < testState.totalTrials) {
        const stimulus = testState.stimuli[testState.currentTrial];
        presentStimulus(stimulus);
    } else {
        endTest();
    }
}

// Handle key press
function handleKeyPress(event) {
    if (!testState.testRunning) return;
    
    // Only respond to spacebar
    if (event.code === 'Space') {
        event.preventDefault();
        
        if (testState.responded) {
            // Already responded to this stimulus
            return;
        }

        testState.responded = true;
        const reactionTime = Date.now() - testState.stimulusStartTime;

        // Validate reaction time (filter out anticipatory and inattentive responses)
        const isValidReactionTime = reactionTime >= CONFIG.minReactionTime && 
                                     reactionTime <= CONFIG.maxReactionTime;

        if (testState.isTarget) {
            // Correct response
            testState.correctResponses++;
            // Only record valid reaction times
            if (isValidReactionTime) {
                testState.reactionTimes.push(reactionTime);
            }
        } else {
            // False alarm
            testState.falseAlarms++;
        }
    }
}

// Update progress display
function updateProgress() {
    document.getElementById('progress').textContent = 
        `${testState.currentTrial}/${testState.totalTrials}`;
}

// Start countdown
function startCountdown() {
    let countdown = CONFIG.countdownDuration;
    const countdownElement = document.getElementById('countdown');
    
    const countdownInterval = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;
        
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            startTest();
        }
    }, 1000);
}

// Start the test
function startTest() {
    testState.testRunning = true;
    testState.stimuli = generateStimuli();
    
    // Hide instruction screen, show stimulus area
    document.getElementById('instruction-screen').style.display = 'none';
    document.getElementById('stimulus-area').style.display = 'flex';
    
    updateProgress();
    
    // Start first trial
    const firstStimulus = testState.stimuli[0];
    presentStimulus(firstStimulus);
}

// End test and submit results
function endTest() {
    testState.testRunning = false;
    
    // Show loading screen
    document.getElementById('stimulus-area').style.display = 'none';
    document.getElementById('loading-screen').style.display = 'block';

    // Calculate average reaction time
    const avgReactionTime = testState.reactionTimes.length > 0
        ? testState.reactionTimes.reduce((a, b) => a + b, 0) / testState.reactionTimes.length
        : 0;

    // Prepare results data
    const resultsData = {
        test_mode: TEST_MODE,
        total_trials: testState.totalTrials,
        target_count: testState.targetCount,
        correct_responses: testState.correctResponses,
        missed_targets: testState.missedTargets,
        false_alarms: testState.falseAlarms,
        average_reaction_time: avgReactionTime,
        reaction_times: testState.reactionTimes,
        timestamp: new Date().toLocaleString('zh-CN')
    };

    // Calculate accuracy (correct target responses / total targets)
    if (resultsData.target_count > 0) {
        resultsData.accuracy = (resultsData.correct_responses / resultsData.target_count) * 100;
    } else {
        resultsData.accuracy = 0;
    }

    // Calculate false alarm rate (false alarms / non-targets)
    const non_targets = resultsData.total_trials - resultsData.target_count;
    if (non_targets > 0) {
        resultsData.false_alarm_rate = (resultsData.false_alarms / non_targets) * 100;
    } else {
        resultsData.false_alarm_rate = 0;
    }

    // Store results in localStorage for static version
    localStorage.setItem('test_results', JSON.stringify(resultsData));

    // Redirect to results page
    setTimeout(() => {
        window.location.href = 'results.html';
    }, 1000);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize audio
    initAudio();
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyPress);
    
    // Start button handler
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Resume audio context if needed (browser requirement)
            if (audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
            startCountdown();
        });
    }
});
