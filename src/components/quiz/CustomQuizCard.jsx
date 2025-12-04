import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomQuizCard({ quiz, onScoreUpdate }) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState({ quizNumber: null, isCorrect: null });
  const [fadeOut, setFadeOut] = useState(false);
  const [answered, setAnswered] = useState(false);

  const toggleCard = () => {
    setOpen(!open);
  };

  const checkQuiz = (quizNumber, isCorrect) => {
    if (answered) return;

    setFeedback({ quizNumber, isCorrect });
    setFadeOut(false);
    setAnswered(true);

    // If answer is correct, add quiz score to total
    if (isCorrect) {
      onScoreUpdate(quiz.score); // Send quiz's own score value
    }

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setFeedback({ quizNumber: null, isCorrect: null });
        setFadeOut(false);
      }, 300);
    }, 2000);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${open ? 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2' : ''}`}>
      <div className='flex justify-between items-center'>
         <p className='text-xs bg-amber-500/20 px-2 py-1 m-2 rounded-xl font-bold text-amber-500'>category</p>
          <p className="text-xs relative bottom-2 right-2 text-gray-500 mt-1"> <span className="font-semibold">{quiz.score}</span> pts</p>

      </div>
      <div
        onClick={toggleCard}
        className="w-full relative  bg-white p-5 cursor-pointer flex justify-between items-center "
      >
        <div className="flex-1  pr-2">
          <h2 className="text-gray-800 font-semibold text-base">{quiz.question}</h2>
        </div>

      </div>

      {open && (
        <div className="p-5 flex flex-col gap-2 bg-white">
          {quiz.options.map((option) => (
            <button
              key={option.id}
              onClick={() => checkQuiz(option.id, option.isCorrect)}
              disabled={answered}
              className={`w-full px-4 py-3 rounded-md font-medium text-left transition-all duration-300 text-sm ${answered ? 'cursor-not-allowed' : 'cursor-pointer'
                } ${feedback.quizNumber === option.id
                  ? feedback.isCorrect
                    ? `bg-green-50 text-green-700 border border-green-300 ${fadeOut ? 'opacity-0' : 'opacity-100'
                    }`
                    : `bg-red-50 text-red-700 border border-red-300 ${fadeOut ? 'opacity-0' : 'opacity-100'
                    }`
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-100'
                }`}
            >
              {option.id}. {option.label}
              {feedback.quizNumber === option.id && (
                <span className="ml-2">
                  {feedback.isCorrect ? '✓' : '✗'}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}