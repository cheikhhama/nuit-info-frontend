import { useState } from "react";
import CustomQuizCard from "../../components/quiz/CustomQuizCard";
export default function QuizPage() {
    const [totalScore, setTotalScore] = useState(0);

    const quizzes = [
        {
            id: 1,
            question: 'What is the capital of France?',
            score: 10,
            options: [
                { id: 1, label: 'London', isCorrect: false },
                { id: 2, label: 'Paris', isCorrect: true },
                { id: 3, label: 'Berlin', isCorrect: false },
            ],
        },
        {
            id: 2,
            question: 'What is 2 + 2?',
            score: 5,
            options: [
                { id: 1, label: '3', isCorrect: false },
                { id: 2, label: '4', isCorrect: true },
                { id: 3, label: '5', isCorrect: false },
            ],
        },
        {
            id: 3,
            question: 'What is the largest planet?',
            score: 15,
            options: [
                { id: 1, label: 'Saturn', isCorrect: false },
                { id: 2, label: 'Earth', isCorrect: false },
                { id: 3, label: 'Jupiter', isCorrect: true },
            ],
        },
        {
            id: 4,
            question: 'Who wrote Romeo and Juliet?',
            score: 8,
            options: [
                { id: 1, label: 'Shakespeare', isCorrect: true },
                { id: 2, label: 'Marlowe', isCorrect: false },
                { id: 3, label: 'Jonson', isCorrect: false },
            ],
        },
        {
            id: 5,
            question: 'What is the smallest country?',
            score: 12,
            options: [
                { id: 1, label: 'Monaco', isCorrect: false },
                { id: 2, label: 'Vatican City', isCorrect: true },
                { id: 3, label: 'Liechtenstein', isCorrect: false },
            ],
        },
        {
            id: 6,
            question: 'What year did World War 2 end?',
            score: 7,
            options: [
                { id: 1, label: '1943', isCorrect: false },
                { id: 2, label: '1945', isCorrect: true },
                { id: 3, label: '1947', isCorrect: false },
            ],
        },
        {
            id: 7,
            question: 'What is the chemical symbol for Gold?',
            score: 6,
            options: [
                { id: 1, label: 'Go', isCorrect: false },
                { id: 2, label: 'Gd', isCorrect: false },
                { id: 3, label: 'Au', isCorrect: true },
            ],
        },
        {
            id: 8,
            question: 'What is the tallest mountain?',
            score: 9,
            options: [
                { id: 1, label: 'K2', isCorrect: false },
                { id: 2, label: 'Mount Everest', isCorrect: true },
                { id: 3, label: 'Kilimanjaro', isCorrect: false },
            ],
        },
        {
            id: 9,
            question: 'What is the speed of light?',
            score: 11,
            options: [
                { id: 1, label: '300,000 km/s', isCorrect: true },
                { id: 2, label: '150,000 km/s', isCorrect: false },
                { id: 3, label: '500,000 km/s', isCorrect: false },
            ],
        },
    ];

    const totalMaxScore = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);

    const handleScoreUpdate = (quizScore) => {
        setTotalScore(prev => prev + quizScore);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-2 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Quiz Page</h1>
                    <div className="bg-white px-6 py-3 rounded-lg border border-gray-200 shadow-sm">
                        <p className="text-sm text-gray-600">Total Score</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {totalScore} <span className="text-gray-500 text-lg">/ {totalMaxScore}</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 auto-rows-max">
                    {quizzes.map((quiz) => (
                        <CustomQuizCard
                            key={quiz.id}
                            quiz={quiz}
                            onScoreUpdate={handleScoreUpdate}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}