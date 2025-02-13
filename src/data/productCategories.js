const technologySubcategories = [
  {
    id: "laptops",
    name: "Laptops",
    description:
      "Computadoras portátiles de diferentes marcas y especificaciones.",
  },
  {
    id: "headphones",
    name: "Audífonos",
    description: "Audífonos inalámbricos, con cable y gaming.",
  },
  {
    id: "monitors",
    name: "Monitores",
    description: "Pantallas de alta resolución para trabajo y gaming.",
  },
  {
    id: "consoles",
    name: "Consolas",
    description: "Consolas de videojuegos como PlayStation, Xbox y Nintendo.",
  },
  {
    id: "smartphones",
    name: "Teléfonos inteligentes",
    description: "Dispositivos móviles de última generación.",
  },
];

const clothingSubcategories = [
  {
    id: "men-clothing",
    name: "Ropa para hombres",
    description: "Camisetas, pantalones, chaquetas y accesorios para hombres.",
  },
  {
    id: "women-clothing",
    name: "Ropa para mujeres",
    description: "Vestidos, blusas, faldas y accesorios para mujeres.",
  },
  {
    id: "kids-clothing",
    name: "Ropa para niños",
    description: "Ropa casual y formal para niños y niñas.",
  },
  {
    id: "sportswear",
    name: "Ropa deportiva",
    description: "Prendas diseñadas para actividades físicas y deportes.",
  },
];

const shoesSubcategories = [
  {
    id: "sneakers",
    name: "Tenis",
    description: "Calzado deportivo y casual para uso diario.",
  },
  {
    id: "sandals",
    name: "Sandalias",
    description: "Calzado abierto ideal para climas cálidos.",
  },
  {
    id: "boots",
    name: "Botas",
    description:
      "Calzado resistente para invierno o actividades al aire libre.",
  },
  {
    id: "formal-shoes",
    name: "Zapatos formales",
    description: "Calzado elegante para ocasiones especiales.",
  },
];

const sportsSubcategories = [
  {
    id: "soccer",
    name: "Fútbol",
    description: "Balones, botines y equipos para jugar fútbol.",
  },
  {
    id: "basketball",
    name: "Baloncesto",
    description: "Balones, tableros y accesorios para baloncesto.",
  },
  {
    id: "tennis",
    name: "Tenis",
    description: "Raquetas, pelotas y accesorios para tenis.",
  },
  {
    id: "outdoor-sports",
    name: "Deportes al aire libre",
    description: "Camping, senderismo y ciclismo.",
  },
];

const fitnessSubcategories = [
  {
    id: "weights",
    name: "Pesas",
    description: "Pesas libres y mancuernas para entrenamiento de fuerza.",
  },
  {
    id: "yoga",
    name: "Yoga",
    description: "Tapetes, bloques y accesorios para yoga.",
  },
  {
    id: "cardio-equipment",
    name: "Equipo cardiovascular",
    description: "Cintas de correr, bicicletas estáticas y elípticas.",
  },
  {
    id: "fitness-accessories",
    name: "Accesorios de fitness",
    description: "Bandas elásticas, cuerdas y guantes de entrenamiento.",
  },
];

const foodSubcategories = [
  {
    id: "fast-food",
    name: "Comida rápida",
    description: "Hamburguesas, pizzas, hot dogs y otros platos rápidos.",
  },
  {
    id: "healthy-food",
    name: "Comida saludable",
    description: "Ensaladas, wraps y comidas bajas en calorías.",
  },
  {
    id: "desserts",
    name: "Postres",
    description: "Pasteles, helados y dulces variados.",
  },
  {
    id: "international-cuisine",
    name: "Cocina internacional",
    description: "Platos típicos de diferentes países y culturas.",
  },
];

const groceriesSubcategories = [
  {
    id: "fruits-vegetables",
    name: "Frutas y verduras",
    description: "Productos frescos para una dieta equilibrada.",
  },
  {
    id: "dairy-products",
    name: "Lácteos",
    description: "Leche, queso, yogurt y mantequilla.",
  },
  {
    id: "grains",
    name: "Granos",
    description: "Arroz, lentejas, frijoles y otros granos básicos.",
  },
  {
    id: "snacks",
    name: "Snacks",
    description: "Galletas, papas fritas y botanas.",
  },
];

const homeDecorSubcategories = [
  {
    id: "furniture",
    name: "Muebles",
    description: "Sofás, mesas, sillas y camas para el hogar.",
  },
  {
    id: "lighting",
    name: "Iluminación",
    description: "Lámparas, focos y luces decorativas.",
  },
  {
    id: "wall-decor",
    name: "Decoración de paredes",
    description: "Cuadros, espejos y estanterías.",
  },
  {
    id: "textiles",
    name: "Textiles",
    description: "Cortinas, alfombras y cojines decorativos.",
  },
];

const beautySubcategories = [
  {
    id: "makeup",
    name: "Maquillaje",
    description: "Productos para realzar la belleza facial y corporal.",
  },
  {
    id: "skincare",
    name: "Cuidado de la piel",
    description: "Cremas, sueros y mascarillas para el cuidado facial.",
  },
  {
    id: "haircare",
    name: "Cuidado del cabello",
    description: "Shampoo, acondicionador y tratamientos capilares.",
  },
  {
    id: "fragrances",
    name: "Fragancias",
    description: "Perfumes y desodorantes para hombres y mujeres.",
  },
];

const toysSubcategories = [
  {
    id: "educational-toys",
    name: "Juguetes educativos",
    description: "Juegos que estimulan el aprendizaje y la creatividad.",
  },
  {
    id: "action-figures",
    name: "Figuras de acción",
    description: "Personajes de películas, series y cómics.",
  },
  {
    id: "board-games",
    name: "Juegos de mesa",
    description: "Juegos familiares y estratégicos.",
  },
  {
    id: "soft-toys",
    name: "Peluches",
    description: "Osos de peluche y juguetes blandos.",
  },
];

const petsSubcategories = [
  {
    id: "dog-supplies",
    name: "Suministros para perros",
    description: "Comida, correas y juguetes para perros.",
  },
  {
    id: "cat-supplies",
    name: "Suministros para gatos",
    description: "Comida, rascadores y juguetes para gatos.",
  },
  {
    id: "pet-health",
    name: "Salud de mascotas",
    description: "Suplementos, medicamentos y productos de higiene.",
  },
  {
    id: "fish-aquariums",
    name: "Acuarios y peces",
    description: "Tanques, filtros y accesorios para peces.",
  },
];

export const productCategories = [
  {
    id: "technology",
    name: "Tecnología",
    subcategories: technologySubcategories,
  },
  {
    id: "clothing",
    name: "Ropa",
    subcategories: clothingSubcategories,
  },
  {
    id: "shoes",
    name: "Calzado",
    subcategories: shoesSubcategories,
  },
  {
    id: "sports",
    name: "Deportes",
    subcategories: sportsSubcategories,
  },
  {
    id: "fitness",
    name: "Fitness",
    subcategories: fitnessSubcategories,
  },
  {
    id: "food",
    name: "Comida",
    subcategories: foodSubcategories,
  },
  {
    id: "groceries",
    name: "Comestibles",
    subcategories: groceriesSubcategories,
  },
  {
    id: "homeDecor",
    name: "Hogar",
    subcategories: homeDecorSubcategories,
  },
  {
    id: "beauty",
    name: "Belleza",
    subcategories: beautySubcategories,
  },
  {
    id: "toys",
    name: "Juguetes",
    subcategories: toysSubcategories,
  },
  {
    id: "pets",
    name: "Mascotas",
    subcategories: petsSubcategories,
  },
  {
    id: "custom",
    name: "Personalizado",
    subcategories: [],
  },
];
