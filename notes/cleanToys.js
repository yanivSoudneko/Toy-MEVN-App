const toys = [
    { name: "Test doll", price: 66, type: "test", inStock: true, reviews: [] },
    {
        name: "lacus lacus",
        price: 38,
        type: "funny",
        inStock: true,
        reviews: [],
    },
    {
        name: "mattis MEE",
        price: 31,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "dolor nec",
        price: 54,
        type: "adult",
        inStock: false,
        reviews: [],
    },
    { name: "mi nec", price: 100, type: "adult", inStock: false, reviews: [] },
    {
        name: "elementum malesuada",
        price: 86,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "consequat scelerisque",
        price: 43,
        type: "funny",
        inStock: true,
        reviews: [],
    },
    { name: "nullam mi", price: 7, type: "funny", inStock: false, reviews: [] },
    {
        name: "vestibulum ipsum",
        price: 22,
        type: "funny",
        inStock: true,
        reviews: [],
    },
    {
        name: "facilisis tincidunt",
        price: 48,
        type: "funny",
        inStock: true,
        reviews: [],
    },
    { name: "augue at", price: 52, type: "funny", inStock: false, reviews: [] },
    {
        name: "adipiscing velit",
        price: 4,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "placerat mattis",
        price: 16,
        type: "funny",
        inStock: false,
        reviews: [],
    },
    {
        name: "amet vel",
        price: 0,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "at amet",
        price: 36,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "nullam convallis",
        price: 45,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "sollicitudin nunc",
        price: 52,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "pretium adipiscing",
        price: 42,
        type: "funny",
        inStock: false,
        reviews: [],
    },
    {
        name: "risus dolor",
        price: 39,
        type: "funny",
        inStock: false,
        reviews: [],
    },
    {
        name: "tincidunt tempor",
        price: 4,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "pretium lacus",
        price: 84,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    { name: "at rutrum", price: 24, type: "funny", inStock: true, reviews: [] },
    {
        name: "quis facilisis",
        price: 12,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "sollicitudin sollicitudin",
        price: 9,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "porttitor vestibulum",
        price: 29,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "eros lorem",
        price: 37,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    {
        name: "facilisis pretium",
        price: 84,
        type: "educational",
        inStock: true,
        reviews: [],
    },
    { name: "et at", price: 61, type: "funny", inStock: false, reviews: [] },
    { name: "at at", price: 66, type: "funny", inStock: false, reviews: [] },
    { name: "donec id", price: 78, type: "funny", inStock: true, reviews: [] },
    { name: "id ac", price: 84, type: "adult", inStock: true, reviews: [] },
    {
        name: "lacus augue",
        price: 22,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "tempor massa",
        price: 34,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "turpis vel",
        price: 82,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "vitae magna",
        price: 15,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "lacus sagittis",
        price: 47,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "amet sollicitudin",
        price: 64,
        type: "funny",
        inStock: true,
        reviews: [],
    },
    {
        name: "pulvinar nec",
        price: 7,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    {
        name: "sollicitudin consequat",
        price: 71,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    { name: "dui augue", price: 59, type: "adult", inStock: true, reviews: [] },
    {
        name: "sagittis tempor",
        price: 74,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    { name: "at lectus", price: 62, type: "adult", inStock: true, reviews: [] },
    {
        name: "elementum mi",
        price: 3,
        type: "adult",
        inStock: true,
        reviews: [],
    },
    { name: "dolor non", price: 76, type: "adult", inStock: true, reviews: [] },
    {
        name: "morbi aliquam",
        price: 68,
        type: "adult",
        inStock: false,
        reviews: [],
    },
    { name: "at sed", price: 80, type: "funny", inStock: true, reviews: [] },
    {
        name: "magna magna",
        price: 58,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "malesuada hendrerit",
        price: 8,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "vestibulum eget",
        price: 50,
        type: "educational",
        inStock: false,
        reviews: [],
    },
    {
        name: "fringilla fringilla",
        price: 55,
        type: "funny",
        inStock: true,
        reviews: [],
    },
];

var pToys = toys.map((toy) => {
    toy.reviews = [];
    return toy;
});

var y = JSON.stringify(pToys);