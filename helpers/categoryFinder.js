import extractKeywords from 'keyword-extractor';

const categories = [
  { category: 'cyclefeed', keywords: ['cycling', 'cycle', 'bicyle', 'biking'] },
  { category: 'backpacking', keywords: ['backpacker', 'backpack'] },
  { category: 'hitchhiking', keywords: ['hitch', 'hitchhike'] },
  {
    category: 'traveladvice',
    keywords: ['packing', 'recommendation', 'guide'],
  },
  { category: 'foodoftheworld', keywords: ['food', 'restaurant', 'eat'] },
  { category: 'budgettravel', keywords: ['budget', 'money', 'spending'] },
  { category: 'digitalnomdads', keywords: ['nomad', 'work', 'income'] },
  {
    category: 'photofeed',
    keywords: ['photography', 'camera', 'photographer'],
  },
  { category: 'family', keywords: ['kids', 'children', 'family-friendly'] },
  { category: 'hiking', keywords: ['mountains', 'hike', 'boots'] },
  { category: 'wildlife', keywords: ['animal', 'bear', 'birds'] },
];

const categoryFinder = text => {
  const keywords = extractKeywords.extract(text, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  const matches = [];

  keywords.forEach(k => {
    categories.forEach(c => {
      if (
        (c.keywords.indexOf(k) !== -1 || c.category.indexOf(k) !== -1) &&
        matches.indexOf(c.category) === -1
      )
        matches.push(c.category);
    });
  });

  return matches;
};

export default categoryFinder;
