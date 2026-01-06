from flask import Flask, render_template, request, jsonify, session
import secrets
from datetime import datetime

app = Flask(__name__)
app.secret_key = secrets.token_hex(16)

@app.route('/')
def index():
    """Main page with test mode selection"""
    return render_template('index.html')

@app.route('/test/<mode>')
def test(mode):
    """Test page for different modes: visual, auditory, combined"""
    if mode not in ['visual', 'auditory', 'combined']:
        return "Invalid test mode", 400
    return render_template('test.html', mode=mode)

@app.route('/api/submit_results', methods=['POST'])
def submit_results():
    """Receive and process test results"""
    data = request.get_json()
    
    # Calculate metrics
    results = {
        'total_trials': data.get('total_trials', 0),
        'target_count': data.get('target_count', 0),
        'correct_responses': data.get('correct_responses', 0),
        'missed_targets': data.get('missed_targets', 0),
        'false_alarms': data.get('false_alarms', 0),
        'average_reaction_time': data.get('average_reaction_time', 0),
        'reaction_times': data.get('reaction_times', []),
        'test_mode': data.get('test_mode', ''),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    # Calculate accuracy (correct target responses / total targets)
    if results['target_count'] > 0:
        results['accuracy'] = (results['correct_responses'] / results['target_count']) * 100
    else:
        results['accuracy'] = 0
    
    # Calculate false alarm rate (false alarms / non-targets)
    non_targets = results['total_trials'] - results['target_count']
    if non_targets > 0:
        results['false_alarm_rate'] = (results['false_alarms'] / non_targets) * 100
    else:
        results['false_alarm_rate'] = 0
    
    # Store in session for results page
    session['test_results'] = results
    
    return jsonify({'status': 'success', 'results': results})

@app.route('/results')
def results():
    """Display test results"""
    test_results = session.get('test_results', None)
    if not test_results:
        return "No test results available", 404
    return render_template('results.html', results=test_results)

if __name__ == '__main__':
    # Run on all interfaces so it can be accessed publicly
    app.run(host='0.0.0.0', port=5000, debug=True)
