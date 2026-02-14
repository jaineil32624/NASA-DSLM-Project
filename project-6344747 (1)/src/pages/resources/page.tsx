import { useState } from 'react';
import { Link } from 'react-router-dom';
import StarField from '../../components/base/StarField';
import ThemeToggle, { useTheme } from '../../components/feature/ThemeToggle';

interface ResourceLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

interface ResourceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const { theme } = useTheme();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery + ' NASA')}`, '_blank');
    }
  };

  const categories: ResourceCategory[] = [
    { id: 'all', name: 'All Resources', icon: 'ri-apps-line', color: 'text-white', bgColor: 'bg-slate-600', borderColor: 'border-slate-500' },
    { id: 'nasa', name: 'NASA Official', icon: 'ri-rocket-line', color: 'text-teal-400', bgColor: 'bg-teal-500/20', borderColor: 'border-teal-500/30' },
    { id: 'hunch', name: 'NASA HUNCH', icon: 'ri-graduation-cap-line', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30' },
    { id: '3d', name: '3D Modeling', icon: 'ri-box-3-line', color: 'text-purple-400', bgColor: 'bg-purple-500/20', borderColor: 'border-purple-500/30' },
    { id: 'games', name: 'NASA Games', icon: 'ri-gamepad-line', color: 'text-pink-400', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-500/30' },
    { id: 'videos', name: 'Videos', icon: 'ri-video-line', color: 'text-red-400', bgColor: 'bg-red-500/20', borderColor: 'border-red-500/30' },
    { id: 'learning', name: 'Learning', icon: 'ri-book-open-line', color: 'text-amber-400', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30' },
    { id: 'coding', name: 'Coding', icon: 'ri-code-s-slash-line', color: 'text-green-400', bgColor: 'bg-green-500/20', borderColor: 'border-green-500/30' },
    { id: 'art', name: 'Art & Design', icon: 'ri-palette-line', color: 'text-orange-400', bgColor: 'bg-orange-500/20', borderColor: 'border-orange-500/30' },
    { id: 'history', name: 'History & Facts', icon: 'ri-history-line', color: 'text-indigo-400', bgColor: 'bg-indigo-500/20', borderColor: 'border-indigo-500/30' },
    { id: 'books', name: 'Books', icon: 'ri-book-2-line', color: 'text-blue-400', bgColor: 'bg-blue-500/20', borderColor: 'border-blue-500/30' },
    { id: 'store', name: 'NASA Stores', icon: 'ri-shopping-bag-line', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/30' },
    { id: 'music', name: 'Music & Audio', icon: 'ri-music-line', color: 'text-violet-400', bgColor: 'bg-violet-500/20', borderColor: 'border-violet-500/30' },
    { id: 'social', name: 'Social Media', icon: 'ri-share-line', color: 'text-fuchsia-400', bgColor: 'bg-fuchsia-500/20', borderColor: 'border-fuchsia-500/30' },
    { id: 'news', name: 'News & Media', icon: 'ri-newspaper-line', color: 'text-sky-400', bgColor: 'bg-sky-500/20', borderColor: 'border-sky-500/30' },
    { id: 'portfolio', name: 'My Portfolio', icon: 'ri-folder-3-line', color: 'text-yellow-400', bgColor: 'bg-yellow-500/20', borderColor: 'border-yellow-500/30' },
  ];

  const resources: ResourceLink[] = [
    // NASA Official
    { title: 'NASA Official Website', description: 'The official NASA homepage with latest news, missions, and discoveries', url: 'https://www.nasa.gov/', icon: 'ri-rocket-2-line', category: 'nasa' },
    { title: 'NASA 3D Resources', description: 'Thousands of 3D models, textures, and printable files from NASA missions', url: 'https://nasa3d.arc.nasa.gov/', icon: 'ri-box-3-line', category: 'nasa' },
    { title: 'NASA Image Gallery', description: 'Browse stunning images from space missions and telescopes', url: 'https://images.nasa.gov/', icon: 'ri-image-2-line', category: 'nasa' },
    { title: 'NASA Video Library', description: 'Watch launches, spacewalks, mission highlights, and educational content', url: 'https://images.nasa.gov/videos', icon: 'ri-video-line', category: 'nasa' },
    { title: 'NASA Solar System', description: 'Explore planets, moons, asteroids, and celestial bodies', url: 'https://solarsystem.nasa.gov/', icon: 'ri-sun-line', category: 'nasa' },
    { title: 'Mars Exploration', description: 'Follow Mars rover missions, images, and scientific discoveries', url: 'https://mars.nasa.gov/', icon: 'ri-planet-line', category: 'nasa' },
    { title: 'International Space Station', description: 'Track the ISS, view live feeds, and learn about life in space', url: 'https://www.nasa.gov/mission_pages/station/main/index.html', icon: 'ri-space-ship-line', category: 'nasa' },
    { title: 'James Webb Telescope', description: 'Discover the universe through the most powerful space telescope', url: 'https://webbtelescope.org/images', icon: 'ri-star-line', category: 'nasa' },
    { title: 'Hubble Space Telescope', description: 'Breathtaking images and discoveries from Hubble', url: 'https://hubblesite.org/images', icon: 'ri-telescope-line', category: 'nasa' },
    { title: 'NASA Open Data Portal', description: 'Access datasets, APIs, and open-source code from NASA', url: 'https://data.nasa.gov/', icon: 'ri-database-2-line', category: 'nasa' },
    { title: 'Astronomy Picture of the Day', description: 'Daily featured astronomical images with explanations', url: 'https://apod.nasa.gov/', icon: 'ri-camera-lens-line', category: 'nasa' },
    { title: 'NASA Earth Observatory', description: 'Satellite images and data about our planet', url: 'https://earthobservatory.nasa.gov/', icon: 'ri-earth-line', category: 'nasa' },
    { title: 'NASA Jet Propulsion Lab', description: 'Robotic exploration of the solar system', url: 'https://www.jpl.nasa.gov/', icon: 'ri-rocket-line', category: 'nasa' },
    { title: 'NASA Science', description: 'Latest scientific discoveries and research', url: 'https://science.nasa.gov/', icon: 'ri-flask-line', category: 'nasa' },
    { title: 'NASA Exoplanet Exploration', description: 'Discover planets beyond our solar system', url: 'https://exoplanets.nasa.gov/', icon: 'ri-planet-line', category: 'nasa' },
    { title: 'NASA Artemis Program', description: 'Return to the Moon and beyond', url: 'https://www.nasa.gov/specials/artemis/', icon: 'ri-moon-line', category: 'nasa' },
    { title: 'NASA Glenn Research Center', description: 'Aerospace research and technology', url: 'https://www.nasa.gov/glenn', icon: 'ri-building-line', category: 'nasa' },
    { title: 'NASA Goddard Space Flight', description: 'Space science and Earth observation', url: 'https://www.nasa.gov/goddard', icon: 'ri-satellite-line', category: 'nasa' },
    { title: 'NASA Kennedy Space Center', description: 'Launch operations and visitor complex', url: 'https://www.nasa.gov/kennedy', icon: 'ri-rocket-2-line', category: 'nasa' },
    { title: 'NASA Johnson Space Center', description: 'Human spaceflight operations', url: 'https://www.nasa.gov/johnson', icon: 'ri-user-star-line', category: 'nasa' },

    // NASA HUNCH
    { title: 'NASA HUNCH Official', description: 'High School Students United with NASA to Create Hardware', url: 'https://nasahunch.com/', icon: 'ri-graduation-cap-line', category: 'hunch' },
    { title: 'HUNCH Design & Prototyping', description: 'Student design challenges and prototyping projects', url: 'https://nasahunch.com/design-and-prototyping/', icon: 'ri-pencil-ruler-line', category: 'hunch' },
    { title: 'HUNCH Softgoods', description: 'Textile and softgoods projects for space', url: 'https://nasahunch.com/softgoods/', icon: 'ri-t-shirt-line', category: 'hunch' },
    { title: 'HUNCH Hardware', description: 'Hardware manufacturing for NASA missions', url: 'https://nasahunch.com/hardware/', icon: 'ri-tools-line', category: 'hunch' },
    { title: 'HUNCH Culinary', description: 'Space food development and nutrition', url: 'https://nasahunch.com/culinary/', icon: 'ri-restaurant-line', category: 'hunch' },
    { title: 'HUNCH Video & Media', description: 'Media production for NASA outreach', url: 'https://nasahunch.com/video-and-media/', icon: 'ri-film-line', category: 'hunch' },
    { title: 'HUNCH Flight Configuration', description: 'Flight-ready hardware projects', url: 'https://nasahunch.com/flight-configuration/', icon: 'ri-plane-line', category: 'hunch' },
    { title: 'NASA STEM Engagement', description: 'STEM education and student opportunities', url: 'https://www.nasa.gov/stem/', icon: 'ri-lightbulb-line', category: 'hunch' },
    { title: 'NASA Internships', description: 'Internship opportunities at NASA', url: 'https://intern.nasa.gov/', icon: 'ri-briefcase-line', category: 'hunch' },
    { title: 'NASA Student Launch', description: 'Rocketry competition for students', url: 'https://www.nasa.gov/stem/studentlaunch/home/index.html', icon: 'ri-rocket-line', category: 'hunch' },

    // 3D Modeling
    { title: 'Blender', description: 'Free and open-source 3D creation suite', url: 'https://www.blender.org/', icon: 'ri-box-3-line', category: '3d' },
    { title: 'Sketchfab', description: 'Publish and find 3D models online', url: 'https://sketchfab.com/', icon: 'ri-3d-model-line', category: '3d' },
    { title: 'Sketchfab NASA Collection', description: 'Interactive 3D models of spacecraft and planets', url: 'https://sketchfab.com/nasa', icon: 'ri-rocket-line', category: '3d' },
    { title: '3D AI Studio', description: 'AI-powered 3D model generation', url: 'https://www.3daistudio.com/', icon: 'ri-robot-line', category: '3d' },
    { title: 'Tinkercad', description: 'Easy 3D design and 3D printing', url: 'https://www.tinkercad.com/', icon: 'ri-shape-line', category: '3d' },
    { title: 'Fusion 360', description: 'Professional CAD/CAM software', url: 'https://www.autodesk.com/products/fusion-360/', icon: 'ri-settings-line', category: '3d' },
    { title: 'SketchUp', description: '3D modeling for everyone', url: 'https://www.sketchup.com/', icon: 'ri-pencil-ruler-line', category: '3d' },
    { title: 'Maya', description: 'Professional 3D animation software', url: 'https://www.autodesk.com/products/maya/', icon: 'ri-movie-line', category: '3d' },
    { title: 'Cinema 4D', description: 'Professional 3D modeling and animation', url: 'https://www.maxon.net/cinema-4d', icon: 'ri-film-line', category: '3d' },
    { title: 'ZBrush', description: 'Digital sculpting and painting', url: 'https://www.maxon.net/zbrush', icon: 'ri-brush-line', category: '3d' },
    { title: 'Houdini', description: 'Procedural 3D animation and VFX', url: 'https://www.sidefx.com/', icon: 'ri-magic-line', category: '3d' },
    { title: 'Substance 3D', description: 'Texturing and material creation', url: 'https://www.adobe.com/products/substance3d.html', icon: 'ri-palette-line', category: '3d' },
    { title: 'Meshy AI', description: 'AI 3D model generator', url: 'https://www.meshy.ai/', icon: 'ri-robot-2-line', category: '3d' },
    { title: 'Spline', description: 'Web-based 3D design tool', url: 'https://spline.design/', icon: 'ri-layout-line', category: '3d' },
    { title: 'Three.js', description: '3D JavaScript library', url: 'https://threejs.org/', icon: 'ri-code-box-line', category: '3d' },
    { title: 'Clara.io', description: 'Online 3D modeling and animation', url: 'https://clara.io/', icon: 'ri-cloud-line', category: '3d' },
    { title: 'Vectary', description: 'Online 3D and AR design platform', url: 'https://www.vectary.com/', icon: 'ri-augmented-reality-line', category: '3d' },
    { title: 'Gravity Sketch', description: 'VR 3D design tool', url: 'https://www.gravitysketch.com/', icon: 'ri-glasses-line', category: '3d' },
    { title: 'Nomad Sculpt', description: 'Mobile 3D sculpting app', url: 'https://nomadsculpt.com/', icon: 'ri-smartphone-line', category: '3d' },
    { title: 'Plasticity', description: 'CAD for artists', url: 'https://www.plasticity.xyz/', icon: 'ri-shape-2-line', category: '3d' },
    { title: 'Blockbench', description: 'Low-poly 3D model editor', url: 'https://www.blockbench.net/', icon: 'ri-grid-line', category: '3d' },
    { title: 'MagicaVoxel', description: 'Voxel art editor', url: 'https://ephtracy.github.io/', icon: 'ri-box-1-line', category: '3d' },
    { title: 'Womp 3D', description: 'Easy 3D creation platform', url: 'https://womp.com/', icon: 'ri-bubble-chart-line', category: '3d' },
    { title: 'Luma AI', description: 'AI-powered 3D capture', url: 'https://lumalabs.ai/', icon: 'ri-camera-3-line', category: '3d' },
    { title: 'Polycam', description: '3D scanning app', url: 'https://poly.cam/', icon: 'ri-scan-line', category: '3d' },

    // NASA Games
    { title: 'NASA Space Place Games', description: 'Fun games for kids about space and Earth', url: 'https://spaceplace.nasa.gov/menu/play/', icon: 'ri-gamepad-line', category: 'games' },
    { title: 'Asteroid Patrol', description: 'Hunt for asteroids in this NASA game', url: 'https://spaceplace.nasa.gov/asteroid-patrol/', icon: 'ri-meteor-line', category: 'games' },
    { title: 'Galaxy Explorer', description: 'Explore different types of galaxies', url: 'https://spaceplace.nasa.gov/galaxy-explorer/', icon: 'ri-star-line', category: 'games' },
    { title: 'Solar System Explorer', description: 'Interactive solar system exploration', url: 'https://eyes.nasa.gov/apps/solar-system/', icon: 'ri-sun-line', category: 'games' },
    { title: 'NASA Eyes', description: 'Explore the universe in 3D', url: 'https://eyes.nasa.gov/', icon: 'ri-eye-line', category: 'games' },
    { title: 'Mars Rover Game', description: 'Drive a rover on Mars', url: 'https://spaceplace.nasa.gov/explore-mars/', icon: 'ri-car-line', category: 'games' },
    { title: 'Rocket Science 101', description: 'Build your own rocket', url: 'https://www.nasa.gov/stem-ed-resources/rocket-science-101.html', icon: 'ri-rocket-line', category: 'games' },
    { title: 'Climate Kids Games', description: 'Learn about climate through games', url: 'https://climatekids.nasa.gov/menu/play/', icon: 'ri-earth-line', category: 'games' },
    { title: 'Kerbal Space Program', description: 'Space flight simulation game', url: 'https://www.kerbalspaceprogram.com/', icon: 'ri-space-ship-line', category: 'games' },
    { title: 'Universe Sandbox', description: 'Space and gravity simulator', url: 'https://universesandbox.com/', icon: 'ri-planet-line', category: 'games' },
    { title: 'Space Engine', description: 'Universe simulator', url: 'https://spaceengine.org/', icon: 'ri-compass-3-line', category: 'games' },
    { title: 'Stellarium', description: 'Free planetarium software', url: 'https://stellarium.org/', icon: 'ri-star-smile-line', category: 'games' },
    { title: 'Celestia', description: 'Real-time 3D space simulation', url: 'https://celestia.space/', icon: 'ri-global-line', category: 'games' },

    // Videos
    { title: 'NASA YouTube Channel', description: 'Official NASA videos and live streams', url: 'https://www.youtube.com/nasa', icon: 'ri-youtube-line', category: 'videos' },
    { title: 'NASA TV', description: 'Live NASA television broadcasts', url: 'https://www.nasa.gov/nasatv', icon: 'ri-tv-line', category: 'videos' },
    { title: 'SpaceX YouTube', description: 'SpaceX launches and updates', url: 'https://www.youtube.com/spacex', icon: 'ri-rocket-line', category: 'videos' },
    { title: 'ESA YouTube', description: 'European Space Agency videos', url: 'https://www.youtube.com/user/ESA', icon: 'ri-earth-line', category: 'videos' },
    { title: 'Everyday Astronaut', description: 'Space education and rocket science', url: 'https://www.youtube.com/c/EverydayAstronaut', icon: 'ri-user-star-line', category: 'videos' },
    { title: 'Scott Manley', description: 'Space and astronomy explained', url: 'https://www.youtube.com/c/saborlas', icon: 'ri-vidicon-line', category: 'videos' },
    { title: 'Veritasium Space', description: 'Science videos about space', url: 'https://www.youtube.com/c/veritasium', icon: 'ri-flask-line', category: 'videos' },
    { title: 'Kurzgesagt Space', description: 'Animated space science videos', url: 'https://www.youtube.com/c/inanutshell', icon: 'ri-movie-line', category: 'videos' },
    { title: 'PBS Space Time', description: 'Deep dives into astrophysics', url: 'https://www.youtube.com/c/pbsspacetime', icon: 'ri-time-line', category: 'videos' },
    { title: 'SmarterEveryDay', description: 'Science and engineering exploration', url: 'https://www.youtube.com/c/smartereveryday', icon: 'ri-lightbulb-line', category: 'videos' },
    { title: 'Real Engineering', description: 'Engineering behind space tech', url: 'https://www.youtube.com/c/RealEngineering', icon: 'ri-tools-line', category: 'videos' },
    { title: 'Astrum', description: 'Space documentaries', url: 'https://www.youtube.com/c/aaborlas', icon: 'ri-film-line', category: 'videos' },
    { title: 'Dr. Becky', description: 'Astrophysics explained', url: 'https://www.youtube.com/c/DrBecky', icon: 'ri-star-line', category: 'videos' },
    { title: 'Anton Petrov', description: 'Daily space and science news', url: 'https://www.youtube.com/c/whatdamath', icon: 'ri-newspaper-line', category: 'videos' },
    { title: 'SEA (Space Exploration)', description: 'Space exploration animations', url: 'https://www.youtube.com/c/SpaceExplorationAnimation', icon: 'ri-play-circle-line', category: 'videos' },

    // Learning - Physics, Math, Science
    { title: 'Khan Academy', description: 'Free world-class education for anyone', url: 'https://www.khanacademy.org/', icon: 'ri-graduation-cap-line', category: 'learning' },
    { title: 'Khan Academy Physics', description: 'Physics courses and tutorials', url: 'https://www.khanacademy.org/science/physics', icon: 'ri-atom-line', category: 'learning' },
    { title: 'Khan Academy Math', description: 'Mathematics from basics to calculus', url: 'https://www.khanacademy.org/math', icon: 'ri-calculator-line', category: 'learning' },
    { title: 'Khan Academy Astronomy', description: 'Cosmology and astronomy courses', url: 'https://www.khanacademy.org/science/cosmology-and-astronomy', icon: 'ri-star-line', category: 'learning' },
    { title: 'Coursera Space Courses', description: 'University-level space courses', url: 'https://www.coursera.org/search?query=space', icon: 'ri-book-2-line', category: 'learning' },
    { title: 'edX Astrophysics', description: 'Astrophysics courses from top universities', url: 'https://www.edx.org/learn/astrophysics', icon: 'ri-telescope-line', category: 'learning' },
    { title: 'MIT OpenCourseWare Physics', description: 'Free MIT physics courses', url: 'https://ocw.mit.edu/courses/physics/', icon: 'ri-building-line', category: 'learning' },
    { title: 'Physics Classroom', description: 'Interactive physics tutorials', url: 'https://www.physicsclassroom.com/', icon: 'ri-flask-line', category: 'learning' },
    { title: 'Brilliant', description: 'Interactive STEM learning', url: 'https://brilliant.org/', icon: 'ri-lightbulb-flash-line', category: 'learning' },
    { title: 'Wolfram Alpha', description: 'Computational knowledge engine', url: 'https://www.wolframalpha.com/', icon: 'ri-search-eye-line', category: 'learning' },
    { title: 'Desmos', description: 'Free graphing calculator', url: 'https://www.desmos.com/', icon: 'ri-line-chart-line', category: 'learning' },
    { title: 'GeoGebra', description: 'Math visualization tools', url: 'https://www.geogebra.org/', icon: 'ri-shape-line', category: 'learning' },
    { title: 'PhET Simulations', description: 'Interactive science simulations', url: 'https://phet.colorado.edu/', icon: 'ri-test-tube-line', category: 'learning' },
    { title: '3Blue1Brown', description: 'Visual math explanations', url: 'https://www.3blue1brown.com/', icon: 'ri-movie-2-line', category: 'learning' },
    { title: 'Numberphile', description: 'Videos about numbers and math', url: 'https://www.numberphile.com/', icon: 'ri-numbers-line', category: 'learning' },
    { title: 'MinutePhysics', description: 'Physics explained in minutes', url: 'https://www.youtube.com/user/minutephysics', icon: 'ri-timer-line', category: 'learning' },
    { title: 'CrashCourse Astronomy', description: 'Astronomy video series', url: 'https://www.youtube.com/playlist?list=PL8dPuuaLjXtPAJr1ysd5yGIyiSFuh0mIL', icon: 'ri-play-list-line', category: 'learning' },
    { title: 'HyperPhysics', description: 'Physics encyclopedia', url: 'http://hyperphysics.phy-astr.gsu.edu/', icon: 'ri-book-open-line', category: 'learning' },
    { title: 'NASA STEM Resources', description: 'Educational materials from NASA', url: 'https://www.nasa.gov/stem-ed-resources/', icon: 'ri-rocket-line', category: 'learning' },
    { title: 'Space Math @ NASA', description: 'Math problems using NASA data', url: 'https://spacemath.gsfc.nasa.gov/', icon: 'ri-calculator-line', category: 'learning' },

    // Coding
    { title: 'freeCodeCamp', description: 'Learn to code for free', url: 'https://www.freecodecamp.org/', icon: 'ri-code-s-slash-line', category: 'coding' },
    { title: 'Codecademy', description: 'Interactive coding lessons', url: 'https://www.codecademy.com/', icon: 'ri-terminal-box-line', category: 'coding' },
    { title: 'LeetCode', description: 'Coding challenges and interview prep', url: 'https://leetcode.com/', icon: 'ri-code-box-line', category: 'coding' },
    { title: 'HackerRank', description: 'Practice coding skills', url: 'https://www.hackerrank.com/', icon: 'ri-bug-line', category: 'coding' },
    { title: 'GitHub', description: 'Code hosting and collaboration', url: 'https://github.com/', icon: 'ri-github-line', category: 'coding' },
    { title: 'Stack Overflow', description: 'Programming Q&A community', url: 'https://stackoverflow.com/', icon: 'ri-stack-overflow-line', category: 'coding' },
    { title: 'Replit', description: 'Online IDE and coding platform', url: 'https://replit.com/', icon: 'ri-terminal-line', category: 'coding' },
    { title: 'CodePen', description: 'Front-end code playground', url: 'https://codepen.io/', icon: 'ri-pen-nib-line', category: 'coding' },
    { title: 'W3Schools', description: 'Web development tutorials', url: 'https://www.w3schools.com/', icon: 'ri-global-line', category: 'coding' },
    { title: 'MDN Web Docs', description: 'Web technology documentation', url: 'https://developer.mozilla.org/', icon: 'ri-firefox-line', category: 'coding' },
    { title: 'Python.org', description: 'Official Python resources', url: 'https://www.python.org/', icon: 'ri-python-line', category: 'coding' },
    { title: 'JavaScript.info', description: 'Modern JavaScript tutorial', url: 'https://javascript.info/', icon: 'ri-javascript-line', category: 'coding' },
    { title: 'Scratch', description: 'Visual programming for beginners', url: 'https://scratch.mit.edu/', icon: 'ri-puzzle-line', category: 'coding' },
    { title: 'Code.org', description: 'Learn computer science', url: 'https://code.org/', icon: 'ri-code-line', category: 'coding' },
    { title: 'NASA Open Source', description: 'NASA open source projects', url: 'https://code.nasa.gov/', icon: 'ri-rocket-line', category: 'coding' },
    { title: 'NASA API Portal', description: 'Access NASA data through APIs', url: 'https://api.nasa.gov/', icon: 'ri-database-line', category: 'coding' },

    // Art & Design
    { title: 'CapCut', description: 'Free video editing software', url: 'https://www.capcut.com/', icon: 'ri-scissors-cut-line', category: 'art' },
    { title: 'DaVinci Resolve', description: 'Professional video editing', url: 'https://www.blackmagicdesign.com/products/davinciresolve', icon: 'ri-film-line', category: 'art' },
    { title: 'Canva', description: 'Easy graphic design tool', url: 'https://www.canva.com/', icon: 'ri-palette-line', category: 'art' },
    { title: 'Figma', description: 'Collaborative design tool', url: 'https://www.figma.com/', icon: 'ri-layout-masonry-line', category: 'art' },
    { title: 'Adobe Creative Cloud', description: 'Professional creative software', url: 'https://www.adobe.com/creativecloud.html', icon: 'ri-adobe-line', category: 'art' },
    { title: 'Photopea', description: 'Free online photo editor', url: 'https://www.photopea.com/', icon: 'ri-image-edit-line', category: 'art' },
    { title: 'GIMP', description: 'Free image manipulation program', url: 'https://www.gimp.org/', icon: 'ri-brush-line', category: 'art' },
    { title: 'Krita', description: 'Free digital painting software', url: 'https://krita.org/', icon: 'ri-paint-brush-line', category: 'art' },
    { title: 'Inkscape', description: 'Free vector graphics editor', url: 'https://inkscape.org/', icon: 'ri-pen-nib-line', category: 'art' },
    { title: 'Procreate', description: 'Digital illustration app', url: 'https://procreate.com/', icon: 'ri-pencil-line', category: 'art' },
    { title: 'ArtStation', description: 'Showcase and discover art', url: 'https://www.artstation.com/', icon: 'ri-gallery-line', category: 'art' },
    { title: 'DeviantArt', description: 'Art community platform', url: 'https://www.deviantart.com/', icon: 'ri-heart-line', category: 'art' },
    { title: 'Behance', description: 'Creative portfolio platform', url: 'https://www.behance.net/', icon: 'ri-behance-line', category: 'art' },
    { title: 'Dribbble', description: 'Design inspiration platform', url: 'https://dribbble.com/', icon: 'ri-dribbble-line', category: 'art' },
    { title: 'NASA Artwork Gallery', description: 'Official NASA artwork and posters', url: 'https://www.nasa.gov/multimedia/imagegallery/index.html', icon: 'ri-image-2-line', category: 'art' },
    { title: 'Space Art Archive', description: 'Historical space artwork', url: 'https://www.nasa.gov/image-galleries/', icon: 'ri-gallery-upload-line', category: 'art' },
    { title: 'Midjourney', description: 'AI art generation', url: 'https://www.midjourney.com/', icon: 'ri-robot-line', category: 'art' },
    { title: 'DALL-E', description: 'OpenAI image generation', url: 'https://openai.com/dall-e-3', icon: 'ri-magic-line', category: 'art' },
    { title: 'Stable Diffusion', description: 'Open-source AI art', url: 'https://stability.ai/', icon: 'ri-sparkling-line', category: 'art' },

    // History & Facts
    { title: 'Apollo 11 Mission', description: 'First Moon landing history', url: 'https://www.nasa.gov/mission_pages/apollo/apollo-11.html', icon: 'ri-moon-line', category: 'history' },
    { title: 'NASA History', description: 'Complete NASA history archive', url: 'https://history.nasa.gov/', icon: 'ri-history-line', category: 'history' },
    { title: 'Space Timeline', description: 'History of space exploration', url: 'https://www.nasa.gov/specials/60counting/timeline.html', icon: 'ri-time-line', category: 'history' },
    { title: 'Famous Astronauts', description: 'Profiles of notable astronauts', url: 'https://www.nasa.gov/astronauts', icon: 'ri-user-star-line', category: 'history' },
    { title: 'Neil Armstrong Bio', description: 'First person on the Moon', url: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/who-was-neil-armstrong-k4.html', icon: 'ri-user-line', category: 'history' },
    { title: 'Buzz Aldrin', description: 'Apollo 11 lunar module pilot', url: 'https://www.nasa.gov/astronautprofiles/aldrin', icon: 'ri-user-line', category: 'history' },
    { title: 'Sally Ride', description: 'First American woman in space', url: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/who-is-sally-ride-k4.html', icon: 'ri-user-heart-line', category: 'history' },
    { title: 'Mae Jemison', description: 'First African American woman in space', url: 'https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/who-is-mae-jemison-k4.html', icon: 'ri-user-star-line', category: 'history' },
    { title: 'Yuri Gagarin', description: 'First human in space', url: 'https://www.esa.int/About_Us/ESA_history/50_years_of_humans_in_space/Yuri_Gagarin', icon: 'ri-rocket-line', category: 'history' },
    { title: 'Space Shuttle History', description: 'Space Shuttle program archive', url: 'https://www.nasa.gov/mission_pages/shuttle/main/index.html', icon: 'ri-space-ship-line', category: 'history' },
    { title: 'Hubble History', description: 'Hubble Space Telescope story', url: 'https://hubblesite.org/mission-and-telescope/hubble-history', icon: 'ri-telescope-line', category: 'history' },
    { title: 'Universe Facts', description: 'Amazing facts about the universe', url: 'https://science.nasa.gov/universe/', icon: 'ri-star-line', category: 'history' },
    { title: 'Black Holes Explained', description: 'Learn about black holes', url: 'https://science.nasa.gov/astrophysics/focus-areas/black-holes/', icon: 'ri-contrast-2-line', category: 'history' },
    { title: 'Dark Matter & Energy', description: 'Mysteries of the universe', url: 'https://science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy/', icon: 'ri-question-line', category: 'history' },
    { title: 'Big Bang Theory', description: 'Origin of the universe', url: 'https://science.nasa.gov/universe/overview/', icon: 'ri-flashlight-line', category: 'history' },
    { title: 'Moon Facts', description: 'Everything about our Moon', url: 'https://moon.nasa.gov/', icon: 'ri-moon-line', category: 'history' },
    { title: 'Mars Facts', description: 'The Red Planet explained', url: 'https://mars.nasa.gov/all-about-mars/facts/', icon: 'ri-planet-line', category: 'history' },
    { title: 'Space Artifacts', description: 'Historic space artifacts', url: 'https://airandspace.si.edu/collection', icon: 'ri-archive-line', category: 'history' },
    { title: 'Smithsonian Air & Space', description: 'National Air and Space Museum', url: 'https://airandspace.si.edu/', icon: 'ri-building-2-line', category: 'history' },
    { title: 'Space Center Houston', description: 'NASA Johnson Space Center visitor center', url: 'https://spacecenter.org/', icon: 'ri-building-line', category: 'history' },

    // Books - Science Fiction
    { title: 'The Martian by Andy Weir', description: 'Astronaut stranded on Mars uses science to survive', url: 'https://www.amazon.com/Martian-Andy-Weir/dp/0553418025', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Ender\'s Game by Orson Scott Card', description: 'Military sci-fi about training child geniuses for space war', url: 'https://www.amazon.com/Enders-Game-Ender-Quintet/dp/0812550706', icon: 'ri-book-2-line', category: 'books' },
    { title: '2001: A Space Odyssey by Arthur C. Clarke', description: 'Classic space exploration and AI consciousness', url: 'https://www.amazon.com/2001-Space-Odyssey-Arthur-Clarke/dp/0451457994', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Foundation by Isaac Asimov', description: 'Epic galactic empire and psychohistory', url: 'https://www.amazon.com/Foundation-Isaac-Asimov/dp/0553293354', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Dune by Frank Herbert', description: 'Desert planet, spice, and interstellar politics', url: 'https://www.amazon.com/Dune-Frank-Herbert/dp/0441172717', icon: 'ri-book-2-line', category: 'books' },
    { title: 'The Expanse Series by James S.A. Corey', description: 'Realistic near-future solar system colonization', url: 'https://www.amazon.com/Leviathan-Wakes-Expanse-Book-1/dp/0316129089', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Rendezvous with Rama by Arthur C. Clarke', description: 'Mysterious alien spacecraft enters solar system', url: 'https://www.amazon.com/Rendezvous-Rama-Arthur-C-Clarke/dp/0553287893', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Contact by Carl Sagan', description: 'First contact with extraterrestrial intelligence', url: 'https://www.amazon.com/Contact-Carl-Sagan/dp/1501197983', icon: 'ri-book-2-line', category: 'books' },
    { title: 'Seveneves by Neal Stephenson', description: 'Lone astronaut must save Earth from extinction', url: 'https://www.amazon.com/Seveneves-Novel-Neal-Stephenson/dp/0593135202', icon: 'ri-book-2-line', category: 'books' },

    // Books - Science Based
    { title: 'Astrophysics for People in a Hurry by Neil deGrasse Tyson', description: 'Quick guide to the universe', url: 'https://www.amazon.com/Astrophysics-People-Hurry-deGrasse-Tyson/dp/0393609391', icon: 'ri-book-open-line', category: 'books' },
    { title: 'A Brief History of Time by Stephen Hawking', description: 'Cosmology and the nature of time', url: 'https://www.amazon.com/Brief-History-Time-Stephen-Hawking/dp/0553380168', icon: 'ri-book-open-line', category: 'books' },
    { title: 'Cosmos by Carl Sagan', description: 'Journey through space and time', url: 'https://www.amazon.com/Cosmos-Carl-Sagan/dp/0345376595', icon: 'ri-book-open-line', category: 'books' },
    { title: 'The Elegant Universe by Brian Greene', description: 'String theory and the fabric of space', url: 'https://www.amazon.com/Elegant-Universe-Superstrings-Dimensions-Ultimate/dp/039333810X', icon: 'ri-book-open-line', category: 'books' },
    { title: 'Pale Blue Dot by Carl Sagan', description: 'Vision of the human future in space', url: 'https://www.amazon.com/Pale-Blue-Dot-Vision-Future/dp/0345376595', icon: 'ri-book-open-line', category: 'books' },
    { title: 'The Right Stuff by Tom Wolfe', description: 'Story of the first astronauts', url: 'https://www.amazon.com/Right-Stuff-Tom-Wolfe/dp/0312427565', icon: 'ri-book-open-line', category: 'books' },
    { title: 'Endurance by Scott Kelly', description: 'Year in space on the ISS', url: 'https://www.amazon.com/Endurance-Year-Space-Lifetime-Discovery/dp/1524731595', icon: 'ri-book-open-line', category: 'books' },
    { title: 'An Astronaut\'s Guide to Life on Earth by Chris Hadfield', description: 'Lessons from space', url: 'https://www.amazon.com/Astronauts-Guide-Life-Earth-Determination/dp/0316253030', icon: 'ri-book-open-line', category: 'books' },
    { title: 'Packing for Mars by Mary Roach', description: 'Curious science of life in space', url: 'https://www.amazon.com/Packing-Mars-Curious-Science-Space/dp/0393339912', icon: 'ri-book-open-line', category: 'books' },
    { title: 'The Overview Effect by Frank White', description: 'Space exploration and human evolution', url: 'https://www.amazon.com/Overview-Effect-Space-Exploration-Evolution/dp/1563475405', icon: 'ri-book-open-line', category: 'books' },

    // Books - History Based
    { title: 'Hidden Figures by Margot Lee Shetterly', description: 'Black women mathematicians at NASA', url: 'https://www.amazon.com/Hidden-Figures-American-Untold-Mathematicians/dp/0062363603', icon: 'ri-history-line', category: 'books' },
    { title: 'First Man by James R. Hansen', description: 'Biography of Neil Armstrong', url: 'https://www.amazon.com/First-Man-James-R-Hansen/dp/1501188828', icon: 'ri-history-line', category: 'books' },
    { title: 'Apollo 13 by Jeffrey Kluger', description: 'Dramatic rescue mission', url: 'https://www.amazon.com/Apollo-13-James-Lovell/dp/0618619585', icon: 'ri-history-line', category: 'books' },
    { title: 'Rocket Men by Robert Kurson', description: 'Daring odyssey of Apollo 8', url: 'https://www.amazon.com/Rocket-Men-Daring-Odyssey-Apollo/dp/0812988701', icon: 'ri-history-line', category: 'books' },
    { title: 'The Last Man on the Moon by Eugene Cernan', description: 'Apollo 17 commander\'s story', url: 'https://www.amazon.com/Last-Man-Moon-Astronaut-Americas/dp/0312263511', icon: 'ri-history-line', category: 'books' },
    { title: 'Failure Is Not an Option by Gene Kranz', description: 'Mission Control from Mercury to Apollo 13', url: 'https://www.amazon.com/Failure-Not-Option-Mission-Control/dp/1439148813', icon: 'ri-history-line', category: 'books' },
    { title: 'A Man on the Moon by Andrew Chaikin', description: 'Complete history of Apollo missions', url: 'https://www.amazon.com/Man-Moon-Voyages-Apollo-Astronauts/dp/014311235X', icon: 'ri-history-line', category: 'books' },
    { title: 'The Space Barons by Christian Davenport', description: 'Elon Musk, Jeff Bezos, and the quest to colonize space', url: 'https://www.amazon.com/Space-Barons-Bezos-Colonize-Cosmos/dp/1610398297', icon: 'ri-history-line', category: 'books' },

    // NASA Stores
    { title: 'NASA Shop Official Store', description: 'Official NASA merchandise and apparel', url: 'https://shop.nasa.gov/', icon: 'ri-shopping-bag-line', category: 'store' },
    { title: 'Kennedy Space Center Store', description: 'KSC visitor complex merchandise', url: 'https://www.kennedyspacecenter.com/shop', icon: 'ri-store-line', category: 'store' },
    { title: 'Space Center Houston Store', description: 'JSC official gift shop', url: 'https://spacecenter.org/shop/', icon: 'ri-store-2-line', category: 'store' },
    { title: 'Smithsonian Air & Space Store', description: 'Museum gift shop online', url: 'https://airandspace.si.edu/shop', icon: 'ri-shopping-cart-line', category: 'store' },
    { title: 'The Space Store', description: 'Space-themed gifts and collectibles', url: 'https://www.thespacestore.com/', icon: 'ri-gift-line', category: 'store' },
    { title: 'NASA Glenn Gift Shop', description: 'Glenn Research Center merchandise', url: 'https://www.nasa.gov/glenn/gift-shop', icon: 'ri-shopping-bag-2-line', category: 'store' },

    // Music & Audio
    { title: 'NCS (NoCopyrightSounds)', description: 'Copyright-free music for creators', url: 'https://www.youtube.com/c/NoCopyrightSounds', icon: 'ri-music-line', category: 'music' },
    { title: 'NASA Sounds', description: 'Space sounds and audio from NASA missions', url: 'https://www.nasa.gov/connect/sounds/index.html', icon: 'ri-sound-module-line', category: 'music' },
    { title: 'NASA Soundcloud', description: 'NASA audio collection on Soundcloud', url: 'https://soundcloud.com/nasa', icon: 'ri-soundcloud-line', category: 'music' },
    { title: 'Space Music on Spotify', description: 'Ambient space music playlists', url: 'https://open.spotify.com/search/space%20ambient', icon: 'ri-spotify-line', category: 'music' },
    { title: 'Voyager Golden Record', description: 'Sounds of Earth sent to space', url: 'https://voyager.jpl.nasa.gov/golden-record/', icon: 'ri-disc-line', category: 'music' },
    { title: 'Space Ambient Music', description: 'Relaxing space-themed music', url: 'https://www.youtube.com/results?search_query=space+ambient+music', icon: 'ri-headphone-line', category: 'music' },
    { title: 'NASA Podcast', description: 'Houston We Have a Podcast', url: 'https://www.nasa.gov/podcasts/', icon: 'ri-radio-line', category: 'music' },
    { title: 'Epidemic Sound Space Music', description: 'Royalty-free space music', url: 'https://www.epidemicsound.com/music/genres/space/', icon: 'ri-music-2-line', category: 'music' },
    { title: 'Space GIFs on GIPHY', description: 'Animated space GIFs and animations', url: 'https://giphy.com/search/space', icon: 'ri-image-line', category: 'music' },
    { title: 'NASA GIF Collection', description: 'Official NASA animated GIFs', url: 'https://giphy.com/nasa', icon: 'ri-movie-2-line', category: 'music' },

    // Social Media
    { title: 'NASA on YouTube', description: 'Official NASA YouTube channel', url: 'https://www.youtube.com/nasa', icon: 'ri-youtube-line', category: 'social' },
    { title: 'NASA on Instagram', description: 'Stunning space photos and videos', url: 'https://www.instagram.com/nasa/', icon: 'ri-instagram-line', category: 'social' },
    { title: 'NASA on Twitter/X', description: 'Latest NASA news and updates', url: 'https://twitter.com/NASA', icon: 'ri-twitter-x-line', category: 'social' },
    { title: 'NASA on Facebook', description: 'NASA community on Facebook', url: 'https://www.facebook.com/NASA', icon: 'ri-facebook-line', category: 'social' },
    { title: 'NASA on TikTok', description: 'Short space videos and fun content', url: 'https://www.tiktok.com/@nasa', icon: 'ri-tiktok-line', category: 'social' },
    { title: 'NASA on Reddit', description: 'r/NASA community discussions', url: 'https://www.reddit.com/r/nasa/', icon: 'ri-reddit-line', category: 'social' },
    { title: 'NASA on LinkedIn', description: 'NASA careers and professional network', url: 'https://www.linkedin.com/company/nasa', icon: 'ri-linkedin-line', category: 'social' },
    { title: 'NASA on Pinterest', description: 'Space inspiration and ideas', url: 'https://www.pinterest.com/nasa/', icon: 'ri-pinterest-line', category: 'social' },
    { title: 'NASA on Twitch', description: 'Live streams and space events', url: 'https://www.twitch.tv/nasa', icon: 'ri-twitch-line', category: 'social' },
    { title: 'NASA on Snapchat', description: 'Behind-the-scenes NASA content', url: 'https://www.snapchat.com/add/nasa', icon: 'ri-snapchat-line', category: 'social' },
    { title: 'Scratch Space Projects', description: 'Space-themed coding projects', url: 'https://scratch.mit.edu/search/projects?q=space', icon: 'ri-puzzle-line', category: 'social' },
    { title: 'Discord Space Communities', description: 'Join space enthusiast servers', url: 'https://discord.com/servers/space', icon: 'ri-discord-line', category: 'social' },
    { title: 'Space Subreddit', description: 'r/space - Space exploration community', url: 'https://www.reddit.com/r/space/', icon: 'ri-reddit-line', category: 'social' },
    { title: 'SpaceX on Twitter/X', description: 'SpaceX updates and launches', url: 'https://twitter.com/SpaceX', icon: 'ri-rocket-line', category: 'social' },
    { title: 'Astronomy on Instagram', description: 'Beautiful space photography', url: 'https://www.instagram.com/explore/tags/astronomy/', icon: 'ri-instagram-line', category: 'social' },

    // News & Media
    { title: 'Space.com', description: 'Latest space news and discoveries', url: 'https://www.space.com/', icon: 'ri-newspaper-line', category: 'news' },
    { title: 'NASA News', description: 'Official NASA news releases', url: 'https://www.nasa.gov/news/', icon: 'ri-article-line', category: 'news' },
    { title: 'SpaceNews', description: 'Space industry news and analysis', url: 'https://spacenews.com/', icon: 'ri-news-line', category: 'news' },
    { title: 'Universe Today', description: 'Space and astronomy news', url: 'https://www.universetoday.com/', icon: 'ri-global-line', category: 'news' },
    { title: 'Astronomy Magazine', description: 'Astronomy news and sky watching', url: 'https://www.astronomy.com/', icon: 'ri-telescope-line', category: 'news' },
    { title: 'Sky & Telescope', description: 'Essential guide to astronomy', url: 'https://skyandtelescope.org/', icon: 'ri-star-line', category: 'news' },
    { title: 'Scientific American Space', description: 'Space science articles', url: 'https://www.scientificamerican.com/space/', icon: 'ri-flask-line', category: 'news' },
    { title: 'BBC Space News', description: 'BBC space and astronomy coverage', url: 'https://www.bbc.com/news/science_and_environment', icon: 'ri-tv-2-line', category: 'news' },
    { title: 'CNN Space & Science', description: 'CNN space news coverage', url: 'https://www.cnn.com/space-science', icon: 'ri-tv-line', category: 'news' },
    { title: 'The Planetary Society', description: 'Space advocacy and news', url: 'https://www.planetary.org/', icon: 'ri-earth-line', category: 'news' },
    { title: 'Ars Technica Space', description: 'Tech and space news', url: 'https://arstechnica.com/space/', icon: 'ri-computer-line', category: 'news' },
    { title: 'Phys.org Space News', description: 'Science and space research news', url: 'https://phys.org/space-news/', icon: 'ri-test-tube-line', category: 'news' },
    { title: 'ESA News', description: 'European Space Agency news', url: 'https://www.esa.int/Newsroom', icon: 'ri-rocket-line', category: 'news' },
    { title: 'SpaceX Updates', description: 'Latest SpaceX news and launches', url: 'https://www.spacex.com/updates/', icon: 'ri-rocket-2-line', category: 'news' },

    // My Portfolio
    { title: 'My 3D Modeling Portfolio', description: 'View my collection of space-related 3D modeling projects', url: 'https://drive.google.com/drive/folders/1e41LieSHpStk-sfF_lhVEvdWg7xFrHxT', icon: 'ri-folder-3-line', category: 'portfolio' },
  ];

  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === activeCategory);

  const getCategoryStyle = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat || categories[0];
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${theme === 'light' ? 'bg-gradient-to-b from-sky-100 via-sky-50 to-sky-100' : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'}`}>
      <StarField />

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-1/4 w-[600px] h-[600px] ${theme === 'light' ? 'bg-teal-300/20' : 'bg-teal-500/5'} rounded-full blur-[120px] animate-pulse`}></div>
        <div className={`absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] ${theme === 'light' ? 'bg-purple-300/20' : 'bg-purple-500/5'} rounded-full blur-[100px] animate-pulse`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] ${theme === 'light' ? 'bg-orange-300/10' : 'bg-orange-500/5'} rounded-full blur-[90px] animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-950/80 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <i className="ri-rocket-2-line text-2xl sm:text-3xl text-teal-400 group-hover:animate-bounce"></i>
                <div className="absolute inset-0 bg-teal-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <span className={`text-lg sm:text-xl font-bold ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA DSLM</span>
            </Link>
            
            {/* Spacer for mobile hamburger menu (handled globally) */}
            <div className="lg:hidden w-14 h-14"></div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Home</Link>
              <Link to="/gallery" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Gallery</Link>
              <Link to="/hunch" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>HUNCH Projects</Link>
              <Link to="/videos" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Space Videos</Link>
              <Link to="/upload" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>Upload</Link>
              <Link to="/resources" className="text-sm text-teal-400 transition-colors whitespace-nowrap">Resources</Link>
              <Link to="/about" className={`text-sm ${theme === 'light' ? 'text-slate-600 hover:text-teal-600' : 'text-slate-300 hover:text-teal-400'} transition-colors whitespace-nowrap`}>About</Link>
              <ThemeToggle />
              <Link to="/admin" className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all shadow-lg shadow-teal-500/20 whitespace-nowrap cursor-pointer">Admin</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className={`text-sm font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}>Explore 350+ Resources</span>
            <h1 className={`text-5xl font-bold mt-2 mb-4 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>NASA Resources Hub</h1>
            <p className={`text-lg max-w-3xl mx-auto ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
              Discover NASA links, books, stores, music, social media, news, HUNCH programs, 3D modeling tools, games, videos, learning platforms, coding resources, and more!
            </p>
          </div>

          {/* NASA Google Search */}
          <div className="mb-12">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className={`absolute inset-0 blur-2xl rounded-full ${theme === 'light' ? 'bg-gradient-to-r from-teal-300/20 via-cyan-300/20 to-teal-300/20' : 'bg-gradient-to-r from-teal-500/10 via-purple-500/10 to-orange-500/10'}`}></div>
                <form onSubmit={handleSearch} className="relative">
                  <div className={`flex items-center gap-3 backdrop-blur-xl border rounded-2xl p-2 shadow-2xl transition-all ${theme === 'light' ? 'bg-white/80 border-slate-200 hover:border-teal-400' : 'bg-slate-900/60 border-slate-700/50 hover:border-teal-500/50'}`}>
                    <div className="flex items-center gap-3 flex-1 px-4">
                      <i className={`ri-search-line text-2xl ${theme === 'light' ? 'text-slate-400' : 'text-slate-400'}`}></i>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search NASA resources on Google..."
                        className={`flex-1 bg-transparent text-base focus:outline-none py-3 ${theme === 'light' ? 'text-slate-800 placeholder-slate-400' : 'text-white placeholder-slate-500'}`}
                      />
                    </div>
                    <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/30 whitespace-nowrap cursor-pointer">
                      <i className="ri-google-line text-lg"></i>
                      <span>Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Featured Portfolio */}
          <div className="mb-10">
            <a
              href="https://drive.google.com/drive/folders/1e41LieSHpStk-sfF_lhVEvdWg7xFrHxT"
              target="_blank"
              rel="noopener noreferrer"
              className={`block backdrop-blur-xl border-2 rounded-2xl p-6 transition-all shadow-xl cursor-pointer group ${theme === 'light' ? 'bg-amber-50/80 border-amber-300 hover:border-amber-400' : 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/30 hover:border-yellow-500/60'}`}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl shadow-lg flex-shrink-0">
                  <i className="ri-folder-3-line text-3xl text-white"></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full border ${theme === 'light' ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>⭐ Featured</span>
                  </div>
                  <h3 className={`text-xl font-bold transition-colors ${theme === 'light' ? 'text-slate-800 group-hover:text-amber-600' : 'text-white group-hover:text-yellow-400'}`}>My 3D Modeling Portfolio</h3>
                  <p className={`text-sm ${theme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>Explore my space-related 3D projects on Google Drive</p>
                </div>
                <i className={`ri-arrow-right-line text-2xl group-hover:translate-x-2 transition-transform ${theme === 'light' ? 'text-amber-500' : 'text-yellow-400'}`}></i>
              </div>
            </a>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat.id
                      ? `${cat.bgColor} ${cat.color} border ${cat.borderColor}`
                      : theme === 'light'
                        ? 'bg-white/80 text-slate-600 border border-slate-200 hover:border-teal-400 hover:text-teal-600'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <i className={cat.icon}></i>
                  <span>{cat.name}</span>
                  {activeCategory === cat.id && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${theme === 'light' ? 'bg-black/10' : 'bg-white/10'}`}>
                      {cat.id === 'all' ? resources.length : resources.filter(r => r.category === cat.id).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Resource Count */}
          <div className="text-center mb-6">
            <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
              Showing <span className={`font-semibold ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}>{filteredResources.length}</span> resources
              {activeCategory !== 'all' && ` in ${categories.find(c => c.id === activeCategory)?.name}`}
            </p>
          </div>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredResources.map((resource, index) => {
              const catStyle = getCategoryStyle(resource.category);
              return (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group backdrop-blur-xl border rounded-xl p-4 transition-all shadow-lg hover:shadow-xl cursor-pointer ${theme === 'light' ? 'bg-white/80 border-slate-200 hover:border-teal-400' : 'bg-slate-900/60 border-slate-700/50 hover:border-teal-500/50'}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 flex items-center justify-center ${catStyle.bgColor} rounded-lg flex-shrink-0`}>
                      <i className={`${resource.icon} text-lg ${catStyle.color}`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-semibold transition-colors truncate ${theme === 'light' ? 'text-slate-800 group-hover:text-teal-600' : 'text-white group-hover:text-teal-400'}`}>
                        {resource.title}
                      </h3>
                      <span className={`text-xs ${catStyle.color}`}>{catStyle.name}</span>
                    </div>
                    <i className={`ri-external-link-line text-sm flex-shrink-0 ${theme === 'light' ? 'text-slate-400 group-hover:text-teal-600' : 'text-slate-500 group-hover:text-teal-400'}`}></i>
                  </div>
                  <p className={`text-xs line-clamp-2 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>{resource.description}</p>
                </a>
              );
            })}
          </div>

          {/* Quick Links Section */}
          <div className="mt-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}>Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { name: 'NASA.gov', url: 'https://www.nasa.gov/', icon: 'ri-rocket-line', color: 'from-teal-500 to-cyan-500' },
                { name: 'NASA HUNCH', url: 'https://nasahunch.com/', icon: 'ri-graduation-cap-line', color: 'from-cyan-500 to-teal-500' },
                { name: 'Khan Academy', url: 'https://www.khanacademy.org/', icon: 'ri-book-open-line', color: 'from-green-500 to-emerald-500' },
                { name: 'Blender', url: 'https://www.blender.org/', icon: 'ri-box-3-line', color: 'from-orange-500 to-amber-500' },
                { name: 'Sketchfab', url: 'https://sketchfab.com/', icon: 'ri-3d-model-line', color: 'from-purple-500 to-pink-500' },
                { name: 'CapCut', url: 'https://www.capcut.com/', icon: 'ri-scissors-cut-line', color: 'from-pink-500 to-rose-500' },
                { name: 'freeCodeCamp', url: 'https://www.freecodecamp.org/', icon: 'ri-code-line', color: 'from-emerald-500 to-green-500' },
                { name: 'NASA Eyes', url: 'https://eyes.nasa.gov/', icon: 'ri-eye-line', color: 'from-indigo-500 to-purple-500' },
                { name: 'NASA YouTube', url: 'https://www.youtube.com/nasa', icon: 'ri-youtube-line', color: 'from-red-500 to-rose-500' },
                { name: '3D AI Studio', url: 'https://www.3daistudio.com/', icon: 'ri-robot-line', color: 'from-violet-500 to-purple-500' },
                { name: 'Figma', url: 'https://www.figma.com/', icon: 'ri-layout-line', color: 'from-rose-500 to-pink-500' },
                { name: 'GitHub', url: 'https://github.com/', icon: 'ri-github-line', color: 'from-slate-500 to-slate-600' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center gap-2 p-4 backdrop-blur-xl border rounded-xl transition-all cursor-pointer ${theme === 'light' ? 'bg-white/80 border-slate-200 hover:border-teal-400' : 'bg-slate-900/60 border-slate-700/50 hover:border-teal-500/50'}`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${link.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`${link.icon} text-xl text-white`}></i>
                  </div>
                  <span className={`text-xs text-center ${theme === 'light' ? 'text-slate-600 group-hover:text-slate-800' : 'text-slate-300 group-hover:text-white'}`}>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Info Footer */}
          <div className="mt-12 text-center">
            <div className={`inline-block backdrop-blur-xl border rounded-xl px-6 py-4 ${theme === 'light' ? 'bg-white/80 border-slate-200' : 'bg-slate-900/60 border-slate-700/50'}`}>
              <div className={`flex items-center gap-3 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                <i className={`ri-information-line text-xl ${theme === 'light' ? 'text-teal-600' : 'text-teal-400'}`}></i>
                <p className="text-sm">All external links open in a new tab. Resources provided by NASA and educational platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
