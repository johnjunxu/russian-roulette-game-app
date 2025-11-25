# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2025-11-25

### Changed
- Applied 50% size reduction to the language toggle button, consistent with other menu buttons.

## [1.2.2] - 2025-11-25

### Changed
- Reduced the size of buttons and fonts on the main menu, difficulty selection, and bracket screens by 50% for a more compact layout.

## [1.2.1] - 2025-11-24

### Fixed
- Corrected an issue where AI opponents' gold was displayed as `undefined`.
- Adjusted the scale of the tournament bracket UI to be more compact.
- Fixed a bug where the heartbeat sound and visual effect would persist after exiting a game.
- Resolved a translation issue in the high score display for the English version.

### Changed
- Standardized the width of difficulty selection buttons for a consistent UI.

## [1.2.0] - 2025-11-24

### Added
- Implemented a "Heartbeat Pulse" effect: a pulsing red overlay that synchronizes with the heartbeat sound to increase tension during the player's turn.
- Implemented a custom confirmation dialog with a red, semi-transparent overlay for the revival screen to enhance the "blood splatter" effect upon death.

### Changed
- Replaced the browser's native `confirm()` dialog with the new custom dialog for a more immersive user experience.

## [1.0.0] - 2025-11-24

### Added
- **Initial Release of the Game**
- Complete 16-player single-elimination tournament mode.
- Core Russian Roulette duel gameplay with a 6-chamber revolver and 1 bullet.
- Economic system with gold for winning rounds and reviving upon death.
- Four difficulty levels: Easy, Normal, Hard, and Hell, affecting starting gold and revival costs.
- Bracket view to display tournament progress.
- High score tracking saved locally.
- Bilingual support for English and Chinese (zh-CN).
- Sound effects for key game actions (spin, click, bang, heartbeat).
