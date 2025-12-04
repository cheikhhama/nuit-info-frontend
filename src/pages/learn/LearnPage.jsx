import React from 'react'

export default function LearnPage() {
    const quizzes = [
        {
            id: 1,
            title: "Quiz 1",
            description: "Description 1",
            questions: [
                {
                    id: 1,
                    question: "Question 1",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: true },
                        { id: 2, text: "Answer 2", isCorrect: false },
                        { id: 3, text: "Answer 3", isCorrect: false },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
                {
                    id: 2,
                    question: "Question 2",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: false },
                        { id: 2, text: "Answer 2", isCorrect: true },
                        { id: 3, text: "Answer 3", isCorrect: false },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
                {
                    id: 3,
                    question: "Question 3",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: false },
                        { id: 2, text: "Answer 2", isCorrect: false },
                        { id: 3, text: "Answer 3", isCorrect: true },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
            ],
        },
        {
            id: 2,
            title: "Quiz 2",
            description: "Description 2",
            questions: [
                {
                    id: 1,
                    question: "Question 1",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: true },
                        { id: 2, text: "Answer 2", isCorrect: false },
                        { id: 3, text: "Answer 3", isCorrect: false },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
                {
                    id: 2,
                    question: "Question 2",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: false },
                        { id: 2, text: "Answer 2", isCorrect: true },
                        { id: 3, text: "Answer 3", isCorrect: false },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
                {
                    id: 3,
                    question: "Question 3",
                    answers: [
                        { id: 1, text: "Answer 1", isCorrect: false },
                        { id: 2, text: "Answer 2", isCorrect: false },
                        { id: 3, text: "Answer 3", isCorrect: true },
                        { id: 4, text: "Answer 4", isCorrect: false },
                    ],
                },
            ],
        },
    ];
        return (
        <div className="bg-gray-50 min-h-screen py-2 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Page d'apprentissage</h1>

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
    )
}