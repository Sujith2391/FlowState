import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface StoryScrollProps {
  children?: React.ReactNode
}

export function StoryScroll({ children }: StoryScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const sections = gsap.utils.toArray(contentRef.current.children)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
      },
    })

    sections.forEach((sec: any, i) => {
      if (i === 0) return 
      tl.fromTo(
        sec,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, duration: 1 }
      )
      if (i < sections.length - 1) {
        tl.to(sec, { autoAlpha: 0, y: -100, duration: 1 })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div ref={contentRef} className="relative w-full max-w-5xl mx-auto px-6 flex items-center justify-center h-full">
        {children || (
          <>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                The AI Workspace <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Reimagined.</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                FlowState AI integrates deeply with your workflow, bringing intelligent task management, seamless collaboration, and automated insights into one elegant interface.
              </p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transform translate-y-[100px]">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Generate <span className="text-blue-500">Roadmaps</span> in Seconds.
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Simply describe your product goals. Our Gemini-powered AI engine instantly builds complete task breakdowns, sprint plans, and project milestones.
              </p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transform translate-y-[100px]">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
                Real-time Collaboration.
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Experience fluid, zero-latency teamwork. Live messaging, instant typing indicators, and shared kanban boards that update instantly across your entire team.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
