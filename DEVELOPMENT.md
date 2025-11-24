# Development Documentation

This document provides a technical overview of the Russian Roulette Tournament game project, including its architecture, code structure, and development guidelines.

## 1. Tech Stack

The project is built with fundamental web technologies, ensuring simplicity and broad compatibility:

-   **HTML5**: Structures the game's UI elements and screens.
-   **CSS3**: Handles all styling, layout, animations, and responsive design.
-   **JavaScript (ES6+)**: Powers all game logic, state management, and DOM manipulation. No external frameworks or libraries are used.

## 2. Project Structure

The file system is organized as follows:

```
.
├── sounds/                 # Audio files for game events
│   ├── bang.mp3
│   ├── click.mp3
│   ├── heartbeat.mp3
│   └── spin.mp3
├── app.yaml                # Configuration for Google App Engine (optional)
├── background.jpg          # Main menu background image
├── CHANGELOG.md            # Tracks version changes and updates
├── Dockerfile              # Configuration for containerization (optional)
├── index.html              # The single entry point and HTML structure
├── lost-bg.jpg             # Game over screen background (loss)
├── play-bg.jpg             # In-game background
├── README.md               # English Game Design Document (GDD)
├── README.zh-CN.md         # Chinese GDD
├── script.js               # Core game logic
├── style.css               # All visual styles
├── translations.js         # Language strings for EN/ZH localization
└── win-bg.jpg              # Game over screen background (win)
```

## 3. Core Logic & Architecture (script.js)

The game operates within a single `DOMContentLoaded` event listener, managing state and UI updates through a set of core objects and functions.

### 3.1 Main State Objects

-   `player`: An object holding the player's current state (`name`, `gold`, `isTurn`, `lives`).
-   `opponent`: An object representing the current AI opponent.
-   `tournament`: Manages the tournament structure, including `rounds` and `currentRound`.
-   `gameState`: Contains global game state information, such as `gun` properties (`chambers`, `bulletPosition`), `duelOver` flags, `difficulty`, and selected `lang`.

### 3.2 Key Functions

-   `resetGame()`: Resets all state objects to their default values, preparing for a new game.
-   `initializeGame(difficulty)`: Sets up the initial game state based on the chosen difficulty, including player's starting gold.
-   `createTournament()`: Generates the 16-participant bracket and renders it on the screen.
-   `startNextRound()`: Identifies the player's next opponent and initiates the duel.
-   `setupNewDuel()`: "Loads" the gun by setting a random `bulletPosition`, determines who goes first, and prepares the UI for the duel.
-   `takeAITurn()`: Simulates the opponent's turn, including the decision logic and outcome (bang or click).
-   `handleWin()` / `handleDeath()`: Manages the consequences of a duel's outcome, including awarding gold, advancing the tournament, or prompting for revival.
-   `updateUI()`: A central function to refresh on-screen information like gold totals and turn indicators.

### 3.3 Game Flow Logic

1.  **Menu & Setup**: The game starts at the main menu. The player selects a difficulty, which calls `initializeGame()`. A tournament bracket is then created via `createTournament()`.
2.  **Duel Loop**:
    *   The player clicks "Continue to Duel", which calls `startNextRound()` to find an opponent and `setupNewDuel()` to prepare the gun.
    *   Turns alternate between the player (responding to `actionButton` clicks) and the AI (`takeAITurn()`).
    *   The loop continues until the gun fires.
3.  **Resolution**:
    *   If the AI is shot, `handleWin()` is called. The player receives gold, and the tournament advances.
    *   If the player is shot, `handleDeath()` is called. It checks if the player can afford to revive. If not, the game ends.
4.  **Game Over**: `showGameOver()` is triggered when the player is eliminated or wins the final round. It displays the final rank and updates the high score.

## 4. Version Management

This project follows standard Git practices for version control.

-   **Versioning Scheme**: We use **Semantic Versioning (SemVer)**, e.g., `v1.0.0`. Major versions for incompatible changes, minor versions for new features, and patch versions for bug fixes.
-   **Changelog**: All user-facing changes must be documented in `CHANGELOG.md`.
-   **Branching Strategy**:
    -   `main`: This branch should always be stable and deployable.
    -   **Feature Branches**: For new features, create a branch from `main` (e.g., `feature/new-sounds`).
    -   **Fix Branches**: For bug fixes, create a branch from `main` (e.g., `fix/revival-bug`).
-   **Commits**: Commit messages should be clear and descriptive, following a conventional format (e.g., `feat: Add new opponent`, `docs: Update development guide`).

## 5. Code Style & Contribution Guidelines

-   **Code Style**: Follow standard best practices for HTML, CSS, and modern JavaScript. Code should be well-commented, especially for complex logic.
-   **Localization**: When adding or changing UI text, ensure it is added to the `translations.js` file for both `en` and `zh` languages and applied via the `data-lang` attribute in the HTML.
-   **Process**:
    1.  Create a new branch for your feature or fix.
    2.  Implement your changes.
    3.  Test your changes thoroughly.
    4.  Update `CHANGELOG.md` if your changes are user-facing.
    5.  Merge your branch back into `main`.
