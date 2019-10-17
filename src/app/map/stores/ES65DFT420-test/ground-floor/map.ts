export default `
<svg 
xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 4000 3000"
>
<g id="map-area"
>
  <polygon
    id="ground-floor-walkable"
className="walkable-area"
    points="3116.11 861.69 2861.15 606.73 2503.65 606.73 2351.68 453.24 2351.68 414.97 2299.69 414.97 2299.69 437.62 2257.76 437.62 2257.76 540.03 2113.9 540.03 2113.9 312.82 1927.66 313.04 1927.66 313.04 1496.11 313.04 1496.11 513.74 1298.61 513.74 1298.61 490.14 1115.36 489.94 601.56 1003.74 601.91 1220.59 627.01 1220.59 627.01 1293.99 600.06 1293.99 600.06 1614.49 555.46 1614.49 555.46 1700.89 484.86 1700.89 484.86 1803.09 522.96 1803.09 522.96 1888.09 592.16 1888.09 604.71 1900.64 604.71 1972.14 667.91 2035.34 824.76 2140.31 868.52 2190.51 1172.92 2190.51 1322.67 2040.72 1767.39 2040.72 2150.85 1662.55 2791.72 1662.55 2791.72 1827.01 3266.98 1827.01 3266.98 1632.72 3686.83 1632.72 3686.83 1587.66 3756.15 1587.66 3756.15 937.7 3116.11 937.7 3116.11 861.69"
  />
  <polygon
    id="services"
    className="store-area"
    points="824.76 2140.31 924.3 2040.72 1199.47 2040.72 1322.67 2040.72 1172.92 2190.51 868.52 2190.51 824.76 2140.31"
  />
  <polygon
    id="services-2"
    data-name="services"
    className="store-area"
    points="3756.15 937.7 3427.84 937.7 3427.84 1543.13 3399.78 1543.13 3399.78 1632.72 3686.83 1632.72 3686.83 1587.66 3756.15 1587.66 3756.15 937.7"
  />
  <polygon
    id="services-3"
    data-name="services"
    className="store-area"
    points="1496.11 513.74 1496.11 313.04 1927.66 313.04 1927.66 513.74 1954.91 513.74 1954.91 747.24 1796.21 747.24 1796.21 513.74 1496.11 513.74"
  />
  <polygon
    className="store-area"
    points="2351.68 737.87 2030.11 737.87 2030.11 515.59 2114.67 515.59 2114.67 540.03 2257.76 540.03 2257.76 437.62 2299.69 437.62 2299.69 414.97 2351.68 414.97 2351.68 453.24 2503.65 606.73 2503.65 646.24 2431.96 646.62 2431.96 630.8 2351.68 630.8 2351.68 737.87"
  />
  <polygon
    className="store-area"
    points="2169.46 1067.52 2169.46 830.13 2590.84 830.13 2590.84 994.66 2486.31 994.66 2486.31 1019.53 2325 1019.53 2325 1001.25 2237.76 1001.25 2237.76 1067.52 2169.46 1067.52"
  />
  <g id="wayfinder-groundFloor" />
  <g id="portals">
    <g
      id="escalator-basement"
      className="area portal-area"
      data-label="Escalator (to Basement)"
      data-child="escalator-basement-child"
    >
    <g id="escalator-basement-child" className="area" data-name="escalator-up">
      <rect x="1678.78" y="964.47" width="70.41" height="400.05" />
        <g>
          <polyline
            className="portal-area-line-bold"
            points="1693.88 1345.53 1713.98 1325.43 1734.08 1345.53"
          />
          <polyline
            className="portal-area-line-bold"
            points="1693.88 1301.87 1713.98 1281.77 1734.08 1301.87"
          />
          <polyline
            className="portal-area-line-bold"
            points="1693.88 1258.21 1713.98 1238.11 1734.08 1258.21"
          />
        </g>
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1115.72"
          x2="1693.88"
          y2="1115.72"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1175.37"
          x2="1693.88"
          y2="1175.37"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1145.55"
          x2="1693.88"
          y2="1145.55"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1205.2"
          x2="1693.88"
          y2="1205.2"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1085.9"
          x2="1693.88"
          y2="1085.9"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1056.08"
          x2="1693.88"
          y2="1056.08"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="1026.25"
          x2="1693.88"
          y2="1026.25"
        />
        <line
          className="portal-area-line-bold"
          x1="1734.08"
          y1="996.43"
          x2="1693.88"
          y2="996.43"
        />
      </g>
    </g>
    <g
      id="escalator-level-one"
      className="area portal-area"
      data-label="Escalator (to Level one)"
      data-child="escalator-level-one-child"
    >
    <g id="escalator-level-one-child" className="area">
        <rect x="1940.81" y="976.81" width="70.41" height="400.05" />
        <g>
          <polyline
            className="portal-area-line-bold"
            points="1955.92 1357.87 1976.02 1337.77 1996.12 1357.87"
          />
          <polyline
            className="portal-area-line-bold"
            points="1955.92 1314.21 1976.02 1294.11 1996.12 1314.21"
          />
          <polyline
            className="portal-area-line-bold"
            points="1955.92 1270.55 1976.02 1250.45 1996.12 1270.55"
          />
        </g>
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1128.07"
          x2="1955.92"
          y2="1128.07"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1187.71"
          x2="1955.92"
          y2="1187.71"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1157.89"
          x2="1955.92"
          y2="1157.89"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1217.54"
          x2="1955.92"
          y2="1217.54"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1098.24"
          x2="1955.92"
          y2="1098.24"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1068.42"
          x2="1955.92"
          y2="1068.42"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1038.59"
          x2="1955.92"
          y2="1038.59"
        />
        <line
          className="portal-area-line-bold"
          x1="1996.12"
          y1="1008.77"
          x2="1955.92"
          y2="1008.77"
        />
      </g>
    </g>
    <g
      id="escalators-ground-level"
      className="area portal-area"
      data-label="Escalators (to Ground level)"
      data-child="escalator-2-ground-level escalator-1-ground-level"
    >
      <g id="escalator-2-ground-level" className="area">
        <rect
          x="2080.44"
          y="876.71"
          width="70.41"
          height="400.05"
          transform="translate(4231.29 2153.48) rotate(180)"
        />
        <g>
          <polyline
            className="portal-area-line-bold"
            points="2135.74 895.7 2115.64 915.8 2095.54 895.7"
          />
          <polyline
            className="portal-area-line-bold"
            points="2135.74 939.37 2115.64 959.47 2095.54 939.37"
          />
          <polyline
            className="portal-area-line-bold"
            points="2135.74 983.03 2115.64 1003.13 2095.54 983.03"
          />
        </g>
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1125.51"
          x2="2135.74"
          y2="1125.51"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1065.86"
          x2="2135.74"
          y2="1065.86"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1095.69"
          x2="2135.74"
          y2="1095.69"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1036.04"
          x2="2135.74"
          y2="1036.04"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1155.33"
          x2="2135.74"
          y2="1155.33"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1185.16"
          x2="2135.74"
          y2="1185.16"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1214.98"
          x2="2135.74"
          y2="1214.98"
        />
        <line
          className="portal-area-line-bold"
          x1="2095.54"
          y1="1244.8"
          x2="2135.74"
          y2="1244.8"
        />
      </g>
      <g id="escalator-1-ground-level" className="area">
        <rect
          x="1749.18"
          y="964.47"
          width="70.41"
          height="400.05"
          transform="translate(3568.78 2328.99) rotate(180)"
        />
        <g>
          <polyline
            className="portal-area-line-bold"
            points="1804.49 983.45 1784.39 1003.55 1764.29 983.45"
          />
          <polyline
            className="portal-area-line-bold"
            points="1804.49 1027.12 1784.39 1047.22 1764.29 1027.12"
          />
          <polyline
            className="portal-area-line-bold"
            points="1804.49 1070.78 1784.39 1090.88 1764.29 1070.78"
          />
        </g>
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1213.26"
          x2="1804.49"
          y2="1213.26"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1153.61"
          x2="1804.49"
          y2="1153.61"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1183.44"
          x2="1804.49"
          y2="1183.44"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1123.79"
          x2="1804.49"
          y2="1123.79"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1243.08"
          x2="1804.49"
          y2="1243.08"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1272.91"
          x2="1804.49"
          y2="1272.91"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1302.73"
          x2="1804.49"
          y2="1302.73"
        />
        <line
          className="portal-area-line-bold"
          x1="1764.29"
          y1="1332.56"
          x2="1804.49"
          y2="1332.56"
        />
      </g>
    </g>
    <g
      id="elevator-1"
      className="area portal-area"
      data-label="Lift"
      data-child="elevator-1 elevator-2"
    >
      <g id="elevator-1" className="area">
        <rect x="1976.32" y="333.82" width="117.02" height="157.9" />
        <rect x="1944.45" y="333.82" width="31.93" height="157.9" />
        <polyline
          className="portal-area-line-bold"
          points="2057.4 422.77 2037.35 442.93 2017.2 422.77"
        />
        <polyline
          className="portal-area-line-bold"
          points="2017.2 392.82 2037.35 372.68 2057.4 392.82"
        />
      </g>
      <g id="elevator-2" className="area">
        <rect x="873.82" y="1780.32" width="117.02" height="157.9" />
        <rect x="841.9" y="1780.32" width="31.93" height="157.9" />
        <polyline
          className="portal-area-line-bold"
          points="954.9 1869.28 934.85 1889.42 914.7 1869.28"
        />
        <polyline
          className="portal-area-line-bold"
          points="914.7 1839.33 934.85 1819.17 954.9 1839.33"
        />
      </g>
    </g>
  </g>
  <g id="stores">
    <polygon
      className="store-area"
      points="3036.43 1301.95 3036.43 1216.15 2834.94 1014.66 2639.57 1014.66 2639.57 941.42 2762.27 941.42 2651.03 830.13 2588.43 830.13 2588.43 994.66 2603.52 994.66 2603.52 1058.68 2588.43 1058.68 2588.43 1362.35 3036.43 1362.35 3036.43 1301.95"
    />
    <g
      id="womens-casual-bottoms"
      className="area store-area"
      data-label="Womens Casual Bottoms"
data-categories="W95138 W146214 W150505 W1084581 W95345 W95339 W1036554 W146220"
data-department-desc="WMS CASUAL BOTTOMS"
    >
      <polygon
        points="1841.82 1086.38 1841.82 1364.26 1917.51 1364.26 1917.51 1186.22 1896.18 1186.22 1896.18 1086.38 1841.82 1086.38"
      />
      <polygon
        points="2237.76 1067.52 2237.76 1362.35 2590.84 1362.35 2590.84 1058.68 2603.52 1058.68 2603.52 994.66 2590.84 994.66 2486.31 994.66 2486.31 1019.53 2325 1019.53 2325 1001.25 2237.76 1001.25 2237.76 1067.52"
      />
    </g>
    <polygon
      id="womens-casual-tops"
      className="area store-area"
      data-label="Womens Casual Tops"
      data-categories="W95136 W1084659 W917427 W95329 W95324 W95327"
      data-department-desc="WMS CASUAL TOPS"
      points="3120.26 1467.07 3266.98 1613.88 3266.98 1827.01 2791.72 1827.01 2791.72 1662.55 2150.85 1662.55 2150.85 1634.95 2121.9 1634.95 2121.9 1467.07 3120.26 1467.07"
    />
    <path
      id="womens-shoes"
      className="area store-area"
      data-label="Womens Shoes"
      data-categories="W95380 W95394 W95384 W95392 W95386 W357983 W95396 W95388 W95390 W95390 W95382"
      data-department-desc="WOMENS SHOES"
      d="M1200.13,1007.39h388.63c0,35.63,32.86,64.55,68.53,64.55h0v229.45h-17.48v91.83H1185.46V997.46h14.67v9.93Z"
    />
    <polygon
      id="cosmetics"
      className="area store-area"
      data-label="Cosmetics"
      data-categories="W307319"
      data-department-desc="COSMETICS"
      points="1220.01 490.14 1298.61 490.14 1298.61 513.74 1796.21 513.74 1796.21 747.24 1610.81 747.24 1610.91 728.24 1610.91 547.29 1220.01 547.29 1220.01 490.14"
    />
    <rect
      id="personal-care"
      className="area store-area"
      data-label="Personal Care"
data-categories="W298361 W317576 W304863 W304869 W304826 W304862 W304867 W1113527 W1113527 W1113531 W1171451 W1171458 W317594 W1109132 W1109134 W317596"
      data-department-desc="PERSONAL CARE"
      x="1220.01"
      y="547.29"
      width="169.8"
      height="199.9"
    />
    <polygon
      id="piping-hot"
      className="area store-area"
      data-label="Piping Hot"
      points="2762.27 941.42 2639.57 941.42 2639.57 1014.66 2834.94 1014.66 2762.27 941.42"
    />
    <polygon
      id="city-dressing"
      className="area store-area"
      data-label="City Dressing"
      data-categories="W698363 W698372 W698380 W698366 W897309 W698383 W698376"
        data-department-desc="CITY DRESSING"
      points="3098.02 1346 3427.84 1346 3427.84 937.7 3116.11 937.7 3116.11 861.69 2861.15 606.73 2503.65 606.73 2503.65 646.62 2668.87 646.62 2668.87 736.35 2681.69 749.17 2764.3 666.55 2813.44 715.69 2730.83 798.3 3098.02 1165.83 3098.02 1346"
    />
    <polygon
      id="maternity"
      className="area store-area"
      data-label="Maternity"
data-categories="W93764 W93774 W93773 W181170 W93772 W554161"
      points="2668.87 646.62 2431.96 646.62 2431.96 630.8 2351.68 630.8 2351.68 737.87 2668.87 737.87 2668.87 646.62"
    />
    <path
      id="ladies-fashion-accessories"
      className="area store-area"
      data-label="Ladies Fashion Accessories"
data-categories="W95362 W95364 W95373 W95375 W95369 W385147 W95377 W95371 W1293389 W1293389 W454881 W95379 W249208 W1122436"
      data-department-desc="LADIES FASHION ACCESSORIES"
      d="M1200.13,1007.39h-14.67V893.58l68.39-68.39H1939V942.85H1653.31a64.54,64.54,0,0,0-64.55,64.54H1200.13Z"
    />
    <polygon
      id="ladies-nightwear"
      className="area store-area"
      data-label="Ladies Nightwear"
      data-categories="W133889 W133894 W133912 W133898"
      points="893.01 1519.74 704.61 1519.74 704.61 1591.04 600.06 1591.04 600.06 1614.49 555.46 1614.49 555.46 1700.89 484.86 1700.89 484.86 1803.09 522.96 1803.09 522.96 1888.09 592.16 1888.09 604.71 1900.64 604.71 1972.14 667.91 2035.34 688.26 2014.89 653.51 1980.04 704.11 1929.44 735.71 1960.99 735.71 1727.84 1103.61 1727.84 1103.61 1591.04 893.01 1591.04 893.01 1519.74"
    />
    <polygon
      id="bras"
      className="area store-area"
      data-label="Bras"
      data-department-desc="BRAS"
      points="1020.01 1411.94 1020.01 1315.74 982.76 1315.74 953.11 1315.74 953.11 1258.64 887.16 1258.64 887.16 1207.59 998.61 1207.59 998.61 1124.89 653.96 1124.89 653.96 1004.09 601.91 1004.09 601.91 1220.59 627.01 1220.59 627.01 1293.99 600.06 1293.99 600.06 1591.04 704.61 1591.04 704.61 1519.74 893.01 1519.74 893.01 1591.04 1103.61 1591.04 1103.61 1411.94 1020.01 1411.94"
    />
    <polygon
      id="ladies-swimwear"
      className="area store-area"
      data-label="Ladies Swimwear"
data-categories="W95397 W95399 W95407 W95411 W1273445"
      data-department-desc="LADIES SWIMWEAR"
      points="2150.85 1634.95 2121.9 1634.95 2121.9 1467.07 1831.11 1467.07 1686.07 1612.11 1684.87 1613.31 1882.71 1811.1 1897.18 1796.62 1918.34 1817.83 1988.02 1748.15 2023.65 1783.78 2150.85 1656.63 2150.85 1634.95"
    />
    <polygon
      id="lingerie-co-ordinates"
      className="area store-area"
      data-label="Lingerie"
      data-department-desc="LINGERIE CO-ORDINATES"
      points="908.41 1207.59 1103.61 1207.59 1103.61 1411.94 1020.01 1411.94 1020.01 1315.74 982.76 1315.74 953.11 1315.74 953.11 1258.64 887.16 1258.64 887.16 1207.59 908.41 1207.59"
    />
    <polygon
      id="ladies-briefs"
      className="area store-area"
      data-label="Ladies Briefs"
data-categories="W915559 W916470 W916446 W702017 W378043 W155103 W916494 W148370"
      data-department-desc="LADIES BRIEFS"
      points="887.16 718.14 601.56 1003.74 653.96 1003.74 653.96 1124.89 998.61 1124.89 998.61 1207.59 1103.61 1207.59 1103.61 932.44 887.16 718.14"
    />
    <polygon
      id="ladies-hoisery"
      className="area store-area"
      data-label="Ladies Hoisery"
      data-department-desc="LADIES HOSIERY"
      points="933.51 671.69 1115.36 489.94 1220.01 490.14 1220.01 752.14 1118.91 853.29 933.51 671.69"
    />
    <g
      id="toiletries"
      className="area store-area"
      data-label="Toiletries"
      data-child="toiletries1 toiletries2"
      data-department-desc="TOILETRIES"
    >
      <rect
        id="toiletries2"
        className="area"
        x="1865.76"
        y="652.79"
        width="100.5"
        height="55.5"
      />
      <polygon
        id="toiletries1"
        className="area"
        points="1389.81 547.29 1610.91 547.29 1610.91 728.24 1610.81 747.24 1389.81 747.24 1389.81 547.29"
      />
    </g>
    <rect
      id="books-1"
      className="area store-area"
      data-label="Ground Floor Books"
      x="3526.74"
      y="1190.89"
      width="51.28"
      height="105.4"
    />
    <rect
      className="store-area"
      x="3526.74"
      y="1293.3"
      width="51.28"
      height="105.4"
    />
    <rect
      id="everyday-confectionary"
      className="area store-area"
      data-label="Everyday Confectionary"
      x="3526.74"
      y="1398.7"
      width="25.64"
      height="102.41"
    />
    <path
      id="floor-outer-border" 
      className="map-outer-boarder"
      d="M3756.15,873.7h-576V835.18l-18.75-18.75-255-254.95-18.75-18.75H2530.35L2415.68,426.92V351h-180v22.65h-41.92V476h-17.42V249H1432.11v200.7h-69.5V426.21l-63.93-.07-183.25-.2-26.55,0-18.77,18.78-513.8,513.8-18.79,18.79,0,26.57.35,216.85,0,9.29h-1.87v320.5h-44.6v86.4h-70.6v230.2H459v85h81.75v46.56l18.75,18.75,63.2,63.2,4.44,4.44,5.22,3.49L782.1,2188.77l38.18,43.8,19.13,21.94h360l18.74-18.75,131-131h444.46l18.69-18.43,364.77-359.74h550.62V1891H3331V1696.72h419.85v-45.06h69.32v-778Zm0,714h-69.32v45.06H3267V1827H2791.72V1662.55H2150.85l-383.46,378.17H1322.67l-149.75,149.79H868.52l-43.76-50.2-156.85-105-63.2-63.2v-71.5l-12.55-12.55H523v-85h-38.1v-102.2h70.6v-86.4h44.6V1294h27v-73.4h-25.1l-.35-216.85,513.8-513.8,183.25.2v23.6h197.5V313l431.55-.21H2113.9V540h143.87V437.62h41.92V415h52v38.27l152,153.49h357.5l255,255v76h640Z"
    />
    <polygon
      id="dresses-soft-seperates"
      className="area store-area"
      data-label="Dressess Soft Separates"
      data-categories="W95135 W1292064 W158646"
      data-department-desc="DRESSES AND SOFT SEP"
      points="1185.51 1393.22 1185.51 1771.27 1370.01 1771.27 1639.9 1491.38 1639.9 1393.22 1185.51 1393.22"
    />
    <polygon
      id="womens-activewear"
      className="area store-area active"
      data-label="Womens Activewear"
      data-categories="W144711 W1252610 W144850 W185733"
      data-department-desc="WOMENS ACTIVEWEAR"
      points="1918.34 1817.83 1897.18 1796.62 1882.71 1811.1 1684.87 1613.31 1399.18 1899 1202.11 1899 1204.18 2040.72 1767.39 2040.72 2020.82 1787.29 2020.82 1786.62 2023.65 1783.78 1988.02 1748.15 1918.34 1817.83"
    />
  </g>
</g>
</svg>
`
