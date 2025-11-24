document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const langToggleButton = document.getElementById('lang-toggle-button');
    const playerGoldEl = document.getElementById('player-gold');
    const opponentGoldEl = document.getElementById('opponent-gold');
    const messageBoxEl = document.getElementById('message-box');
    const actionButton = document.getElementById('action-button');
    const mainMenuEl = document.getElementById('main-menu');
    const difficultySelectionEl = document.getElementById('difficulty-selection');
    const gameContainerEl = document.getElementById('game-container');
    const startGameButton = document.getElementById('start-game-button');
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    const bracketEl = document.getElementById('bracket');
    const bracketContainerEl = document.getElementById('bracket-container');
    const continueToDuelButton = document.getElementById('continue-to-duel');
    const gameOverScreenEl = document.getElementById('game-over-screen');
    const finalRankEl = document.getElementById('final-rank');
    const highScoreDisplayEl = document.getElementById('high-score-display');
    const restartButton = document.getElementById('restart-button');
    const historyButton = document.getElementById('history-button');
    const historyScreenEl = document.getElementById('history-screen');
    const backButtons = document.querySelectorAll('.back-button');
    const rulesButton = document.getElementById('rules-button');
    const rulesScreenEl = document.getElementById('rules-screen');
    const exitGameButton = document.getElementById('exit-game-button');
    const cylinderEl = document.getElementById('cylinder');
    const chamberCounterEl = document.getElementById('chamber-counter');
    const playerAvatarEl = document.getElementById('player-avatar');
    const opponentAvatarEl = document.getElementById('opponent-avatar');
    const pulsingOverlayEl = document.getElementById('pulsing-overlay');
    const confirmationOverlayEl = document.getElementById('confirmation-overlay');
    const confirmationMessageEl = document.getElementById('confirmation-message');
    const confirmYesButton = document.getElementById('confirm-yes-button');
    const confirmNoButton = document.getElementById('confirm-no-button');

    // Game State
    let player = { name: '你', gold: 0, isTurn: false, lives: 1 };
    let opponent = {};
    let tournament = { rounds: [], currentRound: 0 };
    let gameState = {
        gun: { chambers: 6, bulletPosition: -1, currentChamber: 0, remainingShots: 6 },
        duelOver: false,
        gameOver: false,
        difficulty: 'Normal',
        lang: 'zh'
    };

    const opponents_zh = [
        { name: '"牛仔"杰克', avatar: '🤠' }, { name: '"快手"比利', avatar: '😎' },
        { name: '"赌徒"汤姆', avatar: '🧐' }, { name: '"老兵"山姆', avatar: '👴' },
        { name: '"幸运"露西', avatar: '💃' }, { name: '"影子"尼克', avatar: '🕵️' },
        { name: '"独眼"巴克', avatar: '👁️' }, { name: '"爵士"弗兰克', avatar: '🎩' },
        { name: '"屠夫"布奇', avatar: '🔪' }, { name: '"医生"霍利迪', avatar: '👨‍⚕️' },
        { name: '"蛇眼"吉姆', avatar: '🐍' }, { name: '"幽灵"卡西迪', avatar: '👻' },
        { name: '"公爵"范恩', avatar: '👑' }, { name: '"男爵"冯·赫尔', avatar: '🧛' },
        { name: '"疯子"马克斯', avatar: '🤪' }
    ];

    const opponents_en = [
        { name: '"Cowboy" Jack', avatar: '🤠' }, { name: '"Quickdraw" Billy', avatar: '😎' },
        { name: '"Gambler" Tom', avatar: '🧐' }, { name: '"Old Man" Sam', avatar: '👴' },
        { name: '"Lucky" Lucy', avatar: '💃' }, { name: '"Shadow" Nick', avatar: '🕵️' },
        { name: '"One-Eye" Buck', avatar: '👁️' }, { name: '"Gentleman" Frank', avatar: '🎩' },
        { name: '"Butcher" Butch', avatar: '🔪' }, { name: '"Doc" Holliday', avatar: '👨‍⚕️' },
        { name: '"Snake-Eye" Jim', avatar: '🐍' }, { name: '"Ghost" Cassidy', avatar: '👻' },
        { name: '"Duke" Vane', avatar: '👑' }, { name: '"Baron" von Hell', avatar: '🧛' },
        { name: '"Mad" Max', avatar: '🤪' }
    ];

    const sounds = {
        click: new Audio('sounds/click.mp3'),
        bang: new Audio('sounds/bang.mp3'),
        spin: new Audio('sounds/spin.mp3'),
        heartbeat: new Audio('sounds/heartbeat.mp3')
    };

    function playSound(sound, loop = false) {
        if (sound === 'heartbeat') {
            pulsingOverlayEl.classList.add('active');
        }
        sounds[sound].loop = loop;
        sounds[sound].currentTime = 0;
        sounds[sound].play().catch(e => console.error(`Error playing sound: ${sound}`, e));
    }

    function stopSound(sound) {
        if (sound === 'heartbeat') {
            pulsingOverlayEl.classList.remove('active');
        }
        sounds[sound].pause();
        sounds[sound].currentTime = 0;
    }
    
    function setLanguage(lang) {
        gameState.lang = lang;
        document.body.className = `lang-${lang}`; // Add class to body
        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.dataset.lang;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    function resetGame() {
        mainMenuEl.classList.add('active');
        [difficultySelectionEl, historyScreenEl, bracketContainerEl, gameOverScreenEl, gameContainerEl].forEach(el => {
            el.classList.remove('active');
            if(el === gameContainerEl) el.style.display = 'none';
        });

        // Stop all sounds
        stopSound('heartbeat'); // Explicitly stop heartbeat and remove pulse
        Object.values(sounds).forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });

        player = { name: gameState.lang === 'zh' ? '你' : 'You', gold: 0, isTurn: false, lives: 1, loser: false, winner: false };
        tournament = { rounds: [], currentRound: 0 };
        gameState = {
            gun: { chambers: 6, bulletPosition: -1, currentChamber: 0, remainingShots: 6 },
            duelOver: false, gameOver: false, difficulty: 'Normal', lang: gameState.lang
        };
        // Explicitly reset gold display
        playerGoldEl.textContent = `$0`;
        updateUI();
    }

    function initializeGame(difficulty) {
        gameState.difficulty = difficulty;
        player.gold = { 'Easy': 2000, 'Normal': 500, 'Hard': 0, 'Hell': -1000 }[difficulty];
        createTournament();
        updateUI(); // Force UI update to show initial gold
    }

    function createTournament() {
        tournament.currentRound = 0;
        const currentOpponents = gameState.lang === 'zh' ? opponents_zh : opponents_en;
        player.name = gameState.lang === 'zh' ? '你' : 'You';
        
        let participants = [{...player, avatar: '🙂'}, ...currentOpponents.map(o => ({...o, gold: 0}))]; // Initialize opponent gold
        participants.sort(() => Math.random() - 0.5);
        
        // Set player avatar in the duel screen
        playerAvatarEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="0.1em" font-size="90">🙂</text></svg>`;

        tournament.rounds = [];
        tournament.rounds[0] = [];
        for (let i = 0; i < participants.length; i += 2) {
            tournament.rounds[0].push([participants[i], participants[i+1]]);
        }
        renderBracket();
        difficultySelectionEl.classList.remove('active');
        bracketContainerEl.classList.add('active');
    }

    function renderBracket() {
        bracketEl.innerHTML = '';
        tournament.rounds.forEach(round => {
            const roundEl = document.createElement('div');
            roundEl.classList.add('round');
            round.forEach(match => {
                if (!match || match.length < 2) return;
                const matchEl = document.createElement('div');
                matchEl.classList.add('match');
                
                const p1 = match[0] || { name: 'TBD', avatar: '?' };
                const p2 = match[1] || { name: 'TBD', avatar: '?' };

                let p1HTML = `<div class="participant ${p1.winner ? 'winner' : ''} ${p1.loser ? 'loser' : ''}"><span class="participant-avatar">${p1.avatar || ''}</span>${p1.name}</div>`;
                let p2HTML = `<div class="participant ${p2.winner ? 'winner' : ''} ${p2.loser ? 'loser' : ''}"><span class="participant-avatar">${p2.avatar || ''}</span>${p2.name}</div>`;
                
                matchEl.innerHTML = p1HTML + p2HTML;
                roundEl.appendChild(matchEl);
            });
            bracketEl.appendChild(roundEl);
        });
    }
    
    function startNextRound() {
        gameState.duelOver = false;
        const currentRoundMatches = tournament.rounds[tournament.currentRound];
        const playerName = gameState.lang === 'zh' ? '你' : 'You';
        let playerMatch = currentRoundMatches.find(m => m.some(p => p && p.name === playerName && !p.loser));

        if (!playerMatch || !playerMatch.find(p => p && p.name !== playerName)) {
            gameState.gameOver = true;
            setTimeout(showGameOver, 2000);
            return;
        }
        opponent = playerMatch.find(p => p.name !== playerName);
        
        document.getElementById('opponent-name').textContent = opponent.name;
        opponentAvatarEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" x="0.1em" font-size="90">${opponent.avatar}</text></svg>`;
        playerAvatarEl.classList.remove('ko');
        opponentAvatarEl.classList.remove('ko');

        setupNewDuel();
    }

    function setupNewDuel() {
        messageBoxEl.textContent = translations[gameState.lang].prepare;
        actionButton.disabled = true;
        gameState.gun.bulletPosition = Math.floor(Math.random() * gameState.gun.chambers);
        gameState.gun.remainingShots = 6;
        updateCylinder();
        playSound('spin');
        gameState.gun.currentChamber = Math.floor(Math.random() * gameState.gun.chambers);

        setTimeout(() => {
            let playerStartsChance = 0.5;
            if (gameState.difficulty === 'Hell') playerStartsChance = 0.8;
            const playerStarts = Math.random() < playerStartsChance;
            player.isTurn = playerStarts;
            opponent.isTurn = !playerStarts;
            
            messageBoxEl.textContent = playerStarts ? (gameState.lang === 'zh' ? "你被迫先手！" : "You are forced to go first!") : (gameState.lang === 'zh' ? "对手先开枪。" : "Opponent goes first.");
            if (player.isTurn) {
                actionButton.textContent = gameState.lang === 'zh' ? "对自己开枪" : "Shoot Yourself";
                actionButton.disabled = false;
                playSound('heartbeat', true);
            } else {
                actionButton.textContent = translations[gameState.lang].wait;
                actionButton.disabled = true;
                setTimeout(takeAITurn, 2000);
            }
            updateUI();
        }, 2000);
    }
    
    function takeAITurn() {
        messageBoxEl.textContent = gameState.lang === 'zh' ? "对手正在思考..." : "Opponent is thinking...";
        setTimeout(() => {
            const isBullet = gameState.gun.currentChamber === gameState.gun.bulletPosition;
            gameState.gun.remainingShots--;
            updateCylinder(gameState.gun.currentChamber, isBullet);

            if (isBullet) {
                playSound('bang');
                messageBoxEl.textContent = gameState.lang === 'zh' ? "枪响了... 对手死了。你晋级了！" : "BANG... Opponent is dead. You advance!";
                opponentAvatarEl.classList.add('ko');
                gameState.duelOver = true;
                handleWin();
            } else {
                playSound('click');
                messageBoxEl.textContent = gameState.lang === 'zh' ? "咔哒... 对手空枪了。轮到你了！" : "Click... Opponent missed. Your turn!";
                gameState.gun.currentChamber = (gameState.gun.currentChamber + 1) % gameState.gun.chambers;
                player.isTurn = true;
                opponent.isTurn = false;
                updateUI();
                actionButton.textContent = gameState.lang === 'zh' ? "对自己开枪" : "Shoot Yourself";
                actionButton.disabled = false;
                playSound('heartbeat', true);
            }
        }, 2000);
    }

    function updateUI() {
        playerGoldEl.textContent = `$${player.gold}`;
        opponentGoldEl.textContent = `$${opponent.gold}`;
        document.getElementById('player-area').style.borderColor = player.isTurn ? '#c9b48a' : '#555';
        document.getElementById('opponent-area').style.borderColor = opponent.isTurn ? '#c9b48a' : '#555';
        chamberCounterEl.textContent = gameState.gun.remainingShots;
    }

    function updateCylinder(firedChamber = -1, wasBullet = false) {
        cylinderEl.innerHTML = '';
        const radius = 60;
        for (let i = 0; i < 6; i++) {
            const chamber = document.createElement('div');
            chamber.classList.add('chamber');
            const angle = (i / 6) * 2 * Math.PI - (Math.PI / 2);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            chamber.style.transform = `translate(${x}px, ${y}px)`;

            if (i === firedChamber && wasBullet) {
                chamber.style.backgroundColor = '#ab4444';
            } else if (i === firedChamber) {
                chamber.style.backgroundColor = '#555';
            }
            cylinderEl.appendChild(chamber);
        }
    }
    
    actionButton.addEventListener('click', () => {
        if (!player.isTurn || gameState.gameOver) return;
        stopSound('heartbeat');
        actionButton.disabled = true;
        const isBullet = gameState.gun.currentChamber === gameState.gun.bulletPosition;
        gameState.gun.remainingShots--;
        updateCylinder(gameState.gun.currentChamber, isBullet);
        
        if (isBullet) {
            playSound('bang');
            setTimeout(handleDeath, 100);
        } else {
            playSound('click');
            messageBoxEl.textContent = gameState.lang === 'zh' ? "咔哒... 空枪。" : "Click... An empty chamber.";
            gameState.gun.currentChamber = (gameState.gun.currentChamber + 1) % gameState.gun.chambers;
            player.isTurn = false;
            opponent.isTurn = true;
            updateUI();
            setTimeout(takeAITurn, 2000);
        }
    });

    function handleWin() {
        let reward = 0;
        let msg = "";
        switch(tournament.currentRound) {
            case 0: reward = 500; msg = gameState.lang === 'zh' ? " 进入8强，奖励$500！" : " Advanced to Quarter-finals, +$500!"; break;
            case 1: reward = 1500; msg = gameState.lang === 'zh' ? " 进入4强，奖励$1500！" : " Advanced to Semi-finals, +$1500!"; break;
            case 2: reward = 8000; msg = gameState.lang === 'zh' ? " 进入决赛，奖励$8000！" : " Advanced to Finals, +$8000!"; break;
            case 3: 
                reward = 40000; 
                msg = gameState.lang === 'zh' ? " 赢得冠军，奖励$40000！" : " CHAMPION! +$40000!";
                gameState.gameOver = true;
                player.winner = true;
        }
        messageBoxEl.textContent += msg;
        player.gold += reward;
        updateUI();

        if(gameState.gameOver) {
            setTimeout(showGameOver, 2000);
            return;
        }

        setTimeout(() => {
            advanceTournament();
            renderBracket();
            gameContainerEl.style.display = 'none';
            bracketContainerEl.classList.add('active');
        }, 3000);
    }
    
    function advanceTournament() {
        const currentRoundMatches = tournament.rounds[tournament.currentRound];
        const nextRoundWinners = [];
        const playerName = gameState.lang === 'zh' ? '你' : 'You';
        currentRoundMatches.forEach(match => {
            let winner;
            const playerInMatch = match.find(p => p && p.name === playerName);
            if (playerInMatch && !playerInMatch.loser) {
                winner = playerInMatch;
                const loser = match.find(p => p !== winner);
                if(loser) loser.loser = true;
            } else {
                winner = match[Math.floor(Math.random() * 2)];
                const loser = match.find(p => p !== winner);
                if(loser) loser.loser = true;
            }
            if (winner) {
                winner.winner = true;
                nextRoundWinners.push(winner);
            }
        });
        
        tournament.currentRound++;
        tournament.rounds[tournament.currentRound] = [];
        for (let i = 0; i < nextRoundWinners.length; i += 2) {
            const p1 = {...nextRoundWinners[i], winner: false, loser: false};
            const p2 = nextRoundWinners[i+1] ? {...nextRoundWinners[i+1], winner: false, loser: false} : undefined;
            tournament.rounds[tournament.currentRound].push([p1, p2]);
        }
    }

    function showConfirmation(message, onYes, onNo) {
        confirmationMessageEl.textContent = message;
        confirmationOverlayEl.classList.add('active');

        const yesHandler = () => {
            confirmationOverlayEl.classList.remove('active');
            onYes();
            confirmYesButton.removeEventListener('click', yesHandler);
            confirmNoButton.removeEventListener('click', noHandler);
        };

        const noHandler = () => {
            confirmationOverlayEl.classList.remove('active');
            onNo();
            confirmYesButton.removeEventListener('click', yesHandler);
            confirmNoButton.removeEventListener('click', noHandler);
        };

        confirmYesButton.addEventListener('click', yesHandler);
        confirmNoButton.addEventListener('click', noHandler);
    }

    function handleDeath() {
        const resurrectionCost = { 'Easy': 1000, 'Normal': 1500, 'Hard': 3000, 'Hell': 10000 }[gameState.difficulty];
        const confirmMsg = gameState.lang === 'zh' ? `枪响了！是否花费 $${resurrectionCost} 买一条命？` : `BANG! Spend $${resurrectionCost} to buy your life back?`;

        const die = () => {
            messageBoxEl.textContent = gameState.lang === 'zh' ? "枪响了... 你死了。金币不足以复活。" : "BANG... You're dead. Not enough gold to resurrect.";
            actionButton.textContent = translations[gameState.lang].gameOverTitle;
            gameState.gameOver = true;
            player.loser = true;
            playerAvatarEl.classList.add('ko');
            setTimeout(showGameOver, 2000);
        };

        if (player.gold >= resurrectionCost) {
            showConfirmation(confirmMsg, 
                () => { // onYes
                    player.gold -= resurrectionCost;
                    messageBoxEl.textContent = gameState.lang === 'zh' ? `你花钱买通了裁判！裁判重新装填了子弹...` : `You bribed the judge! The gun is being reloaded...`;
                    updateUI();
                    setTimeout(setupNewDuel, 2000);
                },
                () => { // onNo
                    die();
                }
            );
        } else {
            die();
        }
    }

    function showGameOver() {
        stopSound('heartbeat');
        gameContainerEl.style.display = 'none';
        
        let rank;
        if (player.winner) {
            rank = gameState.lang === 'zh' ? "冠军" : "Champion";
            gameOverScreenEl.style.backgroundImage = "url('win-bg.jpg')";
        } else {
            gameOverScreenEl.style.backgroundImage = "url('lost-bg.jpg')";
            switch(tournament.currentRound) {
                case 0: rank = gameState.lang === 'zh' ? "16强" : "Round of 16"; break;
                case 1: rank = gameState.lang === 'zh' ? "8强" : "Quarter-finals"; break;
                case 2: rank = gameState.lang === 'zh' ? "4强 (半决赛)" : "Semi-finals"; break;
                case 3: rank = gameState.lang === 'zh' ? "亚军 (决赛)" : "Runner-up"; break;
                default: rank = gameState.lang === 'zh' ? "16强" : "Round of 16";
            }
        }

        finalRankEl.textContent = `${gameState.lang === 'zh' ? '你的最终成绩' : 'Your Final Rank'}: ${rank}`;
        saveHighScore(player.gold, rank);
        
        gameOverScreenEl.classList.add('active');
    }

    function saveHighScore(score, rank) {
        const highScore = localStorage.getItem('russianRouletteHighScore') || -Infinity;
        if (score > highScore) {
            localStorage.setItem('russianRouletteHighScore', score);
            localStorage.setItem('russianRouletteHighScoreRank', rank);
            localStorage.setItem('russianRouletteHighScoreDate', new Date().toLocaleString());
        }
    }

    function loadHighScore() {
        const score = localStorage.getItem('russianRouletteHighScore') || '0';
        let rank = localStorage.getItem('russianRouletteHighScoreRank') || (gameState.lang === 'zh' ? '无' : 'N/A');
        const date = localStorage.getItem('russianRouletteHighScoreDate') || (gameState.lang === 'zh' ? '无记录' : 'No Record');

        if (gameState.lang === 'en') {
            const rankMap = {
                "冠军": "Champion",
                "亚军 (决赛)": "Runner-up",
                "4强 (半决赛)": "Semi-finals",
                "8强": "Quarter-finals",
                "16强": "Round of 16",
                "无": "N/A"
            };
            rank = rankMap[rank] || rank;
        }

        return `${gameState.lang === 'zh' ? '第1名' : '1st'}: ${rank} - ${score} ${gameState.lang === 'zh' ? '金币' : 'Gold'} (${date})`;
    }

    // --- Event Listeners ---
    startGameButton.addEventListener('click', () => {
        mainMenuEl.classList.remove('active');
        difficultySelectionEl.classList.add('active');
    });

    historyButton.addEventListener('click', () => {
        mainMenuEl.classList.remove('active');
        highScoreDisplayEl.textContent = loadHighScore();
        historyScreenEl.classList.add('active');
    });

    rulesButton.addEventListener('click', () => {
        mainMenuEl.classList.remove('active');
        rulesScreenEl.classList.add('active');
    });

    langToggleButton.addEventListener('click', () => {
        const newLang = gameState.lang === 'zh' ? 'en' : 'zh';
        setLanguage(newLang);
    });

    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            historyScreenEl.classList.remove('active');
            rulesScreenEl.classList.remove('active');
            mainMenuEl.classList.add('active');
        });
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const difficulty = button.dataset.difficulty;
            initializeGame(difficulty);
        });
    });

    continueToDuelButton.addEventListener('click', () => {
        bracketContainerEl.classList.remove('active');
        gameContainerEl.style.display = 'flex';
        startNextRound();
    });

    restartButton.addEventListener('click', resetGame);
    exitGameButton.addEventListener('click', resetGame);
});
