import React from 'react'
import CustomLearnCard from '../../components/learn/CustomLearnCard'

export default function LearnPage() {
   

    return (
        <div className="bg-gray-50 min-h-screen py-2 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Page d'apprentissage</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                    {learnItems.map((item) => (
                        <CustomLearnCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}