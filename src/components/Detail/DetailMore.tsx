import React, {useState, useEffect, useRef} from 'react'
import {useParams} from 'react-router-dom'
import PresentationComponent from './PresentationComponent'
import InfoComponent from './InfoComponent'
import {Maximize2, Minimize2} from 'lucide-react'

const localPresentationData = {
  name: "Zamonaviy Texnologiyalar va Ularning Ta'siri",
  description:
    "Bu prezentatsiya zamonaviy texnologiyalarning hayotimizga ta'siri, ularning afzalliklari va potensial xavflarini ko'rib chiqadi. Biz sun'iy intellekt, internet of things, virtual reallik va boshqa innovatsiyalarni muhokama qilamiz. Shuningdek, bu texnologiyalarning kelajakdagi rivojlanish yo'nalishlari va jamiyatga ta'siri haqida fikr yuritamiz.",
  likes: 1520,
  dislikes: 45,
  views: 25000,
  plans: [
    {
      name: 'Kirish: Zamonaviy Texnologiyalar Panoramasi',
      description: [
        {
          content: [
            {
              title: 'Texnologik Revolyutsiya',
              content: "21-asr texnologik yutuqlarining qisqacha tarixi va umumiy ko'rinishi",
            },
            {
              title: "Asosiy Yo'nalishlar",
              content: "Hozirgi kunda eng muhim va tez rivojlanayotgan texnologik yo'nalishlar",
            },
          ],
        },
      ],
    },
    {
      name: "Sun'iy Intellekt (AI) va Machine Learning",
      description: [
        {
          content: [
            {title: 'AI Asoslari', content: "Sun'iy intellekt nima va u qanday ishlaydi"},
            {
              title: 'Machine Learning Turlari',
              content:
                "Supervised, unsupervised va reinforcement learning haqida qisqacha ma'lumot",
            },
            {
              title: "AI Qo'llanilishi",
              content: "Tibbiyot, moliya, transport va boshqa sohalarda AI ning qo'llanilishi",
            },
          ],
        },
      ],
    },
    {
      name: 'Internet of Things (IoT)',
      description: [
        {
          content: [
            {title: 'IoT Tushunchasi', content: 'Internet of Things nima va u qanday ishlaydi'},
            {
              title: 'Smart Uylar',
              content: "IoT texnologiyalarining uy-joy sohasida qo'llanilishi",
            },
            {
              title: 'Sanoatda IoT',
              content: 'Industrial IoT va uning ishlab chiqarishdagi ahamiyati',
            },
          ],
        },
      ],
    },
    {
      name: 'Virtual va Kengaytirilgan Reallik (VR/AR)',
      description: [
        {
          content: [
            {
              title: 'VR va AR Farqi',
              content: "Virtual va kengaytirilgan reallik o'rtasidagi asosiy farqlar",
            },
            {
              title: "O'yin Sanoatida Qo'llanilishi",
              content: "VR va AR texnologiyalarining o'yin industriyasiga ta'siri",
            },
            {
              title: "Ta'lim va Treningda Foydalanish",
              content:
                "VR/AR yordamida ta'lim va kasbiy tayyorgarlik jarayonlarini takomillashtirish",
            },
          ],
        },
      ],
    },
    {
      name: 'Blockchain va Kriptovalyutalar',
      description: [
        {
          content: [
            {title: 'Blockchain Texnologiyasi', content: 'Blockchain nima va u qanday ishlaydi'},
            {
              title: 'Kriptovalyutalar',
              content: "Bitcoin va boshqa kriptovalyutalar haqida umumiy ma'lumot",
            },
            {
              title: "Moliyaviy Xizmatlarda Qo'llanilishi",
              content: "Blockchain texnologiyasining bank va moliya sohasida qo'llanilishi",
            },
          ],
        },
      ],
    },
    {
      name: "Texnologiyalarning Jamiyatga Ta'siri",
      description: [
        {
          content: [
            {
              title: "Ijobiy Ta'sirlar",
              content: 'Zamonaviy texnologiyalarning hayot sifatini yaxshilashdagi roli',
            },
            {
              title: 'Potensial Xavflar',
              content: "Texnologiyaning salbiy ta'sirlari va ularni bartaraf etish yo'llari",
            },
            {
              title: 'Kelajak Istiqbollari',
              content:
                "Texnologik rivojlanishning kelajakdagi yo'nalishlari va kutilayotgan natijalar",
            },
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
    <div className='detail-more-container h-screen grid grid-rows-[70%_30%]'>
      <div className='presentation-container relative overflow-hidden' ref={presentationRef}>
        <PresentationComponent data={data} isFullscreen={isFullscreen} />
        <div className='absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 z-10'>
          <button className='p-2 bg-gray-800 text-white rounded-full' onClick={toggleFullscreen}>
            {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
          </button>
        </div>
      </div>
      <div className='info-container overflow-y-auto bg-gray-100'>
        <InfoComponent data={data} />
      </div>
    </div>
  )
}

export default DetailMore
