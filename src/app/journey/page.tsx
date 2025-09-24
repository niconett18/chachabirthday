import { InteractivePhotoJourney } from '../../components';

// Function to generate photo info based on filename
function generatePhotoInfo(filename: string) {
  const name = filename.replace(/\.(jpg|jpeg|png)$/i, '').toLowerCase();
  
  const photoInfoMap: Record<string, { title: string; caption: string; emoji: string; month: number; day: number }> = {
    'firstdate': { 
      title: 'Our First Date', 
      caption: 'The beginning of everything beautiful', 
      emoji: '✨', 
      month: 8, 
      day: 17 
    },
    '17thdate': { 
      title: 'Chacha\'s 17th Birthday', 
      caption: 'Celebrating the most amazing girl', 
      emoji: '🎂', 
      month: 2, 
      day: 14 
    },
    'badmintondate': { 
      title: 'Badminton Adventures', 
      caption: 'Game, set, match... you won my heart!', 
      emoji: '🏸', 
      month: 3, 
      day: 15 
    },
    'barbiedate': { 
      title: 'Barbie Movie Night', 
      caption: 'Life in plastic, it\'s fantastic with you!', 
      emoji: '💗', 
      month: 7, 
      day: 21 
    },
    'bloomdate': { 
      title: 'Blooming Together', 
      caption: 'Like flowers, our love keeps growing', 
      emoji: '🌸', 
      month: 4, 
      day: 10 
    },
    'catcafedate': { 
      title: 'Cat Cafe Cuteness', 
      caption: 'Purr-fect afternoon with my favorite girl', 
      emoji: '🐱', 
      month: 5, 
      day: 12 
    },
    'crochetdate': { 
      title: 'Crafting Memories', 
      caption: 'Creating beautiful things together', 
      emoji: '🧶', 
      month: 6, 
      day: 3 
    },
    'discorddate': { 
      title: 'Virtual Date Night', 
      caption: 'Distance means nothing when hearts are close', 
      emoji: '💻', 
      month: 1, 
      day: 5 
    },
    'ikeadate': { 
      title: 'IKEA Adventure', 
      caption: 'Building our future, one furniture piece at a time', 
      emoji: '🛋️', 
      month: 8, 
      day: 20 
    },
    'kimukatsu date': { 
      title: 'Kimukatsu Feast', 
      caption: 'Sharing delicious moments and even better company', 
      emoji: '🍖', 
      month: 9, 
      day: 15 
    },
    'kopijjdate': { 
      title: 'Coffee Connection', 
      caption: 'Brewing love one sip at a time', 
      emoji: '☕', 
      month: 2, 
      day: 28 
    },
    'mrtdate': { 
      title: 'MRT Journey', 
      caption: 'Every destination is perfect with you', 
      emoji: '🚇', 
      month: 7, 
      day: 8 
    },
    'nailartdate': { 
      title: 'Nail Art Session', 
      caption: 'Pretty nails for the prettiest girl', 
      emoji: '💅', 
      month: 5, 
      day: 25 
    },
    'newhairdate': { 
      title: 'New Hair, New Vibes', 
      caption: 'Every style looks perfect on you', 
      emoji: '✨', 
      month: 6, 
      day: 18 
    },
    'osisdate': { 
      title: 'Sweet Osis Treats', 
      caption: 'Desserts as sweet as you', 
      emoji: '🧁', 
      month: 4, 
      day: 22 
    },
    'paintingdate': { 
      title: 'Art & Creativity', 
      caption: 'Creating masterpieces together', 
      emoji: '🎨', 
      month: 3, 
      day: 30 
    },
    'pancorandate': { 
      title: 'Pancoran Exploration', 
      caption: 'City adventures with my favorite person', 
      emoji: '🌆', 
      month: 8, 
      day: 5 
    },
    'schooldate': { 
      title: 'School Visit', 
      caption: 'Learning and laughing together', 
      emoji: '📚', 
      month: 1, 
      day: 20 
    },
    'specialmoment': { 
      title: 'Special Moment', 
      caption: 'Every second with you is precious', 
      emoji: '💕', 
      month: 9, 
      day: 1 
    },
    'taichandate': { 
      title: 'Tai Chan Delights', 
      caption: 'Good food, better company, best memories', 
      emoji: '🍜', 
      month: 7, 
      day: 30 
    },
    'vintageshopdate': { 
      title: 'Vintage Shopping', 
      caption: 'Finding treasures like I found you', 
      emoji: '👗', 
      month: 6, 
      day: 12 
    },
    'alohadate': {
      title: 'Aloha Moments',
      caption: 'Tropical vibes with my sunshine',
      emoji: '🌺',
      month: 8,
      day: 12
    },
    'bromodate': {
      title: 'Bromo Adventure',
      caption: 'Sunrise views and mountain memories',
      emoji: '🏔️',
      month: 6,
      day: 20
    },
    'camera photoshoot': {
      title: 'Camera Photoshoot',
      caption: 'Capturing our beautiful moments',
      emoji: '📸',
      month: 5,
      day: 8
    },
    'chinaaadatee': {
      title: 'China Town Date',
      caption: 'Exploring cultures and cuisines together',
      emoji: '🏮',
      month: 4,
      day: 15
    },
    'cipete date': {
      title: 'Cipete Exploration',
      caption: 'Local adventures with my favorite person',
      emoji: '🌆',
      month: 3,
      day: 22
    },
    'cookies date': {
      title: 'Cookie Baking',
      caption: 'Sweet treats and sweeter moments',
      emoji: '🍪',
      month: 2,
      day: 18
    },
    'gaga thaitea date': {
      title: 'Gaga Thai Tea',
      caption: 'Refreshing drinks and refreshing love',
      emoji: '🧋',
      month: 7,
      day: 5
    },
    'gbk date': {
      title: 'GBK Stadium Date',
      caption: 'Cheering together, winning together',
      emoji: '⚽',
      month: 9,
      day: 10
    },
    'gradutation': {
      title: 'Graduation Day',
      caption: 'Celebrating achievements and new beginnings',
      emoji: '🎓',
      month: 8,
      day: 25
    },
    'gultik date': {
      title: 'Gultik Adventure',
      caption: 'Rolling good times with you',
      emoji: '🎳',
      month: 6,
      day: 8
    },
    'gym date': {
      title: 'Gym Session',
      caption: 'Getting stronger together',
      emoji: '💪',
      month: 1,
      day: 15
    },
    'hachi grilldate': {
      title: 'Hachi Grill Night',
      caption: 'Grilled perfection with perfect company',
      emoji: '🥩',
      month: 5,
      day: 20
    },
    'kapalsoang date': {
      title: 'Kapal Soang Adventure',
      caption: 'Sailing through love together',
      emoji: '⛵',
      month: 4,
      day: 28
    },
    'karoke date': {
      title: 'Karaoke Night',
      caption: 'Singing our hearts out together',
      emoji: '🎤',
      month: 3,
      day: 8
    },
    'konser date': {
      title: 'Concert Night',
      caption: 'Music, lights, and magical moments',
      emoji: '🎵',
      month: 7,
      day: 18
    },
    'livingplazadate': {
      title: 'Living Plaza Shopping',
      caption: 'Window shopping and heart shopping',
      emoji: '🛍️',
      month: 2,
      day: 5
    },
    'met twins': {
      title: 'Meeting the Twins',
      caption: 'Double the fun, double the memories',
      emoji: '👫',
      month: 8,
      day: 3
    },
    'new year with you': {
      title: 'New Year Together',
      caption: 'Starting the year with my everything',
      emoji: '🎊',
      month: 1,
      day: 1
    },
    'pengsosdate': {
      title: 'Pengsos Hangout',
      caption: 'Casual vibes, extraordinary moments',
      emoji: '😎',
      month: 6,
      day: 15
    },
    'photoshooy': {
      title: 'Photo Shoot Fun',
      caption: 'Strike a pose with my favorite model',
      emoji: '📷',
      month: 5,
      day: 12
    },
    'pikdate': {
      title: 'PIK Adventure',
      caption: 'Seaside strolls and sunset talks',
      emoji: '🌅',
      month: 9,
      day: 5
    },
    'prambanandate': {
      title: 'Prambanan Temple',
      caption: 'Ancient wonders with my modern love',
      emoji: '🏛️',
      month: 4,
      day: 10
    },
    'random photo': {
      title: 'Random Capture',
      caption: 'Unplanned but perfect moments',
      emoji: '✨',
      month: 3,
      day: 20
    },
    'randomphoto': {
      title: 'Spontaneous Shot',
      caption: 'Life is beautiful when shared with you',
      emoji: '💫',
      month: 7,
      day: 12
    },
    'sushidate': {
      title: 'Sushi Date',
      caption: 'Fresh fish, fresh love',
      emoji: '🍣',
      month: 8,
      day: 18
    },
    'swimmingdate': {
      title: 'Swimming Day',
      caption: 'Making waves together',
      emoji: '🏊',
      month: 6,
      day: 25
    },
    'transtudio date': {
      title: 'Trans Studio Fun',
      caption: 'Theme park thrills with my thrill',
      emoji: '🎢',
      month: 5,
      day: 30
    },
    'ui date': {
      title: 'UI Campus Visit',
      caption: 'University adventures and future dreams',
      emoji: '🎓',
      month: 2,
      day: 12
    }
  };

  // Default info for unrecognized photos
  const defaultInfo = { 
    title: 'Beautiful Memory', 
    caption: 'Another perfect moment with you', 
    emoji: '💖', 
    month: Math.floor(Math.random() * 12) + 1, 
    day: Math.floor(Math.random() * 28) + 1 
  };

  const info = photoInfoMap[name] || defaultInfo;
  
  return {
    title: info.title,
    caption: `${info.caption} ${info.emoji}`,
    date: `2024-${String(info.month).padStart(2, '0')}-${String(info.day).padStart(2, '0')}`
  };
}

// Get all photo files and generate info automatically
const photoFiles = [
  'firstdate.jpg', '17thdate.jpg', 'badmintondate.jpg', 'barbiedate.jpg', 
  'bloomdate.jpg', 'catcafedate.jpg', 'crochetdate.jpg', 'discorddate.jpg', 
  'ikeadate.jpg', 'kimukatsu date.jpg', 'kopijjdate.jpg', 'mrtdate.jpg', 
  'nailartdate.jpg', 'newhairdate.jpg', 'osisdate.jpg', 'paintingdate.jpg', 
  'pancorandate.jpg', 'schooldate.jpg', 'specialmoment.jpg', 'taichandate.jpg', 
  'vintageshopdate.jpg', 'alohadate.jpg', 'bromodate.jpg', 'camera photoshoot.jpg',
  'chinaaadatee.jpg', 'cipete date.jpg', 'cookies date.jpg', 'gaga thaitea date.jpg',
  'gbk date.jpg', 'gradutation.jpg', 'gultik date.jpg', 'gym date.jpg',
  'hachi grilldate.jpg', 'kapalsoang date.jpg', 'karoke date.jpg', 'konser date.jpg',
  'livingplazadate.jpg', 'met twins.jpg', 'new year with you.jpg', 'pengsosdate.jpg',
  'photoshooy.jpg', 'pikdate.jpg', 'prambanandate.jpg', 'random photo.jpg',
  'randomphoto.jpg', 'sushidate.jpg', 'swimmingdate.jpg', 'transtudio date.jpg',
  'ui date.jpg'
];

const ourPhotos = photoFiles.map(filename => {
  const info = generatePhotoInfo(filename);
  return {
    src: `/photos/chabirthdayphoto/${filename}`,
    ...info
  };
});

export default function JourneyPage() {
  return (
    <main className="min-h-dvh bg-[linear-gradient(135deg,#FFF5FA,#FFE3F0)]">
      <InteractivePhotoJourney photos={ourPhotos} />
    </main>
  );
}