const dailyOperations = [
  {
    id: "supplies",
    name: "Suministros",
    description:
      "Materiales necesarios para el funcionamiento diario del negocio.",
  },
  {
    id: "utilities",
    name: "Servicios públicos",
    description: "Electricidad, agua, gas e internet.",
  },
  {
    id: "maintenance",
    name: "Mantenimiento",
    description: "Reparaciones y mantenimiento de equipos y espacios.",
  },
];

const staff = [
  {
    id: "salaries",
    name: "Salarios",
    description: "Pagos regulares a empleados.",
  },
  {
    id: "benefits",
    name: "Beneficios",
    description: "Seguros, bonos y otros beneficios laborales.",
  },
  {
    id: "training",
    name: "Capacitación",
    description: "Cursos y talleres para el desarrollo del equipo.",
  },
];

const marketing = [
  {
    id: "advertising",
    name: "Publicidad",
    description: "Campañas en redes sociales, televisión, radio, etc.",
  },
  {
    id: "branding",
    name: "Branding",
    description: "Diseño de logotipos, material gráfico y uniformes.",
  },
  {
    id: "events",
    name: "Eventos",
    description:
      "Ferias, lanzamientos de productos y actividades promocionales.",
  },
];

const technology = [
  {
    id: "software",
    name: "Software",
    description: "Licencias de programas y herramientas digitales.",
  },
  {
    id: "hardware",
    name: "Hardware",
    description: "Computadoras, impresoras y otros dispositivos.",
  },
  {
    id: "it-support",
    name: "Soporte técnico",
    description: "Servicios de mantenimiento y soporte IT.",
  },
];

const rentAndSpaces = [
  {
    id: "rent",
    name: "Alquiler",
    description: "Pago mensual por el espacio físico del negocio.",
  },
  {
    id: "decoration",
    name: "Decoración",
    description: "Mobiliario y diseño del espacio comercial.",
  },
  {
    id: "storage",
    name: "Almacenamiento",
    description: "Bodegas o espacios adicionales para inventario.",
  },
];

const inventory = [
  {
    id: "raw-materials",
    name: "Materias primas",
    description: "Insumos necesarios para la producción de bienes.",
  },
  {
    id: "finished-products",
    name: "Productos terminados",
    description: "Mercancía lista para la venta.",
  },
  {
    id: "packaging",
    name: "Empaques",
    description: "Envases y materiales de empaque.",
  },
];

const taxesAndLegal = [
  {
    id: "taxes",
    name: "Impuestos",
    description: "Pagos fiscales y tributarios obligatorios.",
  },
  {
    id: "licenses",
    name: "Licencias",
    description: "Permisos y certificaciones legales.",
  },
  {
    id: "legal-advice",
    name: "Asesoría legal",
    description: "Consultoría jurídica para contratos y cumplimientos.",
  },
];

const financing = [
  {
    id: "loans",
    name: "Préstamos",
    description: "Créditos bancarios o financieros.",
  },
  {
    id: "interest",
    name: "Intereses",
    description: "Costos asociados a préstamos o créditos.",
  },
  {
    id: "investments",
    name: "Inversiones",
    description: "Capital destinado al crecimiento del negocio.",
  },
];

const transportation = [
  {
    id: "delivery",
    name: "Entregas",
    description: "Costos de envío y distribución.",
  },
  {
    id: "fleet",
    name: "Flota",
    description: "Vehículos comerciales y su mantenimiento.",
  },
  {
    id: "fuel",
    name: "Combustible",
    description: "Gastos en gasolina o diésel.",
  },
];

const professionalServices = [
  {
    id: "accounting",
    name: "Contabilidad",
    description: "Servicios de contadores o firmas contables.",
  },
  {
    id: "consulting",
    name: "Consultoría",
    description: "Asesoría en estrategia, finanzas o marketing.",
  },
  {
    id: "insurance",
    name: "Seguros",
    description: "Pólizas para proteger el negocio y sus activos.",
  },
];

export const expenseCategories = [
  {
    id: "daily-operations",
    name: "Operaciones Diarias",
    subcategories: dailyOperations,
  },
  { id: "staff", name: "Personal", subcategories: staff },
  { id: "marketing", name: "Marketing y Publicidad", subcategories: marketing },
  { id: "technology", name: "Tecnología", subcategories: technology },
  {
    id: "rent-and-spaces",
    name: "Alquiler y Espacios",
    subcategories: rentAndSpaces,
  },
  { id: "inventory", name: "Inventario", subcategories: inventory },
  {
    id: "taxes-and-legal",
    name: "Impuestos y Legal",
    subcategories: taxesAndLegal,
  },
  { id: "financing", name: "Financiamiento", subcategories: financing },
  {
    id: "transportation",
    name: "Transporte y Logística",
    subcategories: transportation,
  },
  {
    id: "professional-services",
    name: "Servicios Profesionales",
    subcategories: professionalServices,
  },
  {
    id: "custom",
    name: "Personalizado",
    subcategories: [],
  },
];
