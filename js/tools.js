const tools = {
    getInputValue: function(inputSelector) {
        const inputElement = document.querySelector(inputSelector);

        return inputElement.value;
    },
    
    eraseInput: function(inputSelector) {

        // On sélectionne notre champ
        const input = document.querySelector(inputSelector);

        // On définit la nouvelle de l'input comme étant une chaîne vide
        input.value = '';

        // On donne le focus au champ après l'avoir vidé
        input.focus();
    }, 

    Overlay: function(failWin) {
        document.getElementById("overlay"+ failWin).style.display = "flex";
        document.getElementById('imgOverlay' + failWin).style.display = "flex";

        setTimeout(function() {
            document.getElementById("overlay"+ failWin).style.display = "none";
            document.getElementById('imgOverlay' + failWin).style.display = "none";
        }, 500);
    },
    
}