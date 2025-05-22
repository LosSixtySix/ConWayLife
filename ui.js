
const pressedKeys = new Set();
const isKeyDown = (key) => pressedKeys.has(key)

let positionsTooFill = [];

const grid = Array.from({length: 600}, () => new Array(600).fill(0));

const nextGrid = Array.from({length: 600}, () => new Array(600).fill(0));

const gameTime = 25;


const colors = ["#1b70c4","#9d7d01","#1b3e8d","#992c99","#539d84","#5d4f15","#5457de"]

class Cell {
    constructor(x,y,color){
        this.x = x;
        this.y = y
        this.color = color;
        this.timeAlive = 0;
    }
}


var start = false

const startButton = document.getElementById("StartGame")

const pauseButton = document.getElementById("PauseGame")

const startGame = (event) =>{
    event.preventDefault()
    start = true
}
const pauseGame = (event)=>{
    event.preventDefault()
    start = false
}

startButton.addEventListener("click",startGame)
pauseButton.addEventListener("click",pauseGame)

var myGameArea = {
    canvas: document.createElement("canvas"),
    getMousePos: function(event){
        var rect = this.canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    },
    start: function(){
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");




        document.body.appendChild(this.canvas)



        

        this.canvas.onmousedown = (event) =>{
            if(event.button === 0)
            {
                const mousePosition = this.getMousePos(event)

                const gridX = Math.trunc(mousePosition.x/5)
                const gridY = Math.trunc(mousePosition.y/5)
                if(grid[gridX][gridY] === 0)
                {
                    let RandomNumber = Math.floor(Math.random() * colors.length)
                    const newCell = new Cell(gridX,gridY,colors[RandomNumber])
                    grid[gridX][gridY] = newCell
                    nextGrid[gridX][gridY] = newCell
                }

            }
            if(event.button === 2)
            {
                const mousePosition = this.getMousePos(event)

                const gridX = Math.trunc(mousePosition.x/5)
                const gridY = Math.trunc(mousePosition.y/5)
                if(grid[gridX][gridY] != 0)
                {
                    grid[gridX][gridY] = 0
                    nextGrid[gridX][gridY] = 0
                }
            }
        }

    }
}


const update = async() =>{
    requestAnimationFrame(()=>{
        
        myGameArea.context.clearRect(0,0,myGameArea.canvas.width,myGameArea.canvas.height)
        if(start)
        {
            for(let x =0; x < grid.length -1; x ++)
            {
                for(let y = 0; y < grid[x].length-1; y ++)
                {
                    if(grid[x][y] != 0)
                    {
                        grid[x][y].timeAlive += 1
                        if(grid[x][y].timeAlive >= 3)
                        {
                            grid[x][y] = 0
                        }
                    }
                    let liveNeighbors = 0
                    if(x > 0)
                    {
                        if(grid[x-1][y] != 0)
                        {
                            liveNeighbors +=1
                        }
                        if(y > 0)
                        {
                            if(grid[x-1][y-1] != 0)
                            {
                                liveNeighbors += 1
                            }
                        }
                        if( y < grid[x].length)
                        {
                            if(grid[x-1][y+1] != 0)
                            {
                                liveNeighbors += 1
                            }
                        }
                        
                    }
                    if(y > 0)
                    {
                        if(x < grid[x].length)
                        {
                            if(grid[x+1][y-1] != 0)
                            {
                                liveNeighbors += 1
                            }
                        }
                        if(grid[x][y-1] != 0)
                            {
                                liveNeighbors +=1
                            }
                    }


                    if(x < grid[x].length && y < grid[x].length)
                    {
                        if(grid[x+1][y] != 0)
                        {
                            liveNeighbors +=1
                        }

                        if(grid[x][y+1] != 0)
                        {
                            liveNeighbors +=1
                        }
                        if(grid[x+1][y+1] != 0)
                        {
                            liveNeighbors +=1
                        }
                    }


                    if(liveNeighbors < 1)
                    {
                        nextGrid[x][y] = 0
                    }
                    if(liveNeighbors > 2)
                    {
                        nextGrid[x][y] = 0
                    }
                    if(liveNeighbors ===1)
                    {

                        let RandomNumber = Math.floor(Math.random() * colors.length)
                        const newCell = new Cell(x,y,colors[RandomNumber])
                        nextGrid[x][y] = newCell
                    }
                    if(nextGrid[x][y] != 0)
                    {
                        const cell = nextGrid[x][y]
                        myGameArea.context.fillStyle = cell.color
                        myGameArea.context.fillRect(cell.x*5,cell.y*5,5,5)
                    }
                }
            }
            for(let x =0; x < grid.length -1; x ++)
            {
                for(let y = 0; y < grid[x].length-1; y ++)
                {
                    grid[x][y] = nextGrid[x][y]
                }
            }
            
        }
        else
        {
            for(let x =0; x < nextGrid.length -1; x ++)
                {
                    for(let y = 0; y < nextGrid[x].length-1; y ++)
                    {
                        if(nextGrid[x][y] != 0)
                            {
                                const cell = nextGrid[x][y]
                                myGameArea.context.fillStyle = cell.color
                                myGameArea.context.fillRect(cell.x*5,cell.y*5,5,5)
                            }
                    }
                }

        }

        
        setTimeout(()=> update(),gameTime)
        
    })
}

myGameArea.start()
update()