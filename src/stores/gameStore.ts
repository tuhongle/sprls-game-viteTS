import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    const score = ref<number>(0);
    const startGame = ref<boolean>(false);
    const humanColor = ref<string>('');
    const houseColor = ref<string>('');
    const housePicked = ref<boolean>(false);
    const result  = ref<'WIN' | 'LOSE' | 'DRAW' | null>(null);

    const humanPick = (data: string) => {
        startGame.value = true;
        humanColor.value = data;
        setTimeout(() => {
            housePicked.value = true;
            housePick();
            setTimeout(() => {
                whoWin();
                if (result.value === 'LOSE') {
                    score.value --;
                } else if (result.value === 'WIN') {
                    score.value ++;
                }
            }, 1000);
        }, 1500);
    }

    const housePick = () => {
        const x = Math.random();
        if (x < 0.33) {
            houseColor.value = 'paper';
        } else if (x > 0.66) {
            houseColor.value = 'rock';
        } else {
            houseColor.value = 'scissors';
        }
    }

    const whoWin = () => {
        switch (humanColor.value) {
            case ('paper'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'DRAW';
                        break;
                    case ('scissors'):
                        result.value = 'LOSE';
                        break;
                    case ('rock'):
                        result.value = 'WIN';
                        break;
                };
                break;
            case ('scissors'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'WIN';
                        break;
                    case ('scissors'):
                        result.value = 'DRAW';
                        break;
                    case ('rock'):
                        result.value = 'LOSE';
                        break;
                };
                break;
            case ('rock'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'LOSE';
                        break;
                    case ('scissors'):
                        result.value = 'WIN';
                        break;
                    case ('rock'):
                        result.value = 'DRAW';
                        break;
                };
                break;
        }
    }

    const playAgain = () => {
        startGame.value = false;
        humanColor.value = '';
        houseColor.value = '';
        housePicked.value = false;
        result.value = null;
    }

    const bonusHumanPick = (data: string) => {
        startGame.value = true;
        humanColor.value = data;
        setTimeout(() => {
            housePicked.value = true;
            bonusHousePick();
            setTimeout(() => {
                bonusWhoWin();
                if (result.value === 'LOSE') {
                    score.value --;
                } else if (result.value === 'WIN') {
                    score.value ++;
                }
            }, 1000);
        }, 1500);
    }

    const bonusHousePick = () => {
        const x = Math.random();
        if (x <= 0.2) {
            houseColor.value = 'paper';
        } else if (x > 0.2 && x <= 0.4) {
            houseColor.value = 'scissors';
        } else if (x > 0.4 && x <= 0.6){
            houseColor.value = 'rock';
        } else if (x > 0.6 && x <= 0.8){
            houseColor.value = 'lizard';
        } else {
            houseColor.value = 'spock';
        }
    }

    const bonusWhoWin = () => {
        switch (humanColor.value) {
            case ('paper'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'DRAW';
                        break;
                    case ('scissors'):
                        result.value = 'LOSE';
                        break;
                    case ('rock'):
                        result.value = 'WIN';
                        break;
                    case ('lizard'):
                        result.value = 'LOSE';
                        break;
                    case ('spock'):
                        result.value = 'WIN';
                        break;
                };
                break;
            case ('scissors'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'WIN';
                        break;
                    case ('scissors'):
                        result.value = 'DRAW';
                        break;
                    case ('rock'):
                        result.value = 'LOSE';
                        break;
                        case ('lizard'):
                        result.value = 'WIN';
                        break;
                    case ('spock'):
                        result.value = 'LOSE';
                        break;
                };
                break;
            case ('rock'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'LOSE';
                        break;
                    case ('scissors'):
                        result.value = 'WIN';
                        break;
                    case ('rock'):
                        result.value = 'DRAW';
                        break;
                        case ('lizard'):
                        result.value = 'WIN';
                        break;
                    case ('spock'):
                        result.value = 'LOSE';
                        break;
                };
                break;
            case ('lizard'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'WIN';
                        break;
                    case ('scissors'):
                        result.value = 'LOSE';
                        break;
                    case ('rock'):
                        result.value = 'LOSE';
                        break;
                        case ('lizard'):
                        result.value = 'DRAW';
                        break;
                    case ('spock'):
                        result.value = 'WIN';
                        break;
                };
                break;
            case ('spock'):
                switch (houseColor.value) {
                    case ('paper'):
                        result.value = 'LOSE';
                        break;
                    case ('scissors'):
                        result.value = 'WIN';
                        break;
                    case ('rock'):
                        result.value = 'WIN';
                        break;
                        case ('lizard'):
                        result.value = 'LOSE';
                        break;
                    case ('spock'):
                        result.value = 'DRAW';
                        break;
                };
                break;
        }
    }

    return { score, startGame, humanColor, houseColor, housePicked, result
            , humanPick, playAgain, bonusHumanPick
    }
})