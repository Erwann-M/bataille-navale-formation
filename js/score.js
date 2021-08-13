const score = {
    history: [],
    init: function() {

    },

    getHistory: function() {
        const scoresJSON = localStorage.getItems('scores');

        if (scoresJSON !== null) {
            score.history = JSON.parse(scoresJSON);
        }

        return score.history;
    },

    save: function(username, score) {
        const newScore = {
            username,       // équivaut a = username: username,
            score,          // équivaut a = score: score,
        }

        // récuperer les scores s'il y en a
        score.getHistory();

        score.history.push(newScore);

        const scoresJSON = JSON.stringify(score.history);

        localStorage.setItem('scores', scoresJSON);
    },

    displayHitResult: function(hit) {
        if (hit) {
            console.warn('Touché !!!');
        } else {
            console.error('Plouf...');
        }
    },
    
    displayHitResultInHTML: function(rowIndex, columnIndex, hit) {
        // 1. je sélectionne le bon <div> dans la page HTML
        const cellId = 'cell' + rowIndex + columnIndex;
        const cell = document.getElementById(cellId);
        // 2. je modifie sa classe CSS
        if (hit) {
            cell.classList.add('hit');
            tools.Overlay("Touche");
        } else {
            cell.classList.add('splash');
            tools.Overlay("Manque");
        }
    }
}