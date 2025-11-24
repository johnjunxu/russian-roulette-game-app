# Game Design Draft: Russian Roulette Tournament

## 1. Game Overview
*   **Core Gameplay**: 1v1 revolver game of chance.
*   **Format**: 16-player single-elimination tournament (Round of 16, Quarter-finals, Semi-finals, Finals). Win 4 rounds to become the champion.
*   **Player Objective**: Survive until the end and win the champion's prize money.
*   **Failure Condition**: The player character dies and has insufficient gold to purchase a "Revive" or "Negate" item.

## 2. Core Duel Rules
Each 1v1 duel follows this procedure:
1.  **Weapon**: A standard revolver with a 6-chamber cylinder.
2.  **Loading**: Only **1** live round is loaded; the other 5 chambers are empty.
3.  **The Spin**:
    *   The cylinder is spun and stops at a random position. The bullet's position is now set (e.g., in the 3rd slot).
    *   *Note: To increase tension, the cylinder is not spun again until someone is shot. This means with each empty shot, the probability of hitting the bullet increases dramatically (1/6 -> 1/5 -> 1/4...).*
4.  **Determining First Turn**: A coin toss decides who shoots first (or turns can alternate each round).
5.  **Shooting Procedure**:
    *   Player A points the gun at their own temple and pulls the trigger.
    *   **Outcome A (Empty Chamber)**: A "click" sound is heard. The player survives and hands the gun to Player B.
    *   **Outcome B (Gunshot)**: Player A dies. Player B automatically advances to the next round.

## 3. Tournament Mechanism
*   **Participants**: 1 player + 15 AI opponents (with different names and avatars).
*   **Bracket**:
    *   **Round 1 (Round of 16)**: 8 matches.
    *   **Round 2 (Quarter-finals)**: 4 matches.
    *   **Round 3 (Semi-finals)**: 2 matches.
    *   **Round 4 (Finals)**: 1 match.
*   **Spectating**: After the player's match, the system quickly simulates the results of other matches to determine the next round's opponents.

## 4. Economic System (Gold & Lives)

This is the core of the game's strategy. Gold is not just a score; it's the key to survival.

### 4.1 Acquiring Gold (Rewards)
The further the player progresses in the tournament, the higher the prize money:
*   **Eliminated in the first round**: $0 Gold
*   **Reach Quarter-finals**: Reward $500
*   **Reach Semi-finals**: Reward $2,000
*   **Become Runner-up**: Reward $10,000
*   **Become Champion**: Reward $50,000 + Trophy

### 4.2 Using Gold: Buying "Lives"
A "life" is designed as a **"good luck/cheating" mechanism**. When a player is unfortunate enough to trigger the live round, if they have enough gold, the system will ask if they want to buy a "Get Out of Jail Free card."
*   **Effect**: The bullet turns into a dud, or the gun magically jams. The player survives.
*   **Purchase Mechanism**: Players can buy "backup lives" between matches or spend a large amount of gold to "revive" at the moment of death.

## 5. Difficulty Settings (Detailed Plan)

Difficulty mainly affects three variables: **Initial Funds**, **Revival Cost**, and **Opponent AI Luck Bias** (optional).

| Difficulty Mode | Starting Gold | Revival (Buy Life) Cost | Experience Description |
| :--- | :--- | :--- | :--- |
| **Easy** | **$2,000** | **$1,000** | **Beginner's Field**. Starts with enough money to buy 2 lives. Very forgiving. |
| **Normal** | **$500** | **$1,500** | **Standard Field**. Starting gold is not enough for a revival. Must win the first round to afford one. |
| **Hard** | **$0** | **$3,000** | **Expert Field**. Starts with no money, and revivals are very expensive. Must win two rounds to afford one. |
| **Hell** | **-$1,000 (Debt)** | **$10,000** | **Despair Field**. Starts in debt. Revival is nearly impossible. Essentially a "one-life" challenge. |

## 6. Game Flow
1.  **Main Menu**: Start Game / Rules / Exit.
2.  **Character Selection**: Choose your avatar (cosmetic only).
3.  **Difficulty Selection**: Easy/Normal/Hard/Hell.
4.  **Bracket Screen**: Shows the 16-player tournament tree.
5.  **Match Screen**:
    *   Displays cylinder status (unknown), gold balance.
    *   Button: [Pull Trigger].
    *   Animations/Sounds: Cylinder spin, heartbeat, gunshot/click.
6.  **Resolution/Shop Screen**:
    *   Win: Show prize money, offer to buy items.
    *   Lose (no money): Game Over, show final rank.
    *   Lose (with money): Prompt "Spend $XXX to revive?".
7.  **Victory Screen**: Show trophy and final assets.

### Open Questions
1.  **First Turn**: Should it be random (coin toss) or rule-based? *Suggestion: Coin toss is fairest and most exciting.*
2.  **After Revival**: If a player revives, is the bullet "spent" (becomes an empty shell, opponent's turn) or a "dud" (the same bullet is next, opponent's turn)? *Suggestion: The bullet is spent. This makes the cylinder safe for the revived player and transfers pressure to the opponent.*
