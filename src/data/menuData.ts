export interface Dish {
  nombre: string;
  descripcion?: string;
  precio: string;
  imagen?: string;
  badge?: string;
}

export interface Category {
  id: string;
  nombre: string;
  imagen?: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "promociones",
    nombre: "Promociones",
    imagen: "/categories/promociones.webp",
    items: [
      {
        nombre: "Promo Martes - 1/2 Pollo a la Brasa",
        descripcion: "1/2 Pollo a la brasa + papas fritas + ensalada + cremas + 1 gaseosa personal (Inca Kola / Coca Cola).",
        precio: "S/. 35.00",
        imagen: "/promos/promo-martes.webp",
        badge: "Promo Martes"
      },
      {
        nombre: "Jueves de Patas - 1/4 de Pollo",
        descripcion: "Todos los jueves: 1/4 de pollo a la brasa + papas fritas + ensalada fresca + cremas.",
        precio: "S/. 12.00",
        imagen: "/promos/promo-jueves.webp",
        badge: "Jueves de Patas"
      },
      {
        nombre: "Miércoles de Mostrito",
        descripcion: "¡Todos los miércoles por la compra de un mostrito El Pollón te pone la gaseosa Pepsi 300ml! (Mostrito con arroz chaufa + papas + cremas).",
        precio: "S/. 13.00",
        imagen: "/promos/promo-miercoles.webp",
        badge: "Miércoles de Mostrito"
      }
    ]
  },
  {
    id: "pollos-a-la-brasa",
    nombre: "Pollos a la Brasa",
    imagen: "/categories/pollos-a-la-brasa.webp",
    items: [
      {
        nombre: "1/8 de Pollo a la Brasa",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 11.00"
      },
      {
        nombre: "1/4 de Pollo a la Brasa",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 17.00"
      },
      {
        nombre: "Mostrito",
        descripcion: "+ Arroz chaufa + papas + cremas",
        precio: "S/. 13.00"
      },
      {
        nombre: "Mostro",
        descripcion: "+ Arroz chaufa + papas + cremas",
        precio: "S/. 19.00"
      },
      {
        nombre: "1/2 Pollo a la Brasa",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 32.00"
      },
      {
        nombre: "1 Pollo a la Brasa entero",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 58.00"
      },
      {
        nombre: "1 Pollo a la Brasa + 1/4 solo",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 63.00"
      },
      {
        nombre: "1 Pollo a la Brasa + Gaseosa 1.5 Lt.",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 63.00"
      },
      {
        nombre: "MEGA MANCHESTER",
        descripcion: "1 Pollo + 1/4 pollo solo + gaseosas 1.5 Lt. + papas + ensalada + cremas",
        precio: "S/. 68.00"
      },
      {
        nombre: "DON MANCHESTER",
        descripcion: "1 Pollo + 1/2 pollo solo + gaseosa 1.5 Lt. + papas + ensalada + cremas.",
        precio: "S/. 78.00"
      }
    ]
  },
  {
    id: "combos-parrilleros",
    nombre: "Combos Parrilleros",
    imagen: "/categories/combos-parrilleros.webp",
    items: [
      {
        nombre: "COMBO FILETE",
        descripcion: "1 Filete de pollo + 1 Anticucho + 1 chorizo + papas + ensalada + cremas",
        precio: "S/. 27.00"
      },
      {
        nombre: "COMBO CHULETA",
        descripcion: "1 chuleta + molleja + 1 anticucho + papas + ensalada + cremas",
        precio: "S/. 29.00"
      },
      {
        nombre: "COMBO CHURRASCO",
        descripcion: "1 Churrasco + 1 brocheta + 1 chorizo + papas + ensalada + cremas",
        precio: "S/. 31.00"
      },
      {
        nombre: "COMBO LOMO",
        descripcion: "1 Lomo + 1 brocheta + 1 chorizo + papas + ensalada + cremas",
        precio: "S/. 35.00"
      }
    ]
  },
  {
    id: "carnes-a-la-parrilla",
    nombre: "Carnes a la Parrilla",
    imagen: "/categories/carnes-a-la-parrilla.webp",
    items: [
      {
        nombre: "Chuleta",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 17.00"
      },
      {
        nombre: "Churrasco",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 19.00"
      },
      {
        nombre: "Filete",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 16.00"
      },
      {
        nombre: "Anticucho",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 16.00"
      },
      {
        nombre: "Mollejas",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 16.00"
      },
      {
        nombre: "Lomo Fino",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 29.00"
      },
      {
        nombre: "Bife",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 27.00"
      },
      {
        nombre: "Costilla a la BBQ",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 35.00"
      },
      {
        nombre: "Filete de Pierna",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 15.00"
      },
      {
        nombre: "Chorizo (2)",
        descripcion: "+ papas + ensalada + cremas",
        precio: "S/. 15.00"
      }
    ]
  },
  {
    id: "parrillas-familiares",
    nombre: "Parrillas Familiares",
    imagen: "/categories/parrillas-familiares.webp",
    items: [
      {
        nombre: "PARRILLA PARA (2)",
        descripcion: "1 Jugoso Lomo + filete + (2) anticuchos + mollejitas + papas + ensalada + cremas + gaseosas 1.5 Lt. o Limonada 1.5 Lt.",
        precio: "S/. 82.00"
      },
      {
        nombre: "PARRILLA FAMILIAR",
        descripcion: "+ Jugoso Lomo + filete + 1 chuleta de cerdo + 2 anticuchos + 2 chorizos + mollejitas + ensalada + cremas + gaseosa 1.5 Lt. o Limonada 1.5 Lt.",
        precio: "S/. 98.00"
      },
      {
        nombre: "PARRILLA LA POLLONA",
        descripcion: "1 Jugoso Lomo + 1 Bife + 1/4 de pollo a la brasa + 2 anticuchos + 2 chorizos + Mollejitas + papas + ensalada + cremas + gaseosas 1.5 Lt. o + Limonada 1.5 Lt. o Vino Tabernero Borgoña.",
        precio: "S/. 110.00"
      }
    ]
  },
  {
    id: "menu-parrillero",
    nombre: "Menú Parrillero",
    imagen: "/categories/menu-parrillero.webp",
    items: [
      {
        nombre: "Menú Filete de Pollo",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). arroz + papas + ensalada + cremas + 1 vaso chicha o limonada",
        precio: "S/. 11.00"
      },
      {
        nombre: "Menú Churrasco",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada",
        precio: "S/. 12.00"
      },
      {
        nombre: "Menú Lomo Saltado",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Arroz + papas + ensaladas + cremas + 1 vaso de chicha o limonada",
        precio: "S/. 12.00"
      },
      {
        nombre: "Menú Chuleta",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada.",
        precio: "S/. 12.00"
      }
    ]
  },
  {
    id: "platos-a-la-carta",
    nombre: "Platos a la Carta",
    imagen: "/categories/platos-a-la-carta.webp",
    items: [
      {
        nombre: "Lomo Saltado",
        descripcion: "",
        precio: "S/. 20.00"
      },
      {
        nombre: "Pollo Saltado",
        descripcion: "",
        precio: "S/. 18.00"
      },
      {
        nombre: "Tallarín Saltado de Pollo",
        descripcion: "",
        precio: "S/. 18.00"
      },
      {
        nombre: "Tallarín Saltado de Carne",
        descripcion: "",
        precio: "S/. 20.00"
      },
      {
        nombre: "Chaufa de Carne",
        descripcion: "",
        precio: "S/. 20.00"
      }
    ]
  },
  {
    id: "guarniciones",
    nombre: "Guarniciones",
    imagen: "/categories/guarniciones.webp",
    items: [
      {
        nombre: "1 Porción de Papas",
        descripcion: "",
        precio: "S/. 17.00"
      },
      {
        nombre: "1/2 Porción de Papas",
        descripcion: "",
        precio: "S/. 9.00"
      },
      {
        nombre: "1 Porción de Arroz Chaufa",
        descripcion: "",
        precio: "S/. 12.00"
      },
      {
        nombre: "Ensalada Clásica",
        descripcion: "",
        precio: "S/. 6.00"
      }
    ]
  },
  {
    id: "gaseosas",
    nombre: "Gaseosas",
    imagen: "/categories/gaseosas.webp",
    items: [
      {
        nombre: "Mediana",
        descripcion: "",
        precio: "S/. 2.50"
      },
      {
        nombre: "Gaseosa 1/2 Lt.",
        descripcion: "",
        precio: "S/. 3.50"
      },
      {
        nombre: "Gordita",
        descripcion: "",
        precio: "S/. 5.00"
      },
      {
        nombre: "Gaseosa 1 Litro",
        descripcion: "",
        precio: "S/. 7.00"
      },
      {
        nombre: "Gaseosa 1.5 Litro",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Gaseosa 3 Litros",
        descripcion: "",
        precio: "S/. 15.00"
      },
      {
        nombre: "Agua",
        descripcion: "",
        precio: "S/. 2.50"
      }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas",
    imagen: "/categories/bebidas.webp",
    items: [
      {
        nombre: "Chicha",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Maracuya",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Limonada",
        descripcion: "",
        precio: "S/. 12.00"
      },
      {
        nombre: "Limonada Frozen",
        descripcion: "",
        precio: "S/. 14.00"
      }
    ]
  },
  {
    id: "tragos",
    nombre: "Tragos",
    imagen: "/categories/tragos.webp",
    items: [
      {
        nombre: "Pisco Saur",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Algarrobina",
        descripcion: "",
        precio: "S/. 12.00"
      },
      {
        nombre: "Piña Colada",
        descripcion: "",
        precio: "S/. 12.00"
      },
      {
        nombre: "Daiquiri de Durazno",
        descripcion: "",
        precio: "S/. 12.00"
      },
      {
        nombre: "Chilcano de Pisco",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Cuba Libre",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Peru Libre",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Machu Picchu",
        descripcion: "",
        precio: "S/. 12.00"
      }
    ]
  },
  {
    id: "licores",
    nombre: "Licores",
    imagen: "/categories/licores.webp",
    items: [
      {
        nombre: "Pilsen",
        descripcion: "",
        precio: "S/. 9.00"
      },
      {
        nombre: "Cuzqueña Negra",
        descripcion: "",
        precio: "S/. 10.00"
      },
      {
        nombre: "Cuzqueña de Trigo",
        descripcion: "",
        precio: "S/. 10.00"
      }
    ]
  },
  {
    id: "vinos",
    nombre: "Vinos",
    imagen: "/categories/vinos.webp",
    items: [
      {
        nombre: "Vino Santiago Queirolo",
        descripcion: "",
        precio: "S/. 35.00"
      },
      {
        nombre: "Vino Rose",
        descripcion: "",
        precio: "S/. 35.00"
      }
    ]
  }
];
