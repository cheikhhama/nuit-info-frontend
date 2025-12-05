import React, { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';

export default function CustomLearnCard({ item }) {
  

    return (
        <div className={`bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col h-full ${open ? 'row-span-2' : ''}`}>
            <div className="p-2 cursor-pointer flex-1" >   

                <p className="text-gray-800 p-3 font-semibold text-base">
                    {item.titre}
                </p>
            </div>

           
                <div className="px-5 pb-6 bg-white">
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-yellow-800 mb-1">Solution</h3>
                            <p className="text-sm text-yellow-700 leading-relaxed">
                                {item.contenu}
                            </p>
                        </div>
                    </div>
                </div>
            
        </div>
    );
}