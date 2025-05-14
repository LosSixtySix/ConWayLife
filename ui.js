
const pressedKeys = new Set();
const isKeyDown = (key) => pressedKeys.has(key)

let positionsTooFill = [];

const grid = Array.from({length: 120}, () => new Array(120).fill(0));

const gameTime = 500;

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
                if(grid[gridX][gridY] != 1)
                {
                    grid[gridX][gridY] = 1
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
                    let liveNeighbors = 0
                    if(x > 0)
                    {
                        if(grid[x-1][y] === 1)
                        {
                            liveNeighbors +=1
                        }
                        if(y > 0)
                        {
                            if(grid[x-1][y-1] === 1)
                            {
                                liveNeighbors += 1
                            }
                        }
                        if( y < grid[x].length)
                        {
                            if(grid[x-1][y+1] === 1)
                            {
                                liveNeighbors += 1
                            }
                        }
                        
                    }
                    if(y > 0)
                    {
                        if(x < grid[x].length)
                        {
                            if(grid[x+1][y-1] === 1)
                            {
                                liveNeighbors += 1
                            }
                        }
                        if(grid[x][y-1] === 1)
                            {
                                liveNeighbors +=1
                            }
                    }


                    if(x < grid[x].length && y < grid[x].length)
                    {
                        if(grid[x+1][y] === 1)
                        {
                            liveNeighbors +=1
                        }

                        if(grid[x][y+1] === 1)
                        {
                            liveNeighbors +=1
                        }
                        if(grid[x+1][y+1] === 1)
                        {
                            liveNeighbors +=1
                        }
                    }


                    if(liveNeighbors < 2)
                    {
                        grid[x][y] = 0
                    }
                    if(liveNeighbors > 3)
                    {
                        grid[x][y] = 0
                    }
                    if(liveNeighbors ===3)
                    {
                        grid[x][y] = 1
                    }
                    if(grid[x][y] === 1)
                    {
                        myGameArea.context.fillStyle = "#000000"
                        myGameArea.context.fillRect(x*5,y*5,5,5)
                    }
                }
            }
        }
        else
        {
            for(let x =0; x < grid.length -1; x ++)
                {
                    for(let y = 0; y < grid[x].length-1; y ++)
                    {
                        if(grid[x][y] === 1)
                            {
                                myGameArea.context.fillStyle = "#000000"
                                myGameArea.context.fillRect(x*5,y*5,5,5)
                            }
                    }
                }

        }

        
        setTimeout(()=> update(),gameTime)
        
    })
}

myGameArea.start()
update()