# 开发文档

本文档提供了“俄罗斯轮盘赌锦标赛”游戏项目的技术概览，包括其架构、代码结构和开发指南。

## 1. 技术栈

本项目采用基础的 Web 技术构建，以确保简洁性和广泛的兼容性：

-   **HTML5**: 用于构建游戏的用户界面元素和屏幕结构。
-   **CSS3**: 负责所有的样式、布局、动画和响应式设计。
-   **JavaScript (ES6+)**: 驱动所有游戏逻辑、状态管理和 DOM 操作。项目未依赖任何外部框架或库。

## 2. 项目结构

文件系统组织如下：

```
.
├── sounds/                 # 游戏事件的音频文件
│   ├── bang.mp3
│   ├── click.mp3
│   ├── heartbeat.mp3
│   └── spin.mp3
├── app.yaml                # Google App Engine 配置文件 (可选)
├── background.jpg          # 主菜单背景图片
├── CHANGELOG.md            # 版本变更与更新日志
├── DEVELOPMENT.md          # 英文版开发文档
├── DEVELOPMENT.zh-CN.md    # 中文版开发文档
├── Dockerfile              # 容器化配置文件 (可选)
├── index.html              # 项目唯一的入口和HTML结构
├── lost-bg.jpg             # 游戏失败背景图
├── play-bg.jpg             # 游戏内背景图
├── README.md               # 英文版游戏设计文档 (GDD)
├── README.zh-CN.md         # 中文版 GDD
├── script.js               # 核心游戏逻辑
├── style.css               # 全部视觉样式
├── translations.js         # 中英双语本地化字符串
└── win-bg.jpg              # 游戏胜利背景图
```

## 3. 核心逻辑与架构 (script.js)

游戏的所有逻辑都在一个 `DOMContentLoaded` 事件监听器内运行，通过一组核心对象和函数来管理状态和UI更新。

### 3.1 主要状态对象

-   `player`: 存储玩家当前状态的对象 (`name`, `gold`, `isTurn`, `lives`)。
-   `opponent`: 代表当前 AI 对手的对象。
-   `tournament`: 管理锦标赛结构，包括 `rounds` (回合) 和 `currentRound` (当前回合)。
-   `gameState`: 包含全局游戏状态信息，例如 `gun` 的属性 (`chambers`, `bulletPosition`)、`duelOver` (对决结束) 标志、`difficulty` (难度) 和 `lang` (语言)。

### 3.2 关键函数

-   `resetGame()`: 将所有状态对象重置为默认值，为新游戏做准备。
-   `initializeGame(difficulty)`: 根据所选难度设置初始游戏状态，包括玩家的起始金币。
-   `createTournament()`: 生成16名参赛者的对阵图并渲染到屏幕上。
-   `startNextRound()`: 确定玩家的下一个对手并发起对决。
-   `setupNewDuel()`: 通过设置随机的 `bulletPosition` 来“装填”手枪，决定谁先手，并准备对决界面。
-   `takeAITurn()`: 模拟对手的回合，包括决策逻辑和结果（枪响或空枪）。
-   `handleWin()` / `handleDeath()`: 处理对决结果，包括奖励金币、晋级或提示复活。
-   `updateUI()`: 一个核心函数，用于刷新屏幕上的信息，如金币总数和回合指示器。

### 3.3 游戏流程逻辑

1.  **菜单与设置**: 游戏从主菜单开始。玩家选择难度，调用 `initializeGame()`。然后通过 `createTournament()` 创建对阵图。
2.  **对决循环**:
    *   玩家点击“进入对决”，调用 `startNextRound()` 寻找对手，并调用 `setupNewDuel()` 准备手枪。
    *   玩家（响应 `actionButton` 点击）和 AI (`takeAITurn()`) 轮流行动。
    *   循环持续直到枪响。
3.  **结算**:
    *   若 AI 中枪，调用 `handleWin()`。玩家获得金币，锦标赛晋级。
    *   若玩家中枪，调用 `handleDeath()`。检查玩家是否有足够金币复活，否则游戏结束。
4.  **游戏结束**: 当玩家被淘汰或赢得最终胜利时，触发 `showGameOver()`。显示最终排名并更新最高分。

## 4. 版本管理

本项目遵循标准的 Git 实践进行版本控制。

-   **版本号方案**: 我们使用**语义化版本 (SemVer)**，例如 `v1.0.0`。主版本号用于不兼容的变更，次版本号用于新功能，修订号用于错误修复。
-   **更新日志**: 所有面向用户的变更都必须记录在 `CHANGELOG.md` 中。
-   **分支策略**:
    -   `main`: 此分支应始终保持稳定和可部署。
    -   **功能分支**: 对于新功能，从 `main` 创建分支 (例如 `feature/new-sounds`)。
    -   **修复分支**: 对于错误修复，从 `main` 创建分支 (例如 `fix/revival-bug`)。
-   **提交信息**: 提交信息应清晰、描述性强，并遵循常规格式 (例如 `feat: Add new opponent`, `docs: Update development guide`)。

## 5. 代码风格与贡献指南

-   **代码风格**: 遵循 HTML、CSS 和现代 JavaScript 的标准最佳实践。代码应有良好的注释，特别是对于复杂逻辑。
-   **本地化**: 添加或更改 UI 文本时，确保将其添加到 `translations.js` 文件的 `en` 和 `zh` 语言中，并通过 HTML 中的 `data-lang` 属性应用。
-   **开发流程**:
    1.  为您的功能或修复创建一个新分支。
    2.  实现您的更改。
    3.  彻底测试您的更改。
    4.  如果您的更改面向用户，请更新 `CHANGELOG.md`。
    5.  将您的分支合并回 `main`。
