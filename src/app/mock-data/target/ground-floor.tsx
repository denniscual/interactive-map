import React from 'react'

export const directions = []

export const stores = {
  'node_0.1523': {
    id: 'node_0.1523',
    label: 'Maternity',
    areaID: 'maternity',
    floorID: 'groundFloor',
  },
  'node_0.2656': {
    id: 'node_0.2656',
    label: 'City Dressing',
    areaID: 'city-dressing',
    floorID: 'groundFloor',
  },
  'node_0.752': {
    id: 'node_0.752',
    label: 'Piping Hot',
    areaID: 'piping-hot',
    floorID: 'groundFloor',
  },
  'node_0.6743': {
    id: 'node_0.6743',
    label: 'Womens Casual Bottoms',
    areaID: 'womens-casual-bottoms',
    floorID: 'groundFloor',
  },
  'node_0.5542': {
    id: 'node_0.5542',
    label: 'Dressess Soft Separates',
    areaID: 'dresses-soft-seperates',
    floorID: 'groundFloor',
  },
  'node_0.8728': {
    id: 'node_0.8728',
    label: 'Womens Shoes',
    areaID: 'womens-shoes',
    floorID: 'groundFloor',
  },
  'node_0.6308': {
    id: 'node_0.6308',
    label: 'Ladies Fashion Accessories',
    areaID: 'ladies-fashion-accessories',
    floorID: 'groundFloor',
  },
  'node_0.7976': {
    id: 'node_0.7976',
    label: 'Personal Care',
    areaID: 'personal-care',
    floorID: 'groundFloor',
  },
  'node_0.9732': {
    id: 'node_0.9732',
    label: 'Ladies Hoisery',
    areaID: 'ladies-hoisery',
    floorID: 'groundFloor',
  },
  'node_0.2256': {
    id: 'node_0.2256',
    label: 'Ladies Briefs',
    areaID: 'ladies-briefs',
    floorID: 'groundFloor',
  },
  'node_0.7293': {
    id: 'node_0.7293',
    label: 'Toiletries',
    areaID: 'toiletries',
    floorID: 'groundFloor',
  },
  'node_0.2241': {
    id: 'node_0.2241',
    label: 'Womens Casual Tops',
    areaID: 'womens-casual-tops',
    floorID: 'groundFloor',
  },
  'node_0.8179': {
    id: 'node_0.8179',
    label: 'Everyday Confectionary',
    areaID: 'everyday-confectionary',
    floorID: 'groundFloor',
  },
  'node_0.6493': {
    id: 'node_0.6493',
    label: 'Ladies Nightwear',
    areaID: 'ladies-nightwear',
    floorID: 'groundFloor',
  },
  'node_0.1236': {
    id: 'node_0.1236',
    label: 'Bras',
    areaID: 'bras',
    floorID: 'groundFloor',
  },
  'node_0.2385': {
    id: 'node_0.2385',
    label: 'Lingerie',
    areaID: 'lingerie-co-ordinates',
    floorID: 'groundFloor',
  },
  'node_0.1019': {
    id: 'node_0.1019',
    label: 'Cosmetics',
    areaID: 'cosmetics',
    floorID: 'groundFloor',
  },
  'node_0.4826': {
    id: 'node_0.4826',
    label: 'Womens Activewear',
    areaID: 'womens-activewear',
    floorID: 'groundFloor',
  },
  'withered-pond_Bourke': {
    id: 'withered-pond_Bourke',
    label: 'Device location withered pond',
    areaID: 'withered-pond_Bourke',
    floorID: 'groundFloor',
  },
  'silent-lake_Target': {
    id: 'silent-lake_Target',
    label: 'Device location silent-lake_Target',
    areaID: '',
    floorID: 'groundFloor',
  },
  'node_0.2561': {
    id: 'node_0.2561',
    label: 'Ladies Swimwear',
    areaID: 'ladies-swimwear',
    floorID: 'groundFloor',
  },
  'node_escalators-to-ground-level': {
    id: 'node_escalators-to-ground-level',
    label: 'EscalatorsGroundLevel',
    areaID: 'escalators-ground-level',
    floorID: 'groundFloor',
  },
  'still-resonance_Ground': {
    id: 'still-resonance_Ground',
    label: 'Device location still resonance Ground',
    areaID: '',
    floorID: 'groundFloor',
  },
  'node_0.4726': {
    id: 'node_0.4726',
    label: 'Ground Floor Books',
    areaID: 'books-1',
    floorID: 'groundFloor',
  },
}

export const portals = {
  'node_elevator-2': {
    id: 'node_elevator-2',
    label: 'Lift 2',
    areaID: 'elevator_1',
  },
  'node_escalator-to-basement': {
    id: 'node_escalator-to-basement',
    label: 'Escalator (to Basement)',
    areaID: 'escalator-basement',
  },
  'node_escalator-to-ground-level': {
    id: 'node_escalator-to-ground-level',
    label: 'Escalator 1 (to Ground level)',
    areaID: 'escalator-1-ground-level',
  },
  'node_escalator-to-level-one': {
    id: 'node_escalator-to-level-one',
    label: 'Escalator (to Level one)',
    areaID: 'escalator-level-one',
  },
  'node_elevator-1': {
    id: 'node_elevator-1',
    label: 'Lift',
    areaID: 'elevator-1',
  },
  'node_escalator-to-ground-level-2': {
    id: 'node_escalator-to-ground-level-2',
    label: 'Escalator 2 (to Ground level)',
    areaID: 'escalator-2-ground-level',
  },
}

export const nodes = (
  <g id="nodes">
    <circle
      cx={2498}
      cy={713}
      data-area-id="maternity"
      data-area-type="store"
      data-direct-nodes={['node_0.3579']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1523"
      data-label="Maternity"
      fill="red"
      id="node_0.1523"
      r="15"
    />
    <circle
      cx={2866}
      cy={884}
      data-area-id="city-dressing"
      data-area-type="store"
      data-direct-nodes={['node_0.3839']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2656"
      data-label="City Dressing"
      fill="red"
      id="node_0.2656"
      r="15"
    />
    <circle
      cx={2760}
      cy={979}
      data-area-id="piping-hot"
      data-area-type="store"
      data-direct-nodes={['node_0.3839']}
      data-floor-id="groundFloor"
      data-key-id="node_0.752"
      data-label="Piping Hot"
      fill="red"
      id="node_0.752"
      r="15"
    />
    <circle
      cx={2399}
      cy={1332}
      data-area-id="womens-casual-bottoms"
      data-area-type="store"
      data-direct-nodes={['node_0.2775']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6743"
      data-label="Womens Casual Bottoms"
      fill="red"
      id="node_0.6743"
      r="15"
    />
    <circle
      cx={1459}
      cy={1616}
      data-area-id="dresses-soft-seperates"
      data-area-type="store"
      data-direct-nodes={['node_0.439']}
      data-floor-id="groundFloor"
      data-key-id="node_0.5542"
      data-label="Dressess Soft Separates"
      fill="red"
      id="node_0.5542"
      r="15"
    />
    <circle
      cx={1611}
      cy={1365}
      data-area-id="womens-shoes"
      data-area-type="store"
      data-direct-nodes={['node_0.5262']}
      data-floor-id="groundFloor"
      data-key-id="node_0.8728"
      data-label="Womens Shoes"
      fill="red"
      id="node_0.8728"
      r="15"
    />
    <circle
      cx={1559}
      cy={853}
      data-area-id="ladies-fashion-accessories"
      data-area-type="store"
      data-direct-nodes={['node_0.2166']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6308"
      data-label="Ladies Fashion Accessories"
      fill="red"
      id="node_0.6308"
      r="15"
    />
    <circle
      cx={1307}
      cy={717}
      data-area-id="personal-care"
      data-area-type="store"
      data-direct-nodes={['node_0.0035']}
      data-floor-id="groundFloor"
      data-key-id="node_0.7976"
      data-label="Personal Care"
      fill="red"
      id="node_0.7976"
      r="15"
    />
    <circle
      cx={1150}
      cy={778}
      data-area-id="ladies-hoisery"
      data-area-type="store"
      data-direct-nodes={['node_0.6634']}
      data-floor-id="groundFloor"
      data-key-id="node_0.9732"
      data-label="Ladies Hoisery"
      fill="red"
      id="node_0.9732"
      r="15"
    />
    <circle
      cx={1077}
      cy={1070}
      data-area-id="ladies-briefs"
      data-area-type="store"
      data-direct-nodes={['node_0.6198']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2256"
      data-label="Ladies Briefs"
      fill="red"
      id="node_0.2256"
      r="15"
    />
    <circle
      cx={1992}
      cy={679}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.7293', 'node_elevator-1', 'node_0.4801']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3416"
      data-label=""
      fill="red"
      id="node_0.3416"
      r="15"
    />
    <circle
      cx={2044}
      cy={833}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.4801', 'node_0.769', 'node_0.3301']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1643"
      data-label=""
      fill="red"
      id="node_0.1643"
      r="15"
    />
    <circle
      cx={1417}
      cy={1794}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.439', 'node_0.3635']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6138"
      data-label=""
      fill="red"
      id="node_0.6138"
      r="15"
    />
    <circle
      cx={1696}
      cy={1510}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.5262',
        'node_0.2561',
        'node_0.439',
        'node_0.8272',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.4066"
      data-label=""
      fill="red"
      id="node_0.4066"
      r="15"
    />
    <circle
      cx={1527}
      cy={1674}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.5542',
        'node_0.6138',
        'node_0.4066',
        'node_0.4826',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.439"
      data-label=""
      fill="red"
      id="node_0.439"
      r="15"
    />
    <circle
      cx={1143}
      cy={1763}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.1876',
        'node_0.5791',
        'node_0.6963',
        'silent-lake_Target',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.982557"
      data-label=""
      fill="red"
      id="node_0.982557"
      r="15"
    />
    <circle
      cx={793}
      cy={1839}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.9531', 'node_0.6493']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2927"
      data-label=""
      fill="red"
      id="node_0.2927"
      r="15"
    />
    <circle
      cx={1143}
      cy={882}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.6198', 'node_0.6634']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1623"
      data-label=""
      fill="red"
      id="node_0.1623"
      r="15"
    />
    <circle
      cx={1192}
      cy={832}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1623', 'node_0.9732', 'node_0.1722']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6634"
      data-label=""
      fill="red"
      id="node_0.6634"
      r="15"
    />
    <circle
      cx={1259}
      cy={786}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.6634', 'node_0.0035']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1722"
      data-label=""
      fill="red"
      id="node_0.1722"
      r="15"
    />
    <circle
      cx={2801}
      cy={931}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.2656',
        'node_0.8367',
        'node_0.752',
        'node_0.5171',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.3839"
      data-label=""
      fill="red"
      id="node_0.3839"
      r="15"
    />
    <circle
      cx={3064}
      cy={1202}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.3839', 'node_0.7859']}
      data-floor-id="groundFloor"
      data-key-id="node_0.5171"
      data-label=""
      fill="red"
      id="node_0.5171"
      r="15"
    />
    <circle
      cx={3470}
      cy={1269}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.6065', 'node_0.4726']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3044"
      data-label=""
      fill="red"
      id="node_0.3044"
      r="15"
    />
    <circle
      cx={1941}
      cy="679"
      data-area-id="toiletries"
      data-area-type="store"
      data-direct-nodes={['node_0.3416']}
      data-floor-id="groundFloor"
      data-key-id="node_0.7293"
      data-label="Toiletries"
      fill="red"
      id="node_0.7293"
      r="15"
    />
    <circle
      cx={1698}
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.4801', 'node_0.2166', 'node_0.1019']}
      data-floor-id="groundFloor"
      data-key-id="node_0.7218"
      data-label=""
      fill="red"
      id="node_0.7218"
      r="15"
    />
    <circle
      cx={1559}
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.0035', 'node_0.6308', 'node_0.7218']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2166"
      data-label=""
      fill="red"
      id="node_0.2166"
      r="15"
    />
    <circle
      cx={2660}
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.3579', 'node_0.3839']}
      data-floor-id="groundFloor"
      data-key-id="node_0.8367"
      data-label=""
      fill="red"
      id="node_0.8367"
      r="15"
    />
    <circle
      cx="2498"
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1523', 'node_0.8367', 'node_0.3301']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3579"
      data-label=""
      fill="red"
      id="node_0.3579"
      r="15"
    />
    <circle
      cx="2044"
      cy={1414}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1643', 'node_0.7898', 'node_0.9061']}
      data-floor-id="groundFloor"
      data-key-id="node_0.769"
      data-label=""
      fill="red"
      id="node_0.769"
      r="15"
    />
    <circle
      cx={1976}
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_escalator-to-level-one',
        'node_0.769',
        'node_0.1146',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.7898"
      data-label=""
      fill="red"
      id="node_0.7898"
      r="15"
    />
    <circle
      cx={2680}
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.7859', 'node_0.2241', 'node_0.2775']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6395"
      data-label=""
      fill="red"
      id="node_0.6395"
      r="15"
    />
    <circle
      cx="2399"
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.6395', 'node_0.6743', 'node_0.9061']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2775"
      data-label=""
      fill="red"
      id="node_0.2775"
      r="15"
    />
    <circle
      cx="2680"
      cy={1494}
      data-area-id="womens-casual-tops"
      data-area-type="store"
      data-direct-nodes={['node_0.6395']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2241"
      data-label="Womens Casual Tops"
      fill="red"
      id="node_0.2241"
      r="15"
    />
    <circle
      cx={3348}
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.7859',
        'node_0.9527',
        'node_0.6065',
        'node_0.8179',
        'withered-pond_Bourke',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.4562"
      data-label=""
      fill="red"
      id="node_0.4562"
      r="15"
    />
    <circle
      cx="3064"
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.5171',
        'node_0.4562',
        'node_0.6395',
        'node_0.9527',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.7859"
      data-label=""
      fill="red"
      id="node_0.7859"
      r="15"
    />
    <circle
      cx="3348"
      cy="1462"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.4562',
        'node_0.6065',
        'withered-pond_Bourke',
        'node_0.7859',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.9527"
      data-label=""
      fill="red"
      id="node_0.9527"
      r="15"
    />
    <circle
      cx={3541}
      cy="1462"
      data-area-id="everyday-confectionary"
      data-area-type="store"
      data-direct-nodes={['node_0.6065', 'node_0.4562']}
      data-floor-id="groundFloor"
      data-key-id="node_0.8179"
      data-label="Everyday Confectionary"
      fill="red"
      id="node_0.8179"
      r="15"
    />
    <circle
      cx="3470"
      cy={1462}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.9527',
        'node_0.8179',
        'node_0.3044',
        'withered-pond_Bourke',
        'node_0.4562',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.6065"
      data-label=""
      fill="red"
      id="node_0.6065"
      r="15"
    />
    <circle
      cx="1714"
      cy={1414}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_escalator-to-basement',
        'node_0.8728',
        'node_0.4066',
        'node_0.8272',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.5262"
      data-label=""
      fill="red"
      id="node_0.5262"
      r="15"
    />
    <circle
      cx={1353}
      cy="1840"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.6138', 'node_0.9072']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3635"
      data-label=""
      fill="red"
      id="node_0.3635"
      r="15"
    />
    <circle
      cx="1143"
      cy={1499}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.982557', 'node_0.1236', 'node_0.0444']}
      data-floor-id="groundFloor"
      data-key-id="node_0.5791"
      data-label=""
      fill="red"
      id="node_0.5791"
      r="15"
    />
    <circle
      cx="1143"
      cy={1309}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.2385', 'node_0.5791', 'node_0.6198']}
      data-floor-id="groundFloor"
      data-key-id="node_0.0444"
      data-label=""
      fill="red"
      id="node_0.0444"
      r="15"
    />
    <circle
      cx="793"
      cy="1763"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.2927', 'node_0.6963']}
      data-floor-id="groundFloor"
      data-key-id="node_0.9531"
      data-label=""
      fill="red"
      id="node_0.9531"
      r="15"
    />
    <circle
      cx={705}
      cy="1839"
      data-area-id="ladies-nightwear"
      data-area-type="store"
      data-direct-nodes={['node_0.2927']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6493"
      data-label="Ladies Nightwear"
      fill="red"
      id="node_0.6493"
      r="15"
    />
    <circle
      cx={1073}
      cy="1499"
      data-area-id="bras"
      data-area-type="store"
      data-direct-nodes={['node_0.5791']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1236"
      data-label="Bras"
      fill="red"
      id="node_0.1236"
      r="15"
    />
    <circle
      cx={1075}
      cy="1309"
      data-area-id="lingerie-co-ordinates"
      data-area-type="store"
      data-direct-nodes={['node_0.0444']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2385"
      data-label="Lingerie"
      fill="red"
      id="node_0.2385"
      r="15"
    />
    <circle
      cx="1143"
      cy="1070"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.0444', 'node_0.2256', 'node_0.1623']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6198"
      data-label=""
      fill="red"
      id="node_0.6198"
      r="15"
    />
    <circle
      cx="1307"
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1722', 'node_0.7976', 'node_0.2166']}
      data-floor-id="groundFloor"
      data-key-id="node_0.0035"
      data-label=""
      fill="red"
      id="node_0.0035"
      r="15"
    />
    <circle
      cx="1698"
      cy={719}
      data-area-id="cosmetics"
      data-area-type="store"
      data-direct-nodes={['node_0.7218']}
      data-floor-id="groundFloor"
      data-key-id="node_0.1019"
      data-label="Cosmetics"
      fill="red"
      id="node_0.1019"
      r="15"
    />
    <circle
      cx={1783}
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_escalator-to-ground-level',
        'node_0.5262',
        'node_0.1146',
        'node_0.4066',
        'node_escalators-to-ground-level',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.8272"
      data-label=""
      fill="red"
      id="node_0.8272"
      r="15"
    />
    <circle
      cx="2044"
      cy="786"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1643', 'node_0.4801', 'node_0.3579']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3301"
      data-label=""
      fill="red"
      id="node_0.3301"
      r="15"
    />
    <circle
      cx="1992"
      cy={786}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.3416',
        'node_0.1643',
        'node_0.7218',
        'node_0.3301',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.4801"
      data-label=""
      fill="red"
      id="node_0.4801"
      r="15"
    />
    <circle
      cx="2115"
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_escalator-to-ground-level-2',
        'node_0.2775',
        'node_0.769',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.9061"
      data-label=""
      fill="red"
      id="node_0.9061"
      r="15"
    />
    <circle
      cx="927"
      cy={1979}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_elevator-2', 'node_0.0349']}
      data-floor-id="groundFloor"
      data-key-id="node_0.5411"
      data-label=""
      fill="red"
      id="node_0.5411"
      r="15"
    />
    <circle
      cx="1143"
      cy="1979"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.0349', 'silent-lake_Target', 'node_0.1876']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2826"
      data-label=""
      fill="red"
      id="node_0.2826"
      r="15"
    />
    <circle
      cx={1601}
      cy={1740}
      data-area-id="womens-activewear"
      data-area-type="store"
      data-direct-nodes={['node_0.439']}
      data-floor-id="groundFloor"
      data-key-id="node_0.4826"
      data-label="Womens Activewear"
      fill="red"
      id="node_0.4826"
      r="15"
    />
    <circle
      cx="3470"
      cy={1536}
      data-area-id="withered-pond_Bourke"
      data-area-type="store"
      data-direct-nodes={['node_0.6065', 'node_0.4562', 'node_0.9527']}
      data-floor-id="groundFloor"
      data-key-id="node_0.8411"
      data-label="Device location withered pond"
      fill="red"
      id="withered-pond_Bourke"
      r="15"
    />
    <circle
      cx="1879"
      cy="1414"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.7898',
        'still-resonance_Ground',
        'node_0.8272',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.1146"
      data-label=""
      fill="red"
      id="node_0.1146"
      r="15"
    />
    <circle
      cx={1177}
      cy={1934}
      data-area-id=""
      data-area-type="store"
      data-direct-nodes={[
        'node_0.1876',
        'node_0.9072',
        'node_0.2826',
        'node_0.0349',
        'node_0.982557',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.1951"
      data-label="Device location silent-lake_Target"
      fill="red"
      id="silent-lake_Target"
      r="15"
    />
    <circle
      cx="1033"
      cy="1763"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.982557',
        'node_0.9531',
        'node_0.0349',
        'node_0.1876',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.6963"
      data-label=""
      fill="red"
      id="node_0.6963"
      r="15"
    />
    <circle
      cx="1033"
      cy="1979"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.2826',
        'node_0.5411',
        'node_0.6963',
        'node_0.1876',
        'silent-lake_Target',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.0349"
      data-label=""
      fill="red"
      id="node_0.0349"
      r="15"
    />
    <circle
      cx="1143"
      cy={1840}
      data-area-id=""
      data-area-type=""
      data-direct-nodes={[
        'node_0.982557',
        'node_0.0349',
        'silent-lake_Target',
        'node_0.2826',
        'node_0.6963',
        'node_0.9072',
      ]}
      data-floor-id="groundFloor"
      data-key-id="node_0.1876"
      data-label=""
      fill="red"
      id="node_0.1876"
      r="15"
    />
    <circle
      cx="1177"
      cy="1840"
      data-area-id=""
      data-area-type=""
      data-direct-nodes={['node_0.1876', 'silent-lake_Target', 'node_0.3635']}
      data-floor-id="groundFloor"
      data-key-id="node_0.9072"
      data-label=""
      fill="red"
      id="node_0.9072"
      r="15"
    />
    <circle
      cx={1771}
      cy={1568}
      data-area-id="ladies-swimwear"
      data-area-type="store"
      data-direct-nodes={['node_0.4066']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2561"
      data-label="Ladies Swimwear"
      fill="red"
      id="node_0.2561"
      r="15"
    />
    <circle
      cx={927}
      cy="1925"
      data-area-id="elevator_1"
      data-area-type="portal"
      data-direct-nodes={['node_0.5411']}
      data-floor-id="groundFloor"
      data-key-id="node_0.0016"
      data-label="Lift 2"
      fill="red"
      id="node_elevator-2"
      r="15"
    />
    <circle
      cx={1714}
      cy="1354"
      data-area-id="escalator-basement"
      data-area-type="portal"
      data-direct-nodes={['node_0.5262']}
      data-floor-id="groundFloor"
      data-key-id="node_0.9099"
      data-label=" Escalator (to Basement)"
      fill="red"
      id="node_escalator-to-basement"
      r="15"
    />
    <circle
      cx={1783}
      cy="1354"
      data-area-id="escalator-1-ground-level"
      data-area-type="portal"
      data-direct-nodes={['node_0.8272']}
      data-floor-id="groundFloor"
      data-key-id="node_0.2165"
      data-label="Escalator 1 (to Ground level)"
      fill="red"
      id="node_escalator-to-ground-level"
      r="15"
    />
    <circle
      cx="1783"
      cy="1354"
      data-area-id="escalators-ground-level"
      data-area-type="store"
      data-direct-nodes={['node_0.8272']}
      data-floor-id="groundFloor"
      data-key-id="node_0.406284"
      data-label="EscalatorsGroundLevel"
      fill="red"
      id="node_escalators-to-ground-level"
      r="15"
    />
    <circle
      cx="1879"
      cy="1354"
      data-area-id=""
      data-area-type="store"
      data-direct-nodes={['node_0.1146']}
      data-floor-id="groundFloor"
      data-key-id="node_0.6455"
      data-label="Device location still resonance Ground"
      fill="red"
      id="still-resonance_Ground"
      r="15"
    />
    <circle
      cx="1976"
      cy="1365"
      data-area-id="escalator-level-one"
      data-area-type="portal"
      data-direct-nodes={['node_0.7898']}
      data-floor-id="groundFloor"
      data-key-id="node_0.8626"
      data-label="Escalator (to Level one)"
      fill="red"
      id="node_escalator-to-level-one"
      r="15"
    />
    <circle
      cx="1992"
      cy="481"
      data-area-id="elevator-1"
      data-area-type="portal"
      data-direct-nodes={['node_0.3416']}
      data-floor-id="groundFloor"
      data-key-id="node_0.0244"
      data-label="Lift"
      fill="red"
      id="node_elevator-1"
      r="15"
    />
    <circle
      cx={3550}
      cy="1269"
      data-area-id="books-1"
      data-area-type="store"
      data-direct-nodes={['node_0.3044']}
      data-floor-id="groundFloor"
      data-key-id="node_0.4726"
      data-label="Ground Floor Books"
      fill="red"
      id="node_0.4726"
      r="15"
    />
    <circle
      cx={2115}
      cy="1265"
      data-area-id="escalator-2-ground-level"
      data-area-type="portal"
      data-direct-nodes={['node_0.9061']}
      data-floor-id="groundFloor"
      data-key-id="node_0.3757"
      data-label="Escalator 2 (to Ground level)"
      fill="red"
      id="node_escalator-to-ground-level-2"
      r="15"
    />
  </g>
)
