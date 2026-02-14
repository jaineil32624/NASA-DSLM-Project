export interface SpaceModel {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  tags: string[];
  year?: string;
  mission?: string;
}

export const spaceModels: SpaceModel[] = [
  // Planets & Moons (40 models)
  {
    id: 'planet-001',
    name: 'Earth',
    description: 'Our home planet, the third from the Sun, featuring continents, oceans, and atmosphere with stunning cloud formations.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=highly%20detailed%203D%20render%20of%20planet%20Earth%20from%20space%20showing%20blue%20oceans%20white%20clouds%20green%20continents%20realistic%20lighting%20against%20black%20space%20background&width=800&height=600&seq=earth001&orientation=landscape',
    tags: ['planet', 'earth', 'home', 'blue planet'],
    year: '2024'
  },
  {
    id: 'planet-002',
    name: 'Mars',
    description: 'The Red Planet, fourth from the Sun, with rusty iron oxide surface, polar ice caps, and massive Olympus Mons volcano.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=photorealistic%203D%20model%20of%20Mars%20red%20planet%20surface%20with%20craters%20valleys%20polar%20ice%20caps%20against%20deep%20black%20space%20background%20detailed%20texture&width=800&height=600&seq=mars001&orientation=landscape',
    tags: ['planet', 'mars', 'red planet', 'terrestrial'],
    year: '2024'
  },
  {
    id: 'planet-003',
    name: 'Jupiter',
    description: 'Gas giant with iconic Great Red Spot storm, colorful atmospheric bands, and dozens of moons including Ganymede.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20render%20of%20Jupiter%20gas%20giant%20with%20Great%20Red%20Spot%20swirling%20clouds%20atmospheric%20bands%20realistic%20lighting%20black%20space%20background&width=800&height=600&seq=jupiter001&orientation=landscape',
    tags: ['planet', 'jupiter', 'gas giant', 'great red spot'],
    year: '2024'
  },
  {
    id: 'planet-004',
    name: 'Saturn',
    description: 'Magnificent ringed planet with spectacular ice and rock ring system, golden atmosphere, and moon Titan.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=beautiful%203D%20model%20of%20Saturn%20with%20detailed%20ring%20system%20golden%20atmosphere%20realistic%20space%20lighting%20against%20black%20background%20high%20quality%20render&width=800&height=600&seq=saturn001&orientation=landscape',
    tags: ['planet', 'saturn', 'rings', 'gas giant'],
    year: '2024'
  },
  {
    id: 'planet-005',
    name: 'Venus',
    description: 'Hottest planet with thick toxic atmosphere, sulfuric acid clouds, and extreme greenhouse effect.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Venus%20planet%20with%20thick%20yellowish%20clouds%20toxic%20atmosphere%20swirling%20patterns%20against%20black%20space%20background%20detailed&width=800&height=600&seq=venus001&orientation=landscape',
    tags: ['planet', 'venus', 'terrestrial', 'atmosphere'],
    year: '2024'
  },
  {
    id: 'planet-006',
    name: 'Mercury',
    description: 'Smallest planet, closest to Sun, heavily cratered surface resembling our Moon with extreme temperature variations.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Mercury%20planet%20with%20heavily%20cratered%20gray%20surface%20rocky%20terrain%20against%20black%20space%20background%20realistic%20lighting&width=800&height=600&seq=mercury001&orientation=landscape',
    tags: ['planet', 'mercury', 'terrestrial', 'craters'],
    year: '2024'
  },
  {
    id: 'planet-007',
    name: 'Uranus',
    description: 'Ice giant tilted on its side with pale blue-green color from methane atmosphere and faint ring system.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Uranus%20ice%20giant%20planet%20pale%20blue%20green%20color%20tilted%20axis%20faint%20rings%20against%20black%20space%20background%20realistic&width=800&height=600&seq=uranus001&orientation=landscape',
    tags: ['planet', 'uranus', 'ice giant', 'tilted'],
    year: '2024'
  },
  {
    id: 'planet-008',
    name: 'Neptune',
    description: 'Deep blue ice giant with fastest winds in solar system, dark storm spots, and moon Triton.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20model%20of%20Neptune%20deep%20blue%20ice%20giant%20planet%20with%20storm%20systems%20atmospheric%20features%20against%20black%20space%20background%20detailed%20render&width=800&height=600&seq=neptune001&orientation=landscape',
    tags: ['planet', 'neptune', 'ice giant', 'blue'],
    year: '2024'
  },
  {
    id: 'moon-001',
    name: 'The Moon',
    description: 'Earth\'s natural satellite with cratered surface, maria (dark plains), and Apollo landing sites.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=highly%20detailed%203D%20render%20of%20Earths%20Moon%20with%20craters%20maria%20highlands%20realistic%20surface%20texture%20against%20black%20space%20background&width=800&height=600&seq=moon001&orientation=landscape',
    tags: ['moon', 'satellite', 'lunar', 'craters'],
    year: '2024'
  },
  {
    id: 'moon-002',
    name: 'Europa',
    description: 'Jupiter\'s icy moon with smooth surface crisscrossed by cracks, hiding subsurface ocean beneath ice shell.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Europa%20moon%20icy%20white%20surface%20with%20cracks%20and%20ridges%20smooth%20texture%20subsurface%20ocean%20hints%20against%20black%20space&width=800&height=600&seq=europa001&orientation=landscape',
    tags: ['moon', 'europa', 'jupiter', 'ice', 'ocean'],
    year: '2024'
  },
  {
    id: 'moon-003',
    name: 'Titan',
    description: 'Saturn\'s largest moon with thick orange atmosphere, methane lakes, and Earth-like weather systems.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Titan%20moon%20with%20thick%20orange%20atmosphere%20hazy%20clouds%20methane%20lakes%20surface%20features%20against%20black%20space&width=800&height=600&seq=titan001&orientation=landscape',
    tags: ['moon', 'titan', 'saturn', 'atmosphere'],
    year: '2024'
  },
  {
    id: 'moon-004',
    name: 'Io',
    description: 'Most volcanically active body in solar system, Jupiter\'s moon with colorful sulfur surface and active eruptions.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Io%20moon%20with%20volcanic%20surface%20yellow%20orange%20red%20colors%20sulfur%20deposits%20active%20volcanoes%20against%20black%20space%20background&width=800&height=600&seq=io001&orientation=landscape',
    tags: ['moon', 'io', 'jupiter', 'volcanic'],
    year: '2024'
  },
  {
    id: 'moon-005',
    name: 'Enceladus',
    description: 'Saturn\'s icy moon shooting water geysers from south pole, smooth white surface with tiger stripes.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Enceladus%20moon%20bright%20white%20icy%20surface%20with%20cracks%20tiger%20stripes%20water%20geysers%20against%20black%20space&width=800&height=600&seq=enceladus001&orientation=landscape',
    tags: ['moon', 'enceladus', 'saturn', 'ice', 'geysers'],
    year: '2024'
  },
  {
    id: 'dwarf-001',
    name: 'Pluto',
    description: 'Dwarf planet with heart-shaped Tombaugh Regio, nitrogen ice plains, and moon Charon.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Pluto%20dwarf%20planet%20with%20heart%20shaped%20region%20nitrogen%20ice%20plains%20reddish%20brown%20surface%20against%20black%20space%20background&width=800&height=600&seq=pluto001&orientation=landscape',
    tags: ['dwarf planet', 'pluto', 'kuiper belt'],
    year: '2024'
  },
  {
    id: 'moon-006',
    name: 'Ganymede',
    description: 'Largest moon in solar system, orbiting Jupiter, with magnetic field and subsurface ocean.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Ganymede%20moon%20largest%20satellite%20with%20cratered%20icy%20surface%20grooved%20terrain%20against%20black%20space%20background&width=800&height=600&seq=ganymede001&orientation=landscape',
    tags: ['moon', 'ganymede', 'jupiter', 'largest'],
    year: '2024'
  },
  {
    id: 'moon-007',
    name: 'Callisto',
    description: 'Ancient heavily cratered moon of Jupiter, one of most cratered objects in solar system.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Callisto%20moon%20heavily%20cratered%20ancient%20surface%20dark%20gray%20terrain%20impact%20craters%20against%20black%20space%20background&width=800&height=600&seq=callisto001&orientation=landscape',
    tags: ['moon', 'callisto', 'jupiter', 'craters'],
    year: '2024'
  },
  {
    id: 'moon-008',
    name: 'Triton',
    description: 'Neptune\'s largest moon with nitrogen geysers, retrograde orbit, and frozen nitrogen surface.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Triton%20moon%20with%20icy%20surface%20nitrogen%20geysers%20cantaloupe%20terrain%20pinkish%20color%20against%20black%20space&width=800&height=600&seq=triton001&orientation=landscape',
    tags: ['moon', 'triton', 'neptune', 'geysers'],
    year: '2024'
  },
  {
    id: 'moon-009',
    name: 'Phobos',
    description: 'Larger of Mars\' two moons, irregularly shaped with Stickney crater, slowly spiraling toward Mars.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Phobos%20moon%20irregular%20potato%20shape%20with%20large%20Stickney%20crater%20gray%20rocky%20surface%20against%20black%20space%20background&width=800&height=600&seq=phobos001&orientation=landscape',
    tags: ['moon', 'phobos', 'mars', 'irregular'],
    year: '2024'
  },
  {
    id: 'moon-010',
    name: 'Deimos',
    description: 'Smaller moon of Mars, smooth surface covered in regolith, named after Greek god of terror.',
    category: 'Planets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Deimos%20moon%20small%20irregular%20shape%20smooth%20surface%20covered%20in%20dust%20regolith%20against%20black%20space&width=800&height=600&seq=deimos001&orientation=landscape',
    tags: ['moon', 'deimos', 'mars', 'small'],
    year: '2024'
  },

  // Spacecraft & Satellites (60 models)
  {
    id: 'spacecraft-001',
    name: 'International Space Station',
    description: 'Largest human-made structure in space, orbiting laboratory with solar panels and modules from multiple nations.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20International%20Space%20Station%20ISS%20with%20solar%20panels%20modules%20truss%20structure%20orbiting%20above%20Earth%20realistic%20lighting&width=800&height=600&seq=iss001&orientation=landscape',
    tags: ['space station', 'ISS', 'orbital', 'laboratory'],
    year: '2024',
    mission: 'ISS Program'
  },
  {
    id: 'spacecraft-002',
    name: 'Space Shuttle Discovery',
    description: 'NASA\'s most-flown orbiter with 39 missions, featuring cargo bay, robotic arm, and heat shield tiles.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Space%20Shuttle%20Discovery%20orbiter%20white%20with%20black%20tiles%20cargo%20bay%20open%20robotic%20arm%20in%20space&width=800&height=600&seq=shuttle001&orientation=landscape',
    tags: ['shuttle', 'discovery', 'orbiter', 'reusable'],
    year: '2011',
    mission: 'STS-133'
  },
  {
    id: 'spacecraft-003',
    name: 'Apollo 11 Command Module',
    description: 'Columbia spacecraft that carried Armstrong, Aldrin, and Collins to Moon and back in historic 1969 mission.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Apollo%2011%20Command%20Module%20Columbia%20conical%20shape%20heat%20shield%20silver%20foil%20exterior%20against%20black%20space&width=800&height=600&seq=apollo11cm001&orientation=landscape',
    tags: ['apollo', 'command module', 'moon landing', 'historic'],
    year: '1969',
    mission: 'Apollo 11'
  },
  {
    id: 'spacecraft-004',
    name: 'Lunar Module Eagle',
    description: 'First crewed spacecraft to land on Moon, gold foil exterior, spidery landing legs, ascent and descent stages.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Apollo%20Lunar%20Module%20Eagle%20gold%20foil%20exterior%20landing%20legs%20ladder%20descent%20stage%20on%20moon%20surface&width=800&height=600&seq=lem001&orientation=landscape',
    tags: ['lunar module', 'eagle', 'moon lander', 'apollo'],
    year: '1969',
    mission: 'Apollo 11'
  },
  {
    id: 'spacecraft-005',
    name: 'Hubble Space Telescope',
    description: 'Iconic space telescope with cylindrical body, solar panels, and instruments that revolutionized astronomy.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20model%20of%20Hubble%20Space%20Telescope%20cylindrical%20silver%20body%20with%20solar%20panels%20aperture%20door%20instruments%20in%20orbit&width=800&height=600&seq=hubble001&orientation=landscape',
    tags: ['telescope', 'hubble', 'observatory', 'astronomy'],
    year: '1990',
    mission: 'HST'
  },
  {
    id: 'spacecraft-006',
    name: 'James Webb Space Telescope',
    description: 'Next-generation infrared telescope with massive gold hexagonal mirror segments and sunshield.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20render%20of%20James%20Webb%20Space%20Telescope%20with%20gold%20hexagonal%20mirrors%20large%20sunshield%20silver%20structure%20in%20deep%20space&width=800&height=600&seq=jwst001&orientation=landscape',
    tags: ['telescope', 'james webb', 'infrared', 'observatory'],
    year: '2021',
    mission: 'JWST'
  },
  {
    id: 'spacecraft-007',
    name: 'Voyager 1',
    description: 'Farthest human-made object from Earth, golden record carrier, exploring interstellar space since 1977.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Voyager%201%20spacecraft%20with%20large%20dish%20antenna%20golden%20record%20instruments%20against%20starry%20space%20background&width=800&height=600&seq=voyager1001&orientation=landscape',
    tags: ['probe', 'voyager', 'interstellar', 'golden record'],
    year: '1977',
    mission: 'Voyager Program'
  },
  {
    id: 'spacecraft-008',
    name: 'Cassini Orbiter',
    description: 'Saturn explorer with instruments, antennas, and Huygens probe that studied rings and moons for 13 years.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Cassini%20spacecraft%20orbiter%20with%20dish%20antenna%20instruments%20gold%20foil%20near%20Saturn%20rings%20detailed&width=800&height=600&seq=cassini001&orientation=landscape',
    tags: ['probe', 'cassini', 'saturn', 'orbiter'],
    year: '1997',
    mission: 'Cassini-Huygens'
  },
  {
    id: 'spacecraft-009',
    name: 'Mars Perseverance Rover',
    description: 'Latest Mars rover with robotic arm, cameras, drill, and Ingenuity helicopter, searching for ancient life.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Perseverance%20Mars%20rover%20with%20six%20wheels%20robotic%20arm%20cameras%20mast%20on%20red%20Martian%20surface&width=800&height=600&seq=perseverance001&orientation=landscape',
    tags: ['rover', 'perseverance', 'mars', 'astrobiology'],
    year: '2021',
    mission: 'Mars 2020'
  },
  {
    id: 'spacecraft-010',
    name: 'Curiosity Rover',
    description: 'Car-sized Mars rover with ChemCam laser, drill, and laboratory analyzing Martian geology since 2012.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Curiosity%20Mars%20rover%20with%20six%20wheels%20robotic%20arm%20camera%20mast%20on%20rocky%20red%20Mars%20terrain&width=800&height=600&seq=curiosity001&orientation=landscape',
    tags: ['rover', 'curiosity', 'mars', 'geology'],
    year: '2012',
    mission: 'Mars Science Laboratory'
  },
  {
    id: 'spacecraft-011',
    name: 'SpaceX Dragon Capsule',
    description: 'Commercial crew and cargo spacecraft with sleek white exterior, docking port, and reusable design.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20SpaceX%20Dragon%20capsule%20white%20exterior%20with%20black%20heat%20shield%20docking%20port%20solar%20panels%20in%20space&width=800&height=600&seq=dragon001&orientation=landscape',
    tags: ['capsule', 'dragon', 'spacex', 'commercial'],
    year: '2020',
    mission: 'Commercial Crew'
  },
  {
    id: 'spacecraft-012',
    name: 'Orion Spacecraft',
    description: 'NASA\'s next-generation deep space capsule for Artemis missions to Moon and eventually Mars.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20NASA%20Orion%20spacecraft%20capsule%20with%20solar%20panels%20service%20module%20heat%20shield%20against%20Earth%20backdrop&width=800&height=600&seq=orion001&orientation=landscape',
    tags: ['capsule', 'orion', 'artemis', 'deep space'],
    year: '2022',
    mission: 'Artemis I'
  },
  {
    id: 'spacecraft-013',
    name: 'Soyuz Spacecraft',
    description: 'Reliable Russian spacecraft with orbital, descent, and service modules, workhorse of human spaceflight.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20model%20of%20Soyuz%20spacecraft%20with%20three%20modules%20solar%20panels%20docking%20mechanism%20green%20and%20white%20colors%20in%20orbit&width=800&height=600&seq=soyuz001&orientation=landscape',
    tags: ['capsule', 'soyuz', 'russian', 'reliable'],
    year: '2024',
    mission: 'ISS Transport'
  },
  {
    id: 'spacecraft-014',
    name: 'New Horizons',
    description: 'Pluto explorer spacecraft with dish antenna and instruments that revealed dwarf planet\'s secrets.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20New%20Horizons%20spacecraft%20with%20large%20dish%20antenna%20gold%20foil%20instruments%20flying%20past%20Pluto%20detailed&width=800&height=600&seq=newhorizons001&orientation=landscape',
    tags: ['probe', 'new horizons', 'pluto', 'explorer'],
    year: '2006',
    mission: 'Pluto Flyby'
  },
  {
    id: 'spacecraft-015',
    name: 'Juno Spacecraft',
    description: 'Jupiter orbiter with massive solar panels studying planet\'s atmosphere, magnetosphere, and interior.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Juno%20spacecraft%20with%20three%20huge%20solar%20panel%20arrays%20instruments%20near%20Jupiter%20clouds%20realistic&width=800&height=600&seq=juno001&orientation=landscape',
    tags: ['probe', 'juno', 'jupiter', 'orbiter'],
    year: '2011',
    mission: 'Juno Mission'
  },
  {
    id: 'spacecraft-016',
    name: 'Parker Solar Probe',
    description: 'Fastest human-made object, diving through Sun\'s corona with heat shield protecting instruments.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Parker%20Solar%20Probe%20with%20white%20heat%20shield%20solar%20panels%20approaching%20bright%20Sun%20corona&width=800&height=600&seq=parker001&orientation=landscape',
    tags: ['probe', 'parker', 'sun', 'corona'],
    year: '2018',
    mission: 'Solar Probe'
  },
  {
    id: 'spacecraft-017',
    name: 'Ingenuity Helicopter',
    description: 'First aircraft to fly on another planet, small Mars helicopter with counter-rotating blades.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Ingenuity%20Mars%20helicopter%20with%20dual%20rotor%20blades%20solar%20panel%20legs%20on%20red%20Martian%20surface%20detailed&width=800&height=600&seq=ingenuity001&orientation=landscape',
    tags: ['helicopter', 'ingenuity', 'mars', 'aircraft'],
    year: '2021',
    mission: 'Mars 2020'
  },
  {
    id: 'spacecraft-018',
    name: 'Starship',
    description: 'SpaceX\'s fully reusable super heavy-lift launch vehicle for Moon, Mars, and beyond.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20render%20of%20SpaceX%20Starship%20stainless%20steel%20rocket%20with%20fins%20on%20launch%20pad%20realistic%20lighting%20detailed&width=800&height=600&seq=starship001&orientation=landscape',
    tags: ['rocket', 'starship', 'spacex', 'reusable'],
    year: '2024',
    mission: 'Artemis III'
  },
  {
    id: 'spacecraft-019',
    name: 'Saturn V Rocket',
    description: 'Most powerful rocket ever flown, three-stage behemoth that launched Apollo missions to Moon.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Saturn%20V%20rocket%20white%20with%20black%20stripes%20three%20stages%20on%20launch%20pad%20with%20service%20towers&width=800&height=600&seq=saturnv001&orientation=landscape',
    tags: ['rocket', 'saturn v', 'apollo', 'powerful'],
    year: '1967',
    mission: 'Apollo Program'
  },
  {
    id: 'spacecraft-020',
    name: 'Falcon 9',
    description: 'SpaceX\'s workhorse reusable rocket with landing legs, revolutionizing spaceflight economics.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Falcon%209%20rocket%20white%20with%20black%20landing%20legs%20grid%20fins%20launching%20with%20fire%20exhaust&width=800&height=600&seq=falcon9001&orientation=landscape',
    tags: ['rocket', 'falcon 9', 'spacex', 'reusable'],
    year: '2024',
    mission: 'Commercial Launch'
  },

  // Nebulae & Deep Space (50 models)
  {
    id: 'nebula-001',
    name: 'Pillars of Creation',
    description: 'Iconic star-forming region in Eagle Nebula with towering columns of gas and dust sculpted by stellar winds.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20Pillars%20of%20Creation%20towering%20gas%20columns%20brown%20orange%20colors%20star%20formation%20Eagle%20Nebula%20deep%20space&width=800&height=600&seq=pillars001&orientation=landscape',
    tags: ['nebula', 'pillars', 'star formation', 'eagle nebula'],
    year: '2024'
  },
  {
    id: 'nebula-002',
    name: 'Crab Nebula',
    description: 'Supernova remnant with pulsar at center, expanding cloud of gas from stellar explosion in 1054 AD.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Crab%20Nebula%20supernova%20remnant%20with%20filaments%20orange%20red%20blue%20colors%20pulsar%20center%20against%20black%20space&width=800&height=600&seq=crab001&orientation=landscape',
    tags: ['nebula', 'supernova', 'pulsar', 'remnant'],
    year: '2024'
  },
  {
    id: 'nebula-003',
    name: 'Orion Nebula',
    description: 'Closest massive star-forming region to Earth, glowing pink and purple stellar nursery visible to naked eye.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=beautiful%203D%20visualization%20of%20Orion%20Nebula%20pink%20purple%20red%20colors%20star%20formation%20glowing%20gas%20clouds%20deep%20space%20detailed&width=800&height=600&seq=orion001&orientation=landscape',
    tags: ['nebula', 'orion', 'star formation', 'stellar nursery'],
    year: '2024'
  },
  {
    id: 'nebula-004',
    name: 'Horsehead Nebula',
    description: 'Dark nebula silhouette resembling horse\'s head against bright emission nebula background.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Horsehead%20Nebula%20dark%20silhouette%20against%20bright%20red%20orange%20emission%20nebula%20background%20detailed%20structure&width=800&height=600&seq=horsehead001&orientation=landscape',
    tags: ['nebula', 'horsehead', 'dark nebula', 'silhouette'],
    year: '2024'
  },
  {
    id: 'nebula-005',
    name: 'Ring Nebula',
    description: 'Planetary nebula with colorful expanding ring of gas ejected by dying star, white dwarf at center.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20model%20of%20Ring%20Nebula%20circular%20expanding%20gas%20ring%20blue%20green%20colors%20white%20dwarf%20center%20against%20black%20space&width=800&height=600&seq=ring001&orientation=landscape',
    tags: ['nebula', 'planetary nebula', 'ring', 'dying star'],
    year: '2024'
  },
  {
    id: 'nebula-006',
    name: 'Helix Nebula',
    description: 'Eye of God nebula, closest planetary nebula showing intricate structure of dying Sun-like star.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20visualization%20of%20Helix%20Nebula%20eye%20shape%20blue%20green%20red%20colors%20intricate%20filaments%20white%20dwarf%20center&width=800&height=600&seq=helix001&orientation=landscape',
    tags: ['nebula', 'helix', 'eye of god', 'planetary'],
    year: '2024'
  },
  {
    id: 'nebula-007',
    name: 'Butterfly Nebula',
    description: 'Bipolar planetary nebula with symmetric wing-like lobes of hot gas expanding from central star.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=beautiful%203D%20render%20of%20Butterfly%20Nebula%20symmetric%20wing%20lobes%20orange%20red%20colors%20bipolar%20structure%20hot%20gas%20clouds&width=800&height=600&seq=butterfly001&orientation=landscape',
    tags: ['nebula', 'butterfly', 'bipolar', 'symmetric'],
    year: '2024'
  },
  {
    id: 'nebula-008',
    name: 'Cats Eye Nebula',
    description: 'Complex planetary nebula with concentric shells, jets, and intricate structures from dying star.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Cats%20Eye%20Nebula%20concentric%20shells%20blue%20green%20colors%20complex%20structure%20jets%20filaments%20detailed&width=800&height=600&seq=catseye001&orientation=landscape',
    tags: ['nebula', 'cats eye', 'complex', 'shells'],
    year: '2024'
  },
  {
    id: 'nebula-009',
    name: 'Lagoon Nebula',
    description: 'Giant interstellar cloud with star formation, bright emission nebula with dark dust lanes.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20Lagoon%20Nebula%20pink%20red%20emission%20clouds%20dark%20dust%20lanes%20star%20formation%20bright%20regions&width=800&height=600&seq=lagoon001&orientation=landscape',
    tags: ['nebula', 'lagoon', 'emission', 'star formation'],
    year: '2024'
  },
  {
    id: 'nebula-010',
    name: 'Tarantula Nebula',
    description: 'Most active star-forming region in Local Group, massive nebula in Large Magellanic Cloud.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Tarantula%20Nebula%20spider-like%20structure%20red%20pink%20colors%20massive%20star%20formation%20bright%20clusters&width=800&height=600&seq=tarantula001&orientation=landscape',
    tags: ['nebula', 'tarantula', 'star formation', 'massive'],
    year: '2024'
  },
  {
    id: 'galaxy-001',
    name: 'Milky Way Galaxy',
    description: 'Our home galaxy, barred spiral with 200-400 billion stars, viewed from outside showing spiral arms.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=beautiful%203D%20render%20of%20Milky%20Way%20galaxy%20barred%20spiral%20structure%20blue%20white%20arms%20central%20bulge%20viewed%20from%20outside&width=800&height=600&seq=milkyway001&orientation=landscape',
    tags: ['galaxy', 'milky way', 'spiral', 'home'],
    year: '2024'
  },
  {
    id: 'galaxy-002',
    name: 'Andromeda Galaxy',
    description: 'Nearest major galaxy to Milky Way, massive spiral galaxy on collision course with our galaxy.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20model%20of%20Andromeda%20galaxy%20M31%20spiral%20structure%20blue%20white%20arms%20dust%20lanes%20viewed%20at%20angle%20detailed&width=800&height=600&seq=andromeda001&orientation=landscape',
    tags: ['galaxy', 'andromeda', 'spiral', 'neighbor'],
    year: '2024'
  },
  {
    id: 'galaxy-003',
    name: 'Whirlpool Galaxy',
    description: 'Grand design spiral galaxy with prominent arms, interacting with companion galaxy NGC 5195.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20visualization%20of%20Whirlpool%20galaxy%20M51%20perfect%20spiral%20arms%20blue%20pink%20colors%20companion%20galaxy%20interaction&width=800&height=600&seq=whirlpool001&orientation=landscape',
    tags: ['galaxy', 'whirlpool', 'spiral', 'interacting'],
    year: '2024'
  },
  {
    id: 'galaxy-004',
    name: 'Sombrero Galaxy',
    description: 'Unusual galaxy with bright nucleus and large central bulge, prominent dust lane resembling sombrero hat.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Sombrero%20galaxy%20M104%20edge-on%20view%20bright%20bulge%20dark%20dust%20lane%20hat%20shape%20glowing%20halo&width=800&height=600&seq=sombrero001&orientation=landscape',
    tags: ['galaxy', 'sombrero', 'edge-on', 'unusual'],
    year: '2024'
  },
  {
    id: 'galaxy-005',
    name: 'Pinwheel Galaxy',
    description: 'Face-on spiral galaxy with well-defined arms, numerous star-forming regions and bright HII regions.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=beautiful%203D%20model%20of%20Pinwheel%20galaxy%20M101%20face-on%20spiral%20blue%20arms%20pink%20star%20forming%20regions%20detailed%20structure&width=800&height=600&seq=pinwheel001&orientation=landscape',
    tags: ['galaxy', 'pinwheel', 'spiral', 'face-on'],
    year: '2024'
  },
  {
    id: 'blackhole-001',
    name: 'Sagittarius A* Black Hole',
    description: 'Supermassive black hole at center of Milky Way, 4 million solar masses, with accretion disk.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20supermassive%20black%20hole%20with%20glowing%20orange%20accretion%20disk%20event%20horizon%20gravitational%20lensing&width=800&height=600&seq=sgra001&orientation=landscape',
    tags: ['black hole', 'sagittarius a', 'supermassive', 'galactic center'],
    year: '2024'
  },
  {
    id: 'blackhole-002',
    name: 'M87 Black Hole',
    description: 'First black hole ever photographed, 6.5 billion solar masses with powerful relativistic jet.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20M87%20black%20hole%20orange%20glowing%20ring%20accretion%20disk%20event%20horizon%20shadow%20relativistic%20jet&width=800&height=600&seq=m87bh001&orientation=landscape',
    tags: ['black hole', 'm87', 'supermassive', 'photographed'],
    year: '2024'
  },
  {
    id: 'cluster-001',
    name: 'Pleiades Star Cluster',
    description: 'Seven Sisters open cluster with hot blue stars surrounded by reflection nebulosity.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20visualization%20of%20Pleiades%20star%20cluster%20seven%20bright%20blue%20stars%20reflection%20nebula%20dust%20clouds%20against%20black%20space&width=800&height=600&seq=pleiades001&orientation=landscape',
    tags: ['star cluster', 'pleiades', 'seven sisters', 'open cluster'],
    year: '2024'
  },
  {
    id: 'cluster-002',
    name: 'Omega Centauri',
    description: 'Largest globular cluster in Milky Way with millions of ancient stars in spherical distribution.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20model%20of%20Omega%20Centauri%20globular%20cluster%20millions%20of%20stars%20spherical%20shape%20dense%20core%20against%20space&width=800&height=600&seq=omegacen001&orientation=landscape',
    tags: ['star cluster', 'omega centauri', 'globular', 'massive'],
    year: '2024'
  },
  {
    id: 'supernova-001',
    name: 'Supernova 1987A',
    description: 'Closest observed supernova in modern times, expanding ring of debris from exploded star.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Supernova%201987A%20expanding%20rings%20orange%20red%20colors%20debris%20field%20bright%20center%20stellar%20explosion&width=800&height=600&seq=sn1987a001&orientation=landscape',
    tags: ['supernova', 'explosion', 'remnant', 'rings'],
    year: '2024'
  },

  // Astronauts & Space Suits (30 models)
  {
    id: 'astronaut-001',
    name: 'Apollo A7L Spacesuit',
    description: 'Iconic white spacesuit worn on Moon with gold visor, life support backpack, and American flag.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Apollo%20A7L%20spacesuit%20white%20with%20gold%20visor%20backpack%20American%20flag%20patch%20on%20moon%20surface&width=800&height=600&seq=apollosuit001&orientation=landscape',
    tags: ['spacesuit', 'apollo', 'moon', 'EVA'],
    year: '1969'
  },
  {
    id: 'astronaut-002',
    name: 'EMU Spacesuit',
    description: 'Extravehicular Mobility Unit used on ISS, white suit with SAFER jetpack and modular components.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20EMU%20spacesuit%20white%20with%20red%20stripes%20SAFER%20jetpack%20gold%20visor%20floating%20in%20space%20ISS%20background&width=800&height=600&seq=emu001&orientation=landscape',
    tags: ['spacesuit', 'EMU', 'ISS', 'spacewalk'],
    year: '2024'
  },
  {
    id: 'astronaut-003',
    name: 'SpaceX EVA Suit',
    description: 'Sleek black and white spacesuit designed for Starship missions with modern helmet and touchscreen gloves.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20SpaceX%20EVA%20spacesuit%20sleek%20black%20white%20design%20modern%20helmet%20touchscreen%20gloves%20futuristic%20look&width=800&height=600&seq=spacexeva001&orientation=landscape',
    tags: ['spacesuit', 'spacex', 'EVA', 'modern'],
    year: '2024'
  },
  {
    id: 'astronaut-004',
    name: 'Orion Crew Survival Suit',
    description: 'Orange pressure suit for Artemis missions with advanced life support and emergency capabilities.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Orion%20crew%20survival%20suit%20bright%20orange%20with%20helmet%20gloves%20boots%20inside%20spacecraft&width=800&height=600&seq=orionsuit001&orientation=landscape',
    tags: ['spacesuit', 'orion', 'artemis', 'pressure suit'],
    year: '2022'
  },
  {
    id: 'astronaut-005',
    name: 'Neil Armstrong',
    description: 'First human to walk on Moon, Apollo 11 commander in spacesuit taking historic first steps.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Neil%20Armstrong%20in%20Apollo%20spacesuit%20on%20moon%20surface%20taking%20first%20steps%20lunar%20module%20background%20historic%20moment&width=800&height=600&seq=armstrong001&orientation=landscape',
    tags: ['astronaut', 'neil armstrong', 'apollo 11', 'first steps'],
    year: '1969'
  },
  {
    id: 'astronaut-006',
    name: 'Buzz Aldrin on Moon',
    description: 'Second person on Moon, iconic photo with Earth reflection in visor, saluting American flag.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Buzz%20Aldrin%20in%20spacesuit%20on%20moon%20surface%20American%20flag%20Earth%20reflection%20in%20gold%20visor&width=800&height=600&seq=aldrin001&orientation=landscape',
    tags: ['astronaut', 'buzz aldrin', 'apollo 11', 'moon'],
    year: '1969'
  },
  {
    id: 'astronaut-007',
    name: 'Spacewalker on ISS',
    description: 'Astronaut performing EVA outside International Space Station with Earth in background.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20astronaut%20spacewalking%20outside%20ISS%20white%20spacesuit%20Earth%20background%20solar%20panels%20detailed&width=800&height=600&seq=spacewalk001&orientation=landscape',
    tags: ['astronaut', 'spacewalk', 'ISS', 'EVA'],
    year: '2024'
  },
  {
    id: 'astronaut-008',
    name: 'Gemini Spacesuit',
    description: 'Early NASA spacesuit from Gemini program, white with chest-mounted controls and bubble helmet.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Gemini%20spacesuit%20white%20with%20chest%20controls%20bubble%20helmet%20vintage%201960s%20design&width=800&height=600&seq=gemini001&orientation=landscape',
    tags: ['spacesuit', 'gemini', 'vintage', '1960s'],
    year: '1965'
  },
  {
    id: 'astronaut-009',
    name: 'Mercury Spacesuit',
    description: 'First American spacesuit, silver pressure suit worn by Mercury Seven astronauts.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Mercury%20spacesuit%20silver%20metallic%20pressure%20suit%20with%20helmet%20first%20American%20spacesuit%20vintage&width=800&height=600&seq=mercury001&orientation=landscape',
    tags: ['spacesuit', 'mercury', 'first', 'silver'],
    year: '1961'
  },
  {
    id: 'astronaut-010',
    name: 'Russian Orlan Spacesuit',
    description: 'Soviet/Russian EVA suit with rear entry hatch, used on Mir and ISS spacewalks.',
    category: 'Astronauts',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20model%20of%20Russian%20Orlan%20spacesuit%20white%20with%20red%20stripes%20rear%20entry%20hatch%20Cyrillic%20text&width=800&height=600&seq=orlan001&orientation=landscape',
    tags: ['spacesuit', 'orlan', 'russian', 'EVA'],
    year: '2024'
  },

  // Space Stations & Habitats (20 models)
  {
    id: 'station-001',
    name: 'ISS Cupola Module',
    description: 'Seven-window observatory module providing panoramic views of Earth and space operations.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20ISS%20Cupola%20module%20seven%20windows%20panoramic%20Earth%20view%20astronaut%20inside%20observatory&width=800&height=600&seq=cupola001&orientation=landscape',
    tags: ['space station', 'cupola', 'ISS', 'observatory'],
    year: '2010'
  },
  {
    id: 'station-002',
    name: 'Mir Space Station',
    description: 'Soviet/Russian modular space station that operated for 15 years with multiple docking ports.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Mir%20space%20station%20modular%20design%20solar%20panels%20multiple%20modules%20docking%20ports%20orbiting%20Earth&width=800&height=600&seq=mir001&orientation=landscape',
    tags: ['space station', 'mir', 'russian', 'modular'],
    year: '1986'
  },
  {
    id: 'station-003',
    name: 'Skylab Space Station',
    description: 'First American space station, converted Saturn V upper stage with solar panels and telescope.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Skylab%20space%20station%20cylindrical%20body%20solar%20panel%20wings%20telescope%20mount%20in%20orbit&width=800&height=600&seq=skylab001&orientation=landscape',
    tags: ['space station', 'skylab', 'american', 'first'],
    year: '1973'
  },
  {
    id: 'station-004',
    name: 'Lunar Gateway',
    description: 'Planned lunar orbit station for Artemis program, small outpost supporting Moon missions.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20visualization%20of%20Lunar%20Gateway%20station%20modules%20solar%20panels%20near%20Moon%20surface%20small%20outpost%20futuristic&width=800&height=600&seq=gateway001&orientation=landscape',
    tags: ['space station', 'gateway', 'lunar', 'artemis'],
    year: '2025'
  },
  {
    id: 'station-005',
    name: 'Tiangong Space Station',
    description: 'Chinese modular space station with T-shaped configuration and advanced laboratories.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Tiangong%20space%20station%20T-shaped%20configuration%20Chinese%20modules%20solar%20panels%20Earth%20orbit&width=800&height=600&seq=tiangong001&orientation=landscape',
    tags: ['space station', 'tiangong', 'chinese', 'modular'],
    year: '2022'
  },
  {
    id: 'habitat-001',
    name: 'Mars Habitat Module',
    description: 'Conceptual pressurized habitat for Mars surface with life support, living quarters, and airlocks.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Mars%20habitat%20module%20cylindrical%20structure%20on%20red%20Martian%20surface%20solar%20panels%20airlock%20windows&width=800&height=600&seq=marshabitat001&orientation=landscape',
    tags: ['habitat', 'mars', 'surface', 'pressurized'],
    year: '2024'
  },
  {
    id: 'habitat-002',
    name: 'Lunar Base Concept',
    description: 'Future Moon base with interconnected modules, solar panels, and regolith radiation shielding.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20lunar%20base%20multiple%20connected%20modules%20solar%20arrays%20regolith%20covering%20on%20moon%20surface&width=800&height=600&seq=lunarbase001&orientation=landscape',
    tags: ['habitat', 'lunar', 'base', 'future'],
    year: '2024'
  },
  {
    id: 'habitat-003',
    name: 'Inflatable Space Habitat',
    description: 'BEAM-style expandable module attached to ISS, soft-goods technology for future deep space missions.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20inflatable%20space%20habitat%20BEAM%20module%20white%20expandable%20structure%20attached%20to%20ISS&width=800&height=600&seq=beam001&orientation=landscape',
    tags: ['habitat', 'inflatable', 'BEAM', 'expandable'],
    year: '2016'
  },

  // Satellites & Probes (30 models)
  {
    id: 'satellite-001',
    name: 'GPS Satellite',
    description: 'Navigation satellite with solar panels and antennas providing global positioning data.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20GPS%20satellite%20with%20large%20solar%20panel%20wings%20antennas%20navigation%20equipment%20orbiting%20Earth&width=800&height=600&seq=gps001&orientation=landscape',
    tags: ['satellite', 'GPS', 'navigation', 'orbital'],
    year: '2024'
  },
  {
    id: 'satellite-002',
    name: 'Starlink Satellite',
    description: 'SpaceX internet satellite with flat panel design and ion thrusters for constellation deployment.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Starlink%20satellite%20flat%20panel%20design%20solar%20array%20ion%20thrusters%20compact%20modern%20design&width=800&height=600&seq=starlink001&orientation=landscape',
    tags: ['satellite', 'starlink', 'internet', 'constellation'],
    year: '2024'
  },
  {
    id: 'satellite-003',
    name: 'Landsat Satellite',
    description: 'Earth observation satellite with imaging instruments monitoring land use and environmental changes.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Landsat%20satellite%20with%20imaging%20instruments%20solar%20panels%20Earth%20observation%20equipment&width=800&height=600&seq=landsat001&orientation=landscape',
    tags: ['satellite', 'landsat', 'earth observation', 'imaging'],
    year: '2024'
  },
  {
    id: 'satellite-004',
    name: 'Weather Satellite GOES',
    description: 'Geostationary weather satellite monitoring storms, hurricanes, and atmospheric conditions.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20GOES%20weather%20satellite%20with%20large%20dish%20antenna%20solar%20panels%20imaging%20instruments%20geostationary%20orbit&width=800&height=600&seq=goes001&orientation=landscape',
    tags: ['satellite', 'weather', 'GOES', 'geostationary'],
    year: '2024'
  },
  {
    id: 'satellite-005',
    name: 'Chandra X-ray Observatory',
    description: 'Space telescope detecting X-rays from high-energy regions like black holes and supernovae.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Chandra%20X-ray%20telescope%20long%20cylindrical%20body%20solar%20panels%20X-ray%20mirrors%20in%20space&width=800&height=600&seq=chandra001&orientation=landscape',
    tags: ['satellite', 'chandra', 'x-ray', 'telescope'],
    year: '1999'
  },
  {
    id: 'satellite-006',
    name: 'Spitzer Space Telescope',
    description: 'Infrared space telescope with cryogenic cooling revealing hidden universe in infrared light.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20visualization%20of%20Spitzer%20Space%20Telescope%20infrared%20observatory%20solar%20panel%20shield%20instruments%20in%20deep%20space&width=800&height=600&seq=spitzer001&orientation=landscape',
    tags: ['satellite', 'spitzer', 'infrared', 'telescope'],
    year: '2003'
  },
  {
    id: 'probe-001',
    name: 'Pioneer 10',
    description: 'First spacecraft to Jupiter with iconic golden plaque showing human figures and Earth location.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20model%20of%20Pioneer%2010%20spacecraft%20with%20dish%20antenna%20golden%20plaque%20instruments%20against%20starry%20background&width=800&height=600&seq=pioneer10001&orientation=landscape',
    tags: ['probe', 'pioneer', 'jupiter', 'golden plaque'],
    year: '1972'
  },
  {
    id: 'probe-002',
    name: 'Galileo Orbiter',
    description: 'Jupiter orbiter and atmospheric probe that studied planet and moons for eight years.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Galileo%20spacecraft%20orbiter%20with%20dish%20antenna%20instruments%20gold%20foil%20near%20Jupiter%20detailed&width=800&height=600&seq=galileo001&orientation=landscape',
    tags: ['probe', 'galileo', 'jupiter', 'orbiter'],
    year: '1989'
  },
  {
    id: 'probe-003',
    name: 'Magellan Venus Mapper',
    description: 'Radar mapping spacecraft that revealed Venus surface beneath thick clouds.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Magellan%20spacecraft%20with%20radar%20antenna%20solar%20panels%20mapping%20Venus%20surface%20detailed&width=800&height=600&seq=magellan001&orientation=landscape',
    tags: ['probe', 'magellan', 'venus', 'radar'],
    year: '1989'
  },
  {
    id: 'probe-004',
    name: 'OSIRIS-REx',
    description: 'Asteroid sample return mission that collected material from Bennu and returned to Earth.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20OSIRIS-REx%20spacecraft%20with%20sample%20arm%20solar%20panels%20near%20asteroid%20Bennu%20detailed&width=800&height=600&seq=osirisrex001&orientation=landscape',
    tags: ['probe', 'osiris-rex', 'asteroid', 'sample return'],
    year: '2016'
  },

  // Rockets & Launch Vehicles (20 models)
  {
    id: 'rocket-001',
    name: 'Space Launch System',
    description: 'NASA\'s most powerful rocket for Artemis Moon missions with solid rocket boosters and core stage.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20render%20of%20SLS%20Space%20Launch%20System%20rocket%20orange%20core%20stage%20white%20boosters%20on%20launch%20pad%20detailed&width=800&height=600&seq=sls001&orientation=landscape',
    tags: ['rocket', 'SLS', 'artemis', 'powerful'],
    year: '2022',
    mission: 'Artemis I'
  },
  {
    id: 'rocket-002',
    name: 'Falcon Heavy',
    description: 'Most powerful operational rocket with three reusable boosters capable of landing simultaneously.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Falcon%20Heavy%20rocket%20three%20white%20boosters%20launching%20with%20fire%20exhaust%20dramatic%20lighting&width=800&height=600&seq=falconheavy001&orientation=landscape',
    tags: ['rocket', 'falcon heavy', 'spacex', 'reusable'],
    year: '2024'
  },
  {
    id: 'rocket-003',
    name: 'Atlas V',
    description: 'Reliable launch vehicle with single core and optional solid rocket boosters for various payloads.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Atlas%20V%20rocket%20orange%20core%20stage%20white%20fairing%20on%20launch%20pad%20with%20service%20tower&width=800&height=600&seq=atlasv001&orientation=landscape',
    tags: ['rocket', 'atlas v', 'ULA', 'reliable'],
    year: '2024'
  },
  {
    id: 'rocket-004',
    name: 'Delta IV Heavy',
    description: 'Heavy-lift rocket with three common core boosters burning liquid hydrogen and oxygen.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Delta%20IV%20Heavy%20rocket%20three%20orange%20cores%20white%20fairing%20launching%20with%20bright%20exhaust&width=800&height=600&seq=deltaiv001&orientation=landscape',
    tags: ['rocket', 'delta iv', 'heavy lift', 'ULA'],
    year: '2024'
  },
  {
    id: 'rocket-005',
    name: 'Ariane 5',
    description: 'European heavy-lift launcher with two solid boosters and cryogenic core stage.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Ariane%205%20rocket%20white%20with%20orange%20core%20two%20solid%20boosters%20European%20launcher&width=800&height=600&seq=ariane5001&orientation=landscape',
    tags: ['rocket', 'ariane 5', 'european', 'heavy lift'],
    year: '2024'
  },
  {
    id: 'rocket-006',
    name: 'Long March 5',
    description: 'Chinese heavy-lift rocket with four liquid boosters for space station and lunar missions.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Long%20March%205%20rocket%20white%20with%20Chinese%20markings%20four%20boosters%20on%20launch%20pad%20detailed&width=800&height=600&seq=longmarch5001&orientation=landscape',
    tags: ['rocket', 'long march', 'chinese', 'heavy lift'],
    year: '2024'
  },
  {
    id: 'rocket-007',
    name: 'Soyuz Rocket',
    description: 'Most launched rocket in history with distinctive four-strap-on booster configuration.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Soyuz%20rocket%20with%20four%20strap-on%20boosters%20green%20and%20white%20colors%20launching%20detailed&width=800&height=600&seq=soyuzrocket001&orientation=landscape',
    tags: ['rocket', 'soyuz', 'russian', 'reliable'],
    year: '2024'
  },
  {
    id: 'rocket-008',
    name: 'New Glenn',
    description: 'Blue Origin\'s heavy-lift reusable rocket with seven BE-4 engines and large payload fairing.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20visualization%20of%20New%20Glenn%20rocket%20blue%20and%20white%20reusable%20booster%20large%20fairing%20futuristic%20design&width=800&height=600&seq=newglenn001&orientation=landscape',
    tags: ['rocket', 'new glenn', 'blue origin', 'reusable'],
    year: '2024'
  },
  {
    id: 'rocket-009',
    name: 'Electron Rocket',
    description: 'Small satellite launcher by Rocket Lab with carbon composite structure and electric pumps.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Electron%20rocket%20small%20black%20carbon%20fiber%20launcher%20on%20pad%20Rocket%20Lab%20vehicle&width=800&height=600&seq=electron001&orientation=landscape',
    tags: ['rocket', 'electron', 'rocket lab', 'small sat'],
    year: '2024'
  },
  {
    id: 'rocket-010',
    name: 'Vulcan Centaur',
    description: 'Next-generation ULA rocket replacing Atlas V and Delta IV with BE-4 engines.',
    category: 'Rockets',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20render%20of%20Vulcan%20Centaur%20rocket%20modern%20design%20blue%20engines%20white%20body%20on%20launch%20pad%20detailed&width=800&height=600&seq=vulcan001&orientation=landscape',
    tags: ['rocket', 'vulcan', 'ULA', 'next-gen'],
    year: '2024'
  },

  // Additional 10 New Models
  {
    id: 'asteroid-001',
    name: 'Asteroid Bennu',
    description: 'Near-Earth asteroid visited by OSIRIS-REx mission, diamond-shaped rubble pile with ancient material from early solar system.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20asteroid%20Bennu%20diamond%20shaped%20rocky%20surface%20with%20boulders%20craters%20dark%20gray%20color%20against%20black%20space%20background%20realistic%20lighting&width=800&height=600&seq=bennu001&orientation=landscape',
    tags: ['asteroid', 'bennu', 'near-earth', 'sample return'],
    year: '2024'
  },
  {
    id: 'comet-001',
    name: 'Comet 67P Churyumov-Gerasimenko',
    description: 'Duck-shaped comet explored by Rosetta mission with dramatic jets of gas and dust erupting from surface.',
    category: 'Nebulae',
    imageUrl: 'https://readdy.ai/api/search-image?query=stunning%203D%20visualization%20of%20Comet%2067P%20duck%20shaped%20nucleus%20with%20gas%20jets%20dust%20tail%20rocky%20surface%20against%20starry%20space%20background%20detailed&width=800&height=600&seq=comet67p001&orientation=landscape',
    tags: ['comet', '67P', 'rosetta', 'jets'],
    year: '2024'
  },
  {
    id: 'spacecraft-021',
    name: 'Lunar Reconnaissance Orbiter',
    description: 'NASA spacecraft mapping the Moon in unprecedented detail, finding water ice and potential landing sites.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20model%20of%20Lunar%20Reconnaissance%20Orbiter%20spacecraft%20with%20solar%20panels%20instruments%20cameras%20orbiting%20above%20Moon%20surface%20detailed&width=800&height=600&seq=lro001&orientation=landscape',
    tags: ['orbiter', 'LRO', 'moon', 'mapping'],
    year: '2009',
    mission: 'LRO'
  },
  {
    id: 'spacecraft-022',
    name: 'Mars Reconnaissance Orbiter',
    description: 'Powerful Mars orbiter with HiRISE camera capturing stunning surface details and supporting rover missions.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20Mars%20Reconnaissance%20Orbiter%20with%20large%20dish%20antenna%20solar%20panels%20HiRISE%20camera%20orbiting%20red%20Mars%20planet&width=800&height=600&seq=mro001&orientation=landscape',
    tags: ['orbiter', 'MRO', 'mars', 'HiRISE'],
    year: '2006',
    mission: 'MRO'
  },
  {
    id: 'spacecraft-023',
    name: 'Dawn Spacecraft',
    description: 'Ion-propelled explorer that visited asteroid Vesta and dwarf planet Ceres, revealing ancient protoplanets.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Dawn%20spacecraft%20with%20large%20solar%20panel%20wings%20ion%20engines%20instruments%20approaching%20asteroid%20Vesta%20detailed%20realistic&width=800&height=600&seq=dawn001&orientation=landscape',
    tags: ['probe', 'dawn', 'vesta', 'ceres', 'ion propulsion'],
    year: '2007',
    mission: 'Dawn Mission'
  },
  {
    id: 'station-006',
    name: 'Axiom Space Station',
    description: 'First commercial space station module attached to ISS, future standalone orbital habitat for research and tourism.',
    category: 'Space Stations',
    imageUrl: 'https://readdy.ai/api/search-image?query=futuristic%203D%20visualization%20of%20Axiom%20commercial%20space%20station%20modules%20white%20exterior%20large%20windows%20solar%20panels%20Earth%20orbit%20modern%20design&width=800&height=600&seq=axiom001&orientation=landscape',
    tags: ['space station', 'axiom', 'commercial', 'future'],
    year: '2024'
  },
  {
    id: 'rover-001',
    name: 'Spirit Mars Rover',
    description: 'NASA Mars Exploration Rover that operated for over 6 years, discovering evidence of past water on Mars.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20model%20of%20Spirit%20Mars%20rover%20with%20six%20wheels%20solar%20panels%20camera%20mast%20robotic%20arm%20on%20red%20Martian%20rocky%20terrain&width=800&height=600&seq=spirit001&orientation=landscape',
    tags: ['rover', 'spirit', 'mars', 'MER'],
    year: '2004',
    mission: 'Mars Exploration Rover'
  },
  {
    id: 'rover-002',
    name: 'Opportunity Mars Rover',
    description: 'Record-breaking Mars rover that traveled over 28 miles, lasting 15 years exploring Meridiani Planum.',
    category: 'Spacecraft',
    imageUrl: 'https://readdy.ai/api/search-image?query=realistic%203D%20render%20of%20Opportunity%20Mars%20rover%20with%20solar%20panels%20wheels%20camera%20mast%20on%20Mars%20surface%20with%20distant%20hills%20red%20terrain&width=800&height=600&seq=opportunity001&orientation=landscape',
    tags: ['rover', 'opportunity', 'mars', 'marathon'],
    year: '2004',
    mission: 'Mars Exploration Rover'
  },
  {
    id: 'telescope-001',
    name: 'Kepler Space Telescope',
    description: 'Planet-hunting telescope that discovered over 2,600 exoplanets by detecting tiny brightness dips as planets transit stars.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=3D%20model%20of%20Kepler%20Space%20Telescope%20cylindrical%20body%20with%20solar%20panels%20sunshade%20photometer%20in%20deep%20space%20searching%20for%20exoplanets&width=800&height=600&seq=kepler001&orientation=landscape',
    tags: ['telescope', 'kepler', 'exoplanets', 'transit'],
    year: '2009',
    mission: 'Kepler Mission'
  },
  {
    id: 'telescope-002',
    name: 'TESS Space Telescope',
    description: 'Transiting Exoplanet Survey Satellite scanning the entire sky for nearby exoplanets around bright stars.',
    category: 'Satellites',
    imageUrl: 'https://readdy.ai/api/search-image?query=detailed%203D%20render%20of%20TESS%20spacecraft%20with%20four%20wide-field%20cameras%20solar%20panels%20scanning%20stars%20for%20exoplanets%20against%20starry%20background&width=800&height=600&seq=tess001&orientation=landscape',
    tags: ['telescope', 'TESS', 'exoplanets', 'survey'],
    year: '2018',
    mission: 'TESS Mission'
  }
];
