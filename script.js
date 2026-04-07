const firstMoodOptions = document.getElementById('first-mood-options');
const secondMoodOptions = document.getElementById('second-mood-options');
const { happy, neutral, sad } = firstMoodOptions.children;
const noteSection = document.getElementById('note-section');
const history = document.getElementById('history');

const happyOptions = [
    "😂 Amused",
    "😁 Happy",
    "🥰 Loved",
    "😎 Confident",
    "🤩 Inspired",
    "😏 Cheeky",
    "😇 Free",
    "😄 Valued",
    "😌 Peaceful",
    "🤑 Successful",
    "🤪 Wild",
    "🥳 Party"
];

const neutralOptions = [
    "😐 Meh",
    "🤨 Confused",
    "😑 Expressionless",
    "🙄 Sarcastic",
    "🤐 Silent",
    "😴 Tired",
    "🥱 Bored",
    "😒 Unamused",
    "🙃 Whatever"
];

const sadOptions = [
    "🫥 Invisible",
    "😔 Disheartened",
    "😟 Worried",
    "😤 Frustrated",
    "😭 Upset",
    "😧 Stressed",
    "😰 Overwhelmed",
    "😳 Embarrassed",
    "😡 Angry",
    "🤬 Livid",
    "🤒 Unwell",
];

const moodReasons = [
    "🏢Work",
    "🏫School",
    "👨‍👩‍👧‍👦Family",
    "👥Friends",
    "🏥Health",
    "🌦️Weather",
    "💑Partner",
    "🧒Kids",
    "😐Myself",
    "🐾Pets"
];

happy.addEventListener('click', () => {
    secondMoodOptions.innerHTML = happyOptions.map(option => `
        <label class='btn btn-success'>
            <input type='radio' name='second-mood' value='${option}' style='display: none;'>
            ${option}
        </label>
    `).join(' ');
});

neutral.addEventListener('click', () => {
    secondMoodOptions.innerHTML = neutralOptions.map(option => `
        <label class='btn btn-warning'>
            <input type='radio' name='second-mood' value='${option}' style='display: none;'>
            ${option}
        </label>
    `).join(' ');
});

sad.addEventListener('click', () => {
    secondMoodOptions.innerHTML = sadOptions.map(option => `
        <label class='btn btn-danger'>
            <input type='radio' name='second-mood' value='${option}' style='display: none;'>
            ${option}
        </label>
    `).join(' ');
});

secondMoodOptions.addEventListener('click', (event) => {
    const label = event.target.closest('label');

    if (label) {
        noteSection.style.display = 'block';

        const moodText = label.textContent
            .replace(/^[^\w]+/, '')
            .trim()
            .toLowerCase();

        noteSection.innerHTML = `
            <h2>What made you feel "${moodText}" ??</h2>
            <textarea placeholder="Write a note about your mood..." class="form-control"></textarea>
            <div>
                ${moodReasons.map(reason => `
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="reason-${reason.replace(/\s+/g, '-').toLowerCase()}" name="reason" value="${reason}">
                        <label class="custom-control-label" for="reason-${reason.replace(/\s+/g, '-').toLowerCase()}">${reason}</label>
                    </div>
                `).join('')}
            </div>
            <button id="save-button">Save</button>
        `;
    }
});

noteSection.addEventListener('click', (event) => {
    if (event.target.id === 'save-button') {
        const selected = document.querySelector('input[name="second-mood"]:checked');
        const mood = selected ? selected.value : 'Unknown';
        const note = noteSection.querySelector('textarea').value;
        const reasons = Array.from(noteSection.querySelectorAll('input[name="reason"]:checked')).map(input => input.value);
        secondMoodOptions.innerHTML = '';
        const moodEntry = {
            date: new Date().toISOString(),
            mood,
            note,
            reasons
        };

        const entryKey = `moodEntry-${Date.now()}`;
        localStorage.setItem(entryKey, JSON.stringify(moodEntry));

        // do something to show the user that their entry was saved, like a toast notification or something
        

        noteSection.style.display = 'none';
        console.log('Saved Mood Entry:', moodEntry);

        renderMoodHistory();
    }
});

function renderMoodHistory() {
    history.innerHTML = '';

    const entries = Object.keys(localStorage)
        .filter(key => key.startsWith('moodEntry-'))
        .map(key => {
    return {
        key: key,
        data: JSON.parse(localStorage.getItem(key))
    };
})
        .sort((a, b) => new Date(b.date) - new Date(a.date));
if (entries.length === 0) {
    history.innerHTML = `
        <p class="text-muted">
           <br> Start tracking your mood and you'll see your history here! 
        </p>
    `;
    return;
}
    entries.forEach(entry => {
    history.innerHTML += `
        <div class="card mb-2" data-key="${entry.key}">
            <div class="card-body">
                <h5 class="card-title">
                    ${entry.data.mood} - ${new Date(entry.data.date).toLocaleString()}
                </h5>
                <p class="card-text">${entry.data.note || 'No note'}</p>
                <p class="card-text">
                    <small class="text-muted">
                        Reasons: ${entry.data.reasons.join(', ') || 'None'}
                    </small>
                </p>
                <button class="delete-btn btn btn-sm">🗑️</button>
            </div>
        </div>
    `;
});
}

history.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.card');
        const key = card.getAttribute('data-key');

        localStorage.removeItem(key);

        renderMoodHistory();
    }
});

renderMoodHistory();