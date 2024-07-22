import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import PresentationComponent from './PresentationComponent'
import InfoComponent from './InfoComponent'
import {Maximize2, Minimize2} from 'lucide-react'

const localPresentationData = {
  name: 'Prezentatsiya Nomi',
  description:
    'Bu prezentatsiya tavsifi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero mollitia maiores soluta ratione eaque id! Deleniti eaque eum accusamus quasi, tempora odio eius excepturi voluptas deserunt sed magni, suscipit totam.',
  likes: 120,
  dislikes: 5,
  views: 3000,
  plans: [
    {
      name: 'Reja 1',
      description: [
        {
          content: [
            {title: 'Kontent 1.1', content: 'Kontent 1.1 tafsilotlari'},
            {title: 'Kontent 1.2', content: 'Kontent 1.2 tafsilotlari'},
          ],
        },
      ],
    },
    {
      name: 'Reja 2',
      description: [
        {
          content: [
            {title: 'Kontent 2.1', content: 'Kontent 2.1 tafsilotlari'},
            {title: 'Kontent 2.2', content: 'Kontent 2.2 tafsilotlari'},
          ],
        },
      ],
    },
  ],
}

const DetailMore: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const [data, setData] = useState(localPresentationData)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const presentationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setData(localPresentationData)
  }, [id])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (!presentationRef.current) return

    try {
      if (!document.fullscreenElement) {
        if (presentationRef.current.requestFullscreen) {
          await presentationRef.current.requestFullscreen()
        } else if ((presentationRef.current as any).webkitRequestFullscreen) {
          await (presentationRef.current as any).webkitRequestFullscreen()
        } else if ((presentationRef.current as any).msRequestFullscreen) {
          await (presentationRef.current as any).msRequestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      }
    } catch (error) {
      console.error('Fullscreen toggle failed:', error)
    }
  }

  return (
    <div className='detail-more-container h-screen grid grid-rows-[65%_35%]'>
      <div className='presentation-container relative overflow-hidden' ref={presentationRef}>
        <PresentationComponent data={data} isFullscreen={isFullscreen} />
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10'>
          <button className='p-2 bg-gray-800 text-white rounded-full'>&lt;</button>
          <button className='p-2 bg-gray-800 text-white rounded-full' onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
          <button className='p-2 bg-gray-800 text-white rounded-full'>&gt;</button>
        </div>
      </div>
      <div className='info-container overflow-y-auto bg-gray-100'>
        <InfoComponent data={data} />
      </div>
    </div>
  )
}

export default DetailMore
