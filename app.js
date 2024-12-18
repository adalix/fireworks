const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')


const button = document.querySelector('button')
console.log(button)

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

const gravity = 0.05 // 0.005
const friction = 0.99

class Particle{
    constructor(x, y, radius, color, velocity){
        this.x = x;
        this.y = y ;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.alpha = 1;
    }
    draw(){
        ctx.save()
        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
        ctx.restore()
    }
    update(){
        this.draw()
        this.velocity.x *= friction
        this.velocity.y *= friction
        this.velocity.y += gravity
        this.x += this.velocity.x * 0.5
        this.y += this.velocity.y * 0.5
        this.alpha -= 0.001
    }
}

let particles
function init(){
    particles =[]
    
}
function animate (){
    requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle,index) => {
        if(particle.alpha > 0){
            particle.update()
        }else{
            particles.splice(index, 1)
        }
    });
}

init()
animate()

window.addEventListener('click',(e)=> {
    mouse.x = e.clientX,
    mouse.y = e.clientY

    const particleCount = 100
    const angleIncrement = Math.PI * 2 / particleCount;
    const power = 8 // 10

    for(let i = 0; i < particleCount; i++){
        particles.push(new Particle(mouse.x, mouse.y, 2, `hsl(${Math.random() * 360}, 70%, 50%)`, {
            x: Math.cos(angleIncrement * i) * Math.random() * power,
            y: Math.sin(angleIncrement * i) * Math.random() * power 
        }))
    }
    console.log(`you clicked ${mouse.x},${mouse.y}`)
})