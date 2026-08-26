export interface Dish {
  nombre: string;
  descripcion?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  imagen?: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "pollos-a-la-brasa",
    nombre: "Pollos a la Brasa",
    imagen: "",
    items: [
      {
        nombre: "1/8 de Pollo a la Brasa",
        descripcion: "Papas fritas + ensalada fresca + cremas de la casa.",
        precio: "S/. 11.00"
      },
      {
        nombre: "1/4 de Pollo a la Brasa",
        descripcion: "Papas fritas + ensalada fresca + cremas de la casa.",
        precio: "S/. 17.50"
      },
      {
        nombre: "Mostrita",
        descripcion: "1/8 de pollo + arroz chaufa al wok + papas fritas + cremas.",
        precio: "S/. 13.00"
      },
      {
        nombre: "Mostro",
        descripcion: "1/4 de pollo + arroz chaufa al wok + papas fritas + cremas.",
        precio: "S/. 19.00"
      },
      {
        nombre: "1/2 Pollo a la Brasa",
        descripcion: "Papas fritas + ensalada fresca + cremas de la casa.",
        precio: "S/. 32.00"
      },
      {
        nombre: "1 Pollo a la Brasa Entero",
        descripcion: "Pollo entero a la brasa + papas fritas + ensalada familiar + cremas.",
        precio: "S/. 58.00"
      },
      {
        nombre: "1 Pollo a la Brasa + 1/4 Solo",
        descripcion: "1 Pollo entero + 1/4 pollo solo + papas fritas + ensalada + cremas.",
        precio: "S/. 63.00"
      },
      {
        nombre: "1 Pollo a la Brasa + Gaseosa 1.5 Lt",
        descripcion: "1 Pollo a la brasa entero + gaseosa 1.5 Lt. + papas fritas + ensalada + cremas.",
        precio: "S/. 63.00"
      },
      {
        nombre: "MEGA MANCHESTER",
        descripcion: "1 Pollo + 1/4 pollo solo + gaseosa 1.5 Lt. + papas fritas + ensalada + cremas.",
        precio: "S/. 68.00"
      },
      {
        nombre: "DON MANCHESTER",
        descripcion: "1 Pollo + 1/2 pollo solo + gaseosa 1.5 Lt. + papas fritas + ensalada + cremas.",
        precio: "S/. 78.00"
      }
    ]
  },
  {
    id: "combos-parrilleros",
    nombre: "Combos Parrilleros",
    imagen: "",
    items: [
      {
        nombre: "Combo Filete",
        descripcion: "1 Filete de pollo + 1 anticucho + 1 chorizo + papas fritas + ensalada + cremas.",
        precio: "S/. 27.00"
      },
      {
        nombre: "Combo Chuleta",
        descripcion: "1 Chuleta + molleja + 1 anticucho + papas fritas + ensalada + cremas.",
        precio: "S/. 29.00"
      },
      {
        nombre: "Combo Churrasco",
        descripcion: "1 Churrasco + 1 brocheta + 1 chorizo + papas fritas + ensalada + cremas.",
        precio: "S/. 31.00"
      },
      {
        nombre: "Combo Lomo",
        descripcion: "1 Lomo + 1 brocheta + 1 chorizo + papas fritas + ensalada + cremas.",
        precio: "S/. 35.00"
      }
    ]
  },
  {
    id: "carnes-a-la-parrilla",
    nombre: "Carnes a la Parrilla",
    imagen: "",
    items: [
      {
        nombre: "Chuleta a la Parrilla",
        descripcion: "Jugosa chuleta a la parrilla + papas fritas + ensalada + cremas.",
        precio: "S/. 17.00"
      },
      {
        nombre: "Churrasco a la Parrilla",
        descripcion: "Corte de churrasco a la brasa + papas fritas + ensalada + cremas.",
        precio: "S/. 19.00"
      },
      {
        nombre: "Filete a la Parrilla",
        descripcion: "Filete sazonado a la parrilla + papas fritas + ensalada + cremas.",
        precio: "S/. 16.00"
      },
      {
        nombre: "Anticuchos",
        descripcion: "Porción de anticuchos de corazón a la parrilla + papas + ensalada + cremas.",
        precio: "S/. 16.00"
      },
      {
        nombre: "Mollejas a la Parrilla",
        descripcion: "Deliciosas mollejitas a la parrilla + papas fritas + ensalada + cremas.",
        precio: "S/. 16.00"
      },
      {
        nombre: "Lomo Fino a la Parrilla",
        descripcion: "Corte selecto de lomo fino + papas fritas + ensalada + cremas.",
        precio: "S/. 29.00"
      },
      {
        nombre: "Bife a la Parrilla",
        descripcion: "Corte de bife a la parrilla + papas fritas + ensalada + cremas.",
        precio: "S/. 27.00"
      },
      {
        nombre: "Costilla a la BBQ",
        descripcion: "Tierna costilla bañada en salsa BBQ + papas fritas + ensalada + cremas.",
        precio: "S/. 35.00"
      },
      {
        nombre: "Filete de Pierna",
        descripcion: "Filete de pierna a la parrilla + papas fritas + ensalada + cremas.",
        precio: "S/. 15.00"
      },
      {
        nombre: "Chorizo a la Parrilla (2 und)",
        descripcion: "2 Chorizos parrilleros + papas fritas + ensalada + cremas.",
        precio: "S/. 15.00"
      }
    ]
  },
  {
    id: "parrillas-familiares",
    nombre: "Parrillas Familiares",
    imagen: "",
    items: [
      {
        nombre: "Parrilla para (2)",
        descripcion: "1 Jugoso lomo + filete + 2 anticuchos + mollejitas + papas + ensalada + cremas + gaseosa 1.5 Lt. o limonada 1.5 Lt.",
        precio: "S/. 62.00"
      },
      {
        nombre: "Parrilla Familiar",
        descripcion: "Jugoso lomo + 1 bife + 1 chuleta de cerdo + 2 anticuchos + 2 chorizos + mollejitas + ensalada + cremas + gaseosa 1.5 Lt. o limonada 1.5 Lt.",
        precio: "S/. 98.00"
      },
      {
        nombre: "Parrilla La Pollona",
        descripcion: "1 Jugoso lomo + 1 bife + 1/4 de pollo a la brasa + 2 anticuchos + 2 chorizos + mollejitas + papas + ensalada + cremas + gaseosa 1.5 Lt., limonada 1.5 Lt. o Vino Tabernero/Borgoña.",
        precio: "S/. 110.00"
      }
    ]
  },
  {
    id: "menu-parrillero",
    nombre: "Menú Parrillero",
    imagen: "",
    items: [
      {
        nombre: "Menú Filete de Pollo",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Incluye: arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada.",
        precio: "S/. 11.00"
      },
      {
        nombre: "Menú Churrasco",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Incluye: arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Menú Lomo Saltado",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Incluye: arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Menú Chuleta",
        descripcion: "Válido Lun a Vie 2pm - 5pm (No feriados). Incluye: arroz + papas + ensalada + cremas + 1 vaso de chicha o limonada.",
        precio: "S/. 12.00"
      }
    ]
  },
  {
    id: "platos-a-la-carta",
    nombre: "Platos a la Carta",
    imagen: "",
    items: [
      {
        nombre: "Lomo Saltado",
        descripcion: "Jugosos trozos de lomo fino salteados al wok con cebolla, tomate, papas fritas y arroz blanco.",
        precio: "S/. 20.00"
      },
      {
        nombre: "Pollo Saltado",
        descripcion: "Trozos de pollo salteados al wok con cebolla, tomate, papas fritas y arroz blanco.",
        precio: "S/. 18.00"
      },
      {
        nombre: "Tallarín Saltado de Pollo",
        descripcion: "Tallarines salteados con tiras de pechuga de pollo, vegetales frescos y sazón criolla.",
        precio: "S/. 18.00"
      },
      {
        nombre: "Tallarín Saltado de Carne",
        descripcion: "Tallarines salteados al wok con tierna carne de res, cebolla, tomate y ají amarillo.",
        precio: "S/. 20.00"
      },
      {
        nombre: "Chaufa de Carne",
        descripcion: "Arroz chaufa al estilo oriental salteado al wok con trozos de carne y huevo.",
        precio: "S/. 20.00"
      }
    ]
  },
  {
    id: "guarniciones",
    nombre: "Guarniciones",
    imagen: "",
    items: [
      {
        nombre: "1 Porción de Papas",
        descripcion: "Porción entera de papas fritas doradas y crujientes.",
        precio: "S/. 17.00"
      },
      {
        nombre: "1/2 Porción de Papas",
        descripcion: "Media porción de papas fritas crujientes.",
        precio: "S/. 9.00"
      },
      {
        nombre: "1 Porción de Arroz Chaufa",
        descripcion: "Porción de delicioso arroz chaufa clásico salteado al wok.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Ensalada Clásica",
        descripcion: "Fresca ensalada mixta de lechuga, tomate, pepino y vinagreta de la casa.",
        precio: "S/. 6.00"
      }
    ]
  },
  {
    id: "gaseosas",
    nombre: "Gaseosas",
    imagen: "",
    items: [
      {
        nombre: "Gaseosa Mediana",
        descripcion: "Gaseosa personal tamaño mediano.",
        precio: "S/. 2.50"
      },
      {
        nombre: "Gaseosa 1/2 Lt.",
        descripcion: "Botella personal de 500 ml (Inca Kola / Coca Cola).",
        precio: "S/. 3.50"
      },
      {
        nombre: "Gordita",
        descripcion: "Gaseosa formato gordita.",
        precio: "S/. 5.50"
      },
      {
        nombre: "Gaseosa 1 Litro",
        descripcion: "Botella de 1 Litro.",
        precio: "S/. 7.00"
      },
      {
        nombre: "Gaseosa 1.5 Litro",
        descripcion: "Botella de 1.5 Litros.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Gaseosa 3 Litros",
        descripcion: "Botella familiar de 3 Litros.",
        precio: "S/. 15.00"
      },
      {
        nombre: "Agua de Mesa",
        descripcion: "Botella de agua mineral de mesa.",
        precio: "S/. 2.50"
      }
    ]
  },
  {
    id: "bebidas",
    nombre: "Bebidas Naturales",
    imagen: "",
    items: [
      {
        nombre: "Jarra de Chicha Morada",
        descripcion: "Tradicional chicha morada hecha en casa con maíz morado, piña y canela.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Jarra de Maracuyá",
        descripcion: "Refresco natural y refrescante de pura fruta maracuyá.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Jarra de Limonada",
        descripcion: "Limonada clásica y refrescante recién preparada.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Jarra de Limonada Frozen",
        descripcion: "Limonada helada y granizada estilo frozen.",
        precio: "S/. 14.00"
      }
    ]
  },
  {
    id: "tragos",
    nombre: "Tragos & Cócteles",
    imagen: "",
    items: [
      {
        nombre: "Pisco Sour",
        descripcion: "El cóctel bandera del Perú, preparado con pisco quebranta, limón y amargo de angostura.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Algarrobina",
        descripcion: "Cremoso y dulce cóctel a base de pisco, leche evaporada y jarabe de algarrobina.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Piña Colada",
        descripcion: "Deliciosa combinación de ron blanco, crema de coco y jugo de piña.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Daiquiri de Durazno",
        descripcion: "Refrescante cóctel frozen preparado con ron y pulpa de durazno.",
        precio: "S/. 12.00"
      },
      {
        nombre: "Chilcano de Pisco",
        descripcion: "Refrescante pisco con ginger ale, zumo de limón y hielo.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Cuba Libre",
        descripcion: "Ron añejo servido con gaseosa cola y rodaja de limón.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Perú Libre",
        descripcion: "Pisco peruano servido con gaseosa oscura y toque cítrico de limón.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Machu Picchu",
        descripcion: "Vistoso cóctel tricolor preparado con pisco, crema de menta, jugo de naranja y granadina.",
        precio: "S/. 12.00"
      }
    ]
  },
  {
    id: "licores",
    nombre: "Cervezas & Licores",
    imagen: "",
    items: [
      {
        nombre: "Cerveza Pilsen Callao",
        descripcion: "Botella personal helada.",
        precio: "S/. 9.00"
      },
      {
        nombre: "Cusqueña Negra",
        descripcion: "Cerveza Cusqueña Malta Negra personal helada.",
        precio: "S/. 10.00"
      },
      {
        nombre: "Cusqueña de Trigo",
        descripcion: "Cerveza Cusqueña de Trigo personal helada.",
        precio: "S/. 10.00"
      }
    ]
  },
  {
    id: "vinos",
    nombre: "Vinos",
    imagen: "",
    items: [
      {
        nombre: "Vino Santiago Queirolo",
        descripcion: "Botella de vino Santiago Queirolo (Magdalena / Borgoña).",
        precio: "S/. 35.00"
      },
      {
        nombre: "Vino Rosé",
        descripcion: "Botella de vino Rosé seleccionado.",
        precio: "S/. 35.00"
      }
    ]
  }
];
