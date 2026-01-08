// Load and display test results from localStorage

document.addEventListener('DOMContentLoaded', () => {
    // Get results from localStorage
    const resultsJSON = localStorage.getItem('test_results');
    
    if (!resultsJSON) {
        alert('没有找到测试结果。请先完成测试。');
        window.location.href = 'index.html';
        return;
    }

    const results = JSON.parse(resultsJSON);

    // Display timestamp
    document.getElementById('timestamp').textContent = results.timestamp;

    // Display test mode
    let modeText = '';
    if (results.test_mode === 'visual') {
        modeText = '视觉测试';
    } else if (results.test_mode === 'auditory') {
        modeText = '听觉测试';
    } else {
        modeText = '视听结合测试';
    }
    document.getElementById('test-mode-title').textContent = '测试模式: ' + modeText;

    // Display metrics
    document.getElementById('total-trials').textContent = results.total_trials;
    document.getElementById('correct-responses').textContent = results.correct_responses;
    document.getElementById('missed-targets').textContent = results.missed_targets;
    document.getElementById('false-alarms').textContent = results.false_alarms;
    document.getElementById('accuracy').textContent = results.accuracy.toFixed(1) + '%';
    document.getElementById('avg-reaction-time').textContent = Math.round(results.average_reaction_time) + ' ms';

    // Generate performance analysis
    const analysisContent = document.getElementById('analysis-content');
    let analysisHTML = '';

    // Accuracy analysis
    if (results.accuracy >= 90) {
        analysisHTML += '<p class="analysis-excellent">✓ 优秀：您的注意力集中度和反应准确性非常好！</p>';
    } else if (results.accuracy >= 75) {
        analysisHTML += '<p class="analysis-good">✓ 良好：您的注意力表现在正常范围内。</p>';
    } else if (results.accuracy >= 60) {
        analysisHTML += '<p class="analysis-average">• 一般：建议保持充足睡眠，多做注意力训练。</p>';
    } else {
        analysisHTML += '<p class="analysis-poor">• 需要改进：建议咨询专业人士，进行针对性训练。</p>';
    }

    // Reaction time analysis
    if (results.average_reaction_time < 300) {
        analysisHTML += '<p class="analysis-excellent">✓ 反应速度快：您的反应时间表现出色。</p>';
    } else if (results.average_reaction_time < 500) {
        analysisHTML += '<p class="analysis-good">✓ 反应速度正常：反应时间在正常范围内。</p>';
    } else {
        analysisHTML += '<p class="analysis-average">• 反应偏慢：可以通过训练提高反应速度。</p>';
    }

    // False alarm analysis
    if (results.false_alarm_rate && results.false_alarm_rate > 20) {
        analysisHTML += '<p class="analysis-poor">• 冲动性较高：建议在日常生活中培养耐心，减少冲动行为。</p>';
    }

    analysisContent.innerHTML = analysisHTML;
});
