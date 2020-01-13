export const storeAreas = {
  cashier: {
    id: 'cashier',
    type: 'store',
    nodes: [
      'node_0.276243',
      'node_0.157836',
      'node_0.803288',
      'node_0.181689',
      'node_0.933252',
    ],
    floorID: 'levelOneFloor',
    labels: { en: 'Cashier', es: 'Cajas' },
  },
  food: {
    id: 'food',
    type: 'store',
    nodes: ['node_0.788308', 'node_0.398115'],
    mapping: {
      categories: ['DCIS_030001', 'DCIS_030002', 'DCIS_030003', 'DCIS_030004'],
    },
    floorID: 'levelOneFloor',
    labels: { en: 'Food', es: 'Alimentación' },
  },
  'thinking-spain': {
    id: 'thinking-spain',
    type: 'store',
    nodes: ['node_0.027089'],
    floorID: 'levelOneFloor',
    mapping: { categories: ['DCIS_0200074'] },
    labels: { en: 'Thinking Spain', es: 'Thinking España' },
  },
  'tasting-bar': {
    id: 'tasting-bar',
    type: 'store',
    nodes: ['node_0.145795'],
    floorID: 'levelOneFloor',
    labels: { en: 'Tasting Bar', es: 'TastiBar' },
  },
  'special-promotions': {
    id: 'special-promotions',
    type: 'store',
    nodes: ['node_0.523278'],
    floorID: 'levelOneFloor',
    labels: { en: 'Special Promotions', es: 'Promociones Especiales' },
  },
  'entrance-lounge': {
    id: 'entrance-lounge',
    type: 'store',
    nodes: ['node_0.677221'],
    floorID: 'levelOneFloor',
    labels: { en: 'Entrance VIP Loungee', es: 'Entrada Sala VIP' },
  },
  toys: {
    id: 'toys',
    type: 'store',
    nodes: ['node_0.62088'],
    mapping: { categories: ['DCIS_060001', 'DCIS_060002', 'DCIS_060003'] },
    floorID: 'levelOneFloor',
    labels: { en: 'Toys', es: 'Juguetes' },
  },
  tobacco: {
    id: 'tobacco',
    type: 'store',
    nodes: ['node_0.367212'],
    mapping: {
      categories: [
        'DCIS_010001',
        'DCIS_010002',
        'DCIS_010003',
        'DCIS_010004',
        'DCIS_010005',
        'DCIS_010006',
        'DCIS_010007',
      ],
    },
    floorID: 'levelOneFloor',
    labels: { en: 'Tobacco', es: 'Tabaco' },
  },
  'liquor-promotions': {
    id: 'liquor-promotions',
    type: 'store',
    nodes: ['node_0.334801', 'node_0.88762'],
    floorID: 'levelOneFloor',
    labels: { en: 'Liquor Promotions', es: 'Liquor Promotions' },
  },
  liquor: {
    id: 'liquor',
    type: 'store',
    nodes: [
      'node_0.783864',
      'node_0.973137',
      'node_0.048638',
      'node_0.834564',
      'node_0.575438',
    ],
    mapping: {
      categories: [
        'DCIS_020001',
        'DCIS_020002',
        'DCIS_020003',
        'DCIS_020004',
        'DCIS_020005',
        'DCIS_020006',
        'DCIS_020007',
        'DCIS_020008',
        'DCIS_020009',
        'DCIS_020010',
      ],
    },
    floorID: 'levelOneFloor',
    labels: { en: 'Liquor', es: 'Liquor' },
  },
  'sunglasses-and-watches': {
    id: 'sunglasses-and-watches',
    type: 'store',
    nodes: ['node_0.641606'],
    mapping: {
      categories: [
        'DCIS_07000516',
        'DCIS_050006',
        'DCIS_0900012',
        'DCIS_050001',
      ],
    },
    floorID: 'levelOneFloor',
    labels: { en: 'Sunglasses and Watches', es: 'Gafas y Relojes' },
  },
  'perfumes-promotions': {
    id: 'perfumes-promotions',
    type: 'store',
    nodes: ['node_0.877376', 'node_0.856542', 'node_0.534422'],
    floorID: 'levelOneFloor',
    labels: { en: 'Perfumes Promotions', es: 'Promoción Perfumería' },
  },
  'perfumes-and-cosmetics': {
    id: 'perfumes-and-cosmetics',
    type: 'store',
    nodes: ['node_0.677911', 'node_0.016556', 'node_0.534943', 'node_0.785772'],
    mapping: {
      categories: [
        'DCIS_040001',
        'DCIS_040002',
        'DCIS_040003',
        'DCIS_040004',
        'DCIS_040005',
      ],
    },
    floorID: 'levelOneFloor',
    labels: { en: 'Perfumes y Cosmetics', es: 'Perfumerías y Cosméticos' },
  },
  'duf-mad-pro1': {
    id: 'duf-mad-pro1',
    type: 'device',
    nodes: ['node_0.097749'],
    mapping: { categories: [] },
    floorID: 'levelOneFloor',
    labels: {
      en: 'Dufry Madrid Pro 2 Device',
      es: 'Dufry Madrid Pro 1 Device',
    },
  },
  'duf-mad-pro2': {
    id: 'duf-mad-pro2',
    type: 'device',
    nodes: ['node_0.462711'],
    mapping: { categories: [] },
    floorID: 'levelOneFloor',
    labels: {
      en: 'Dufry Madrid Pro 2 Device',
      es: 'Dufry Madrid Pro 2 Device',
    },
  },
  'duf-mad-sa43': {
    id: 'duf-mad-sa43',
    type: 'device',
    nodes: ['node_0.350631'],
    mapping: { categories: [] },
    floorID: 'levelOneFloor',
    labels: {
      en: 'Dufry Madrid Sa 43 Device',
      es: 'Dufry Madrid Sa 43 Device',
    },
  },
  'test-device-marker': {
    id: 'test-device-marker',
    type: 'device',
    nodes: ['node_0.188541'],
    mapping: { categories: [] },
    floorID: 'levelOneFloor',
    labels: { en: 'Test Device Marker', es: 'Test Device Marker' },
  },
}

export const nodes = [
  {
    id: 'node_0.188541',
    cx: 2992,
    cy: 1580,
    'data-direct-nodes': ['node_0.494249', 'node_0.130076'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.188541',
  },
  {
    id: 'node_0.803288',
    cx: 766,
    cy: 2028,
    'data-direct-nodes': ['node_0.500546'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.803288',
  },
  {
    id: 'node_0.785772',
    cx: 2423,
    cy: 1426,
    'data-direct-nodes': ['node_0.500376'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.785772',
  },
  {
    id: 'node_0.534943',
    cx: 3223,
    cy: 1166,
    'data-direct-nodes': ['node_0.646228'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.534943',
  },
  {
    id: 'node_0.016556',
    cx: 2706,
    cy: 2160,
    'data-direct-nodes': ['node_0.496116', 'node_0.037817'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.016556',
  },
  {
    id: 'node_0.575438',
    cx: 953,
    cy: 2039,
    'data-direct-nodes': ['node_0.500546'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.575438',
  },
  {
    id: 'node_0.398115',
    cx: 718,
    cy: 1276,
    'data-direct-nodes': ['node_0.337076'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.398115',
  },
  {
    id: 'node_0.788308',
    cx: 1122,
    cy: 1272,
    'data-direct-nodes': ['node_0.603249'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.788308',
  },
  {
    id: 'node_0.027089',
    cx: 1590,
    cy: 1279,
    'data-direct-nodes': ['node_0.574098', 'node_0.181689'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.027089',
  },
  {
    id: 'node_0.783864',
    cx: 1726,
    cy: 1843,
    'data-direct-nodes': ['node_0.770664'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.783864',
  },
  {
    id: 'node_0.523278',
    cx: 2160,
    cy: 1846,
    'data-direct-nodes': ['node_0.271'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.523278',
  },
  {
    id: 'node_0.367212',
    cx: 1114,
    cy: 2269,
    'data-direct-nodes': ['node_0.069864'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.367212',
  },
  {
    id: 'node_0.334801',
    cx: 1406,
    cy: 1980,
    'data-direct-nodes': ['node_0.694604'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.334801',
  },
  {
    id: 'node_0.641606',
    cx: 733,
    cy: 1824,
    'data-direct-nodes': ['node_0.780199'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.641606',
  },
  {
    id: 'node_0.856542',
    cx: 2844,
    cy: 1834,
    'data-direct-nodes': ['node_0.550939', 'node_0.859558'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.856542',
  },
  {
    id: 'node_0.807564',
    cx: 834,
    cy: 1126,
    'data-direct-nodes': ['node_0.337076', 'node_0.933252'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.807564',
  },
  {
    id: 'node_0.886053',
    cx: 572,
    cy: 1572,
    'data-direct-nodes': ['node_0.62088', 'node_0.053937', 'node_0.834564'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.886053',
  },
  {
    id: 'node_0.337076',
    cx: '834',
    cy: '1276',
    'data-direct-nodes': ['node_0.398115', 'node_0.422486', 'node_0.807564'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.337076',
  },
  {
    id: 'node_0.422486',
    cx: '834',
    cy: 1497,
    'data-direct-nodes': ['node_0.337076', 'node_0.053937', 'node_0.603249'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.422486',
  },
  {
    id: 'node_0.62088',
    cx: 246,
    cy: '1572',
    'data-direct-nodes': ['node_0.886053'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.62088',
  },
  {
    id: 'node_0.053937',
    cx: '834',
    cy: '1572',
    'data-direct-nodes': ['node_0.422486', 'node_0.780199', 'node_0.886053'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.053937',
  },
  {
    id: 'node_0.976133',
    cx: 898,
    cy: 1846,
    'data-direct-nodes': ['node_0.780199', 'node_0.500546', 'node_0.803288'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.976133',
  },
  {
    id: 'node_0.500546',
    cx: 1005,
    cy: 1934,
    'data-direct-nodes': [
      'node_0.976133',
      'node_0.575438',
      'node_0.803288',
      'node_0.694604',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.500546',
  },
  {
    id: 'node_0.834564',
    cx: '572',
    cy: 1635,
    'data-direct-nodes': ['node_0.886053'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.834564',
  },
  {
    id: 'node_0.694604',
    cx: 1300,
    cy: 1982,
    'data-direct-nodes': [
      'node_0.500546',
      'node_0.844993',
      'node_0.334801',
      'node_0.888666',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.694604',
  },
  {
    id: 'node_0.844993',
    cx: 1319,
    cy: 2078,
    'data-direct-nodes': ['node_0.694604', 'node_0.606699', 'node_0.362517'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.844993',
  },
  {
    id: 'node_0.069864',
    cx: 1113,
    cy: 2205,
    'data-direct-nodes': ['node_0.367212', 'node_0.606699'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.069864',
  },
  {
    id: 'node_0.870289',
    cx: 1644,
    cy: '1980',
    'data-direct-nodes': [
      'node_0.88762',
      'node_0.770664',
      'node_0.275278',
      'node_0.841841',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.870289',
  },
  {
    id: 'node_0.88762',
    cx: 1528,
    cy: '1980',
    'data-direct-nodes': ['node_0.870289'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.88762',
  },
  {
    id: 'node_0.534422',
    cx: 2491,
    cy: '1980',
    'data-direct-nodes': ['node_0.173597'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.534422',
  },
  {
    id: 'node_0.770664',
    cx: '1726',
    cy: '1980',
    'data-direct-nodes': [
      'node_0.870289',
      'node_0.783864',
      'node_0.677911',
      'node_0.030537',
      'node_0.705819',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.770664',
  },
  {
    id: 'node_0.677911',
    cx: '1726',
    cy: 2090,
    'data-direct-nodes': ['node_0.770664'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.677911',
  },
  {
    id: 'node_0.030537',
    cx: '2007',
    cy: '1980',
    'data-direct-nodes': [
      'node_0.770664',
      'node_0.503802',
      'node_0.705819',
      'node_0.271',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.030537',
  },
  {
    id: 'node_0.503802',
    cx: '2007',
    cy: 2342,
    'data-direct-nodes': ['node_0.030537', 'node_0.157836', 'node_0.677221'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.503802',
  },
  {
    id: 'node_0.157836',
    cx: 1784,
    cy: '2342',
    'data-direct-nodes': ['node_0.503802'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.157836',
  },
  {
    id: 'node_0.705819',
    cx: 1813,
    cy: 1980,
    'data-direct-nodes': [
      'node_0.770664',
      'node_0.030537',
      'node_0.563145',
      'node_0.350631',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.705819',
  },
  {
    id: 'node_0.563145',
    cx: 1806,
    cy: 1354,
    'data-direct-nodes': [
      'node_0.500376',
      'node_0.705819',
      'node_0.574098',
      'node_0.350631',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.563145',
  },
  {
    id: 'node_0.866073',
    cx: 2275,
    cy: '1980',
    'data-direct-nodes': [
      'node_0.276243',
      'node_0.271',
      'node_0.173597',
      'node_0.462711',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.866073',
  },
  {
    id: 'node_0.173597',
    cx: 2407,
    cy: '1980',
    'data-direct-nodes': [
      'node_0.866073',
      'node_0.534422',
      'node_0.740987',
      'node_0.466744',
      'node_0.462711',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.173597',
  },
  {
    id: 'node_0.496116',
    cx: 2717,
    cy: '1980',
    'data-direct-nodes': [
      'node_0.877376',
      'node_0.016556',
      'node_0.550939',
      'node_0.066782',
      'node_0.037817',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.496116',
  },
  {
    id: 'node_0.271',
    cx: '2160',
    cy: '1980',
    'data-direct-nodes': ['node_0.030537', 'node_0.866073', 'node_0.523278'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.271',
  },
  {
    id: 'node_0.276243',
    cx: '2275',
    cy: 2071,
    'data-direct-nodes': ['node_0.866073'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.276243',
  },
  {
    id: 'node_0.130076',
    cx: 2996,
    cy: 1723,
    'data-direct-nodes': ['node_0.686202', 'node_0.006664', 'node_0.188541'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.130076',
  },
  {
    id: 'node_0.686202',
    cx: 3063,
    cy: 1759,
    'data-direct-nodes': ['node_0.130076', 'node_0.006664', 'node_0.646228'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.686202',
  },
  {
    id: 'node_0.646228',
    cx: 3327,
    cy: 1226,
    'data-direct-nodes': ['node_0.534943', 'node_0.686202', 'node_0.097749'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.646228',
  },
  {
    id: 'node_0.550939',
    cx: '2844',
    cy: '1980',
    'data-direct-nodes': [
      'node_0.496116',
      'node_0.856542',
      'node_0.006664',
      'node_0.859558',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.550939',
  },
  {
    id: 'node_0.500376',
    cx: '2423',
    cy: '1354',
    'data-direct-nodes': ['node_0.785772', 'node_0.494249', 'node_0.563145'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.500376',
  },
  {
    id: 'node_0.494249',
    cx: 2930,
    cy: '1354',
    'data-direct-nodes': ['node_0.188541', 'node_0.500376'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.494249',
  },
  {
    id: 'node_0.401908',
    cx: 1386,
    cy: '1354',
    'data-direct-nodes': ['node_0.574098', 'node_0.048638', 'node_0.603249'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.401908',
  },
  {
    id: 'node_0.574098',
    cx: 1590,
    cy: '1354',
    'data-direct-nodes': ['node_0.563145', 'node_0.027089', 'node_0.401908'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.574098',
  },
  {
    id: 'node_0.048638',
    cx: '1386',
    cy: 1416,
    'data-direct-nodes': ['node_0.401908'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.048638',
  },
  {
    id: 'node_0.603249',
    cx: '1125',
    cy: '1354',
    'data-direct-nodes': ['node_0.401908', 'node_0.788308', 'node_0.422486'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.603249',
  },
  {
    id: 'node_0.181689',
    cx: '1590',
    cy: 807,
    'data-direct-nodes': ['node_0.027089'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.181689',
  },
  {
    id: 'node_0.780199',
    cx: '834',
    cy: '1680',
    'data-direct-nodes': [
      'node_0.641606',
      'node_0.145795',
      'node_0.976133',
      'node_0.053937',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.780199',
  },
  {
    id: 'node_0.362517',
    cx: '1406',
    cy: 2107,
    'data-direct-nodes': ['node_0.844993', 'node_0.275278'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.362517',
  },
  {
    id: 'node_0.841841',
    cx: '1528',
    cy: 1846,
    'data-direct-nodes': ['node_0.870289', 'node_0.888666'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.841841',
  },
  {
    id: 'node_0.888666',
    cx: '1406',
    cy: 1846,
    'data-direct-nodes': ['node_0.694604', 'node_0.841841', 'node_0.973137'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.888666',
  },
  {
    id: 'node_0.973137',
    cx: '1406',
    cy: 1772,
    'data-direct-nodes': ['node_0.888666'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.973137',
  },
  {
    id: 'node_0.466744',
    cx: '2491',
    cy: 1840,
    'data-direct-nodes': ['node_0.173597', 'node_0.066782', 'node_0.462711'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.466744',
  },
  {
    id: 'node_0.877376',
    cx: 2617,
    cy: '1980',
    'data-direct-nodes': ['node_0.496116'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.877376',
  },
  {
    id: 'node_0.037817',
    cx: '2617',
    cy: 2105,
    'data-direct-nodes': ['node_0.740987', 'node_0.496116', 'node_0.016556'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.037817',
  },
  {
    id: 'node_0.275278',
    cx: '1528',
    cy: '2107',
    'data-direct-nodes': ['node_0.362517', 'node_0.870289'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.275278',
  },
  {
    id: 'node_0.740987',
    cx: '2491',
    cy: '2105',
    'data-direct-nodes': ['node_0.173597', 'node_0.037817'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.740987',
  },
  {
    id: 'node_0.066782',
    cx: '2617',
    cy: '1840',
    'data-direct-nodes': ['node_0.496116', 'node_0.466744'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.066782',
  },
  {
    id: 'node_0.859558',
    cx: '2844',
    cy: 1913,
    'data-direct-nodes': ['node_0.550939', 'node_0.856542', 'node_0.006664'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.859558',
  },
  {
    id: 'node_0.677221',
    cx: 2007,
    cy: '2440',
    'data-direct-nodes': ['node_0.503802'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.677221',
  },
  {
    id: 'node_0.606699',
    cx: 1209,
    cy: '2205',
    'data-direct-nodes': ['node_0.069864', 'node_0.844993'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.606699',
  },
  {
    id: 'node_0.145795',
    cx: 968,
    cy: '1680',
    'data-direct-nodes': ['node_0.780199'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.145795',
  },
  {
    id: 'node_0.933252',
    cx: 524,
    cy: '1126',
    'data-direct-nodes': ['node_0.807564'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.933252',
  },
  {
    id: 'node_0.006664',
    cx: 3004,
    cy: '1913',
    'data-direct-nodes': [
      'node_0.550939',
      'node_0.130076',
      'node_0.686202',
      'node_0.859558',
    ],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.006664',
  },
  {
    id: 'node_0.350631',
    cx: '1806',
    cy: 1904,
    'data-direct-nodes': ['node_0.705819', 'node_0.563145'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.350631',
  },
  {
    id: 'node_0.097749',
    cx: 3475,
    cy: 734,
    'data-direct-nodes': ['node_0.646228'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.097749',
  },
  {
    id: 'node_0.462711',
    cx: 2395,
    cy: 1814,
    'data-direct-nodes': ['node_0.866073', 'node_0.466744', 'node_0.173597'],
    'data-floor-id': 'levelOneFloor',
    'data-key-id': 'node_0.462711',
  },
]

