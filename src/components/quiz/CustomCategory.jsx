export const CustomCategory = (categoryName) => {
  const categoryMap = {
    'big tech': 'font-semibold text-blue-600 bg-blue-500/20 px-3 py-1 rounded-xl',
    'éducation numérique': 'font-semibold text-green-600 bg-green-500/20 px-3 py-1 rounded-xl',
    'bien-être numérique': 'font-semibold text-purple-600 bg-purple-500/20 px-3 py-1 rounded-xl',
    'gestion du temps d\'écran': 'font-semibold text-orange-600 bg-orange-500/20 px-3 py-1 rounded-xl',
    'sécurité et confidentialité': 'font-semibold text-red-600 bg-red-500/20 px-3 py-1 rounded-xl',
    'engagement citoyen': 'font-semibold text-pink-600 bg-pink-500/20 px-3 py-1 rounded-xl',
  };

  return categoryMap[categoryName.toLowerCase()] || 'text-gray-900';
};