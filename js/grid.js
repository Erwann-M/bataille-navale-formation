const grid = {
    init: function() {

        grid.cells = [
            //A   B    C    D    E    F    G    H
            ['' , '🛥', '🛥', '🛥', '' , '' , '' , ''],// 1
            ['' , '' , '' , '' , '' , '' , '' , ''],// 2
            ['' , '' , '' , '' , '' , '🛥', '' , ''],// 3
            ['' , '' , '' , '' , '' , '🛥', '' , ''],// 4
            ['' , '' , '' , '' , '' , '🛥', '' , ''],// 5
            ['' , '' , '' , '' , '' , '🛥', '' , ''],// 6
            ['🛥', '🛥', '🛥', '🛥', '🛥', '' , '' , ''],// 7
            ['' , '' , '' , '' , '' , '' , '' , ''],// 8
        ];

        grid.display();
        grid.addCellNames();
    },
    cells: [],
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

    getBoatsLeft: function() {
        let nbBoats = 0;

        for (let row = 0; row < 8; row++) {
            for (let column = 0; column < 8; column++) {
                if (grid.cells[row][column] === '🛥') {
                    nbBoats++;
                } 
            }
        }

        return nbBoats;
    },

    displayLine: function(rowIndex) {

        let line = grid.cells[rowIndex];
    
        let lineAsText = rowIndex + 1 + ' ';
    
        for (let columnIndex = 0; columnIndex < line.length; columnIndex++){
                let currentCharacter = line[columnIndex];
        
                if (currentCharacter === '') {
                    currentCharacter = '~';
                } else if (currentCharacter === '🛥') {
                    // const cellId = 'cell' + rowIndex + columnIndex;
                    // const cell = document.getElementById(cellId);
                    // cell.innerText = '🛥';
                }
        
                lineAsText += currentCharacter + ' ';
        }
        console.log(lineAsText);
    },

    display: function() {
        console.warn('Grille : ');
        console.log('  ' + grid.columns.join(' '))
        for (let index = 0; index < grid.cells.length; index++) {
            grid.displayLine(index);
        }
    },

    getIndexes: function(cellName) {

        console.warn('Ca tire sur ' + cellName );
        // récupere la chaine entre 0 et 1 (1 n'est pas compris) 
        let letter = cellName.substring(0, 1);
        let digit = cellName.substring(1, 2);
        letter = letter.toUpperCase();
    
        const rowIndex = Number(digit) -1;

        const columnIndex = grid.columns.indexOf(letter);
    
        return [rowIndex, columnIndex];
        
    },

    getNameFromIndexes: function(rowIndex, columnIndex) {
        return grid.columns[columnIndex] + rowIndex;
    },

    addCellNames: function() {
        const rows = document.querySelectorAll('.row'); // on recupere chaques lignes
    
        // pour chaque lignes dans rows
        for (let i = 0; i < rows.length; i++) {
    
            const cells = rows[i].querySelectorAll("div.cell");
    
            for (let j = 0; j < cells.length; j++) {
    
                cells[j].dataset.cellName = grid.getNameFromIndexes(i, j);
                
            }
        }
    },

    checkCellName: function(cellName) {
        
        const cellElement = document.querySelector('.cell[data-cell-name="' + cellName + '"]');

        // Si elle existe, alors l'entrée user est valide
        if (cellElement != null) {
            return true;
        } else {
            // Sinon nope... pas bon !
            return false;
        }
    }
}