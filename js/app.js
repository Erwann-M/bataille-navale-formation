const app = {
    init: function () {
        const formElement = document.querySelector("#game .form");
        formElement.addEventListener("submit", app.handleFormSubmit);

        const statsBtnElement = document.querySelector("#stats");
        statsBtnElement.addEventListener("click", app.handleViewStats);

        const toggleActionsBtnElement = document.querySelector("#toggle-actions");
        toggleActionsBtnElement.addEventListener("click", app.handleActionsToggle);

        const formStartGameElement = document.querySelector("#beforegame .form");
        formStartGameElement.addEventListener("submit", app.displayGame);

        document.querySelector('#select_theme').addEventListener('change', app.handleThemeChange)

        grid.init();
        game.init();
        stats.init();
        score.init();

        app.loadTheme();

    },

    loadTheme: function() {
        // on recupere le cookie
        const cookies = document.cookie.split('; ');
        // tableau ['cookie=val, cookie=val']

        // on rechertche dans le tableau créer le cookie en question
        const themeCookie = cookies.find(cookie => cookie.startsWith('battleship-theme='));

        // on split le resultat du dessus pour avoir la valeur du cookie
        const themeCookieValue = themeCookie.split('=')[1];

        // on met le cookie qu'on vas charger au debut du programme .

        document.querySelector("#select_theme").value = themeCookieValue;  
        

        app.changeThemes(themeCookieValue);
    },

    handleThemeChange: function(evt) {
        // On récupère l'element select qui a déclanché l'event
        const selectElement = evt.target;
        // On récupère la value selectionné du select
        const theme = selectElement.value;

        // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
        // Nom du cookie : battleship-theme
        // Valeur : themeValue 
        // Expiration : max-age : 86400 * 365
        document.cookie = `battleship-theme=${theme};max-age=${365 * 86400}`;

        app.changeThemes(theme);

    },

    changeThemes: function(theme) {

        // On récupère ensuite l'élement body
        const gameContainer = document.querySelector('body');

        const selectElement = document.querySelector('#select_theme');

        // On réupère touts les options possible du select
        const options = selectElement.querySelectorAll('option');

        // On nettoie toutes les classes qui pourraient être activés 
        for (let option of options) {
            // On rétire chaque option.value qui correspond à un nom de classe
            gameContainer.classList.remove(option.value);
        }

        gameContainer.classList.add(theme);
    },

    handleFormSubmit: function(evt) {
    
        evt.preventDefault();
        
        let cellToHit = document.querySelector("#cellToHit");
        
        let cellToHitValue = cellToHit.value;
        
        console.log(cellToHitValue);
        
        sendMissile(cellToHitValue);
        
        eraseInput();
    },

    handleViewStats: function() {
        const statistics = stats.get();

        let statsStr = '======== GAME STATS ========\n';
        statsStr += 'Hit percentage : ' + statistics.hitsPercent.toFixed(2) + '%\n';
        statsStr += 'Miss percentage : ' + statistics.missPercent.toFixed(2) + '%\n';
        statsStr += 'Number of shots : ' + statistics.shots + '\n';
        statsStr += '===========================';

        alert(statsStr);
    },

    handleActionsToggle :  function() {
        // On récupère l'élement #actions
        const actionsHistoryElement = document.querySelector("#actions");

        // On accède à tous les propriétés CSS à travers <element>.style
        // Dans notre cas à nous, c'est le display qui nous interesse
        // Si aucun style n'est précisé, alors passer le display en block
        if(actionsHistoryElement.style.display === '') {
            actionsHistoryElement.style.display = 'block';
        } else { // Sinon le retirer
            actionsHistoryElement.style.display = '';
        }
    },

    displayGame: function(evt) {
        let formStart = document.querySelector('#beforegame');
        let game = document.querySelector('#game');
        
        evt.preventDefault();
        
        let inputUserName = document.querySelector('#username');
        let titleUser = document.querySelector('.username');
        
        var userName = inputUserName.value;
        
        titleUser.innerText = userName;
        
        if(getComputedStyle(formStart).display != "none"){
            formStart.style.display = "none";
            game.style.display = "block";
            let inputGame = document.querySelector('#cellToHit');
            inputGame.focus();
        } else {
            formStart.style.display = "block";
            game.style.display = "none";
        }
    },
}

document.addEventListener('DOMContentLoaded', app.init);