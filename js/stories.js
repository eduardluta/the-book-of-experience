// Stories storage and management module

const STORAGE_KEY = 'book-of-experience-stories';

// Default story to show when no stories exist
const DEFAULT_STORY = {
    id: 0,
    name: 'Maria',
    country: 'Portugal',
    age: 34,
    sex: 'female',
    experience: `A sunrise on a quiet mountain.
Phones off, no rush, just warmth, coffee,
and the feeling that life is bigger than our worries.
The kind of morning where time slows down
and you remember why you're alive.
I'd gift that stillness to anyone who's forgotten
what peace feels like.`,
    fear: `Reaching the end of my life
and realizing I never truly showed up —
for myself or the people I love.
That I played it safe when I should have leaped.
That I kept waiting for the right moment
instead of making the moment right.
The fear isn't death. It's an unlived life.`,
    createdAt: '2024-01-01T00:00:00.000Z',
    isDefault: true
};

/**
 * Get all stories from LocalStorage
 * @returns {Array} Array of story objects
 */
function getStories() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Error reading stories from localStorage:', e);
    }
    return [];
}

/**
 * Get all stories including default if no user stories exist
 * @returns {Array} Array of story objects
 */
function getStoriesWithDefault() {
    const stories = getStories();
    if (stories.length === 0) {
        return [DEFAULT_STORY];
    }
    return stories;
}

/**
 * Save a new story to LocalStorage
 * @param {Object} storyData - The story data (without id/createdAt)
 * @returns {Object} The saved story with id and createdAt
 */
function saveStory(storyData) {
    const stories = getStories();

    const newStory = {
        id: Date.now(),
        name: storyData.name,
        country: storyData.country,
        age: parseInt(storyData.age, 10),
        sex: storyData.sex,
        experience: storyData.experience,
        fear: storyData.fear,
        createdAt: new Date().toISOString()
    };

    stories.push(newStory);

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
    } catch (e) {
        console.error('Error saving story to localStorage:', e);
        throw e;
    }

    return newStory;
}

/**
 * Get a story by its ID
 * @param {number} id - The story ID
 * @returns {Object|null} The story or null if not found
 */
function getStoryById(id) {
    const stories = getStoriesWithDefault();
    return stories.find(story => story.id === id) || null;
}

/**
 * Get the total number of stories
 * @returns {number} Number of stories
 */
function getStoryCount() {
    return getStoriesWithDefault().length;
}

/**
 * Get a story by index
 * @param {number} index - The story index (0-based)
 * @returns {Object|null} The story or null if out of bounds
 */
function getStoryByIndex(index) {
    const stories = getStoriesWithDefault();
    if (index >= 0 && index < stories.length) {
        return stories[index];
    }
    return null;
}

/**
 * Get the latest story
 * @returns {Object|null} The most recent story
 */
function getLatestStory() {
    const stories = getStoriesWithDefault();
    return stories[stories.length - 1] || null;
}

/**
 * Get a random story
 * @returns {Object|null} A random story
 */
function getRandomStory() {
    const stories = getStoriesWithDefault();
    if (stories.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * stories.length);
    return stories[randomIndex];
}

/**
 * Format author attribution (e.g., "— Maria, 2024")
 * @param {Object} story - The story object
 * @returns {string} Formatted attribution
 */
function formatAuthor(story) {
    const year = new Date(story.createdAt).getFullYear();
    return `— ${story.name}, ${year}`;
}
