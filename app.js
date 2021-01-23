let Board, Const, n, libre;
document.getElementById("libre").checked = true;
document.getElementById("solve").disabled = true;
document.getElementById("iniciarBtn").click();

function iniciar(){
    event.preventDefault();
    n = parseInt(document.getElementById("dimension").value);
    libre = document.getElementById("libre").checked;
    msj("created board:",n)
    let tableRef = document.getElementById("chessBoard");
    tableRef.innerHTML = "";		
    Board = new Array(n).fill(-1);
    Const = new Array(n).fill(false);
    for(let i = 0; i < n; i++){
        let newRow = tableRef.insertRow(-1);
        for(let j = 0; j < n; j++){
            let newCell = newRow.insertCell(-1);
            newCell.id = i.toString() + j.toString();
            if(!libre)
                newCell.onclick = cellClick;
            else
                newCell.onclick = cellClickFree;
            if( (i+j)%2 == 0)
                newCell.className= "light";
            else
                newCell.className= "dark";
        }
    }
}
function checkboxClick(){
    let checked = this.checked;
    this.checked = !checked;
    document.getElementById("iniciarBtn").click();
    document.getElementById("solve").disabled = checked;
}
function cellClickFree(){
    event.preventDefault();
    msj("clicked:", this.id);
    if(!this.innerText)
        this.innerText = "♕";
    else 
        this.innerText = "";
}
function cellClick(){
    event.preventDefault();		
    let i= parseInt(this.id[0]);
    let j = parseInt(this.id[1]);
    msj("clicked:", i, j);
    if(!this.innerText){
        if(Board[j] === -1 && check(i,j)){				
            this.innerText = "♕";
            Board[j] = i;
            Const[j] = true;
        }
    }		 	
    else{
        this.innerText = "";
        Board[j] = -1;
        Const[j] = false;
    }
    msj("Board: ", Board);
    //msj("Const: ", Const);
}
function check(i, j){
    let sw = true;
    for(let k=0;k<n;k++){
        if(Board[k] !== -1){
            if(Board[k] === i)
                sw = false;
            if(Math.abs(k - j) == Math.abs(Board[k]- i))
                sw = false;
        }			
    }
    return sw;
}
function solveClick(){
    event.preventDefault();
    if(solve(0)){
        msj("solve: ",Board);
        for(let j=0;j<n;j++){
            i = Board[j];
            document.getElementById(i.toString() + j.toString()).innerText = "♕";
            Const[j] = true;
        }
    }else{
        msj("No hay solucionn posible")
        for(let j=0;j<n;j++){
            if(!Const[j]){
                Board[j] = -1;
            }
        }
    }
    
}
function solve(j){
    event.preventDefault();
    if(j >= n) return true;
    if(!Const[j]){
        for(let i=0;i<n;i++){
            if(check(i,j)){
                Board[j] = i;
                if(solve(j+1))
                    return true;
                Board[j] = -1;	
            }
        }
        return false;
    }
    return solve(j+1);
}
function msj(msj,...arguments){
    console.log(msj,arguments);
}
function db(...arguments){
    console.log(arguments);
}