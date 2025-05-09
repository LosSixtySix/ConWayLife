
const pressedKeys = new Set();
const isKeyDown = (key) => pressedKeys.has(key)

let positionsTooFill = [];

let deadCells = new Set();

let livingCells = new Set();

const gameTime = 500;

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
                console.log(mousePosition)
                
                positionsTooFill.push(mousePosition)
            }
        }

    }
}

const update = async() =>{
    requestAnimationFrame(()=>{

        while(positionsTooFill.length > 0)
        {
            const Position = positionsTooFill.pop()

            myGameArea.context.fillStyle = "#000000"
            myGameArea.context.fillRect(Position.x,Position.y,4,4)

            livingCells.add(Position)
        }


        setTimeout(()=> update(),gameTime)
    })
}

myGameArea.start()
update()