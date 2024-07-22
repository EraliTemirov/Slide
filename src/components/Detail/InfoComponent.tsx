import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'

interface PresentationData {
  name: string
  description: string
  likes: number
  dislikes: number
  views: number
}

interface InfoComponentProps {
  data: PresentationData | null
}

const InfoComponent: React.FC<InfoComponentProps> = ({data}) => {
  const [activeTab, setActiveTab] = useState<'description' | 'statistics' | 'reviews'>(
    'description'
  )
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  if (!data) return null

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment])
      setComment('')
    }
  }

  return (
    <div className='w-full p-6 bg-white rounded-lg shadow-lg flex flex-col justify-between  mx-auto '>
      <div>
        <h2 className='text-3xl font-bold mb-4 text-gray-800'>{data.name}</h2>
        <div className='flex border-b mb-4'>
          <button
            className={`p-2 ${activeTab === 'description' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`p-2 ${activeTab === 'statistics' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('statistics')}
          >
            Statistics
          </button>
          <button
            className={`p-2 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Commit
          </button>
        </div>
      </div>

      {activeTab === 'description' && (
        <div>
          <p className='text-gray-700 mb-4'>{data.description}</p>
        </div>
      )}

      {activeTab === 'statistics' && (
        <div className='text-gray-600 mb-4'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex gap-5'>
              <span className='mr-4 flex items-center'>👍 {data.likes || 0}</span>
              <span className='flex items-center'>👎 {data.dislikes || 0}</span>
            </div>
            <div>
              <span className='flex items-center'>👁️ {data.views || 0} ko'rishlar</span>
            </div>
          </div>
          <h3 className='text-xl font-semibold mb-2'>Baho:</h3>
          <div className='flex mb-4'>
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1
              return (
                <label key={index}>
                  <input
                    type='radio'
                    name='rating'
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className='hidden'
                  />
                  <FaStar
                    size={30}
                    className='cursor-pointer'
                    color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className='flex justify-between'>
          <div className='mb-4'>
            <h3 className='text-xl font-semibold mb-2'>Sharhlar</h3>
            {comments.length === 0 ? (
              <p className='text-gray-600 mb-4'>Hozircha sharh yo'q</p>
            ) : (
              <ul className='list-disc list-inside mb-4'>
                {comments.map((comment, index) => (
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
