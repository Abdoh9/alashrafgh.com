// User Authentication and Profile Management
let currentUser = null;
let cart = [];
let wishlist = [];
let compareList = [];
let tempUserData = null;
let countdownTimer = null;
let countdownValue = 30;
let currentProduct = null;
let userRating = 0;
let currentSort = 'default';
let activeFilters = {
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    rating: null
};

// Product Database
const products = [
    {
        id: 1,
        name: 'آيفون 15 برو ماكس',
        brand: 'Apple',
        category: 'phones',
        price: 32999,
        originalPrice: 38999,
        rating: 4.5,
        reviews: 128,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPhone+15',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPhone+15',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPhone+15+Back',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPhone+15+Side'
        ],
        badge: 'عرض خاص',
        description: 'آيفون 15 برو ماكس بأحدث معالج A17 برو وكاميرا متطورة وشاشة Super Retina XDR.',
        detailedDescription: 'يتميز آيفون 15 برو ماكس بتصميمه الأنيق من التيتانيوم وشاشة Super Retina XDR بحجم 6.7 بوصة مع تقنية ProMotion. يعمل بمعالج A17 برو الجديد الذي يقدم أداءً فائقًا وكفاءة في استهلاك الطاقة. الكاميرا الرئيسية بدقة 48 ميجابكسل مع تقنية ProRAW والقدرة على تصوير الفيديو بدقة 4K بمعدل 120 إطارًا في الثانية. البطارية تدوم طوال اليوم مع دعم الشحن السريع والشحن اللاسلكي.',
        features: [
            'شاشة Super Retina XDR بحجم 6.7 بوصة',
            'معالج A17 برو مع شريحة Neural Engine',
            'نظام كاميرا احترافي بدقة 48 ميجابكسل',
            'بطارية تدوم طوال اليوم',
            'مقاومة للماء والغبار بمعيار IP68',
            'دعم الشحن السريع والشحن اللاسلكي'
        ],
        specifications: {
            'الشاشة': 'Super Retina XDR OLED، 6.7 بوصة، 2796 × 1290 بكسل',
            'المعالج': 'A17 برو',
            'الكاميرا الخلفية': '48 ميجابكسل رئيسية، 12 ميجابكسل ultra wide، 12 ميجابكسل telephoto',
            'الكاميرا الأمامية': '12 ميجابكسل',
            'التخزين': '128GB، 256GB، 512GB، 1TB',
            'البطارية': 'تدوم طوال اليوم',
            'الاتصال': '5G، Wi-Fi 6E، Bluetooth 5.3',
            'الألوان': 'تيتانيوم أزرق، تيتانيوم أبيض، تيتانيوم أسود، تيتانيوم طبيعي'
        },
        reviews: [
            {
                name: 'أحمد محمد',
                rating: 5,
                date: '2023-10-15',
                text: 'هاتف رائع جداً! الكاميرا مذهلة والأداء سريع جداً. يستحق كل ريال.'
            },
            {
                name: 'سارة أحمد',
                rating: 4,
                date: '2023-10-10',
                text: 'الهاتف ممتاز لكن السعر مرتفع قليلاً. الكاميرا أفضل ما فيه.'
            },
            {
                name: 'محمد علي',
                rating: 5,
                date: '2023-09-28',
                text: 'تحسن كبير عن الإصدار السابق. البطارية تدوم أطول والشاشة أفضل.'
            }
        ]
    },
    {
        id: 2,
        name: 'جالكسي إس 24 الترا',
        brand: 'Samsung',
        category: 'phones',
        price: 41999,
        originalPrice: null,
        rating: 5,
        reviews: 94,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Samsung+S24',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Samsung+S24',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Samsung+S24+Back',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Samsung+S24+Side'
        ],
        badge: 'جديد',
        description: 'جالكسي إس 24 الترا بكاميرا مذهلة 200 ميجابكسل وشاشة Dynamic AMOLED 2X.',
        detailedDescription: 'جالكسي إس 24 الترا هو أحدث هاتف ذكي من سامسونج مع كاميرا رئيسية بدقة 200 ميجابكسل وقدرة تكبير رقمية تصل إلى 100x. الشاشة Dynamic AMOLED 2X بحجم 6.8 بوصة مع معدل تحديث 120Hz. يعمل بمعالج Snapdragon 8 Gen 3 للجوال مع ذاكرة RAM تصل إلى 12GB. يدعم الشحن السريع بقدرة 45W والشحن اللاسلكي السريع.',
        features: [
            'شاشة Dynamic AMOLED 2X بحجم 6.8 بوصة',
            'معالج Snapdragon 8 Gen 3 للجوال',
            'كاميرا رئيسية بدقة 200 ميجابكسل مع تكبير رقمي 100x',
            'ذاكرة RAM 12GB مع مساحة تخزين تصل إلى 1TB',
            'بطارية 5000mAh مع دعم الشحن السريع',
            'مقاومة للماء والغبار بمعيار IP68'
        ],
        specifications: {
            'الشاشة': 'Dynamic AMOLED 2X، 6.8 بوصة، 1440 × 3120 بكسل',
            'المعالج': 'Snapdragon 8 Gen 3 للجوال',
            'الكاميرا الخلفية': '200 ميجابكسل رئيسية، 12 ميجابكسل ultra wide، 10 ميجابكسل teleoptic',
            'الكاميرا الأمامية': '12 ميجابكسل',
            'التخزين': '256GB، 512GB، 1TB',
            'البطارية': '5000mAh',
            'الاتصال': '5G، Wi-Fi 7، Bluetooth 5.3',
            'الألوان': 'أسود، بنفسجي، كريمي، رمادي'
        },
        reviews: [
            {
                name: 'خالد العتيبي',
                rating: 5,
                date: '2023-11-05',
                text: 'أفضل هاتف استخدمته في حياتي! الكاميرا مذهلة خاصة في الإضاءة المنخفضة.'
            },
            {
                name: 'نورة السعيد',
                rating: 5,
                date: '2023-11-01',
                text: 'الهاتف يستحق كل ريال. الأداء سريع جداً والشاشة رائعة.'
            },
            {
                name: 'عبدالله العنزي',
                rating: 5,
                date: '2023-10-25',
                text: 'تحسن كبير عن S23 Ultra. الكاميرا أفضل والبطارية تدوم أطول.'
            }
        ]
    },
    {
        id: 3,
        name: 'ماك بوك برو M3',
        brand: 'Apple',
        category: 'laptops',
        price: 64999,
        originalPrice: 69999,
        rating: 4.5,
        reviews: 76,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=MacBook+Pro',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=MacBook+Pro',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=MacBook+Pro+Keyboard',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=MacBook+Pro+Side'
        ],
        badge: null,
        description: 'ماك بوك برو بشريحة M3 الجديدة وشاشة Liquid Retina XDR.',
        detailedDescription: 'ماك بوك برو بشريحة M3 الجديدة يقدم أداءً استثنائياً وكفاءة في استهلاك الطاقة. الشاشة Liquid Retina XDR بحجم 14 بوصة مع دعم تقنية ProMotion ومعدل تحديث متغير. يأتي بذاكرة موحدة تصل إلى 36GB ومساحة تخزين تصل إلى 8TB. يدعم شاشات خارجية تصل إلى 6K ويحتوي على منافذ Thunderbolt 4.',
        features: [
            'شريحة M3 مع وحدة معالجة رسوميات تصل إلى 10 نوى',
            'شاشة Liquid Retina XDR بحجم 14 بوصة',
            'ذاكرة موحدة تصل إلى 36GB',
            'مساحة تخزين سريعة تصل إلى 8TB',
            'بطارية تدوم حتى 18 ساعة',
            'نظام صوتي مع ستة مكبرات صوت'
        ],
        specifications: {
            'الشاشة': 'Liquid Retina XDR، 14.2 بوصة، 3024 × 1964 بكسل',
            'المعالج': 'شريحة M3 من Apple',
            'الذاكرة': '8GB، 16GB، 18GB، 36GB',
            'التخزين': '512GB، 1TB، 2TB، 4TB، 8TB',
            'البطارية': 'تدوم حتى 18 ساعة',
            'المنافذ': '3 منافذ Thunderbolt 4، منفذ HDMI، منفذ SDXC',
            'الاتصال': 'Wi-Fi 6E، Bluetooth 5.3',
            'الكاميرا': '1080p مع دعم تقنية Center Stage'
        },
        reviews: [
            {
                name: 'فيصل الرشيد',
                rating: 5,
                date: '2023-10-20',
                text: 'أفضل لابتوب استخدمته! الأداء سريع جداً والشاشة مذهلة.'
            },
            {
                name: 'مريم الأحمدي',
                rating: 4,
                date: '2023-10-15',
                text: 'الجهاز ممتاز لكن السعر مرتفع. البطارية تدوم طويلاً وهذا رائع.'
            },
            {
                name: 'سعد العبدالله',
                rating: 5,
                date: '2023-10-05',
                text: 'تحسن كبير عن M2. الأداء أفضل والشاشة أكثر سطوعاً.'
            }
        ]
    },
    {
        id: 4,
        name: 'ديل إكس بي إس 15',
        brand: 'Dell',
        category: 'laptops',
        price: 38999,
        originalPrice: 45999,
        rating: 4,
        reviews: 42,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Dell+XPS',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Dell+XPS',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Dell+XPS+Keyboard',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Dell+XPS+Side'
        ],
        badge: 'تخفيض',
        description: 'ديل إكس بي إس 15 بمعالج Intel Core i9 الجيل الثالث عشر وشاشة OLED.',
        detailedDescription: 'ديل إكس بي إس 15 هو لابتوب عالي الأداء بتصميم أنيق وأداء قوي. يعمل بمعالج Intel Core i9 الجيل الثالث عشر مع كرت شاشة NVIDIA GeForce RTX 4070. الشاشة OLED بحجم 15.6 بوصة بدقة 3.5K مع دعم HDR. يأتي بذاكرة RAM تصل إلى 64GB ومساحة تخزين تصل إلى 2TB.',
        features: [
            'معالج Intel Core i9 الجيل الثالث عشر',
            'كرت شاشة NVIDIA GeForce RTX 4070',
            'شاشة OLED بحجم 15.6 بوصة بدقة 3.5K',
            'ذاكرة RAM تصل إلى 64GB',
            'مساحة تخزين تصل إلى 2TB',
            'نظام تبريد متقدم'
        ],
        specifications: {
            'الشاشة': 'OLED، 15.6 بوصة، 3456 × 2160 بكسل',
            'المعالج': 'Intel Core i9-13900H',
            'كرت الشاشة': 'NVIDIA GeForce RTX 4070',
            'الذاكرة': '16GB، 32GB، 64GB DDR5',
            'التخزين': '512GB، 1TB، 2TB NVMe SSD',
            'البطارية': '86Wh',
            'المنافذ': '2 منافذ Thunderbolt 4، 1 منفذ USB-C 3.2 Gen 2، 1 منفذ USB-A 3.2 Gen 1، منفذ HDMI 2.1، قارئ بطاقات SD',
            'الاتصال': 'Wi-Fi 6E، Bluetooth 5.2'
        },
        reviews: [
            {
                name: 'عمر الخالدي',
                rating: 4,
                date: '2023-10-12',
                text: 'لابتوب ممتاز للألعاب والعمل. الشاشة رائعة والأداء قوي.'
            },
            {
                name: 'هند الشمري',
                rating: 4,
                date: '2023-10-08',
                text: 'جهاز قوي لكن يصدر حرارة عند الاستخدام المكثف. الشاشة مذهلة.'
            },
            {
                name: 'ناصر الدوسري',
                rating: 4,
                date: '2023-09-30',
                text: 'قيمة ممتازة مقابل السعر. الأداء جيد جداً للبرامج الثقيلة.'
            }
        ]
    },
    {
        id: 5,
        name: 'آيباد برو M2',
        brand: 'Apple',
        category: 'tablets',
        price: 18999,
        originalPrice: null,
        rating: 4.5,
        reviews: 56,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPad+Pro',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPad+Pro',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPad+Pro+Back',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=iPad+Pro+Side'
        ],
        badge: null,
        description: 'آيباد برو بشريحة M2 وشاشة Liquid Retina XDR.',
        detailedDescription: 'آيباد برو بشريحة M2 يقدم أداءً استثنائياً في جهاز لوحي نحيف وخفيف. الشاشة Liquid Retina XDR بحجم 12.9 بوصة مع تقنية ProMotion ومعدل تحديث 120Hz. يدعم قلم Apple Pencil الثاني ولوحة المفاتيح Magic Keyboard. كاميرا واسعة 12 ميجابكسل وكاميرا ultra wide 10 ميجابكسل.',
        features: [
            'شريحة M2 مع وحدة معالجة رسوميات تصل إلى 10 نوى',
            'شاشة Liquid Retina XDR بحجم 12.9 بوصة',
            'دعم قلم Apple Pencil الثاني',
            'دعم لوحة المفاتيح Magic Keyboard',
            'كاميرا واسعة 12 ميجابكسل وكاميرا ultra wide 10 ميجابكسل',
            'مكبرات صوت رباعية مع تقنية الصوت المكاني'
        ],
        specifications: {
            'الشاشة': 'Liquid Retina XDR، 12.9 بوصة، 2732 × 2048 بكسل',
            'المعالج': 'شريحة M2 من Apple',
            'التخزين': '128GB، 256GB، 512GB، 1TB، 2TB',
            'الكاميرا الخلفية': '12 ميجابكسل واسعة، 10 ميجابكسل ultra wide',
            'الكاميرا الأمامية': '12 ميجابكسل ultra wide مع دعم تقنية Center Stage',
            'الاتصال': 'Wi-Fi 6E، Bluetooth 5.3، 5G (نموذج الخلوي)',
            'المستشعرات': 'Touch ID، Face ID'
        },
        reviews: [
            {
                name: 'فاطمة الزهراني',
                rating: 5,
                date: '2023-10-18',
                text: 'أفضل جهاز لوحي في السوق! الأداء سريع جداً والشاشة مذهلة.'
            },
            {
                name: 'ياسر القحطاني',
                rating: 4,
                date: '2023-10-10',
                text: 'الجهاز ممتاز للرسم والتصميم. قلم Apple Pencil يعمل بشكل رائع.'
            },
            {
                name: 'نورة الماجد',
                rating: 5,
                date: '2023-10-02',
                text: 'استخدمه للعمل والترفيه. البطارية تدوم طويلاً وهذا رائع.'
            }
        ]
    },
    {
        id: 6,
        name: 'سوني WH-1000XM5',
        brand: 'Sony',
        category: 'headphones',
        price: 8999,
        originalPrice: 10999,
        rating: 4,
        reviews: 38,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+WH-1000XM5',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+WH-1000XM5',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+WH-1000XM5+Side',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+WH-1000XM5+Case'
        ],
        badge: null,
        description: 'سماعات رأس لاسلكية من سوني بإلغاء ضوضاء متقدم وجودة صوت استثنائية.',
        detailedDescription: 'سوني WH-1000XM5 هي أحدث سماعات الرأس من سوني مع تقنية إلغاء الضوضاء المتقدمة ومعالج V1. توفر جودة صوت استثنائية مع دعم لـ Hi-Res Audio. البطارية تدوم حتى 30 ساعة مع إلغاء الضوضاء و 40 ساعة بدونه. تدعم Multipoint للاتصال بجهازين في نفس الوقت.',
        features: [
            'تقنية إلغاء الضوضاء المتقدمة',
            'معالج V1 الجديد',
            'دعم Hi-Res Audio',
            'بطارية تدوم حتى 30 ساعة',
            'دعم Multipoint للاتصال بجهازين',
            'تصميم مريح وخفيف الوزن'
        ],
        specifications: {
            'نوع السماعات': 'مغناطيسية مغلقة',
            'قطر السماعة': '30mm',
            'نطاق التردد': '4Hz - 40,000Hz',
            'البطارية': 'تدوم حتى 30 ساعة مع إلغاء الضوضاء',
            'زمن الشحن': '3 ساعات للشحن الكامل، 3 دقائق لـ 3 ساعات تشغيل',
            'الاتصال': 'Bluetooth 5.2، SBC، AAC، LDAC',
            'الوزن': '250g',
            'الميكروفونات': 'ميكروفونات متعددة للمكالمات الواضحة'
        },
        reviews: [
            {
                name: 'خالد الشمري',
                rating: 4,
                date: '2023-10-14',
                text: 'سماعات ممتازة لإلغاء الضوضاء. الصوت واضح ونقي.'
            },
            {
                name: 'سارة العلي',
                rating: 4,
                date: '2023-10-08',
                text: 'استخدمها في السفر والعمل. إلغاء الضوضاء فعال جداً.'
            },
            {
                name: 'أحمد الغامدي',
                rating: 4,
                date: '2023-10-01',
                text: 'جودة الصوت ممتازة لكنها أغلى قليلاً من المنافسين.'
            }
        ]
    },
    {
        id: 7,
        name: 'سوني A7R V',
        brand: 'Sony',
        category: 'cameras',
        price: 24999,
        originalPrice: null,
        rating: 5,
        reviews: 21,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+A7R+V',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+A7R+V',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+A7R+V+Back',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=Sony+A7R+V+Side'
        ],
        badge: 'جديد',
        description: 'كاميرا سوني A7R V بمستشعر 61 ميجابكسل ومعالج BIONZ XR.',
        detailedDescription: 'سوني A7R V هي أحدث كاميرا بدون مرآة من سوني بمستشعر Exmor R CMOS بدقة 61 ميجابكسل. تعمل بمعالج BIONZ XR الجديد الذي يقدم أداءً استثنائياً في معالجة الصور. نظام تثبيت الصور البصري بخمس محاور وتقنية التركيز التلقائي المتقدمة مع 693 نقطة تركيز.',
        features: [
            'مستشعر Exmor R CMOS بدقة 61 ميجابكسل',
            'معالج BIONZ XR الجديد',
            'نظام تثبيت الصور البصري بخمس محاور',
            'نظام التركيز التلقائي المتقدم مع 693 نقطة تركيز',
            'شاشة LCD قابلة للإمالة بحجم 3.2 بوصة',
            'تسجيل فيديو 8K'
        ],
        specifications: {
            'المستشعر': 'Exmor R CMOS، 35mm Full Frame، 61 ميجابكسل',
            'المعالج': 'BIONZ XR',
            'نطاق ISO': '100 - 32000 (قابل للتوسيع إلى 50 - 102400)',
            'نطاق التركيز التلقائي': '693 نقطة تركيز طور الطور و 425 نقطة تركيز اكتشاف التباين',
            'الغالق': '30 - 1/8000 ثانية',
            'التسجيل': '8K at 24p، 4K at 60p',
            'الشاشة': 'LCD، 3.2 بوصة، 2.1 مليون نقطة، قابلة للإمالة',
            'منفذ الذاكرة': '2 منفذ CFexpress Type A / SD'
        },
        reviews: [
            {
                name: 'عبدالرحمن السعيد',
                rating: 5,
                date: '2023-11-02',
                text: 'أفضل كاميرا استخدمتها! جودة الصور مذهلة والأداء سريع جداً.'
            },
            {
                name: 'نورة الحربي',
                rating: 5,
                date: '2023-10-28',
                text: 'الكاميرا ممتازة للتصوير الفوتوغرافي الاحترافي. التركيز التلقائي سريع ودقيق.'
            },
            {
                name: 'فهد العنزي',
                rating: 5,
                date: '2023-10-20',
                text: 'تحسن كبير عن A7R IV. معالج BIONZ XR يقدم أداءً أفضل بكثير.'
            }
        ]
    },
    {
        id: 8,
        name: 'بلاي ستيشن 5',
        brand: 'Sony',
        category: 'gaming',
        price: 12999,
        originalPrice: 14999,
        rating: 4.5,
        reviews: 87,
        image: 'https://placehold.co/300x250/0d1b2a/4cc9f0?text=PlayStation+5',
        images: [
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=PlayStation+5',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=PlayStation+5+Back',
            'https://placehold.co/300x250/0d1b2a/4cc9f0?text=PlayStation+5+Side'
        ],
        badge: null,
        description: 'جهاز بلاي ستيشن 5 مع معالج مخصص وذاكرة GDDR6 سريعة.',
        detailedDescription: 'بلاي ستيشن 5 هو أحدث جهاز ألعاب من سوني مع معالج مخصص وذاكرة GDDR6 سريعة. يدعم ألعاب 4K بمعدل 120 إطارًا في الثانية وتقنية تتبع الأشعة. يأتي مع وحدة تحكم DualSense مع ملاحظات لمسية متقدمة وزناد تكيفي. مساحة تخزين SSD سريعة 825GB.',
        features: [
            'معالج مخصص مع 8 نوى CPU و 10.28 TFLOPS GPU',
            'ذاكرة GDDR6 سريعة 16GB',
            'مساحة تخزين SSD سريعة 825GB',
            'دعم ألعاب 4K بمعدل 120 إطارًا في الثانية',
            'تقنية تتبع الأشعة',
            'وحدة تحكم DualSense مع ملاحظات لمسية متقدمة'
        ],
        specifications: {
            'المعالج': 'معالج مخصص مع 8 نوى CPU متغيرة السرعة (3.5GHz) و 10.28 TFLOPS GPU',
            'الذاكرة': '16GB GDDR6',
            'التخزين': '825GB SSD قابل للتوسيع',
            'دقة الفيديو': '4K @ 120Hz، 8K',
            'المنافذ': 'USB-C (USB 3.2 Gen 2)، USB-A (USB 3.2 Gen 1)، HDMI 2.1',
            'الاتصال': 'Wi-Fi 6، Bluetooth 5.1',
            'الأبعاد': '390 × 104 × 260 ملم',
            'الوزن': '4.5 كجم'
        },
        reviews: [
            {
                name: 'سالم الدوسري',
                rating: 5,
                date: '2023-10-25',
                text: 'أفضل جهاز ألعاب في السوق! الأداء مذهل والألعاب تبدو رائعة.'
            },
            {
                name: 'مشاري الشمري',
                rating: 4,
                date: '2023-10-18',
                text: 'جهاز رائع لكنه كبير الحجم بعض الشيء. وحدة التحكم DualSense مذهلة.'
            },
            {
                name: 'فهد العتيبي',
                rating: 5,
                date: '2023-10-10',
                text: 'تحسن كبير عن PS4. أوقات التحميل سريعة جداً بفضل الـ SSD.'
            }
        ]
    }
];

// DOM Elements
const userAvatar = document.getElementById('user-avatar');
const userProfile = document.getElementById('user-profile');
const profileDropdown = document.getElementById('profile-dropdown');
const loginLink = document.getElementById('login-link');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const smsVerificationModal = document.getElementById('sms-verification-modal');
const closeLogin = document.getElementById('close-login');
const closeRegister = document.getElementById('close-register');
const closeSmsVerification = document.getElementById('close-sms-verification');
const showRegister = document.getElementById('show-register');
const showLogin = document.getElementById('show-login');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const googleLogin = document.getElementById('google-login');
const phoneLogin = document.getElementById('phone-login');
const verifySmsCode = document.getElementById('verify-sms-code');
const resendSmsCode = document.getElementById('resend-sms-code');
const countdownElement = document.getElementById('countdown');
const phoneDisplay = document.getElementById('phone-display');
const cartIcon = document.getElementById('cart-icon');
const wishlistIcon = document.getElementById('wishlist-icon');
const cartModal = document.getElementById('cart-modal');
const wishlistModal = document.getElementById('wishlist-modal');
const closeCart = document.getElementById('close-cart');
const closeWishlist = document.getElementById('close-wishlist');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const wishlistItems = document.getElementById('wishlist-items');
const emptyCart = document.getElementById('empty-cart');
const emptyWishlist = document.getElementById('empty-wishlist');
const cartFooter = document.getElementById('cart-footer');
const totalPrice = document.getElementById('total-price');
const cartCount = document.querySelector('.cart-count');
const wishlistCount = document.querySelector('.wishlist-count');
const checkoutBtn = document.getElementById('checkout-btn');

// Product Detail Modal Elements
const productDetailModal = document.getElementById('product-detail-modal');
const closeProductDetail = document.getElementById('close-product-detail');
const mainImage = document.getElementById('main-image');
const thumbnailImages = document.getElementById('thumbnail-images');
const productDetailBrand = document.getElementById('product-detail-brand');
const productDetailTitle = document.getElementById('product-detail-title');
const productDetailRating = document.getElementById('product-detail-rating');
const productDetailCurrentPrice = document.getElementById('product-detail-current-price');
const productDetailOriginalPrice = document.getElementById('product-detail-original-price');
const productDetailDiscount = document.getElementById('product-detail-discount');
const productDetailDescription = document.getElementById('product-detail-description');
const productDetailFeatures = document.getElementById('product-detail-features');
const addToCartDetail = document.getElementById('add-to-cart-detail');
const wishlistDetail = document.getElementById('wishlist-detail');
const compareDetail = document.getElementById('compare-detail');
const detailedDescription = document.getElementById('detailed-description');
const specificationsTable = document.getElementById('specifications-table');
const reviewsList = document.getElementById('reviews-list');
const averageScore = document.getElementById('average-score');
const averageStars = document.getElementById('average-stars');
const reviewCount = document.getElementById('review-count');
const ratingInput = document.getElementById('rating-input');
const reviewTextarea = document.getElementById('review-textarea');
const submitReview = document.getElementById('submit-review');

// Search Elements
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

// Filter Elements
const filterToggle = document.getElementById('filter-toggle');
const filterContent = document.getElementById('filter-content');
const applyFilter = document.getElementById('apply-filter');
const resetFilter = document.getElementById('reset-filter');
const resultsCount = document.getElementById('results-count');

// Sort Elements
const sortButton = document.getElementById('sort-button');
const sortOptions = document.getElementById('sort-options');

// Compare Elements
const compareSection = document.getElementById('compare-section');
const compareItems = document.getElementById('compare-items');
const compareCount = document.getElementById('compare-count');
const compareActions = document.getElementById('compare-actions');
const compareButton = document.getElementById('compare-button');
const clearCompare = document.getElementById('clear-compare');
const emptyCompare = document.getElementById('empty-compare');

// Notification Elements
const notificationToast = document.getElementById('notification-toast');
const notificationIcon = document.getElementById('notification-icon');
const notificationTitle = document.getElementById('notification-title');
const notificationMessage = document.getElementById('notification-message');
const notificationClose = document.getElementById('notification-close');

// Form elements
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPhone = document.getElementById('register-phone');
const registerPassword = document.getElementById('register-password');
const registerConfirmPassword = document.getElementById('register-confirm-password');

// SMS Code input elements
const smsCodeInputs = [
    document.getElementById('sms-code-1'),
    document.getElementById('sms-code-2'),
    document.getElementById('sms-code-3'),
    document.getElementById('sms-code-4'),
    document.getElementById('sms-code-5'),
    document.getElementById('sms-code-6')
];

// Initialize from localStorage
function initUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserUI();
    }
    
    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlistDisplay();
        updateWishlistCount();
        updateProductWishlistButtons();
    }
}

// Update user interface based on login status
function updateUserUI() {
    if (currentUser) {
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        userAvatar.textContent = initials;
        userAvatar.style.background = 'linear-gradient(45deg, #4cc9f0, #4361ee)';
        
        profileDropdown.innerHTML = `
            <div class="profile-header">
                <h4>${currentUser.name}</h4>
                <p>${currentUser.email || currentUser.phone}</p>
            </div>
            <div class="profile-links">
                <a href="#"><i class="fas fa-user"></i> ملفي الشخصي</a>
                <a href="#"><i class="fas fa-shopping-cart"></i> طلباتي</a>
                <a href="#"><i class="fas fa-heart"></i> المفضلة</a>
                <a href="#" id="logout-link"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
            </div>
        `;
        
        document.getElementById('logout-link').addEventListener('click', logout);
    } else {
        userAvatar.textContent = 'ض';
        userAvatar.style.background = 'linear-gradient(45deg, #4cc9f0, #4361ee)';
        profileDropdown.innerHTML = `
            <div class="profile-header">
                <h4>تسجيل الدخول</h4>
                <p>للوصول إلى حسابك</p>
            </div>
            <div class="profile-links">
                <a href="#" id="login-link"><i class="fas fa-sign-in-alt"></i> تسجيل الدخول</a>
            </div>
        `;
        document.getElementById('login-link').addEventListener('click', openLoginModal);
    }
}

// Modal functions
function openLoginModal() {
    loginModal.classList.add('open');
    overlay.classList.add('active');
}

function openRegisterModal() {
    registerModal.classList.add('open');
    overlay.classList.add('active');
}

function openSmsVerification(phone, name, email, password) {
    tempUserData = { phone, name, email, password };
    phoneDisplay.textContent = phone;
    smsVerificationModal.classList.add('open');
    overlay.classList.add('active');
    setupCodeInputs(smsCodeInputs);
    startCountdown();
}

function closeAllModals() {
    loginModal.classList.remove('open');
    registerModal.classList.remove('open');
    smsVerificationModal.classList.remove('open');
    cartModal.classList.remove('open');
    wishlistModal.classList.remove('open');
    productDetailModal.classList.remove('open');
    overlay.classList.remove('active');
    
    // Clear countdown timer
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
}

// Setup code input functionality
function setupCodeInputs(inputs) {
    inputs.forEach((input, index) => {
        input.value = '';
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
                inputs[index - 1].focus();
            }
        });
    });
    
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}

// Get code from inputs
function getCodeFromInputs(inputs) {
    return inputs.map(input => input.value).join('');
}

// Countdown timer for resend
function startCountdown() {
    countdownValue = 30;
    countdownElement.textContent = countdownValue;
    resendSmsCode.disabled = true;
    
    countdownTimer = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;
        
        if (countdownValue <= 0) {
            clearInterval(countdownTimer);
            resendSmsCode.disabled = false;
        }
    }, 1000);
}

// Registration functions
function registerUser() {
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const phone = registerPhone.value.trim();
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;
    
    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('error', 'خطأ', 'يرجى ملء جميع الحقول');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('error', 'خطأ', 'كلمة المرور وتأكيد كلمة المرور غير متطابقين');
        return;
    }
    
    if (password.length < 6) {
        showNotification('error', 'خطأ', 'كلمة المرور يجب أن تكون على الأقل 6 أحرف');
        return;
    }
    
    if (!/^\d{11}$/.test(phone)) {
        showNotification('error', 'خطأ', 'يرجى إدخال رقم هاتف صحيح (11 رقم)');
        return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('error', 'خطأ', 'يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Simulate sending SMS verification code
    showNotification('info', 'رمز التحقق', `تم إرسال رمز التحقق إلى رقم الهاتف: ${phone} عبر الرسائل النصية`);
    
    // Close register modal and open SMS verification
    registerModal.classList.remove('open');
    openSmsVerification(phone, name, email, password);
}

function verifySmsCodeHandler() {
    const code = getCodeFromInputs(smsCodeInputs);
    if (code.length !== 6) {
        showNotification('error', 'خطأ', 'يرجى إدخال رمز التحقق الكامل المكون من 6 أرقام');
        return;
    }
    
    // Simulate SMS verification (in real app, this would be validated server-side)
    // For demo purposes, we'll accept any 6-digit code
    if (/^\d{6}$/.test(code)) {
        // Create user account
        currentUser = {
            name: tempUserData.name,
            email: tempUserData.email,
            phone: tempUserData.phone
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserUI();
        closeAllModals();
        showNotification('success', 'نجاح', 'تم إنشاء حسابك بنجاح! مرحبًا بك في الأشراف.');
    } else {
        showNotification('error', 'خطأ', 'رمز التحقق غير صحيح. يرجى إدخال 6 أرقام.');
    }
}

function resendSmsCodeHandler() {
    if (countdownValue > 0) return;
    
    showNotification('info', 'رمز التحقق', `تم إعادة إرسال رمز التحقق إلى: ${tempUserData?.phone}`);
    startCountdown();
}

// Login functions
function loginUser() {
    const identifier = loginEmail.value.trim();
    const password = loginPassword.value;
    
    if (!identifier || !password) {
        showNotification('error', 'خطأ', 'يرجى إدخال البريد الإلكتروني/رقم الهاتف وكلمة المرور');
        return;
    }
    
    // Simulate login (in real app, this would be validated server-side)
    currentUser = {
        name: identifier.includes('@') ? identifier.split('@')[0] : 'مستخدم',
        email: identifier.includes('@') ? identifier : null,
        phone: identifier.includes('@') ? null : identifier
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeAllModals();
    showNotification('success', 'نجاح', 'تم تسجيل الدخول بنجاح!');
}

function loginWithGoogle() {
    currentUser = {
        name: 'مستخدم جوجل',
        email: 'user@gmail.com',
        phone: null
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeAllModals();
    showNotification('success', 'نجاح', 'تم تسجيل الدخول بـ Google بنجاح!');
}

function loginWithPhone() {
    // This would typically open a phone verification flow
    showNotification('info', 'تسجيل الدخول', 'في تطبيق حقيقي، سيتم إرسال رمز تحقق إلى هاتفك عبر الرسائل النصية');
    currentUser = {
        name: 'مستخدم الهاتف',
        email: null,
        phone: '010XXXXXXXX'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateUserUI();
    closeAllModals();
    showNotification('success', 'نجاح', 'تم تسجيل الدخول بنجاح!');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserUI();
    showNotification('info', 'تسجيل الخروج', 'تم تسجيل الخروج بنجاح!');
}

// Event Listeners
loginLink.addEventListener('click', openLoginModal);
showRegister.addEventListener('click', () => {
    loginModal.classList.remove('open');
    openRegisterModal();
});
showLogin.addEventListener('click', () => {
    registerModal.classList.remove('open');
    openLoginModal();
});

closeLogin.addEventListener('click', closeAllModals);
closeRegister.addEventListener('click', closeAllModals);
closeSmsVerification.addEventListener('click', closeAllModals);
closeProductDetail.addEventListener('click', closeAllModals);
overlay.addEventListener('click', closeAllModals);

loginBtn.addEventListener('click', loginUser);
registerBtn.addEventListener('click', registerUser);
googleLogin.addEventListener('click', loginWithGoogle);
phoneLogin.addEventListener('click', loginWithPhone);
verifySmsCode.addEventListener('click', verifySmsCodeHandler);
resendSmsCode.addEventListener('click', resendSmsCodeHandler);

// Profile dropdown toggle
userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!userProfile.contains(e.target)) {
        profileDropdown.classList.remove('open');
    }
});

// Shopping Cart and Wishlist Functionality
cartIcon.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لعرض سلة المشتريات');
        openLoginModal();
        return;
    }
    cartModal.classList.add('open');
    overlay.classList.add('active');
    updateCartDisplay();
});

wishlistIcon.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لعرض قائمة المفضلة');
        openLoginModal();
        return;
    }
    wishlistModal.classList.add('open');
    overlay.classList.add('active');
    updateWishlistDisplay();
});

closeCart.addEventListener('click', () => {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
});

closeWishlist.addEventListener('click', () => {
    wishlistModal.classList.remove('open');
    overlay.classList.remove('active');
});

// Search Functionality
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    
    if (searchTerm.length > 0) {
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        displaySearchResults(searchResults);
    } else {
        searchResults.classList.remove('active');
    }
});

searchBar.addEventListener('focus', (e) => {
    if (e.target.value.trim().length > 0) {
        const searchTerm = e.target.value.trim();
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        displaySearchResults(searchResults);
    }
});

document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('active');
    }
});

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
    } else {
        results.slice(0, 5).forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-name">${product.name}</div>
                <div class="search-result-price">${product.price.toLocaleString()} ج.م</div>
            `;
            resultItem.addEventListener('click', () => {
                openProductDetail(product.id);
                searchResults.classList.remove('active');
                searchBar.value = '';
            });
            searchResults.appendChild(resultItem);
        });
    }
    
    searchResults.classList.add('active');
}

// Filter Functionality
filterToggle.addEventListener('click', () => {
    filterContent.style.display = filterContent.style.display === 'none' ? 'grid' : 'none';
    const icon = filterToggle.querySelector('i');
    icon.className = filterContent.style.display === 'none' ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
});

applyFilter.addEventListener('click', () => {
    // Get selected categories
    const categoryCheckboxes = document.querySelectorAll('.filter-checkbox[data-category]:checked');
    activeFilters.categories = Array.from(categoryCheckboxes).map(cb => cb.dataset.category);
    
    // Get selected brands
    const brandCheckboxes = document.querySelectorAll('.filter-checkbox[data-brand]:checked');
    activeFilters.brands = Array.from(brandCheckboxes).map(cb => cb.dataset.brand);
    
    // Get price range
    activeFilters.minPrice = document.getElementById('min-price').value ? parseInt(document.getElementById('min-price').value) : null;
    activeFilters.maxPrice = document.getElementById('max-price').value ? parseInt(document.getElementById('max-price').value) : null;
    
    // Get rating
    const ratingCheckboxes = document.querySelectorAll('.filter-checkbox[data-rating]:checked');
    activeFilters.rating = ratingCheckboxes.length > 0 ? Math.min(...Array.from(ratingCheckboxes).map(cb => parseInt(cb.dataset.rating))) : null;
    
    // Apply filters
    filterProducts();
});

resetFilter.addEventListener('click', () => {
    // Reset all filters
    document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    
    activeFilters = {
        categories: [],
        brands: [],
        minPrice: null,
        maxPrice: null,
        rating: null
    };
    
    // Reset to default view
    displayProducts(products);
    updateResultsCount(products.length);
});

function filterProducts() {
    let filteredProducts = [...products];
    
    // Filter by category
    if (activeFilters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            activeFilters.categories.includes(product.category)
        );
    }
    
    // Filter by brand
    if (activeFilters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            activeFilters.brands.includes(product.brand)
        );
    }
    
    // Filter by price
    if (activeFilters.minPrice !== null) {
        filteredProducts = filteredProducts.filter(product => 
            product.price >= activeFilters.minPrice
        );
    }
    
    if (activeFilters.maxPrice !== null) {
        filteredProducts = filteredProducts.filter(product => 
            product.price <= activeFilters.maxPrice
        );
    }
    
    // Filter by rating
    if (activeFilters.rating !== null) {
        filteredProducts = filteredProducts.filter(product => 
            product.rating >= activeFilters.rating
        );
    }
    
    // Apply current sort
    sortProducts(filteredProducts, currentSort);
}

// Sort Functionality
sortButton.addEventListener('click', () => {
    sortOptions.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!sortButton.contains(e.target) && !sortOptions.contains(e.target)) {
        sortOptions.classList.remove('active');
    }
});

document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', () => {
        // Update active state
        document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update current sort
        currentSort = option.dataset.sort;
        
        // Apply sort
        sortProducts();
        
        // Close dropdown
        sortOptions.classList.remove('active');
    });
});

function sortProducts(productsToSort = null, sortType = null) {
    const productsArray = productsToSort || [...products];
    const sortMethod = sortType || currentSort;
    
    switch (sortMethod) {
        case 'price-low':
            productsArray.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            productsArray.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            productsArray.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            productsArray.sort((a, b) => b.id - a.id);
            break;
        default:
            // Default sort (by id)
            productsArray.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(productsArray);
    updateResultsCount(productsArray.length);
}

function updateResultsCount(count) {
    resultsCount.textContent = `عرض ${count} منتجات`;
}

// Category Cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        
        // Reset filters
        document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';
        
        // Set category filter
        const categoryCheckbox = document.querySelector(`.filter-checkbox[data-category="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
        }
        
        activeFilters = {
            categories: [category],
            brands: [],
            minPrice: null,
            maxPrice: null,
            rating: null
        };
        
        // Apply filters
        filterProducts();
        
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
});

// Product Detail Modal
function openProductDetail(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    currentProduct = product;
    
    // Update modal content
    productDetailBrand.textContent = product.brand;
    productDetailTitle.textContent = product.name;
    productDetailRating.innerHTML = generateStars(product.rating) + ` (${product.reviews} تقييم)`;
    productDetailCurrentPrice.textContent = `${product.price.toLocaleString()} ج.م`;
    
    if (product.originalPrice) {
        productDetailOriginalPrice.textContent = `${product.originalPrice.toLocaleString()} ج.م`;
        productDetailOriginalPrice.style.display = 'block';
        
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        productDetailDiscount.textContent = `خصم ${discount}%`;
        productDetailDiscount.style.display = 'inline-block';
    } else {
        productDetailOriginalPrice.style.display = 'none';
        productDetailDiscount.style.display = 'none';
    }
    
    productDetailDescription.textContent = product.description;
    detailedDescription.textContent = product.detailedDescription;
    
    // Update features list
    productDetailFeatures.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${feature}`;
        productDetailFeatures.appendChild(li);
    });
    
    // Update specifications table
    specificationsTable.innerHTML = '';
    for (const [key, value] of Object.entries(product.specifications)) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 600; padding: 8px; border-bottom: 1px solid #e9ecef;">${key}</td>
            <td style="padding: 8px; border-bottom: 1px solid #e9ecef;">${value}</td>
        `;
        specificationsTable.appendChild(tr);
    }
    
    // Update reviews
    updateReviews(product.reviews);
    
    // Update images
    mainImage.style.backgroundImage = `url('${product.images[0]}')`;
    thumbnailImages.innerHTML = '';
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        thumbnail.style.backgroundImage = `url('${image}')`;
        thumbnail.addEventListener('click', () => {
            mainImage.style.backgroundImage = `url('${image}')`;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        });
        thumbnailImages.appendChild(thumbnail);
    });
    
    // Update wishlist button
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
        wishlistDetail.classList.add('active');
        wishlistDetail.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        wishlistDetail.classList.remove('active');
        wishlistDetail.innerHTML = '<i class="far fa-heart"></i>';
    }
    
    // Update compare button
    const isInCompare = compareList.some(item => item.id === product.id);
    if (isInCompare) {
        compareDetail.classList.add('active');
    } else {
        compareDetail.classList.remove('active');
    }
    
    // Open modal
    productDetailModal.classList.add('open');
    overlay.classList.add('active');
}

function updateReviews(reviews) {
    reviewsList.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                    <div class="reviewer-name">${review.name}</div>
                </div>
                <div class="review-date">${formatDate(review.date)}</div>
            </div>
            <div class="review-rating">${generateStars(review.rating)}</div>
            <div class="review-text">${review.text}</div>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ar-SA', options);
}

// Product Detail Event Listeners
addToCartDetail.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى السلة');
        openLoginModal();
        return;
    }
    
    const existingItem = cart.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    showNotification('success', 'نجاح', `تمت إضافة ${currentProduct.name} إلى سلة المشتريات`);
});

wishlistDetail.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة');
        openLoginModal();
        return;
    }
    
    const existingItem = wishlist.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        wishlist = wishlist.filter(item => item.id !== currentProduct.id);
        wishlistDetail.classList.remove('active');
        wishlistDetail.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('info', 'المفضلة', `تمت إزالة ${currentProduct.name} من المفضلة`);
    } else {
        wishlist.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image
        });
        wishlistDetail.classList.add('active');
        wishlistDetail.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('success', 'المفضلة', `تمت إضافة ${currentProduct.name} إلى المفضلة`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistDisplay();
    updateWishlistCount();
    updateProductWishlistButtons();
});

compareDetail.addEventListener('click', () => {
    const existingItem = compareList.find(item => item.id === currentProduct.id);
    
    if (existingItem) {
        compareList = compareList.filter(item => item.id !== currentProduct.id);
        compareDetail.classList.remove('active');
        showNotification('info', 'المقارنة', `تمت إزالة ${currentProduct.name} من قائمة المقارنة`);
    } else {
        if (compareList.length >= 3) {
            showNotification('error', 'خطأ', 'يمكنك مقارنة 3 منتجات كحد أقصى');
            return;
        }
        
        compareList.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image
        });
        compareDetail.classList.add('active');
        showNotification('success', 'المقارنة', `تمت إضافة ${currentProduct.name} إلى قائمة المقارنة`);
    }
    
    updateCompareDisplay();
});

// Tab functionality
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        // Update active button
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// Rating input
document.querySelectorAll('.rating-star').forEach(star => {
    star.addEventListener('click', () => {
        userRating = parseInt(star.dataset.rating);
        updateRatingStars();
    });
});

function updateRatingStars() {
    document.querySelectorAll('.rating-star').forEach((star, index) => {
        if (index < userRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Submit review
submitReview.addEventListener('click', () => {
    if (!currentUser) {
        showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لتقييم المنتجات');
        openLoginModal();
        return;
    }
    
    if (userRating === 0) {
        showNotification('error', 'خطأ', 'يرجى اختيار تقييم');
        return;
    }
    
    const reviewText = reviewTextarea.value.trim();
    if (!reviewText) {
        showNotification('error', 'خطأ', 'يرجى كتابة نص التقييم');
        return;
    }
    
    // Add review to product
    const newReview = {
        name: currentUser.name,
        rating: userRating,
        date: new Date().toISOString().split('T')[0],
        text: reviewText
    };
    
    currentProduct.reviews.push(newReview);
    
    // Update product rating
    const totalRating = currentProduct.reviews.reduce((sum, review) => sum + review.rating, 0);
    currentProduct.rating = Math.round((totalRating / currentProduct.reviews.length) * 10) / 10;
    currentProduct.reviews = currentProduct.reviews.length;
    
    // Update UI
    updateReviews(currentProduct.reviews);
    productDetailRating.innerHTML = generateStars(currentProduct.rating) + ` (${currentProduct.reviews} تقييم)`;
    
    // Reset form
    userRating = 0;
    updateRatingStars();
    reviewTextarea.value = '';
    
    showNotification('success', 'نجاح', 'تم إرسال تقييمك بنجاح');
});

// Quick view functionality
document.querySelectorAll('.product-quick-view').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const productId = button.dataset.id;
        openProductDetail(productId);
    });
});

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        if (!currentUser) {
            showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى السلة');
            openLoginModal();
            return;
        }
        
        const productId = this.dataset.id;
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const image = this.dataset.image;
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        showAddedMessage(this);
    });
});

// Wishlist Functionality
document.querySelectorAll('.wishlist-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!currentUser) {
            showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة');
            openLoginModal();
            return;
        }
        
        const productId = this.dataset.id;
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const image = this.dataset.image;
        const icon = this.querySelector('i');
        
        const existingItem = wishlist.find(item => item.id === productId);
        
        if (existingItem) {
            wishlist = wishlist.filter(item => item.id !== productId);
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.classList.remove('active');
            showNotification('info', 'المفضلة', `تمت إزالة ${name} من المفضلة`);
        } else {
            wishlist.push({
                id: productId,
                name: name,
                price: price,
                image: image
            });
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.classList.add('active');
            showNotification('success', 'المفضلة', `تمت إضافة ${name} إلى المفضلة`);
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistDisplay();
        updateWishlistCount();
    });
});

// Compare Functionality
document.querySelectorAll('.compare-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.dataset.id;
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const image = this.dataset.image;
        
        const existingItem = compareList.find(item => item.id === productId);
        
        if (existingItem) {
            compareList = compareList.filter(item => item.id !== productId);
            this.classList.remove('active');
            showNotification('info', 'المقارنة', `تمت إزالة ${name} من قائمة المقارنة`);
        } else {
            if (compareList.length >= 3) {
                showNotification('error', 'خطأ', 'يمكنك مقارنة 3 منتجات كحد أقصى');
                return;
            }
            
            compareList.push({
                id: productId,
                name: name,
                price: price,
                image: image
            });
            this.classList.add('active');
            showNotification('success', 'المقارنة', `تمت إضافة ${name} إلى قائمة المقارنة`);
        }
        
        updateCompareDisplay();
    });
});

// Update Cart Display
function updateCartDisplay() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.appendChild(emptyCart);
        cartFooter.style.display = 'none';
        return;
    }
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ج.م</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-index="${index}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">إزالة</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartFooter.style.display = 'block';
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `${total.toLocaleString()} ج.م`;
    
    // Add event listeners
    document.querySelectorAll('.decrease').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart[index].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        });
    });
}

// Update Wishlist Display
function updateWishlistDisplay() {
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItems.appendChild(emptyWishlist);
        return;
    }
    
    wishlist.forEach((item, index) => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <div class="wishlist-item-image" style="background-image: url('${item.image}')"></div>
            <div class="wishlist-item-info">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">${item.price.toLocaleString()} ج.م</div>
                <button class="remove-wishlist" data-index="${index}">إزالة من المفضلة</button>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
    
    document.querySelectorAll('.remove-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            wishlist.splice(index, 1);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistDisplay();
            updateWishlistCount();
            updateProductWishlistButtons();
        });
    });
}

function updateWishlistCount() {
    wishlistCount.textContent = wishlist.length;
}

function updateProductWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const productId = button.dataset.id;
        const icon = button.querySelector('i');
        const isInWishlist = wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.classList.add('active');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('active');
        }
    });
}

// Update Compare Display
function updateCompareDisplay() {
    compareCount.textContent = `${compareList.length} منتجات`;
    
    if (compareList.length === 0) {
        compareItems.innerHTML = '<div class="empty-compare" id="empty-compare"><p>لم يتم اختيار أي منتجات للمقارنة</p></div>';
        compareActions.style.display = 'none';
        compareSection.style.display = 'none';
        return;
    }
    
    compareSection.style.display = 'block';
    compareItems.innerHTML = '';
    
    compareList.forEach((item, index) => {
        const compareItem = document.createElement('div');
        compareItem.className = 'compare-item';
        compareItem.innerHTML = `
            <button class="remove-compare" data-index="${index}">&times;</button>
            <div class="compare-item-image" style="background-image: url('${item.image}')"></div>
            <div class="compare-item-name">${item.name}</div>
            <div class="compare-item-price">${item.price.toLocaleString()} ج.م</div>
        `;
        compareItems.appendChild(compareItem);
    });
    
    compareActions.style.display = 'flex';
    
    // Add event listeners
    document.querySelectorAll('.remove-compare').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            const removedItem = compareList[index];
            compareList.splice(index, 1);
            
            // Update button state
            document.querySelectorAll('.compare-btn').forEach(button => {
                if (button.dataset.id === removedItem.id) {
                    button.classList.remove('active');
                }
            });
            
            updateCompareDisplay();
        });
    });
}

// Compare button
compareButton.addEventListener('click', () => {
    if (compareList.length < 2) {
        showNotification('error', 'خطأ', 'يرجى اختيار منتجين على الأقل للمقارنة');
        return;
    }
    
    // In a real app, this would navigate to a comparison page
    showNotification('info', 'المقارنة', 'سيتم فتح صفحة المقارنة قريباً');
});

// Clear compare button
clearCompare.addEventListener('click', () => {
    compareList = [];
    
    // Update button states
    document.querySelectorAll('.compare-btn').forEach(button => {
        button.classList.remove('active');
    });
    
    updateCompareDisplay();
});

function showAddedMessage(button) {
    const originalText = button.textContent;
    button.textContent = 'تم الإضافة!';
    button.style.background = 'linear-gradient(45deg, #4ade80, #22c55e)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(45deg, #4cc9f0, #4361ee)';
    }, 2000);
}

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    
    let message = 'مرحباً، أريد طلب المنتجات التالية:\n\n';
    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ج.م\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\nالإجمالي: ${total.toLocaleString()} ج.م\n\n`;
    message += 'من فضلك تواصل معي لتأكيد الطلب.';
    
    const whatsappUrl = `https://wa.me/010XXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
    
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
});

// Notification Toast
function showNotification(type, title, message) {
    notificationTitle.textContent = title;
    notificationMessage.textContent = message;
    
    // Update icon and color based on type
    notificationIcon.className = 'notification-icon';
    switch (type) {
        case 'success':
            notificationIcon.classList.add('success');
            notificationIcon.innerHTML = '<i class="fas fa-check"></i>';
            break;
        case 'error':
            notificationIcon.classList.add('error');
            notificationIcon.innerHTML = '<i class="fas fa-times"></i>';
            break;
        case 'info':
            notificationIcon.classList.add('info');
            notificationIcon.innerHTML = '<i class="fas fa-info"></i>';
            break;
    }
    
    // Show notification
    notificationToast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        notificationToast.classList.remove('show');
    }, 5000);
}

notificationClose.addEventListener('click', () => {
    notificationToast.classList.remove('show');
});

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.id = product.id;
        productCard.dataset.category = product.category;
        productCard.dataset.brand = product.brand;
        productCard.dataset.price = product.price;
        productCard.dataset.rating = product.rating;
        
        let badgeHtml = '';
        if (product.badge) {
            badgeHtml = `<span class="product-badge">${product.badge}</span>`;
        }
        
        let originalPriceHtml = '';
        if (product.originalPrice) {
            originalPriceHtml = `<span class="original-price">${product.originalPrice.toLocaleString()} ج.م</span>`;
        }
        
        productCard.innerHTML = `
            ${badgeHtml}
            <div class="product-image" style="background-image: url('${product.image}');">
                <div class="product-quick-view" data-id="${product.id}">عرض سريع</div>
            </div>
            <div class="product-info">
                <div class="product-brand">${product.brand}</div>
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews} تقييم)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString()} ج.م</span>
                    ${originalPriceHtml}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">أضف للسلة</button>
                    <button class="wishlist-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                        <i class="far fa-heart"></i>
                    </button>
                    <button class="compare-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                        <i class="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Re-attach event listeners
    attachProductEventListeners();
}

function attachProductEventListeners() {
    // Quick view
    document.querySelectorAll('.product-quick-view').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = button.dataset.id;
            openProductDetail(productId);
        });
    });
    
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            if (!currentUser) {
                showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى السلة');
                openLoginModal();
                return;
            }
            
            const productId = this.dataset.id;
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            const image = this.dataset.image;
            
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: name,
                    price: price,
                    image: image,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showAddedMessage(this);
        });
    });
    
    // Wishlist
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!currentUser) {
                showNotification('info', 'تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة');
                openLoginModal();
                return;
            }
            
            const productId = this.dataset.id;
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            const image = this.dataset.image;
            const icon = this.querySelector('i');
            
            const existingItem = wishlist.find(item => item.id === productId);
            
            if (existingItem) {
                wishlist = wishlist.filter(item => item.id !== productId);
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.classList.remove('active');
                showNotification('info', 'المفضلة', `تمت إزالة ${name} من المفضلة`);
            } else {
                wishlist.push({
                    id: productId,
                    name: name,
                    price: price,
                    image: image
                });
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.classList.add('active');
                showNotification('success', 'المفضلة', `تمت إضافة ${name} إلى المفضلة`);
            }
            
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistDisplay();
            updateWishlistCount();
        });
    });
    
    // Compare
    document.querySelectorAll('.compare-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.id;
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price);
            const image = this.dataset.image;
            
            const existingItem = compareList.find(item => item.id === productId);
            
            if (existingItem) {
                compareList = compareList.filter(item => item.id !== productId);
                this.classList.remove('active');
                showNotification('info', 'المقارنة', `تمت إزالة ${name} من قائمة المقارنة`);
            } else {
                if (compareList.length >= 3) {
                    showNotification('error', 'خطأ', 'يمكنك مقارنة 3 منتجات كحد أقصى');
                    return;
                }
                
                compareList.push({
                    id: productId,
                    name: name,
                    price: price,
                    image: image
                });
                this.classList.add('active');
                showNotification('success', 'المقارنة', `تمت إضافة ${name} إلى قائمة المقارنة`);
            }
            
            updateCompareDisplay();
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize
initUser();
updateWishlistCount();
displayProducts(products);