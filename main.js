
let temp = [];
const pole = {
    stage: {
        level1: [
            [1,1,0,0,0,0],
            [0,1,1,0,0,0],
            [0,0,1,1,0,0],
            [0,1,0,1,1,0],
            [2,0,0,0,0,0],
            [0,0,1,0,0,1],
            [1,1,0,0,1,1],
        ],
        level1Start : null,
        level1End : null,
        level2: [],
    },
    cell_active: null,

    renderLevel(lev) {
        const block = document.querySelector('.block');
        

        for(let i = 0; i < lev.length; i++){
            let row = document.createElement('div');
            row.classList.add('row');

            for(j = 0; j < lev[i].length; j++){
                let cell = document.createElement('div');
                if( lev[i][j] == 1) {
                    cell.classList.add('cell-black');
                    temp.push(`${i},${j}`);
                }
                if(lev[i][j] == 2) {
                    cell.classList.add('cell-active');
                    this.stage.level1Start = `${i},${j}`;
                }
                cell.classList.add('cell');
                cell.setAttribute('data-cell', `${i},${j}`);
               
                row.append(cell);
            }
            block.append(row);

        }   

    }   
}

let audio = new Audio('./sound/move.mp3');
let audio2 = new Audio('./sound/error.mp3');
audio.preload = 'auto';
audio2.preload = 'auto';
//audio.src = './sound/move.mp3';
// audio.play();


pole.renderLevel(pole.stage.level1);

let btnL = document.querySelector('[data-btn="L"]');
let btnR = document.querySelector('[data-btn="R"]');
let btnU = document.querySelector('[data-btn="U"]');
let btnD = document.querySelector('[data-btn="D"]');

const box = document.querySelector(`[data-cell="${pole.stage.level1Start}"]`); //стартовая ячейка
const cell = document.querySelectorAll('.cell');

let x = box.dataset.cell[0];
let y = box.dataset.cell[2];

x = Number(x);
y = Number(y);
console.log(x,y);



document.addEventListener('keydown', function(event) {
      
    let t;
    
    let next;
    let prev;

           
    switch (event.code) {
        case 'ArrowRight':
            y = y + 1;
           
            box.classList.remove('cell-active');
                                                        
            if(document.querySelector(`[data-cell="${x},${y}"`) !== null && temp.includes(document.querySelector(`[data-cell="${x},${y}"`).dataset.cell) !== true) {
                
                audio.play();

                t = document.querySelector(`[data-cell="${x},${y}"`).dataset.cell;
                next = document.querySelector(`[data-cell="${x},${y}"`);
                       
                next.classList.add('cell-active');
                prev = document.querySelector(`[data-cell="${x},${y-1}"`);
                prev.classList.remove('cell-active');
                y = Number(t[2]);
                
                checkErrorCells (x, y);

            }
            else {
                y = y - 1;
                audio2.play();
                //console.log(x,y);
            }
          
        break;

        case'ArrowLeft':
            
            y = y - 1;
                                             
            if(document.querySelector(`[data-cell="${x},${y}"`) !== null && temp.includes(document.querySelector(`[data-cell="${x},${y}"`).dataset.cell) !== true) {
                
                audio.play();

                t = document.querySelector(`[data-cell="${x},${y}"`).dataset.cell;
                next = document.querySelector(`[data-cell="${x},${y}"`);
                       
                next.classList.add('cell-active');
                prev = document.querySelector(`[data-cell="${x},${y+1}"`);
                prev.classList.remove('cell-active');
                y = Number(t[2]);

                checkErrorCells (x, y);            
                
            }
        
            else {
                y = y + 1;
                audio2.play();
                //console.log(x,y);
                
            }
                   
        break;

        case'ArrowUp':
            x = x - 1;
           
            if(document.querySelector(`[data-cell="${x},${y}"`) !== null && temp.includes(document.querySelector(`[data-cell="${x},${y}"`).dataset.cell) !== true) {
                
                audio.play();

                t = document.querySelector(`[data-cell="${x},${y}"`).dataset.cell;
                next = document.querySelector(`[data-cell="${x},${y}"`);
                       
                next.classList.add('cell-active');
                prev = document.querySelector(`[data-cell="${x+1},${y}"`);
                prev.classList.remove('cell-active');
                y = Number(t[2]);

                checkErrorCells (x, y);
                //console.log(y);
            }
            else {
                x = x + 1;
                audio2.play();
                //console.log(x,y);
            }

    
        break;

        case'ArrowDown':
        
            x = x + 1;
          
            if(document.querySelector(`[data-cell="${x},${y}"`) !== null && temp.includes(document.querySelector(`[data-cell="${x},${y}"`).dataset.cell) !== true) {
                
                audio.play();

                t = document.querySelector(`[data-cell="${x},${y}"`).dataset.cell;
                next = document.querySelector(`[data-cell="${x},${y}"`);
                       
                next.classList.add('cell-active');
                prev = document.querySelector(`[data-cell="${x-1},${y}"`);
                prev.classList.remove('cell-active');
                y = Number(t[2]);

                checkErrorCells (x, y);
                //console.log(y);
            }
            else {
                x = x - 1;
                audio2.play();
                //console.log(x,y);
            }
    
        break;

    }
});

function checkErrorCells (x, y) {
    //console.log(temp);
    //console.log('--------------');
    //console.log(x,y);

    if(document.querySelector(`[data-cell="${x},${y+1}"`) == null || temp.includes(document.querySelector(`[data-cell="${x},${y+1}"`).dataset.cell) == true) {
        //console.log('next error');
        btnR.disabled = true;
    }
    else btnR.disabled = false;

    if(document.querySelector(`[data-cell="${x+1},${y}"`) == null || temp.includes(document.querySelector(`[data-cell="${x+1},${y}"`).dataset.cell) == true) {
        //console.log('next error');
        btnD.disabled = true;
    }
    else btnD.disabled = false;

    if(document.querySelector(`[data-cell="${x},${y-1}"`) == null || temp.includes(document.querySelector(`[data-cell="${x},${y-1}"`).dataset.cell) == true) {
        //console.log('next error');
        btnL.disabled = true;
    }
    else btnL.disabled = false;

    if(document.querySelector(`[data-cell="${x-1},${y}"`) == null || temp.includes(document.querySelector(`[data-cell="${x-1},${y}"`).dataset.cell) == true) {
        //console.log('next error');
        btnU.disabled = true;
    }
    else btnU.disabled = false;
   
}
