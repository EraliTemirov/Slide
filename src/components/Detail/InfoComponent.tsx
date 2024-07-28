import React, {useState, useEffect} from 'react'
import {FaStar} from 'react-icons/fa'

interface PresentationData {
  id: number
  name: string
  description: string
  likes: Set<string>
  dislikes: Set<string>
  views: Set<string>
  comments: string[]
  rating: number
}

interface LocalDatabase {
  presentations: PresentationData[]
  getPresentationById: (id: number) => PresentationData | undefined
  addComment: (id: number, newComment: string) => void
  updateRating: (id: number, newRating: number) => void
  toggleLike: (id: number, userId: string) => void
  toggleDislike: (id: number, userId: string) => void
  addView: (id: number, userId: string) => void
}

const initialDatabase: LocalDatabase = {
  presentations: [
    {
      id: 1,
      name: 'INTERNET OF THINGS (IOT)',
      description:
        "Ushbu taqdimot hujayra tuzilishi va funksiyalari haqida batafsil ma'lumot beradi.",
      likes: new Set(),
      dislikes: new Set(),
      views: new Set(),
      comments: ['Juda foydali taqdimot, rahmat!', "Tushunish oson bo'ldi."],
      rating: 4.5,
    },
    {
      id: 2,
      name: 'INTERNET OF THINGS (IOT)',
      description:
        "Kimyoviy elementlarning davriy jadvali va ularning xususiyatlari haqida to'liq ma'lumot.",
      likes: new Set(),
      dislikes: new Set(),
      views: new Set(),
      comments: [
        'Davriy jadval haqida ajoyib tushuntirish.',
        "Elementlar haqida ko'proq ma'lumot bo'lsa yaxshi bo'lardi.",
      ],
      rating: 4.2,
    },
  ],
  getPresentationById(id: number) {
    return this.presentations.find((p) => p.id === id)
  },
  addComment(id: number, newComment: string) {
    const presentation = this.getPresentationById(id)
    if (presentation) {
      presentation.comments.push(newComment)
    }
  },
  updateRating(id: number, newRating: number) {
    const presentation = this.getPresentationById(id)
    if (presentation) {
      presentation.rating = newRating
    }
  },
  toggleLike(id: number, userId: string) {
    const presentation = this.getPresentationById(id)
    if (presentation) {
      if (presentation.likes.has(userId)) {
        presentation.likes.delete(userId)
      } else {
        presentation.likes.add(userId)
        presentation.dislikes.delete(userId)
      }
    }
  },
  toggleDislike(id: number, userId: string) {
    const presentation = this.getPresentationById(id)
    if (presentation) {
      if (presentation.dislikes.has(userId)) {
        presentation.dislikes.delete(userId)
      } else {
        presentation.dislikes.add(userId)
        presentation.likes.delete(userId)
      }
    }
  },
  addView(id: number, userId: string) {
    const presentation = this.getPresentationById(id)
    if (presentation) {
      presentation.views.add(userId)
    }
  },
}

const getInitialDatabase = (): LocalDatabase => {
  const storedData = localStorage.getItem('presentationDatabase')
  if (storedData) {
    const parsedData = JSON.parse(storedData)
    parsedData.presentations.forEach((presentation: PresentationData) => {
      presentation.likes = new Set(presentation.likes)
      presentation.dislikes = new Set(presentation.dislikes)
      presentation.views = new Set(presentation.views)
    })
    return {
      ...parsedData,
      getPresentationById: (id: number) =>
        parsedData.presentations.find((p: PresentationData) => p.id === id),
      addComment: (id: number, newComment: string) => {
        const presentation = parsedData.presentations.find((p: PresentationData) => p.id === id)
        if (presentation) {
          presentation.comments.push(newComment)
        }
      },
      updateRating: (id: number, newRating: number) => {
        const presentation = parsedData.presentations.find((p: PresentationData) => p.id === id)
        if (presentation) {
          presentation.rating = newRating
        }
      },
      toggleLike: (id: number, userId: string) => {
        const presentation = parsedData.presentations.find((p: PresentationData) => p.id === id)
        if (presentation) {
          if (presentation.likes.has(userId)) {
            presentation.likes.delete(userId)
          } else {
            presentation.likes.add(userId)
            presentation.dislikes.delete(userId)
          }
        }
      },
      toggleDislike: (id: number, userId: string) => {
        const presentation = parsedData.presentations.find((p: PresentationData) => p.id === id)
        if (presentation) {
          if (presentation.dislikes.has(userId)) {
            presentation.dislikes.delete(userId)
          } else {
            presentation.dislikes.add(userId)
            presentation.likes.delete(userId)
          }
        }
      },
      addView: (id: number, userId: string) => {
        const presentation = parsedData.presentations.find((p: PresentationData) => p.id === id)
        if (presentation) {
          presentation.views.add(userId)
        }
      },
    }
  }
  return initialDatabase
}

interface InfoComponentProps {
  dataId: number
  userId: string
}

const InfoComponent: React.FC<InfoComponentProps> = ({dataId, userId}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'statistics' | 'reviews'>(
    'description'
  )
  const [comment, setComment] = useState('')
  const [database, setDatabase] = useState<LocalDatabase>(getInitialDatabase())
  const [currentPresentation, setCurrentPresentation] = useState<PresentationData | null>(null)

  useEffect(() => {
    const presentation = database.getPresentationById(dataId)
    if (presentation) {
      setCurrentPresentation({...presentation})
      if (!presentation.views.has(userId)) {
        database.addView(dataId, userId)
        setDatabase({...database})
      }
    }
  }, [dataId, userId, database])

  useEffect(() => {
    const dataToStore = {
      ...database,
      presentations: database.presentations.map((p) => ({
        ...p,
        likes: Array.from(p.likes),
        dislikes: Array.from(p.dislikes),
        views: Array.from(p.views),
      })),
    }
    localStorage.setItem('presentationDatabase', JSON.stringify(dataToStore))
  }, [database])

  if (!currentPresentation) {
    return <div>Ma'lumot topilmadi (ID: {dataId})</div>
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      database.addComment(currentPresentation.id, comment)
      setCurrentPresentation({
        ...currentPresentation,
        comments: [...currentPresentation.comments, comment],
      })
      setComment('')
      setDatabase({...database})
    }
  }

  const handleRatingChange = (newRating: number) => {
    database.updateRating(currentPresentation.id, newRating)
    setCurrentPresentation({...currentPresentation, rating: newRating})
    setDatabase({...database})
  }

  const handleLike = () => {
    database.toggleLike(currentPresentation.id, userId)
    setCurrentPresentation({...database.getPresentationById(currentPresentation.id)!})
    setDatabase({...database})
  }

  const handleDislike = () => {
    database.toggleDislike(currentPresentation.id, userId)
    setCurrentPresentation({...database.getPresentationById(currentPresentation.id)!})
    setDatabase({...database})
  }

  return (
    <div className='w-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between mx-auto'>
      <div>
        <h2 className='text-3xl font-bold mb-4 text-gray-800'>{currentPresentation.name}</h2>
        <div className='flex border-b mb-4'>
          <button
            className={`p-2 ${activeTab === 'description' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Tavsif
          </button>
          <button
            className={`p-2 ${activeTab === 'statistics' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistika
          </button>
          <button
            className={`p-2 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Sharhlar
          </button>
        </div>
      </div>

      {activeTab === 'description' && (
        <div>
          <p className='text-gray-700 mb-4'>{currentPresentation.description}</p>
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className='flex justify-between text-gray-600 mb-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-5'>
              <span className='mr-4 flex items-center cursor-pointer' onClick={handleLike}>
                👍 {currentPresentation.likes.size}
              </span>
              <span className='flex items-center cursor-pointer' onClick={handleDislike}>
                👎 {currentPresentation.dislikes.size}
              </span>
            </div>
          </div>
          <div className='flex gap-4 mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Baho:</h3>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <input
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => handleRatingChange(ratingValue)}
                    className='hidden'
                  />
                  <FaStar
                    size={30}
                    className='cursor-pointer'
                    color={ratingValue <= currentPresentation.rating ? '#ffc107' : '#e4e5e9'}
                  />
                </label>
              )
            })}
          </div>
          <div>
            <span className='flex items-center'>
              👁️ {currentPresentation.views.size} ko'rishlar
            </span>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className='flex flex-col'>
          <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Sharhlar</h3>
            {currentPresentation.comments.length === 0 ? (
              <p className='text-gray-600 mb-4'>Hozircha sharh yo'q</p>
            ) : (
              <ul className='list-disc list-inside mb-4'>
                {currentPresentation.comments.map((comment, index) => (
                  <li key={index} className='text-gray-700 mb-2'>
                    {comment}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <textarea
              className='w-full p-2 border rounded-lg mb-2 resize-none h-20'
              placeholder='Sharhingizni yozing...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='px-4 py-2 bg-blue-500 text-white rounded-lg'
              onClick={handleCommentSubmit}
            >
              Sharh qoldirish
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InfoComponent
