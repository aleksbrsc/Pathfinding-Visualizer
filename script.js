const UNVISITED_NODE = 0
const WALL_NODE = 1;
const START_NODE = 2;
const END_NODE = 3;
const VISITED_NODE = 4;
const PATH_NODE = 5;

const MAZE_TYPES = {
    CUSTOM: 'Custom',
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard',
    WHITE_NOISE: 'White Noise',
    DFS: "Depth-First Search",
    PRIMS: "Prim's",
    VERTICAL_SKEW: "Vertical Skews",
    CORRIDORS_ROOMS: "Corridors & Rooms",
};

let currentMazeType = MAZE_TYPES.CUSTOM;

const STATUS = {
    IDLE: 'Idle',
    PAINTING: 'Painting',
    GENERATING: 'Generating',
    GENERATED: 'Generated',
    RESET: 'Reset',
    CLEARED: 'Cleared',
    VISUALIZING: 'Visualizing',
    PATH_FOUND: 'Path found',
    PATH_NOT_FOUND: 'Path not found',
};

let currentStatus = STATUS.IDLE;

const THEMES = {
    DEFAULT: "default",
    LITE_BLUE: 'Lite Blue',
    STEAMPUNK: 'Steampunk',
    CORAL: "Coral",
    DARK: "Dark",
    DARK_2: "Dark 2"
}

let theme = THEMES.DEFAULT

let animatedPathDrawing = true;
let bordersOn = true;
let delay = 0;
let pathDelay = 7;
let copied = false;

// Initial maze hard preset
updateMaze([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1], [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]])

document.addEventListener('DOMContentLoaded', function () {
    initApp();
});

function initApp() {        
    // MAZES
    const mazesChildren = document.querySelectorAll('.dropdown-content.mazes a')
    
    const mazeEasy = document.getElementById('mazeEasy');
    mazeEasy.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze([[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], [1,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1], [1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,3,1], [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]) 
        updateMazeType(MAZE_TYPES.EASY)
    });
    const mazeMedium = document.getElementById('mazeMedium');
    mazeMedium.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze([[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], [1,2,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,1,0,0,0,1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1], [1,0,0,1,1,1,0,0,0,1,0,0,1,0,0,0,0,0,0,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1], [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1], [1,0,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1], [1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1], [1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,1], [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,1,0,0,1], [1,0,0,0,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,1,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,0,0,0,0,0,0,1], [1,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1], [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1], [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], [1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1], [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]])
        updateMazeType(MAZE_TYPES.MEDIUM)
    });
    const mazeHard = document.getElementById('mazeHard');
    mazeHard.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 2, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1], [1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1], [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1], [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1], [1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1], [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1], [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1], [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1], [1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]) 
        updateMazeType(MAZE_TYPES.HARD)
    });
    const mazeWhiteNoise = document.getElementById('mazeWhiteNoise');
    function generateRepeatedWhiteNoise() {
            updateStatus(STATUS.GENERATING);
            let count = 0;
            const intervalId = setInterval(() => {
                updateMaze(generateMazeWhiteNoise(21, 47));
                count++;
                if (count === 40) {
                    updateStatus(STATUS.GENERATED);
                    clearInterval(intervalId);
                }
            }, 0.5);
        }
    mazeWhiteNoise.addEventListener('click', function () {
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateClearButtonText("Clear");
        updateMazeType(MAZE_TYPES.WHITE_NOISE);
        generateRepeatedWhiteNoise();
    });
    const mazeDFS = document.getElementById('mazeDFS');
    mazeDFS.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze(generateMazeDFS(21,47));
        updateMazeType(MAZE_TYPES.DFS);
    });
    const mazePrims = document.getElementById('mazePrims');
    mazePrims.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze(generateMazePrims(21,47));
        updateMazeType(MAZE_TYPES.PRIMS);
    });
    const mazeVerticalSkew = document.getElementById('mazeVerticalSkew');
    mazeVerticalSkew.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze(generateMazeVerticalSkew(21,47)); 
        updateMazeType(MAZE_TYPES.VERTICAL_SKEW);
    });
    const mazeCorridorsRooms = document.getElementById('mazeCorridorsRooms');
    mazeCorridorsRooms.addEventListener('click', function () { 
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        updateStatus(STATUS.GENERATED);
        updateMaze(generateMazeCorridorsRooms(21,47)); 
        updateMazeType(MAZE_TYPES.CORRIDORS_ROOMS);
    });

    // ALGORITHMS
    const ALGORITHMS = {
        DFS: 'Depth-First Search',
        BFS: 'Breadth-First Search',
        DIJKSTRA: "Dijkstra's",
        A_STAR: 'A* Search',
        BIDIRECTIONAL: 'Bidirectional Search',
        GREEDY_BFS: 'Greedy Best-First Search',
    };

    let currentAlgorithm = ALGORITHMS.DIJKSTRA; // initially dijkstras' 
    const algorithmsChildren = document.querySelectorAll('.dropdown-content.algorithms a');
    document.getElementById('algoDijkstra').style.fontWeight = 'bold'; 
    algoTitle = '<strong>Algorithm:</strong> '
    
    function makeAlgoTextBold(algoId) {
        algorithmsChildren.forEach(child => { child.style.fontWeight = 'normal'; });
        document.getElementById(algoId).style.fontWeight = 'bold'; 
    }

    document.getElementById('algoDFS').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.DFS;
        makeAlgoTextBold('algoDFS');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.DFS;
    });

    document.getElementById('algoBFS').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.BFS;
        makeAlgoTextBold('algoBFS');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.BFS;
    });

    document.getElementById('algoDijkstra').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.DIJKSTRA;
        makeAlgoTextBold('algoDijkstra');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.DIJKSTRA;
    });

    document.getElementById('algoA*').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.A_STAR;
        makeAlgoTextBold('algoA*');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.A_STAR;

    });

    document.getElementById('algoBidirectional').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.BIDIRECTIONAL;
        makeAlgoTextBold('algoBidirectional');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.BIDIRECTIONAL;
    });

    document.getElementById('algoGreedyBFS').addEventListener('click', () => {
        currentAlgorithm = ALGORITHMS.GREEDY_BFS;
        makeAlgoTextBold('algoGreedyBFS');
        document.getElementById('algorithm').innerHTML = algoTitle + ALGORITHMS.GREEDY_BFS;
    });

    // EXTRA 
    const extraChildren = document.querySelectorAll('.dropdown-content.extra a');

    document.getElementById('extraAnimatedPathDrawing').addEventListener('click', () => {
        animatedPathDrawing = !animatedPathDrawing
        if (animatedPathDrawing)
            document.getElementById('extraAnimatedPathDrawing').innerHTML = 'Animated Path Drawing (on)';
        else
            document.getElementById('extraAnimatedPathDrawing').innerHTML = 'Animated Path Drawing (off)';
    });

    document.getElementById('extraSpeed').addEventListener('click', () => {
        switch (delay) {
            case 0:
                delay = 20;
                document.getElementById('extraSpeed').innerHTML = 'Speed (medium)';
                break;
            case 20:
                delay = 50 
                document.getElementById('extraSpeed').innerHTML = 'Speed (slow)';
                break;
            case 50:
                delay = 100
                document.getElementById('extraSpeed').innerHTML = 'Speed (slowest)';
                break;
            case 100:
                delay = 0
                document.getElementById('extraSpeed').innerHTML = 'Speed (fast)';
                break;
        }
    });
    
    document.getElementById('extraCopyMazeMatrix').addEventListener('click', () => {
        if (copied) { return; }
        const maze = getMazeMatrix();
        copyMazeMatrix(maze);
        copied = true;
        document.getElementById('extraCopyMazeMatrix').innerHTML = 'Copied!';
        setTimeout(function() {
            document.getElementById('extraCopyMazeMatrix').innerHTML = 'Copy Maze Matrix';
            copied = false;
        }, 1000);
    });
    
    document.getElementById('extraChangeMazeOrientation').addEventListener('click', () => {
        changeMazeOrientation();
    });
    
    document.getElementById('extraBorders').addEventListener('click', () => {
        if (bordersOn) {
            document.getElementById('extraBorders').innerHTML = 'Borders (off)';
            maze.style.setProperty('--td-border', 'none');
        } else {
            document.getElementById('extraBorders').innerHTML = 'Borders (on)';
            if (theme === THEMES.DARK || theme === THEMES.DARK_2) {
                maze.style.setProperty('--td-border', '1px solid #333');
            } else {
                maze.style.setProperty('--td-border', '1px solid #ddd');
            }
        }

        bordersOn = !bordersOn
    });

    document.getElementById('extraTheme').addEventListener('click', () => {
        switch (theme) {
            case THEMES.DEFAULT: // becomes 'lite blue'
                updateTheme(THEMES.LITE_BLUE);
                maze.style.setProperty('--visited-background-color', '#d0e1f1');
                break;
                
            case THEMES.LITE_BLUE: // becomes 'steampunk'
                updateTheme(THEMES.STEAMPUNK);
                maze.style.setProperty('--visited-background-color', 'lightgray');
                break;

            case THEMES.STEAMPUNK: // becomes 'coral'
                updateTheme(THEMES.CORAL);
                maze.style.setProperty('--visited-background-color', '#afdcec');
                maze.style.setProperty('--start-background-color', '#F76680');
                header.style.setProperty('--visualize-background-color', '#F76680');
                maze.style.setProperty('--end-background-color', '#be5ce7');
                header.style.setProperty('--clear-background-color', '#be5ce7');
                maze.style.setProperty('--path-animation', 'pathCoral 3s infinite');
                break;

            case THEMES.CORAL: // becomes 'dark'
                updateTheme(THEMES.DARK);
                if (bordersOn) {
                    maze.style.setProperty('--td-border', '1px solid #333');
                } else {
                    maze.style.setProperty('--td-border', 'none');
                }
                maze.style.setProperty('--wall-background-color', 'lightgray');
                maze.style.setProperty('--unvisited-background-color', '#1e1e1e');
                maze.style.setProperty('--visited-background-color', '#3b3b3b');
                header.style.setProperty('--clear-background-color', '#7f1111');
                header.style.setProperty('--visualize-background-color', '#418232');
                maze.style.setProperty('--start-background-color', '#418232');
                maze.style.setProperty('--end-background-color', '#a72c2c');
                maze.style.setProperty('--path-animation', 'pathDark 3s infinite');
                document.body.style.setProperty('--header-background-color', '#1e1e1e');
                header.style.setProperty('--dropdown-content-hover-background-color', '#1b1b1b');
                document.body.style.setProperty('--body-background-color','#121212');

                document.getElementById('icon').src = 'images/pathicon.svg';
                document.querySelectorAll('#header .title').forEach(element => {
                    element.style.setProperty('--title-text-color', '#F5EDE5');
                });
                document.querySelectorAll('nav ul li a').forEach(element => {
                    element.style.setProperty('--nav-text-color', '#F5EDE5');
                });
                document.querySelectorAll('nav ul li.dropdown .dropdown-content').forEach(element => {
                    element.style.setProperty('--dropdown-content-background-color', '#121212');
                });
                document.querySelectorAll('nav ul li.dropdown .dropdown-content a').forEach(element => {
                    element.style.setProperty('--dropdown-content-text-color', '#F5EDE5');
                });
                document.querySelectorAll('nav ul button').forEach(element => {
                    element.style.setProperty('--button-border-color', '#F5EDE5'); 
                });
                document.querySelectorAll('nav ul button a').forEach(element => {
                    element.style.setProperty('--button-text-color', '#F5EDE5');
                });
                document.querySelectorAll('#desc p').forEach(element => {
                    element.style.setProperty('--desc-color', '#F5EDE5');
                });
                document.querySelector('#clear').style.setProperty('--clear-text-color', '#F5EDE5');
                document.querySelector('#visualize').style.setProperty('--visualize-text-color', '#F5EDE5');
                break;
            case THEMES.DARK: // becomes 'dark 2'
                updateTheme(THEMES.DARK_2)
                maze.style.setProperty('--start-background-color', '#ffec43');
                maze.style.setProperty('--end-background-color', '#fb7443');
                header.style.setProperty('--clear-background-color', '#fb7443');
                header.style.setProperty('--visualize-background-color', '#c9b609');
                maze.style.setProperty('--path-animation', 'pathDark2 3s infinite');
                break;
            case THEMES.DARK_2: // becomes 'default'
                updateTheme(THEMES.DEFAULT);
                if (bordersOn) {
                    maze.style.setProperty('--td-border', '1px solid #ddd');
                } else {
                    maze.style.setProperty('--td-border', 'none');
                }
                maze.style.setProperty('--wall-background-color', '#333');
                maze.style.setProperty('--unvisited-background-color', 'white');
                maze.style.setProperty('--visited-background-color', '#a0c8f0'); 
                maze.style.setProperty('--start-background-color', '#7ed06b');
                maze.style.setProperty('--end-background-color', '#FF6868');
                header.style.setProperty('--clear-background-color', '#FF6868');
                header.style.setProperty('--visualize-background-color', '#90EE90');
                maze.style.setProperty('--path-animation', 'pathDefault 3s infinite');
                document.body.style.setProperty('--header-background-color', '#f0f0f0');
                header.style.setProperty('--dropdown-content-hover-background-color', '#f1f1f1');
                document.body.style.setProperty('--body-background-color','white');
                document.getElementById('icon').src = 'images/pathiconblack.svg';
                document.querySelectorAll('#header .title').forEach(element => {
                    element.style.setProperty('--title-text-color', 'black');
                });
                document.querySelectorAll('nav ul li a').forEach(element => {
                    element.style.setProperty('--nav-text-color', 'black');
                });
                document.querySelectorAll('nav ul li.dropdown .dropdown-content').forEach(element => {
                    element.style.setProperty('--dropdown-content-background-color', '#f9f9f9');
                });
                document.querySelectorAll('nav ul li.dropdown .dropdown-content a').forEach(element => {
                    element.style.setProperty('--dropdown-content-text-color', 'black');
                });
                document.querySelectorAll('nav ul button').forEach(element => {
                    element.style.setProperty('--button-border-color', '#767676'); 
                });
                document.querySelectorAll('nav ul button a').forEach(element => {
                    element.style.setProperty('--button-text-color', 'black');
                });
                document.querySelectorAll('#desc p').forEach(element => {
                    element.style.setProperty('--desc-color', '#333');
                });
                document.querySelector('nav ul button a').style.setProperty('--button-text-color', 'black');
                break;
        }
    });
        
    // BUTTONS        
    // clear button
    const clearButton = document.getElementById('clear');
    clearButton.addEventListener('click', clearMaze);

    function clearMaze() {
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        const visitedCells = document.querySelectorAll('.visited');
        const pathCells = document.querySelectorAll('.path');
        const wallCells = document.querySelectorAll('.wall');
        
        if (currentStatus === STATUS.PATH_FOUND || currentStatus === STATUS.PATH_NOT_FOUND) {
            visitedCells.forEach(cell => { cell.className = 'unvisited'; });
            pathCells.forEach(cell => { cell.className = 'unvisited'; });
            updateClearButtonText("Clear");
            updateStatus(STATUS.RESET);
        } else {
            visitedCells.forEach(cell => { cell.className = 'unvisited'; });
            pathCells.forEach(cell => { cell.className = 'unvisited'; });
            wallCells.forEach(cell => { cell.className = 'unvisited'; });
            updateStatus(STATUS.CLEARED)
        }
    }

    // visualize button
    const visualizeButton = document.querySelector('#visualize');
    visualizeButton.addEventListener('click', visualizeMaze);

    function visualizeMaze() {
        if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
        resetSolution();
        const mazeMatrix = getMazeMatrix();

        switch (currentAlgorithm) {
            case ALGORITHMS.DFS:
                solveDFS(mazeMatrix);
                break;
            case ALGORITHMS.BFS:
                solveBFS(mazeMatrix);
                break;
            case ALGORITHMS.A_STAR:
                solveAStar(mazeMatrix);
                break;
            case ALGORITHMS.DIJKSTRA:
                solveDijkstra(mazeMatrix);
                break;
            case ALGORITHMS.BIDIRECTIONAL:
                solveBidirectional(mazeMatrix);
                break;
            case ALGORITHMS.GREEDY_BFS:
                solveGreedyBFS(mazeMatrix);
                break;
            default:
                console.error('Invalid algorithm selected');
        }
    }

    // MAZE PAINTING
    const maze = document.getElementById('maze');
    let isMouseDown = false;

    maze.addEventListener('mousedown', handleCellClick);
    maze.addEventListener('mouseup', () => {
        isMouseDown = false;
        lastCell = null; // resets streak
    });
    maze.addEventListener('contextmenu', function (event) { event.preventDefault(); }); // prevent right-click context menu
    maze.addEventListener('mousedown', () => { isMouseDown = true; });
    maze.addEventListener('mousemove', (event) => {
        if (isMouseDown)
            handleCellClick(event);
    });
    maze.addEventListener('mouseleave', () => { lastCell = null; }); // reset when mouse leaves the maze
}

// changes clear button text to parameter if 'Clear' or 'Reset'
function updateClearButtonText(type) {
    const clearButton = document.getElementById("clear");

    function checkTheme() {
        if (theme === THEMES.DARK || theme === THEMES.DARK_2) {
            document.querySelectorAll('nav ul button a').forEach(element => {
                element.style.setProperty('--button-text-color', '#F5EDE5');
            });
        }
    }

    switch (type) {
        case "Clear": 
            clearButton.innerHTML = '<a href="#">Clear</a>';
            checkTheme();
            break;
        case "Reset":
            clearButton.innerHTML = '<a href="#">Reset</a>';
            checkTheme();
            break;
        default:
            clearButton.innerHTML = '<a href="#">Clear</a>';
            checkTheme();
    }
}

function updateStatus(status) {
    currentStatus = status;
    document.getElementById('status').innerHTML = '<strong>Status:</strong> ' + status;
    
    // if visualized
    if (status === STATUS.PATH_FOUND || status === STATUS.PATH_NOT_FOUND) {
        updateClearButtonText("Reset"); // 'clear' button will become 'reset'
    }
}

function updateMazeType(mazeType) {
    currentMazeType = mazeType;
    document.getElementById('mazeType').innerHTML = '<strong>Maze:</strong> ' + mazeType;
}

function updateTheme(newTheme) {
    theme = newTheme;
    document.getElementById('extraTheme').innerHTML = 'Theme (' + newTheme + ')';
}

// updates maze ui given a matrix
function updateMaze(matrix) {
    const mazeTable = document.getElementById('maze');

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const cell = document.getElementById(`${row}-${col}`);

            
            switch (matrix[row][col]) {
                case UNVISITED_NODE:
                    cell.className = 'unvisited'; // 0
                    break;
                case WALL_NODE:
                    cell.className = 'wall'; // 1
                    break;
                case START_NODE:
                    cell.className = 'start'; // 2 
                    break;
                case END_NODE:
                    cell.className = 'end'; // 3
                    break;
                case VISITED_NODE:
                    cell.className = 'visited'; // 4
                    break;
                case PATH_NODE:
                    cell.className = "path"; // 5
                    break;
                default:
                    cell.className = 'unvisited'; // 0
            }
        }
    }
}

function getMazeMatrix() {
    const mazeTable = document.getElementById('maze');
    let mazeMatrix = [];
    for (let i = 0; i < mazeTable.rows.length; i++) {
        mazeMatrix[i] = [];
        for (let j = 0; j < mazeTable.rows[i].cells.length; j++) {
            const cellClass = mazeTable.rows[i].cells[j].className;

            // Map cell classes to values
            let cellValue;
            if (cellClass === 'unvisited') {
                cellValue = UNVISITED_NODE; 
            } else if (cellClass === 'wall') {
                cellValue = WALL_NODE; 
            } else if (cellClass === 'start') {
                cellValue = START_NODE;
            } else if (cellClass === 'end') {
                cellValue = END_NODE; 
            } else if (cellClass === 'visited') {
                cellValue = VISITED_NODE;
            } else if (cellClass === 'path') {
                cellValue = PATH_NODE;
            }

            mazeMatrix[i][j] = cellValue;
        }
    }

    return mazeMatrix;
}

function logMazeMatrix(matrix) {
    const matrixString = '[' +
        matrix.map(row => '[' + row.join(',') + ']').join(', ') +
        ']';
    
    console.log(matrixString);
}

function copyMazeMatrix(matrix) {
    const matrixString = '[' +
        matrix.map(row => '[' + row.join(',') + ']').join(', ') +
        ']';
    
        navigator.clipboard.writeText(matrixString);
}

function resetSolution() {
    const matrix = getMazeMatrix();
    const mazeTable = document.getElementById('maze');

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            const cell = document.getElementById(`${row}-${col}`);

            // Reset visited and path cells
            if (matrix[row][col] === VISITED_NODE || matrix[row][col] === PATH_NODE) {
                matrix[row][col] = UNVISITED_NODE; 
                cell.className = 'unvisited';
            }
        }
    }

    updateMaze(matrix);
}

function changeMazeOrientation() {
    let orientation = maze.style.transform;

    switch (orientation) {
        case '': // Default
            document.getElementById('extraChangeMazeOrientation').innerHTML = 'Maze Orientation (flipped X)';
            maze.style.transform = 'scaleX(-1)';
            break;
        case 'scaleX(-1)':
            maze.style.transform = 'scaleY(-1)';
            document.getElementById('extraChangeMazeOrientation').innerHTML = 'Maze Orientation (flipped Y)';
            break;
        case 'scaleY(-1)':
            maze.style.transform = 'scaleX(-1) scaleY(-1)';
            document.getElementById('extraChangeMazeOrientation').innerHTML = 'Maze Orientation (flipped X, Y)';

            break;
        case 'scaleX(-1) scaleY(-1)':
            maze.style.transform = ''
            document.getElementById('extraChangeMazeOrientation').innerHTML = 'Maze Orientation (default)';
            break;
        default:
            console.log("invalid maze orientation option:", orientation);
    }
}

function getCellCoordinates(cell) {
    const [row, col] = cell.id.split('-').map(Number);
    return { row, col };
}

// fluid painting feature (Bresenham's line algorithm)
let lastCell;
function paintCellsBetween(startCell, endCell) {
    const startCoords = getCellCoordinates(startCell);
    const endCoords = getCellCoordinates(endCell);

    const dx = Math.abs(endCoords.col - startCoords.col);
    const dy = Math.abs(endCoords.row - startCoords.row);
    const sx = startCoords.col < endCoords.col ? 1 : -1;
    const sy = startCoords.row < endCoords.row ? 1 : -1;
    let err = dx - dy;

    let currentRow = startCoords.row;
    let currentCol = startCoords.col;

    while (true) {
        const cell = document.getElementById(`${currentRow}-${currentCol}`);

        // Skip painting if the cell is the start or end node
        if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
            cell.className = endCell.className;
        }

        if (currentRow === endCoords.row && currentCol === endCoords.col) {
            break;
        }

        const err2 = 2 * err;
        if (err2 > -dy) {
            err -= dy;
            currentCol += sx;
        }
        if (err2 < dx) {
            err += dx;
            currentRow += sy;
        }
    }
}

function handleCellClick(event) {
    if (currentStatus === STATUS.VISUALIZING || currentStatus === STATUS.GENERATING) { return }
    if (currentStatus === STATUS.PATH_FOUND || currentStatus === STATUS.PATH_NOT_FOUND) { resetSolution() }
    
    updateStatus(STATUS.PAINTING)

    const cell = event.target;

    if (cell.tagName === 'TD') {
        const isLeftClick = event.buttons === 1;
        const isRightClick = event.buttons === 2;

        if (isLeftClick || isRightClick) {
            // paint cell if it isn't a start or end node
            if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.className = isLeftClick ? 'wall' : 'unvisited';

                // paint all cells in between last cell and current cell 
                if (lastCell) {
                    paintCellsBetween(lastCell, cell);
                }

                lastCell = cell; // update last painted cell
            }
        }
    }
}

function initializeMazeWithBorder(rows, columns) {
    // Initialize maze with all unvisited nodes and set start and end nodes
    let maze = Array.from({ length: rows }, () => Array(columns).fill(UNVISITED_NODE)); 
    maze[1][1] = START_NODE; 
    maze[rows - 2][columns - 2] = END_NODE; 

    // Set walls on all four edges
    for (let i = 0; i < rows; i++) {
        maze[i][0] = WALL_NODE;           // Left
        maze[i][columns - 1] = WALL_NODE; // Right
    }

    for (let j = 0; j < columns; j++) {
        maze[0][j] = WALL_NODE;           // Top
        maze[rows - 1][j] = WALL_NODE;    // Bottom
    }

    return maze;
}

function generateMazeWhiteNoise(rows, columns) {
    // Initialize maze with all walls
    let maze = Array.from({ length: rows }, () => Array(columns).fill(WALL_NODE)); 
    
    // Choose a cell and mark it as a passage
    let startCell = [2, 2];
    maze[startCell[0]][startCell[1]] = UNVISITED_NODE;
    
    // Add the walls of the cell to the wall list
    let wallList = [];
    wallList.push([startCell[0] - 1, startCell[1]]);
    wallList.push([startCell[0], startCell[1] + 1]);
    wallList.push([startCell[0] + 1, startCell[1]]);
    wallList.push([startCell[0], startCell[1] - 1]);

    // While there are walls in the list
    while (wallList.length > 0) {
        // Choose a random wall from the list
        let randomIndex = Math.floor(Math.random() * wallList.length);
        let wall = wallList[randomIndex];

        // If the wall separates two cells and only one of them is a passage
        let dx = [-1, 0, 1, 0];
        let dy = [0, 1, 0, -1];
        let passageCells = [];

        for (let i = 0; i < 4; i++) {
            let nx = wall[0] + dx[i];
            let ny = wall[1] + dy[i];

            if (nx >= 0 && ny >= 0 && nx < rows && ny < columns && maze[nx][ny] === UNVISITED_NODE) {
                passageCells.push([nx, ny]);
            }
        }

        if (passageCells.length === 1) {
            maze[wall[0]][wall[1]] = UNVISITED_NODE; // Make the wall a passage

            // Add the neighboring walls of the cell to the wall list
            for (let i = 0; i < 4; i++) {
                let nx = wall[0] + dx[i];
                let ny = wall[1] + dy[i];

                if (nx >= 0 && ny >= 0 && nx < rows && ny < columns && maze[nx][ny] === WALL_NODE) {
                    wallList.push([nx, ny]);
                }
            }
        }

        wallList.splice(randomIndex, 1); // Remove the wall from the list
    }

    // Set the start and end nodes
    maze[1][1] = START_NODE;
    maze[rows - 2][columns - 2] = END_NODE;

    return maze;
}

function generateMazeDFS(rows, columns) {
    // Initialize maze with all walls
    let maze = Array.from({ length: rows }, () => Array(columns).fill(WALL_NODE));

    function dfs(row, col) {
        // the 4 possible directions that we can move in
        const directions = [
            [-2, 0], // Up
            [2, 0],  // Down
            [0, -2], // Left
            [0, 2],  // Right
        ];

        // Randomize the directions
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]];
        }

        // Attempt moving in each direction
        for (let i = 0; i < directions.length; i++) {
            const dir = directions[i];
            const newRow = row + dir[0], newCol = col + dir[1];

            if (newRow > 0 && newRow < rows && newCol > 0 && newCol < columns && maze[newRow][newCol] === WALL_NODE) {
                maze[newRow][newCol] = 0; // Carve a passage
                maze[row + dir[0] / 2][col + dir[1] / 2] = 0; // Carve a passage
                dfs(newRow, newCol); // Recurse
            }
        }
    }

    // Start DFS from the upper-left corner, ensure start and end nodes remain 
    maze[1][1] = START_NODE; 
    dfs(1, 1);
    maze[rows - 2][columns - 2] = END_NODE; 

    return maze;
}

function generateMazePrims(rows, columns) {
    // Initialize maze with all walls
    let maze = Array.from({ length: rows }, () => Array(columns).fill(WALL_NODE));

    let startRow = 1;
    let startCol = 1;
    maze[startRow][startCol] = START_NODE;

    // Create list of neighboring walls
    let walls = [];
    function addWalls(row, col) {
        if (row > 2 && maze[row - 2][col] === WALL_NODE) {
            walls.push([row - 2, col, row - 1, col]);
        }
        if (row < rows - 3 && maze[row + 2][col] === WALL_NODE) {
            walls.push([row + 2, col, row + 1, col]);
        }
        if (col > 2 && maze[row][col - 2] === WALL_NODE) {
            walls.push([row, col - 2, row, col - 1]);
        }
        if (col < columns - 3 && maze[row][col + 2] === WALL_NODE) {
            walls.push([row, col + 2, row, col + 1]);
        }
    }
    addWalls(startRow, startCol);

    while (walls.length !== 0) {
        // Pick a random wall from the list
        let randomIndex = Math.floor(Math.random() * walls.length);
        let [nextRow, nextCol, wallRow, wallCol] = walls[randomIndex];
        walls.splice(randomIndex, 1);

        // If the cell on the opposite side is a wall, empty it
        if (maze[nextRow][nextCol] === WALL_NODE) {
            maze[wallRow][wallCol] = UNVISITED_NODE;
            maze[nextRow][nextCol] = UNVISITED_NODE;
            addWalls(nextRow, nextCol);
        }
    }

    maze[rows - 2][columns - 2] = END_NODE; // add back the end node

    return maze;
}

function generateMazeVerticalSkew(rows, columns) {
    let maze = initializeMazeWithBorder(rows, columns);

    function recursiveVerticalSkew(startRow, endRow, startCol, endCol) {
        if (endRow - startRow < 3 || endCol - startCol < 3) { 
            return;
        }

        // Choose a random point to create a vertical skew of walls
        const wallRow = Math.floor(Math.random() * Math.floor((endRow - startRow) / 2)) * 2 + startRow + 1;
        const wallCol = Math.floor(Math.random() * (endCol - startCol - 1)) + startCol + 1;

        // Create walls for the whole vertical skew except for the chosen point
        for (let i = startRow; i < endRow; i++) {
            if (i !== wallRow) {
                maze[i][wallCol] = WALL_NODE;
            }
        }

        recursiveVerticalSkew(startRow, endRow, startCol, wallCol - 1);
        recursiveVerticalSkew(startRow, endRow, wallCol + 1, endCol);
    }

    recursiveVerticalSkew(1, rows - 1, 1, columns - 2); // endCol = columns - 2 prevents vertical skew on the same column as end node

    return maze;
}

function generateMazeCorridorsRooms(rows, columns) {
    let maze = initializeMazeWithBorder(rows, columns);

    function recursiveDivision(startRow, endRow, startCol, endCol) {
        if (endRow - startRow < 3 || endCol - startCol < 3) { return; }

        // Choose a random point to create 2 walls perpendicular to each other
        const wallRow = Math.floor(Math.random() * Math.floor((endRow - startRow) / 2)) * 2 + startRow + 1;
        const wallCol = Math.floor(Math.random() * Math.floor((endCol - startCol) / 2)) * 2 + startCol + 1;

        // Create the horizontal and vertical walls
        for (let j = startCol; j < endCol; j++) {
            if (j !== wallCol) {
                maze[wallRow][j] = WALL_NODE;
            }
        }
        for (let i = startRow; i < endRow; i++) {
            if (i !== wallRow) {
                maze[i][wallCol] = WALL_NODE;
            }
        }

        // Randomly pick 3/4 walls and open a passage
        const walls = [
            { row: wallRow - 1, col: wallCol },
            { row: wallRow + 1, col: wallCol },
            { row: wallRow, col: wallCol - 1 },
            { row: wallRow, col: wallCol + 1 },
        ];

        const passages = walls.sort(() => Math.random() - 0.5).slice(0, 3);
        passages.forEach((passage) => {
            maze[passage.row][passage.col] = UNVISITED_NODE; 
        });

        // Recursively apply the algorithm to the subchambers
        recursiveDivision(startRow, wallRow - 1, startCol, wallCol - 1);
        recursiveDivision(startRow, wallRow - 1, wallCol + 1, endCol);
        recursiveDivision(wallRow + 1, endRow, startCol, wallCol - 1);
        recursiveDivision(wallRow + 1, endRow, wallCol + 1, endCol);
    }

    // Start by applying the algorithm to the whole maze
    recursiveDivision(1, rows - 1, 1, columns - 1);
    
    return maze;
}

// Default path drawing
function drawPath(path, maze) {
    for (const { row, col } of path) {
        maze[row][col] = PATH_NODE;
    }

    maze[path[0].row][path[0].col] = END_NODE;
    maze[path[path.length - 1].row][path[path.length - 1].col] = START_NODE;
    updateMaze(maze);
    updateStatus(STATUS.PATH_FOUND);
}

// Animated path drawing
function drawPathWithDelay(path, maze) {
    function drawStep() {
        if (path.length > 0) {
            const { row, col } = path.shift(); // remove the first element

            // Cell becomes a path node if it is not the start node
            if (!(row === 1 && col === 1)) {
                maze[row][col] = PATH_NODE; 
                updateMaze(maze);
            }

            // When path is complete, set status and add back 
            if (path.length === 0) {
                maze[row][col] = END_NODE;
                updateMaze(maze);
                updateStatus(STATUS.PATH_FOUND);
                return; 
            }

            setTimeout(drawStep, pathDelay);
        }
    }

    drawStep();
}

function solveDijkstra(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1 }

    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const distances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    distances[start.row][start.col] = 0; // distance at start node is 0
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false));
    let fullPath = [];

    function step() {
        // find unvisited node with the smallest distance
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minNode = { row: -1, col: -1 };

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                if (!visited[row][col] && distances[row][col] < minDistance) {
                    minDistance = distances[row][col];
                    minNode.row = row;
                    minNode.col = col;
                }
            }
        }

        // Check if an invalid minNode is found (maze unsolveable)
        if (minNode.row === -1 || minNode.col === -1) {
            updateStatus(STATUS.PATH_NOT_FOUND);

            return;
        }

        visited[minNode.row][minNode.col] = true;  // mark current node as visited

        // Update the neighbors' distances
        const neighbors = getNeighbors(minNode);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (!visited[row][col] && maze[row][col] !== WALL_NODE) {
                const newDistance = distances[minNode.row][minNode.col] + 1;
                if (newDistance < distances[row][col]) {
                    distances[row][col] = newDistance;
                }
            }
        }

        // If end node reached, build the full path
        if (maze[minNode.row][minNode.col] === END_NODE) {
            let row = target.row;
            let col = target.col;
            fullPath.push({ row, col });
            while (maze[row][col] !== START_NODE) {
                const neighbors = getNeighbors({ row, col });
                for (const neighbor of neighbors) {
                    const { row: nextRow, col: nextCol } = neighbor;
                    if (distances[nextRow][nextCol] === distances[row][col] - 1) {
                        row = nextRow;
                        col = nextCol;
                        fullPath.push({ row, col });
                        break;
                    }
                }
            }

            // draw the full path
            if (animatedPathDrawing) {
                fullPath.reverse();
                drawPathWithDelay(fullPath, maze);
            } else {
                drawPath(fullPath, maze);
            }

            return; 
        }

        // Update the maze UI
        if (maze[minNode.row][minNode.col] !== START_NODE) {
            maze[minNode.row][minNode.col] = VISITED_NODE; 
            updateMaze(maze);
        }

        setTimeout(requestAnimationFrame.bind(null, step), delay); 
    }

    setTimeout(requestAnimationFrame.bind(null, step), delay); 
}

function solveBFS(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1};
    
    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const queue = [start];
    const distances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    distances[start.row][start.col] = 0;
    let fullPath = [];

    function step() {
        if (queue.length === 0) {
            updateStatus(STATUS.PATH_NOT_FOUND);
            return;
        }

        const current = queue.shift();

        const neighbors = getNeighbors(current);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (maze[row][col] !== WALL_NODE && distances[row][col] === Number.MAX_SAFE_INTEGER) {
                distances[row][col] = distances[current.row][current.col] + 1;
                queue.push(neighbor);
            }
        }

        // If end node reached, build the full path
        if (maze[current.row][current.col] === END_NODE) {
            let row = target.row;
            let col = target.col;
            fullPath.push({ row, col });

            while (maze[row][col] !== START_NODE) {
                const neighbors = getNeighbors({ row, col });
                for (const neighbor of neighbors) {
                    const { row: nextRow, col: nextCol } = neighbor;
                    if (distances[nextRow][nextCol] === distances[row][col] - 1) {
                        row = nextRow;
                        col = nextCol;
                        fullPath.push({ row, col });
                        break;
                    }
                }
            }
            
            // draw the full path
            if (animatedPathDrawing) {
                fullPath.reverse();
                drawPathWithDelay(fullPath, maze);
            } else {
                drawPath(fullPath, maze);
            }

            return;
        }

        // Update the maze UI
        if (maze[current.row][current.col] !== START_NODE) {
            maze[current.row][current.col] = VISITED_NODE;
            updateMaze(maze);
        }

        setTimeout(requestAnimationFrame.bind(null, step), delay);
    }

    setTimeout(requestAnimationFrame.bind(null, step), delay);
}

function solveDFS(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1};

    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const stack = [start];
    const distances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    distances[start.row][start.col] = 0;
    let fullPath = [];

    function step() {
        if (stack.length === 0) {
            updateStatus(STATUS.PATH_NOT_FOUND);
            return;
        }

        const current = stack.pop();

        const neighbors = getNeighbors(current);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (maze[row][col] !== WALL_NODE && distances[row][col] === Number.MAX_SAFE_INTEGER) {
                distances[row][col] = distances[current.row][current.col] + 1;
                stack.push(neighbor);
            }
        }

        // If end node reached, build the full path
        if (maze[current.row][current.col] === END_NODE) {
            let row = target.row;
            let col = target.col;
            fullPath.push({ row, col });

            while (maze[row][col] !== START_NODE) {
                const neighbors = getNeighbors({ row, col });
                for (const neighbor of neighbors) {
                    const { row: nextRow, col: nextCol } = neighbor;
                    if (distances[nextRow][nextCol] === distances[row][col] - 1) {
                        row = nextRow;
                        col = nextCol;
                        fullPath.push({ row, col });
                        break;
                    }
                }
            }

            if (animatedPathDrawing) {
                fullPath.reverse();
                drawPathWithDelay(fullPath, maze);
            } else {
                drawPath(fullPath, maze);
            }

            return;
        }

        // Update the maze UI
        if (maze[current.row][current.col] !== START_NODE) {
            maze[current.row][current.col] = VISITED_NODE;
            updateMaze(maze);
        }

        setTimeout(requestAnimationFrame.bind(null, step), delay);
    }

    setTimeout(requestAnimationFrame.bind(null, step), delay);
}

function solveAStar(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1};

    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const openSet = [start];
    const closedSet = [];
    const gScores = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    const fScores = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));

    gScores[start.row][start.col] = 0;
    fScores[start.row][start.col] = heuristic(start, target);

    let fullPath = [];

    function heuristic(start, end) {
        return Math.abs(start.row - end.row) + Math.abs(start.col - end.col);
    }

    function step() {
        if (openSet.length === 0) {
            updateStatus(STATUS.PATH_NOT_FOUND);
            return;
        }

        openSet.sort((a, b) => fScores[a.row][a.col] - fScores[b.row][b.col]);
        const current = openSet.shift();
        closedSet.push(current);

        if (current.row === target.row && current.col === target.col) {
            let row = target.row;
            let col = target.col;
            fullPath.push({ row, col });

            while (row !== start.row || col !== start.col) {
                const neighbors = getNeighbors({ row, col });
                for (const neighbor of neighbors) {
                    const { row: nextRow, col: nextCol } = neighbor;
                    if (gScores[nextRow][nextCol] === gScores[row][col] - 1) {
                        row = nextRow;
                        col = nextCol;
                        fullPath.push({ row, col });
                        break;
                    }
                }
            }

            if (animatedPathDrawing) {
                fullPath.reverse();
                drawPathWithDelay(fullPath, maze);
            } else {
                drawPath(fullPath, maze);
            }

            return;
        }

        const neighbors = getNeighbors(current);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (
                maze[row][col] !== WALL_NODE &&
                !closedSet.some((node) => node.row === row && node.col === col)
            ) {
                const tentativeGScore = gScores[current.row][current.col] + 1;

                if (!openSet.some((node) => node.row === row && node.col === col)) {
                    openSet.push(neighbor);
                } else if (tentativeGScore >= gScores[row][col]) {
                    continue;
                }

                // best path until now
                gScores[row][col] = tentativeGScore;
                fScores[row][col] = gScores[row][col] + heuristic(neighbor, target);
            }
        }

        // Update the maze UI
        if (current.row !== start.row || current.col !== start.col) {
            maze[current.row][current.col] = VISITED_NODE;
            updateMaze(maze);
        }

        setTimeout(requestAnimationFrame.bind(null, step), delay);
    }

    setTimeout(requestAnimationFrame.bind(null, step), delay);
}

function solveBidirectional(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1};

    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const startDistances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    const endDistances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));

    startDistances[start.row][start.col] = 0;
    endDistances[target.row][target.col] = 0;

    const startVisited = Array.from({ length: rows }, () => Array(columns).fill(false));
    const endVisited = Array.from({ length: rows }, () => Array(columns).fill(false));

    let startMinNode = { row: -1, col: -1 };
    let endMinNode = { row: -1, col: -1 };
    let intersectionNode = null;
    let fullPath = [];

    function step() {
        // Find the next nodes to visit in both directions
        startMinNode = findMinNode(startDistances, startVisited);
        endMinNode = findMinNode(endDistances, endVisited);

        // Check if an invalid minNode is found (maze unsolvable)
        if (
            (startMinNode.row === -1 && startMinNode.col === -1) ||
            (endMinNode.row === -1 && endMinNode.col === -1)
        ) {
            updateStatus(STATUS.PATH_NOT_FOUND);
            return;
        }

        // Check for intersection
        if (
            maze[startMinNode.row][startMinNode.col] === VISITED_NODE &&
            maze[endMinNode.row][endMinNode.col] === VISITED_NODE
        ) {
            intersectionNode = { row: startMinNode.row, col: startMinNode.col };
            buildPath();
            return;
        }

        // Update distances and mark nodes as visited in both directions
        updateDistances(startDistances, startVisited, startMinNode, maze);
        updateDistances(endDistances, endVisited, endMinNode, maze);

        // Update the maze UI
        if (
            maze[startMinNode.row][startMinNode.col] !== START_NODE &&
            maze[startMinNode.row][startMinNode.col] !== END_NODE
        ) {
            maze[startMinNode.row][startMinNode.col] = VISITED_NODE;
        }
        if (
            maze[endMinNode.row][endMinNode.col] !== START_NODE &&
            maze[endMinNode.row][endMinNode.col] !== END_NODE
        ) {
            maze[endMinNode.row][endMinNode.col] = VISITED_NODE;
        }

        updateMaze(maze);

        setTimeout(requestAnimationFrame.bind(null, step), delay);
    }

    function findMinNode(distances, visited) {
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minNode = { row: -1, col: -1 };

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                if (!visited[row][col] && distances[row][col] < minDistance) {
                    minDistance = distances[row][col];
                    minNode.row = row;
                    minNode.col = col;
                }
            }
        }

        return minNode;
    }

    function updateDistances(distances, visited, minNode, maze) {
        visited[minNode.row][minNode.col] = true;

        const neighbors = getNeighbors(minNode);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (!visited[row][col] && maze[row][col] !== WALL_NODE) {
                const newDistance = distances[minNode.row][minNode.col] + 1;
                if (newDistance < distances[row][col]) {
                    distances[row][col] = newDistance;
                }
            }
        }
    }

    function buildPath() {
        fullPath = [];
        let row = intersectionNode.row;
        let col = intersectionNode.col;

        while (maze[row][col] !== START_NODE) {
            const neighbors = getNeighbors({ row, col });
            for (const neighbor of neighbors) {
                const { row: nextRow, col: nextCol } = neighbor;
                if (startDistances[nextRow][nextCol] === startDistances[row][col] - 1) {
                    row = nextRow;
                    col = nextCol;
                    fullPath.push({ row, col });
                    break;
                }
            }
        }

        fullPath.reverse();
        fullPath.push({ row: intersectionNode.row, col: intersectionNode.col }); // Add the intersection node

        // Continue building the path in the same direction
        row = intersectionNode.row;
        col = intersectionNode.col;

        while (maze[row][col] !== END_NODE) {
            const neighbors = getNeighbors({ row, col });
            for (const neighbor of neighbors) {
                const { row: nextRow, col: nextCol } = neighbor;
                if (endDistances[nextRow][nextCol] === endDistances[row][col] - 1) {
                    row = nextRow;
                    col = nextCol;
                    fullPath.push({ row, col });
                    break;
                }
            }
        }

        if (animatedPathDrawing) {
            drawPathWithDelay(fullPath, maze);
        } else {
            fullPath.reverse();
            drawPath(fullPath, maze);
        }

        return;
    }

    // Start the bidirectional search
    setTimeout(requestAnimationFrame.bind(null, step), delay);
}

function solveGreedyBFS(maze) {
    updateStatus(STATUS.VISUALIZING);

    const rows = maze.length;
    const columns = maze[0].length;
    const target = { row: rows - 2, col: columns - 2 };
    const start = { row: 1, col: 1};

    function heuristic(row, col) {
        const endRow = rows - 2;
        const endCol = columns - 2;
        return Math.abs(endRow - row) + Math.abs(endCol - col);
    }

    function getNeighbors(cell) {
        const { row, col } = cell;
        return [
            { row: row - 1, col },
            { row: row + 1, col },
            { row, col: col - 1 },
            { row, col: col + 1 },
        ].filter(
            (neighbor) =>
                neighbor.row >= 0 && neighbor.row < rows && neighbor.col >= 0 && neighbor.col < columns
        );
    }

    const distances = Array.from({ length: rows }, () => Array(columns).fill(Number.MAX_SAFE_INTEGER));
    distances[start.row][start.col] = 0;
    const visited = Array.from({ length: rows }, () => Array(columns).fill(false));
    let fullPath = [];

    function step() {
        // find unvisited node with the smallest heuristic distance
        let minDistance = Number.MAX_SAFE_INTEGER;
        let minNode = { row: -1, col: -1 };

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
                if (!visited[row][col]) {
                    const heuristicDistance = distances[row][col] + heuristic(row, col);
                    if (heuristicDistance < minDistance) {
                        minDistance = heuristicDistance;
                        minNode.row = row;
                        minNode.col = col;
                    }
                }
            }
        }

        // Check if an invalid minNode is found (maze unsolvable)
        if (minNode.row === -1 || minNode.col === -1) {
            updateStatus(STATUS.PATH_NOT_FOUND);
            return;
        }

        // Mark the current node as visited
        visited[minNode.row][minNode.col] = true;

        // Update the neighbors' distances
        const neighbors = getNeighbors(minNode);
        for (const neighbor of neighbors) {
            const { row, col } = neighbor;

            if (!visited[row][col] && maze[row][col] !== WALL_NODE) {
                const newDistance = distances[minNode.row][minNode.col] + 1;
                if (newDistance < distances[row][col]) {
                    distances[row][col] = newDistance;
                }
            }
        }

        // If end node reached, build the full path
        if (maze[minNode.row][minNode.col] === END_NODE) {
            let row = rows - 2;
            let col = columns - 2;
            fullPath.push({ row, col });
            while (maze[row][col] !== START_NODE) {
                const neighbors = getNeighbors({ row, col });
                for (const neighbor of neighbors) {
                    const { row: nextRow, col: nextCol } = neighbor;
                    if (distances[nextRow][nextCol] === distances[row][col] - 1) {
                        row = nextRow;
                        col = nextCol;
                        fullPath.push({ row, col });
                        break;
                    }
                }
            }

            if (animatedPathDrawing) {
                fullPath.reverse();
                drawPathWithDelay(fullPath, maze);
            } else {
                drawPath(fullPath, maze);
            }

            return;
        }

        // Update the maze UI
        if (maze[minNode.row][minNode.col] !== START_NODE) {
            maze[minNode.row][minNode.col] = VISITED_NODE;
            updateMaze(maze);
        }

        setTimeout(requestAnimationFrame.bind(null, step), delay); 
    }

    setTimeout(requestAnimationFrame.bind(null, step), delay); 
}