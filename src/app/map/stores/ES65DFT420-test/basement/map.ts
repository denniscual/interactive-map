export default `
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 4000 3000"
 >
<g id="map-area"
>
  <path
    id="basement-non-reachable"
    className="non-walkable-area"
    d="M2250,460.23h-73.63v-147l1.23-.25h269.59l34.16,34.16v58.44H2250ZM2951.18,602V931.93H2545.33v257.4H1905.59v259.19h-312V1189.33h-175v126.4H674V557.43h41v-58h385.8V376l-881.26-1.14V637h-13.7V1688.53h50.75v215.75H3788.18V602Z"
  />
  <polygon
    id="basement-walkable"
    className="walkable-area"
    points="2112.35 312.94 1924.45 312.94 1924.45 521.74 1853.47 521.74 1853.47 374.94 1398.33 374.94 1398.33 404.44 1345.08 404.44 1345.08 374.94 1164.78 374.94 1164.78 563.38 778.98 563.38 778.98 621.43 737.98 621.43 737.98 1251.73 1354.53 1251.73 1354.53 1125.33 1657.55 1125.33 1657.55 1384.52 1841.59 1384.52 1841.59 1125.33 2481.32 1125.34 2481.32 469.53 2313.97 469.53 2313.97 524.24 2112.35 524.24 2112.35 312.94"
  />
  <g id="wayfinder-basementFloor" />
  <g id="portals">
    <g
        id="escalator-1-ground-level"
        className="area portal-area"
        data-label="Escalator 1 (to Ground Level)"
    >
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
    <g
      id="escalator-basement"
      className="area portal-area"
      data-label="Escalator (to Basement)"
    >
      <rect
        x="1678.78"
        y="964.47"
        width="70.41"
        height="400.05"
      />
      <g id="escalator-up">
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
    <g id="elevator-1" className="area portal-area" data-label="Lift">
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
  </g>
  <g id="stores">
    <path
      id="mens-plus-sizes"
      className="area store-area"
      data-label="Mens Plus Sizes"
      data-deparment-desc="Z_CL MENS PLUS SIZES" 
      d="M738,1251.73v-228h52.91V1080H992.62v79.4H764.37v92.3Zm270.55-31.45H870.27v31.45h138.25Z"
    />
    <polygon
      id="mens-sleepwear"
      className="area store-area"
      data-label="Mens Sleepwear"
      data-categories="W181042 W209213 W209209 W209204 W1313662"
      data-department-desc="UNDERWEAR AND SLEEPWEAR, MENS SLEEPWEAR"
      points="737.98 886.18 791.52 886.18 791.52 992.03 835.88 992.03 835.88 973.53 970.17 973.53 970.17 956.99 992.63 956.99 992.63 1080.04 790.88 1080.04 790.88 1023.78 737.98 1023.78 737.98 886.18"
    />
    <polygon
      id="mens-workwear"
      className="area store-area"
      data-label="Mens Workwear"
      data-categories="W272225 W378746 W378748 W378718"
      points="992.63 854.43 992.63 1159.43 1085.92 1159.43 1085.92 963.59 1068.72 963.59 1068.72 874.28 1085.92 874.28 1085.92 854.43 992.63 854.43"
    />
    <path
      id="mens-footwear"
      className="area store-area"
      data-label="Mens Footware"
      data-categories="W162559 W180926 W180928 W357990 W180934 W180930 W180932 W378780"
      d="M1354.52,1251.73h-346v-31.45h322.85v-7.5h23.15Zm-268.59-397.3v19.85h-17.2v89.3h17.2v195.8h184.55V918.58h-19.2v-47h19.2v-17.2Z"
    />
    <polygon
      id="mens-accessories"
      className="area store-area"
      data-label="Mens Accessories"
      data-categories="W133029 W180887 W180889 W180892 W180894 W180896 W283976 W454885 W180907 W298269"
      data-department-desc="MENS ACCESSORIES"
      points="1085.92 785.63 1243.58 785.63 1243.58 619.59 1103.78 619.59 1103.78 768.43 1085.92 768.43 1085.92 785.63"
    />
    <polygon
      id="mens-businesswear"
      className="area store-area"
      data-label="Mens Businesswear"
      data-categories="W378339 W712828 W279853 W924929 W378683 W924931 W279855"
      data-department-desc="MENS WOVENS, MENS KNITS AND MR BIG"
      points="1048.88 563.34 1164.72 563.34 1164.72 374.94 1345.03 374.94 1345.03 404.44 1398.28 404.44 1398.33 785.63 1243.58 785.63 1243.58 619.59 1048.88 619.59 1048.88 563.34"
    />
    <g id="mens-top-bottom" data-label="Mens Tops and Bottoms"
      data-categories="W180981 W133028 W181029 W181027 W1102622 W1099258 W923638 W1332447 W1332490 W1332550 W216979 W216979 W216982 W1105928 W216987 W216984"
     className="area store-area" data-child="mens-top mens-bottom">
      <polygon
        className="area"
        data-label="Mens Tops"
        points="1398.33 374.94 1860.45 373.94 1860.45 521.74 1980.33 521.58 1980.33 785.63 1398.33 785.63 1398.33 374.94"
      />
      <polygon
        className="area"
        data-label="Mens Bottoms"
        points="2038.33 524.24 2313.97 524.24 2313.97 571.24 2201.82 571.24 2201.82 833.78 2038.33 833.78 2038.33 524.24"
      />
    </g>
    <polygon
      id="fitting-room-extra"
      className="area store-area"
      data-label="Fitting Room Extra"
      points="2313.97 524.24 2313.97 469.54 2481.32 469.54 2481.32 580.28 2376.32 580.24 2376.32 941.09 2481.32 941.13 2481.32 1125.34 2124.72 1125.34 2124.72 895.03 2201.82 895.03 2201.82 571.24 2313.97 571.24 2313.97 524.24"
    />
    <path
      id="mens-socks"
      className="area store-area"
      data-label="Mens Sock"
      data-categories="W127086 W662045 W662047 W887073 W181046 W223024 W662049"
      data-department-desc="MENS SOCKS"
      d="M779,621.38v-58h269.9v58h54.9v147h-17.84v17.2H992.62V957h-22.5v16.55H835.82V992h-44.3V886.18H737.93V621.38ZM1855,1125.33h269.7V895H1855v230.3Z"
    />
    <polygon
      id="mens-brands"
      className="area store-area"
      data-label="Mens Brands"
      data-department-desc="MENS BRANDS AND ACTIVE"
      points="1648.63 1132.4 1648.63 854.43 1420.92 854.43 1420.92 998.74 1537.92 998.74 1537.92 1084.63 1513.67 1084.63 1513.67 1132.4 1648.63 1132.4"
    />
    <polygon
      id="mens-active"
      className="area store-area"
      data-label="Mens Active Wear"
      data-categories="W180958 W133127 W1252612 W180964 W861611 W180962 W1332321 W1332334 W1332329"
      data-department-desc="MENS BRANDS AND ACTIVE"
      points="1420.92 854.43 1341.28 854.43 1341.28 1105.79 1328.83 1105.79 1328.83 1212.79 1354.53 1212.79 1354.53 1132.4 1513.67 1132.4 1513.67 1084.63 1537.92 1084.63 1537.92 998.74 1420.92 998.74 1420.92 854.43"
    />
    <rect
      id="fitting-room"
      className="area store-area"
      data-label="Fitting Room"
      x="2376.32"
      y="580.23"
      width="105"
      height="360.85"
    />
    <path
      id="floor-outer-border" 
      className="map-outer-boarder"
      d="M2887.18,538V867.93H2545.33V320.58l-71.65-71.65H1860.45v62H1100.78V312l-945.26-1.18V573h-13.7V1752.53h50.75v215.75H3852.18V538Zm-710.83-205V313.18l1.23-.25h269.59l34.16,34.16v58.44H2250v54.7h-73.63ZM1164.78,563.38V374.93h180.3v29.5h53.25v-29.5l462.12-1V521.73h64V312.93h187.9v211.3H2314v-54.7h167.35v655.8H1841.59v259.19h-184V1125.33h-303v126.4H738V621.43h41v-58Zm2623.4,1340.9H256.57V1688.53H205.82V637h13.7V374.81L1100.78,376V499.38H715v58H674v758.3h744.55v-126.4h175v259.19h312V1189.33h639.74V931.93h405.85V602h837Z"
    />
  </g>
</g>
</svg>
`
