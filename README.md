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

---

# 游戏设计草案：俄罗斯轮盘赌锦标赛 (Russian Roulette Tournament)

## 1. 游戏概览
*   **核心玩法**：1对1 左轮手枪运气博弈。
*   **赛制**：16人淘汰赛（16进8，8进4，4进2，决赛），共4轮获胜即可夺冠。
*   **玩家目标**：存活至最后，夺取冠军奖金。
*   **失败条件**：角色死亡且金币不足以购买“复活/抵消”道具。

## 2. 核心比赛规则 (The Duel)
每一场1V1的对决遵循以下流程：
1.  **武器**：一把标准的左轮手枪，弹巢有6个孔位。
2.  **装弹**：仅放入 **1颗** 实弹，其余5个为空。
3.  **洗牌**：
    *   裁判转动转轮，随机停止。此时子弹位置确定（例如在第3发位置）。
    *   *注意：为了增加紧张感，一旦转动后不再重新转动，直到有人中枪。这意味着每空枪一次，下一枪中弹概率飙升（1/6 -> 1/5 -> 1/4...）。*
4.  **先手决定**：投掷硬币决定谁先开枪（或每轮轮替先手）。
5.  **开枪流程**：
    *   选手 A 对自己太阳穴开枪。
    *   **情况 A（空枪）**：发出“咔哒”声，存活，将枪交给选手 B。
    *   **情况 B（枪响）**：选手 A 死亡，选手 B 自动晋级下一轮。

## 3. 锦标赛机制
*   **参赛者**：1位玩家 + 15位 AI 对手（拥有不同的名字和头像）。
*   **分组**：
    *   **第1轮 (16强)**：8场比赛。
    *   **第2轮 (8强)**：4场比赛。
    *   **第3轮 (半决赛)**：2场比赛。
    *   **第4轮 (决赛)**：1场比赛。
*   **观战**：玩家比赛结束后，系统会快速模拟其他组的比赛结果，决出下一轮的对手。

## 4. 经济系统 (金币与命)

这是游戏策略的核心。金币不仅是分数，更是生存的保障。

### 4.1 金币获取 (奖励)
玩家在锦标赛中走得越远，获得的奖金越高：
*   **首轮被淘汰**：0 金币
*   **进入8强**：奖励 $500
*   **进入4强**：奖励 $2,000
*   **获得亚军**：奖励 $10,000
*   **获得冠军**：奖励 $50,000 + 奖杯

### 4.2 金币的用途：购买“命”
在这里，“命”被设定为一种**“强运/作弊”机制**。当玩家不幸触发实弹时，如果持有足够的金币，系统会询问是否购买“免死金牌”。
*   **效果**：子弹变成哑弹，或者子弹神奇地卡壳了，玩家存活。
*   **购买机制**：可以在比赛间隙购买“备用命”，也可以在死亡瞬间花费高额金币“复活”。

## 5. 难度数值设定 (详细方案)

难度主要影响三个变量：**初始资金**、**复活成本**、**对手AI的运气倾向**（可选）。

| 难度模式 | 初始携带金币 | 复活(买命)成本 | 游戏体验描述 |
| :--- | :--- | :--- | :--- |
| **容易 (Easy)** | **$2,000** | **$1,000** | **新手场**。开局自带买2条命的钱。容错率极高。 |
| **一般 (Normal)** | **$500** | **$1,500** | **标准场**。开局金币不够买命，必须赢下第一轮才能买得起。 |
| **困难 (Hard)** | **$0** | **$3,000** | **高手场**。开局无钱，且复活昂贵。必须连赢两轮才能赚够一条命的钱。 |
| **地狱 (Hell)** | **-$1,000 (负债)** | **$10,000** | **绝望场**。开局负债，复活天价，基本是**“一命通关”**。 |

## 6. 游戏流程图 (Flow)

1.  **主菜单**：开始游戏 / 规则说明 / 退出。
2.  **选人界面**：从16个头像中选择你的角色（纯外观区别）。
3.  **难度选择**：选择 Easy/Normal/Hard/Hell。
4.  **对阵表界面 (Bracket)**：展示16人树状图。
5.  **比赛界面**：
    *   显示当前左轮弹巢状态（未知）、金币余额。
    *   按钮：【开枪】。
    *   动画/音效：转轮声、呼吸声、开枪结果。
6.  **结算/商店界面**：
    *   若是赢了：显示获得金币，询问是否购买道具。
    *   若是输了（且没钱）：Game Over，显示最终名次。
    *   若是输了（且有钱）：弹出“是否花费 $XXX 复活？”
7.  **通关界面**：展示奖杯和最终剩余资产。


### 待确认的问题

1.	**关于“先手”**：希望是完全随机（抛硬币），还是固定规则？*建议：随机抛硬币最公平且刺激。*

2.  **关于“复活”后**：如果玩家买命复活了，这颗子弹算“消耗掉”了（变成空弹壳，轮到对方开枪），还是算“哑弹”？*建议：算消耗掉，压力转移给对手。*
