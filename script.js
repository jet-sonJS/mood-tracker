const firstMoodOptions = document.getElementById('first-mood-options');
const secondMoodOptions = document.getElementById('second-mood-options');
const { happy, neutral, sad } = firstMoodOptions.children;
const noteSection = document.getElementById('note-section');

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
    "😐 Neutral",
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
    "😶‍🌫️ Unseen",
    "🫥 Invisible",
    "😮 Shocked",
    "😯 Alone",
    "😔 Disheartened",
    "🙁 Disappointed",
    "😟 Worried",
    "😤 Frustrated",
    "😢 Sad",
    "😭 Crying",
    "😧 Stressed",
    "😨 Anxious",
    "😰 Overwhelmed",
    "😱 Terrified",
    "😳 Embarrassed",
    "😠 Mad",
    "😡 Angry",
    "🤬 Livid",
    "🤒 Unwell",
    "🤮 Disgusted",
    "🥺 Imploring"
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
    secondMoodOptions.innerHTML = happyOptions.map(option => `<button>${option}</button> `).join('');
});

neutral.addEventListener('click', () => {
    secondMoodOptions.innerHTML = neutralOptions.map(option => `<button>${option}</button> `).join('');
});

sad.addEventListener('click', () => {
    secondMoodOptions.innerHTML = sadOptions.map(option => `<button>${option}</button> `).join('');
});

secondMoodOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        noteSection.innerHTML = `
            <textarea placeholder="Write a note about your mood..."></textarea>
            <div>${moodReasons.map(reason => `<label><input type="checkbox" name="reason" value="${reason}">${reason}</label>`).join('')}</div>
            <button id="save-button">Save</button>
        `;
    }
});