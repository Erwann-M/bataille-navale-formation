const game = {
    turn: 0,
    nbHits: 0,
    score: 0,
    timer: null,
    isOver: false,

    init: function() {
        game.addEventListeners();
        game.startTimer();
        game.isOver = false;
    },

    checkGameOver: function() {
        const remainingBoats = grid.getBoatsLeft();

        if(remainingBoats === 0) {
            game.isOver = true;
        } else {
            game.isOver = false;
        }

        document.querySelector('#score').innerText = game.score + "pts";

        

        return game.isOver;
    },

    startTimer: function() {
        game.timer = setInterval(() => {
            if (!game.isOver) {
                document.querySelector('#score').innerText = game.score + "pts";
                game.score -= 1000;
            } else {
                clearInterval(game.timer);
            }
            
        }, 1000);
        document.querySelector('#score').innerText = game.score + "pts";
    },

    addEventListeners: function() {
        // Fonction pour ajouter les noms des cellules dans le html (dans le dataset) : data-cell-name

        // Récupérer toutes les lignesp
        const rows = document.querySelectorAll('.row');

        //Pour chaque ligne dans rows, 
        for (let i = 0; i < rows.length; i++) {

            const cells = rows[i].querySelectorAll('div.cell');

            for (let j = 0; j < cells.length; j++) {
                cells[j].addEventListener('click', game.handleCellClick);
            }
        }
    },

    handleCellClick: function(evt) {
        game.sendMissile(evt.target.dataset.cellName);
        
        if(game.checkGameOver()) {
            game.showGameOver();
        }
    },

    newTurn: function() {
        game.turn++;

        const h3Element = document.querySelector('.tour');

        h3Element.innerText = game.turn;
    },

    showGameOver: function() {
        alert('End of Game ! \n SCORE : ' + game.score);
    },

    sendMissileAt: function(rowIndex, columnIndex) {

        if(game.isOver) {
            return false;
        }

        let targetCell = grid.cells[rowIndex][columnIndex];
        let result;
    
        if (targetCell === '🛥') {
            grid.cells[rowIndex][columnIndex] = 't';
            game.score += 30000;
            result = true;
        } else if (targetCell === 't' || targetCell === 'p') {
                console.error('Un missile a deja été tiré ici');
        } else {
            grid.cells[rowIndex][columnIndex] = 'p';
            result = false;
            game.score -= 9000;
        }
        grid.display();

        return result;
    },

    sendMissile: function(cellName) {
    
        // On utilise la fonction grid.getIndexes qui traduit notre string (ex: A5) en index (Ex: A5 => row = 4 et column = 0)
        const result = grid.getIndexes(cellName);
        const rowIndex = result[0];
        const columnIndex = result[1];
    
        //? alternative au trois ligne au dessus
        //? const [rowIndex, columnIndex] = grid.getIndexes(cellName);
        
        // Puis on appelle la fonction sendMissileAt
        // on prend soin de retourner la valeur de retour de sendMissileAt
        // (VRAI si touché, FALSE sinon)
        const hit = game.sendMissileAt(rowIndex, columnIndex);

        if (hit) {
            game.nbHits++;
        }

        score.displayHitResult(hit);
        score.displayHitResultInHTML(rowIndex, columnIndex, hit);
    
        stats.addToActionsHistory(cellName, hit);
    
        game.newTurn();
        return hit;
    },
    
}