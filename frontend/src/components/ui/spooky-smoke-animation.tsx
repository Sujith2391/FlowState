import React, { useEffect, useRef } from "react"

export function SpookySmokeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = 40

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      alpha: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 100 + 50
        this.maxLife = Math.random() * 100 + 100
        this.life = this.maxLife
        this.alpha = Math.random() * 0.1 + 0.05
        
        // Subtle monochrome/blue/purple tones
        const colors = [
          "rgba(100, 100, 100, ", 
          "rgba(50, 60, 100, ", 
          "rgba(70, 50, 90, "
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.life--

        if (this.life <= 0) {
          this.x = Math.random() * width
          this.y = Math.random() * height
          this.life = this.maxLife
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        const currentAlpha = (this.life / this.maxLife) * this.alpha
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)
        gradient.addColorStop(0, `${this.color}${currentAlpha})`)
        gradient.addColorStop(1, `${this.color}0)`)
        ctx.fillStyle = gradient
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    let animationFrame: number

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      particles.forEach(p => {
        p.update()
        p.draw(ctx)
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1] opacity-70"
    />
  )
}
