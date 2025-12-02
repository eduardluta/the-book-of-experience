// Stories storage and management module

const STORAGE_KEY = 'book-of-experience-stories';

// Default stories to show when no user stories exist
const DEFAULT_STORIES = [
    {
        id: 1,
        name: 'Elena',
        country: 'Italy',
        age: 42,
        sex: 'female',
        experience: `The summer I learned to sail alone. No engine, no GPS, just the wind and my own judgment. Three weeks on the Mediterranean taught me that fear and freedom are the same door—you just have to choose which way to walk through it.`,
        fear: `That I'll wake up at 80 and realize I spent my whole life preparing for a moment that never came. That safety was just another word for standing still.`,
        createdAt: '2024-03-15T10:30:00.000Z',
        isDefault: true
    },
    {
        id: 2,
        name: 'Marcus',
        country: 'Canada',
        age: 29,
        sex: 'male',
        experience: `Holding my daughter for the first time. In that moment, every selfish thing I'd ever done made sense—it was all just practice for learning how to love someone more than myself.`,
        fear: `Not being there when she needs me most. Missing the moments that matter because I was chasing moments that don't.`,
        createdAt: '2024-05-22T14:15:00.000Z',
        isDefault: true
    },
    {
        id: 3,
        name: 'Yuki',
        country: 'Japan',
        age: 35,
        sex: 'female',
        experience: `Quitting my corporate job to become a ceramicist. Everyone said I was throwing away my future. But the first time I sold a piece I'd made with my own hands, I understood—I wasn't throwing anything away. I was finally picking myself up.`,
        fear: `Conformity. Becoming so comfortable with other people's expectations that I forget I ever had my own dreams.`,
        createdAt: '2024-02-08T09:45:00.000Z',
        isDefault: true
    },
    {
        id: 4,
        name: 'Samuel',
        country: 'Nigeria',
        age: 56,
        sex: 'male',
        experience: `Forgiving my father on his deathbed. Thirty years of silence, and in the end, all it took was five words: "I understand now. Thank you." The weight I'd been carrying wasn't his to remove. It was mine to set down.`,
        fear: `Passing down the same wounds I inherited. Breaking the cycle requires seeing it first, and some days I'm not sure I can see clearly enough.`,
        createdAt: '2024-01-30T16:20:00.000Z',
        isDefault: true
    },
    {
        id: 5,
        name: 'Astrid',
        country: 'Norway',
        age: 24,
        sex: 'female',
        experience: `Surviving a avalanche while hiking alone. For three hours under the snow, I had nothing but my breath and my thoughts. When they pulled me out, colors looked different. Food tasted different. I'd gift anyone that clarity—without the avalanche.`,
        fear: `Wasting the second chance. Going back to sleep when I've finally woken up. Letting the ordinary make me forget how extraordinary it is to be alive.`,
        createdAt: '2024-04-11T11:00:00.000Z',
        isDefault: true
    }
];

// For backwards compatibility
const DEFAULT_STORY = DEFAULT_STORIES[0];

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
 * Get all stories including defaults if no user stories exist
 * @returns {Array} Array of story objects
 */
function getStoriesWithDefault() {
    const stories = getStories();
    if (stories.length === 0) {
        return DEFAULT_STORIES;
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
