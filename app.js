const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2 
}

addEventListener('resize',()=>{
    canvas.width = innerWidth
    canvas.height = innerHeight
})

class Particle{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y ;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    update(){
        this.draw()
        this.x += this.velocity.x * 0.5
        this.y += this.velocity.y * 0.5
    }
}

let particles
function init(){
    particles =[]
    
}
function animate (){
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    particles.forEach(particle => {
        particle.update()
    });
}

init()
animate()

window.addEventListener('click',(e)=> {
    mouse.x = e.clientX,
    mouse.y = e.clientY

    const particleCount = 400
    const angleIncrement = Math.PI * 2 / particleCount;

    for(let i = 0; i< particleCount; i++){
        particles.push(new Particle(mouse.x, mouse.y, 4, 'purple', {
            x: Math.cos(angleIncrement * i) * Math.random(),
            y: Math.sin(angleIncrement * i) * Math.random()
        }))
    }
    console.log(`you clicked ${mouse.x},${mouse.y}`)
})