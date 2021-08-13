const stats = {
    init: function() {
    },

    addToActionsHistory: function (cellName, hit) {
        // const actionStr = 'Tour#' + data.turn + ' Tir en ' + cellName + ...
        // const maChaineDeCaractere = "comme ça";
        // const maDeuximeChaineDeCaractère = 'comme ça';

        // Nouvelle façon d'écrire les chaines de caractère avec des `
        // const maTroisièmeChaineDeCaractère = `comme ça`;

        let isMissed = 'manqué';
        if(hit) {
            isMissed = 'touché';
        }
        
        const actionStr = `Tour#${game.turn} - Tir en ${cellName} ${hit ? 'touché' : 'manqué'} <br />`;

        const actionsHistoryElement = document.querySelector("#actions");

        actionsHistoryElement.innerHTML = actionStr + actionsHistoryElement.innerHTML;

    },

    get: function() {
        return {
            hitsPercent: ( game.nbHits / game.turn * 100 ),
            missPercent: ( (game.turn - game.nbHits) / game.turn * 100 ),
            shots : game.turn,
        }
    }
}