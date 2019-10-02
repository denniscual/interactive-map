const basement = {
  map: `
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 4000 3000"
       >
      <g id="map-area">
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
              id="mens-top"
              className="area"
              data-label="Mens Tops"
              points="1398.33 374.94 1860.45 373.94 1860.45 521.74 1980.33 521.58 1980.33 785.63 1398.33 785.63 1398.33 374.94"
            />
            <polygon
              id="mens-bottom"
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
            id="basement-outer-border"
            className="map-outer-boarder"
            d="M2887.18,538V867.93H2545.33V320.58l-71.65-71.65H1860.45v62H1100.78V312l-945.26-1.18V573h-13.7V1752.53h50.75v215.75H3852.18V538Zm-710.83-205V313.18l1.23-.25h269.59l34.16,34.16v58.44H2250v54.7h-73.63ZM1164.78,563.38V374.93h180.3v29.5h53.25v-29.5l462.12-1V521.73h64V312.93h187.9v211.3H2314v-54.7h167.35v655.8H1841.59v259.19h-184V1125.33h-303v126.4H738V621.43h41v-58Zm2623.4,1340.9H256.57V1688.53H205.82V637h13.7V374.81L1100.78,376V499.38H715v58H674v758.3h744.55v-126.4h175v259.19h312V1189.33h639.74V931.93h405.85V602h837Z"
          />
        </g>
      </g>
    </svg>
      `,
}

const groundFloor = {
  map: `
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="900"
    height="700"
    viewBox="0 0 4000 3000"
    >
    <g id="map-area">
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
          id="ground-floor-outer-border"
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
    `,
}

const levelOneFloor = {
  map: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="900"
      height="700"
      viewBox="0 0 4000 3000" 
    >
  <g id="map-area">
    <polygon
      id="first-floor-walkable"
      className="walkable-area"
      points="3693.05 870.48 3645.95 870.48 3645.95 581.13 2890 581.13 2890 760.92 2699.35 760.92 2699.35 790.13 2632.05 790.13 2335.8 493.88 2335.8 449.98 2237.35 449.98 2237.35 513.98 2112.35 513.98 2112.35 312.82 1924.45 312.82 1924.45 520.73 1950.85 520.73 1950.85 553.27 1483.25 553.27 1483.25 405.52 1133.25 405.52 1133.25 530.42 808.05 530.42 445.9 892.58 445.9 1717.33 424.55 1717.33 424.55 1806.78 491.4 1806.78 512.05 1827.42 512.05 1900.17 563.2 1900.17 563.2 1956.22 545.45 1956.22 545.45 2532.28 1892.6 2532.28 1892.6 1897.03 2175.4 1897.03 2175.4 1712.42 2812.05 1712.42 2812.05 1888.13 3557.85 1888.13 3557.85 1928.58 3617.35 1928.58 3628.5 1886.92 3763.55 1886.92 3763.7 920.02 3693.05 920.02 3693.05 870.48"
    />
    <g id="wayfinder-levelOneFloor" />
    <g id="portals">
      <g
        id="escalator-level-one"
        className="area portal-area"
        data-label="Escalator (to Level one)"
        data-child="escalator-level-one-child"
      >
      <g id="escalator-level-one-child" className="area" data-name="escalator-up">
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
        id="escalator-2-ground-level"
        className="area portal-area"
        data-label="Escalator 2 (to Ground level)"
      >
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
      <g
        id="lift"
        className="area portal-area"
        data-label="Lifts"
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
        id="bathroom"
        className="area store-area"
        data-label="Bathroom"
        data-department-desc="BATHROOM"
        data-categories="W130204 W130206 W187309 W276140 W288764 W1108824"
        points="3763.55 1075.38 3403.65 1075.38 3403.65 1400.13 3594.15 1400.13 3594.15 1449.58 3696.55 1449.58 3696.55 1400.13 3763.55 1400.13 3763.55 1075.38"
      />
      <polygon
        id="bedroom"
        className="area store-area"
        data-label="Bedroom"
        data-department-desc="BEDROOM, BED COVERINGS"
        points="3032.55 1512.28 3032.55 1820.78 3113.1 1820.78 3113.1 1888.17 3557.9 1888.17 3557.9 1928.58 3617.4 1928.58 3628.55 1928.58 3628.55 1886.92 3763.55 1886.92 3763.55 1400.13 3696.55 1400.13 3696.55 1449.58 3594.15 1449.58 3594.15 1400.13 3403.65 1400.13 3403.65 1512.28 3032.55 1512.28"
      />
      <rect
        id="lighting"
        className="area store-area"
        data-label="Lighting"
        data-categories="W119202 W129166 W129158 W129170 W129160 W129164 W129169"
        x="2462.8"
        y="1512.27"
        width="349.25"
        height="160.25"
      />
      <polygon
        id="home-decorator"
        className="area store-area"
        data-label="Home Decorator"
        data-categories="W133037 W134698 W138517 W134667 W209129 W337969 W132146 W133039 W963918 W250648 W244868 W205554 W209483 W134665"
        data-department-desc="HOME DECORATOR"
        points="2175.4 1897.03 1862.35 1897.03 1862.35 1512.28 2462.8 1512.28 2462.8 1672.47 2812.05 1672.47 2812.05 1712.42 2175.4 1712.42 2175.4 1897.03"
      />
      <polygon
        id="pet"
        className="area store-area"
        data-label="Pet"
        data-categories="W803706 W803719 W803716"
        data-department-desc="PET"
        points="2355.85 513.98 2355.85 788.63 2633.5 788.63 2355.85 513.98"
      />
      <rect
        id="interactive-toys"
        className="area store-area"
        data-label="Interactive Toys"
        data-department-desc="INTERACTIVE TOYS"
        x="2013.4"
        y="573.32"
        width="92.4"
        height="215.3"
      />
      <polygon
        className="store-area"
        points="1599.85 553.27 1599.85 788.63 1950.8 788.63 1950.8 553.27 1599.85 553.27"
      />
      <polygon
        id="dvds"
        className="area store-area"
        data-label="DVDs"
        data-categories="W405142 W405334 W721443 W702159 W405332"
        data-department-desc="DVDS AND MUSIC"
        points="1483.2 438.57 1424.85 438.57 1424.85 788.63 1599.85 788.63 1599.85 553.27 1483.2 553.27 1483.2 438.57"
      />
      <polygon
        id="books-2"
        className="area store-area"
        data-label="Level One Books"
        points="1483.2 405.52 1286.8 405.52 1286.8 788.63 1424.85 788.63 1424.85 438.57 1483.2 438.57 1483.2 405.52"
      />
      <polygon
        id="confectionary"
        className="area store-area"
        data-label="Confectionary"
        data-department-desc="EVERYDAY CONFECTIONERY"
        points="1133.2 405.52 1133.2 537.73 1013.65 537.73 1013.65 613.63 1179.9 613.63 1179.9 788.63 1286.8 788.63 1286.8 405.52 1133.2 405.52"
      />
      <polygon
        id="cards-wrap"
        className="area store-area"
        data-label="Cards"
        data-department-desc="CARDS AND WRAP"
        points="1013.65 613.63 831.85 613.63 854.2 635.92 854.2 788.63 1179.9 788.63 1179.9 613.63 1013.65 613.63"
      />
      <polygon
        className="store-area"
        points="913.5 537.73 913.5 613.63 831.85 613.63 784.7 566.42 814.35 536.77 913.5 537.73"
      />
      <polygon
        id="stationery"
        className="area store-area"
        data-label="Stationery"
        data-categories="W292240"
        data-department-desc="STATIONERY"
        points="728.35 610.17 783.75 665.58 783.75 788.63 700.7 788.63 700.7 1050.08 513 1050.08 513 912.98 445.9 912.98 445.9 892.58 728.35 610.17"
      />
      <polygon
        id="events"
        className="area store-area"
        data-label="Events"
        data-department-desc="EVENTS"
        points="2282.15 868.52 2282.15 1064.13 2812.05 1064.13 2812.05 993.52 2843.55 993.52 2843.55 868.52 2282.15 868.52"
      />
      <polygon
        id="seasonal-foods"
        className="area store-area"
        data-label="Seasonal Food"
        data-department-desc="SEASONAL FOODS"
        points="2843.55 868.52 3090.15 868.52 3090.15 975.02 3019.55 975.02 3019.55 1064.13 2812.05 1064.13 2812.05 993.52 2843.55 993.52 2843.55 868.52"
      />
      <polygon
        id="electrical"
        className="area store-area"
        data-label="Electrical"
        data-department-desc="ELECTRICAL"
        points="2812.05 1064.13 2812.05 1113.88 2874.85 1113.88 2874.85 1435.72 3325.15 1435.72 3325.15 1096.53 3254.55 1096.53 3254.55 1064.13 2812.05 1064.13"
      />
      <path
        id="home-storage-laundry"
        className="area store-area"
        data-label="Home Storage Laundry"
data-categories="W138855 W244872 W237045 W237060 W933262 W292965 W228368"
data-department-desc="HOME STORAGE AND LAUNDRY"
        d="M3481.55,581.07H3645.9V870.42H3693V920h70.65v155.4h-360V918.77L3274.75,788ZM3090.15,975H3019.5v89.15h234.95v32.4h69.45V972.73L3219.75,868.57h-129.6Z"
      />
      <polygon
        id="tableware"
        className="area store-area"
        data-label="Tableware"
        data-department-desc="TABLEWARE"
        points="2282.15 1064.13 2282.15 1435.72 2562.85 1435.72 2578.5 1435.72 2578.5 1110.42 2529.85 1110.42 2529.85 1064.13 2282.15 1064.13"
      />
      <polygon
        id="path"
        className="store-area"
        points="3032.55 1512.28 2812.05 1512.28 2812.05 1887.58 3113.1 1887.58 3113.1 1820.78 3032.55 1820.78 3032.55 1512.28"
      />
      <polyline
        id="kitchenware"
        className="area store-area"
        data-label="Kitchenware"
data-categories="W404629 W404653 W404653 W133633 W133631 W1108864 W133629 W404663 W404661 W273128 W404656 W1108862 W404665 W143884 W133642 W404631 W404659"
data-department-desc="KITCHENWARE"
        points="2578.5 1435.72 2874.85 1435.72 2874.85 1113.88 2812.05 1113.88 2812.05 1064.13 2529.85 1064.13 2529.85 1110.42 2578.5 1110.42 2578.5 1435.72"
      />
      <polygon
        id="path-2"
        data-name="path"
        className="store-area"
        points="445.9 912.98 445.9 1212.92 700.7 1212.92 700.7 1050.08 513 1050.08 513 912.98 445.9 912.98"
      />
      <polygon
        id="childrens-shoes"
        className="area store-area"
        data-label="Childrens Shoes"
        data-categories="W160452 W404498 W404504 W406275 W404512 W404508 W404514 W404500 W404510 W404502"
        data-department-desc="CHILDRENS SHOES"
        points="700.7 1281.78 445.9 1281.78 445.9 1669.13 503.2 1669.13 503.2 1630.78 700.7 1630.78 700.7 1281.78"
      />
      <polygon
        id="outdoor-activities"
        className="area store-area"
        data-label="Outdoor Activities"
        data-categories="W1140053 W1142406 W1141744"
        data-department-desc="OUTDOOR ACTIVITIES"
        points="445.9 1669.13 445.9 1717.28 424.6 1717.28 424.6 1806.72 491.4 1806.72 512.05 1827.38 512.05 1900.17 563.2 1900.17 563.2 1956.22 545.45 1956.22 545.45 2532.32 672.35 2532.32 672.35 2460.57 767.7 2460.57 767.7 2297.07 700.7 2297.07 700.7 1630.78 503.2 1630.78 503.2 1669.13 445.9 1669.13"
      />
      <polygon
        id="childrens-underwear"
        className="area store-area"
        data-label="Underwear"
        data-department-desc="CHILDRENS UNDERWEAR, W148663"
        points="840.65 880.52 1166.6 880.52 1166.6 1034.97 932.65 1034.97 932.65 991.83 840.65 991.83 840.65 880.52"
      />
      <path
        id="childrens-nightwear"
        className="area store-area"
        data-label="Childrens Nightwear"
        data-categories="W716600 W175904 W1092554 W716975 W904743 W905585 W118762 W716998 W716992 W666732 W666188 W666734 W1049614"
        data-department-desc="LADIES NIGHTWEAR"
        d="M1166.6,880.52h888.55v68.9l-365.3,26.23c-47.84-1.32-70.75,48.32-61,79.77h0L1248.35,1035h-81.7l-.05-154.45Z"
      />
      <g id="girls-7-16" className="area store-area" data-label="Girls (7-16)"
data-categories="W103460"
data-department-desc="GIRLS 7-16"
      >
        <path
          d="M1628.85,1055.42l36.4,117.81a53.91,53.91,0,0,0,51.5,37.94h123.9a40,40,0,0,1,40,40v184.65h-601.6v-98.15h-31.8V1035l381.6,20.45"
        />
      </g>
      <path
        id="childrens-accessories"
        className="area store-area"
        data-label="Childrens Accessories"
        data-categories="W277889 W1062765 W393388 W277893 W182092 W393384 W393384 W393386"
        data-department-desc="CHILDRENS ACCESSORIES"
        d="M840.65,880.52v111.3h92V1035H783.7V880.52Zm438.4,457.15h-76.7v98.2h76.7Z"
      />
      <polygon
        id="boys-7-16"
        className="area store-area"
        data-label="Boys (7-16)"
        data-categories="W94293 W94320 W160192 W94318 W94314 W1313497 W94316 W94322 W94312"
        data-department-desc="BOYS 7-16"
        points="1862.35 1512.28 1546.45 1512.28 1546.45 2038.47 1838.35 2038.47 1838.35 1955.08 1892.6 1955.08 1892.6 1897.03 1862.35 1897.03 1862.35 1512.28"
      />
      <polygon
        className="store-area"
        points="1546.45 2038.47 1546.45 2142.78 1892.6 2142.78 1892.6 1955.08 1838.35 1955.08 1838.35 2038.47 1546.45 2038.47"
      />
      <polygon
        id="pre-school-toys"
        className="area store-area"
        data-label="Pre-school Toys"
        data-department-desc="PRE-SCHOOL TOYS"
        points="1546.45 2142.78 1546.45 2297.07 1782.9 2533.63 1892.6 2533.63 1892.6 2142.78 1546.45 2142.78"
      />
      <polygon
        id="girls-toys"
        className="area store-area"
        data-label="Girls Toys"
        data-categories="W152975 W153012 W153008 W485473 W153014"
        data-department-desc="GIRLS TOYS"
        points="1546.45 2297.07 1241.9 2297.07 1241.9 2533.63 1782.9 2533.63 1546.45 2297.07"
      />
      <polygon
        id="boys-toys"
        className="area store-area"
        data-label="Boys Toys"
        data-department-desc="BOYS TOYS"
        points="767.7 2297.07 1241.9 2297.07 1241.9 2533.63 672.35 2533.63 672.35 2460.57 767.7 2460.57 767.7 2297.07"
      />
      <polygon
        id="boys-1-7"
        className="area store-area"
        data-label="Boys (1-7)"
        data-department-desc="BOYS 1-7"
data-categories="W94147 W120224 W94310 W160195 W94308 W94302 W1312856 W94295 W94304 W94171"
        points="1468.35 1512.28 783.75 1512.28 783.75 1730.13 1037.9 1730.13 1037.9 1692.22 1279.05 1692.22 1279.05 1730.13 1468.35 1730.13 1468.35 1512.28"
      />
      <polygon
        id="babywear"
        className="area store-area"
        data-label="Babywear"
        data-categories="W93745 W717009 W1308111 W1075332 W93753 W1108688 W715802 W715802 W715786 W715788 W715784 W717031 W717031 W93746 W93750 W93751 W717034"
        data-department-desc="BABYWEAR"
        points="1468.35 1730.13 1468.35 2061.68 1016.8 2061.68 1016.8 1806.72 1038.95 1806.72 1038.95 1692.22 1279.05 1692.22 1279.05 1730.13 1468.35 1730.13"
      />
      <polygon
        className="store-area"
        points="816.25 1806.33 783.75 1806.33 783.75 2223.07 1468.35 2223.07 1468.35 2061.68 1016.8 2061.68 1016.8 1964.22 816.25 1964.22 816.25 1806.33"
      />
      <polygon
        id="visual-home-theatre"
        className="area store-area"
        data-label="Visual Home Theatre"
        data-categories="W405145 W405287 W406073 W405290 W1332252 W405285"
        points="2237.3 449.98 2335.7 449.98 2335.7 493.82 2355.85 513.98 2355.85 788.63 2105.8 788.63 2105.8 573.33 2013.4 573.33 2013.4 515.98 2237.3 515.98 2237.3 449.98"
      />
      <polygon
        id="girls-1-7"
        className="area store-area"
        data-label="Girls (1-7)"
        data-categories="W103459 W104542 W112023 W261570 W680805 W104547 W104551 W104553 W104553"
        data-department-desc="GIRLS 1-7"
        points="1247.25 1034.97 783.75 1034.97 783.75 1435.88 1202.35 1435.88 1202.35 1337.67 1247.25 1337.67 1247.25 1034.97"
      />
      <path
        id="first-floor-outer-border"
        className="map-outer-boarder"
        d="M3763.7,856h-6.65V806.47H3710V517.12H2826v179.8H2635.35v6L2399.8,467.37V386H2237.35l-61-20V248.82h-315.9V489.27h-313.2V341.52h-478v124.9H781.54l-18.75,18.75L400.64,847.32,381.9,866.07v787.25H360.55v217.45h87.5v93.41h33.4v632.09H1956.6V1961h282.8v-184.6h508.65v175.69h745.8v40.45h172.62l11.15-41.64h149.92v-64L3827.7,920V856Zm-.15,1030.91H3628.5l-11.15,41.64h-59.5v-40.45h-745.8V1712.43H2175.4V1897H1892.6v635.24H545.45v-576H563.2v-56H512.05v-72.75l-20.65-20.66H424.55v-89.45H445.9V892.57l368.45-355.8,318.85,1,0-132.2h350V553.27h467.6V520.72h-26.4V312.82h187.9L2112.16,514h125l.19-64h98.45v43.9l296.25,296.25h67.3v-29.2H2890V581.12H3646V870.47h47.1V920h70.65Z"
      />
    </g>
  </g>
</svg>
    `,
}

const styles = {
  map: `
    width: 100%;
    height: 100%;

    .white-area {
      fill: #fff;
    }

    .non-walkable-area {
      fill: #f9fafa;
    }

    .walkable-area {
      fill: #fff;
    }

    .map-outer-boarder {
      fill: #ecf0f1;
      stroke: #bdc3c7;
    }

    .store-area {
      fill: #fff2af;
      stroke: #f6cf65;
    }

    .portal-area {
      fill: #b9e8a7;
      stroke: #9fd0a6;
    }

    .portal-area-line-bold {
      fill: none;
      stroke: #79a37e;
      stroke-width: 8.5px;
    }

    .portal-area, .portal-area-line-bold, .store-area, .map-outer-boarder {
      stroke-miterlimit: 10;
    }

    .portal-area, .store-area, .map-outer-boarder {
      stroke-width: 9px;
    } 
  `,
  activeArea: `
    transition: 0.4s;
    fill: #E49999;
    stroke: #BA0000;
  `,
}

const levelTwoFloor = {
  map: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4000 3000"  width="900"
height="700">
  <g id="map-area">
    <g id="floor-non-reachable">
      <path id="storage" className="white-area" d="M658.59,184.89v158H634.25v-13.6s25.35-26.1,19.75-58.91c-2.37-13.91-10.3-29-28.07-43.87l-.75-24.19Z"/>
      <path id="installations-3" className="white-area" d="M718.12,398.44v91.91a92,92,0,0,1-18.3,1.45,101.13,101.13,0,0,1-23.76-3.64,45.58,45.58,0,0,1-4.71-1.5V398.44Z"/>
      <rect id="installations-2" className="white-area" x="985.66" y="566.75" width="29.49" height="45.18"/>
      <rect id="installations-1" className="white-area" x="384.09" y="568.7" width="27.35" height="43.23"/>
      <polygon id="office-1" className="white-area" points="332.1 231.79 304.54 350.84 286.61 350.84 286.61 231.79 332.1 231.79"/>
      <polygon id="non-reachable_2" className="white-area" points="974.35 174.28 974.35 209.87 903.3 342.88 820.59 342.88 820.59 174.28 974.35 174.28"/>
      <polygon id="non-reachable_1" className="white-area" points="820.59 174.28 820.59 342.88 658.6 342.88 658.6 184.89 719.6 174.28 820.59 174.28"/>
      <path id="floor-outer-border" className="map-outer-boarder" d="M1110.38,197.87h-124V162.28H718.56l-1,.18-61,10.61-1.84.32-1.65.86-33.17,17.29-29.23,13.58-23.73,11-7.87,3.65H274.6v225h97.49V623.93h655.06V445.57h95.23V197.87Zm0,235.7h-95.23V611.93H384.09V432.82H286.6v-201H561.69L572,227l23.73-11,29.48-13.69,33.41-17.42,61-10.61H974.34v35.59h136Z"/>
    </g>
    <path id="floor-walkable" className="walkable-area" d="M1097.37,209.87c-1.09,0-2.29.13-3.57.26,1.28-.13,2.48-.21,3.57-.26h-123l-71,133h-269v-13.6s25.35-26.1,19.75-58.91c-2.37-13.91-10.3-29-28.07-43.87l-.75-24.19L595.7,216,572,227l-10.28,4.77H332.09l-27.56,119H286.6v82h97.49V568.7h27.35v43.23H985.66V566.75h29.49V433.57h95.23V209.87ZM699.82,491.8a101.13,101.13,0,0,1-23.76-3.64,45.58,45.58,0,0,1-4.71-1.5V398.44h46.77v91.91A92,92,0,0,1,699.82,491.8Z"/>
    <g id="stores">
      <path id="point-of-sale" className="store-area" d="M625.93,226.5,613,242.61H595.7V216l29.48-13.69Z"/>
      <path id="woc" className="store-area" d="M645.91,393.76v87.66a58,58,0,0,0-6.18,0,44.34,44.34,0,0,1-5,.14,43,43,0,0,1-11.42-1.93v-85.9Z"/>
      <path id="souvenirs" className="store-area" d="M654,270.37l-8.09,1.39-6.74,14.74H611.61V264.07H572V227l23.73-11v26.61H613l12.95-16.11C643.7,241.35,651.63,256.46,654,270.37Z"/>
      <path id="contentainment" className="store-area" d="M756.15,450.85v27.53a61.54,61.54,0,0,0-11.88,3.91s-9.35,3.71-18.45,6.29c-1.33.38-4,1.1-7.7,1.77V398.44H751v43.9Z"/>
      <path id="toys" className="store-area" d="M412.57,402.15H386V371.77h25.49C411.53,390.29,412.18,394.48,412.57,402.15Z"/>
      <rect id="cigarettes" className="store-area" x="411.44" y="568.7" width="35.88" height="43.23"/>
      <path id="tobacco" className="store-area" d="M595.7,544.21v67.72H447.32V568.7H384.09V558.57h29.78l11.25,6.21h93.07l28-28.43c4.67,2.26,7.34,3.89,15.15,6.28,13.77,4.21,21,3.87,24.65,3.48A43.37,43.37,0,0,0,595.7,544.21Z"/>
      <path id="perfumes-and-cosmetics-promotion" className="store-area" d="M849.1,502.56a22,22,0,1,1-22-22A22,22,0,0,1,849.1,502.56Z"/>
      <path id="liquor-promotion" className="store-area" d="M598,502.56a22,22,0,1,1-22-22A22,22,0,0,1,598,502.56Z"/>
      <polygon id="alcoholic-beverages-promotion" className="store-area" points="508.89 296.7 508.89 350.84 491.19 350.84 487.44 353.15 476.31 353.15 476.31 296.7 508.89 296.7"/>
      <path id="alcoholic-beverages" className="store-area" d="M411.47,356.57c-.05,6-.05,11,0,15.2H386v30.38H301v30.67H286.6v-82h17.93l44.23,12.59L386,237.7a45.71,45.71,0,0,1,15.49,15.7,57.09,57.09,0,0,1,7.42,17.89,69.86,69.86,0,0,1,2,20.28C409.87,313.22,411.65,334.91,411.47,356.57ZM654,270.37l-8.09,1.39-6.74,14.74H611.61V264.07H572V227l-10.28,4.77H478.86A110.41,110.41,0,0,0,461,257a99.44,99.44,0,0,0-5.18,12,94.19,94.19,0,0,0-4.19,17.19c-1.9,12.69-1.38,23.63-1.12,34.52.46,19,.2,41.18-.28,55.35l37.23-22.93H476.3V296.7h32.59v54.14H585v-8h49.29v-13.6S659.6,303.18,654,270.37Z"/>
      <path id="liquor" className="store-area" d="M645.91,367.69v26.07H623.28v85.89l-.46-.15c-5.08-1.78-5.87-3.64-12-7.55a73.7,73.7,0,0,0-15.52-7.41,51.06,51.06,0,0,0-19.7-3.07c-9.58.52-16.89,3.91-21.11,5.87-3.34,1.55-3,1.71-7.4,3.91a113.66,113.66,0,0,1-18.73,7.41,81.31,81.31,0,0,1-25.16,3.77c-6.26-.1-13.06-.21-21.1-3.63a47.74,47.74,0,0,1-16.35-11.74c-3.49-3.68-10.5-11.08-12.58-22.08-.55-2.89.11-1.44-.7-17.47-.32-6.25-.66-11.19-.84-13.7-.6-8.31-.94-10.68-1.26-15.09-.05-.74-.1-1.46-.14-2.17l43.4-28.86Z"/>
      <path id="gift-boxes" className="store-area" d="M386,237.7,348.76,363.43l-44.23-12.59,27.56-119h31.79A43.45,43.45,0,0,1,386,237.7Z"/>
      <path id="madrid-t1-nsh-perfumeria" className="store-area" d="M659.9,551.35c-.75,6.32-1.19,21.74,0,60.58H595.7V544.21a24.79,24.79,0,0,0,7.72-4.2c2.53-2.07,2.56-3,6.76-7,3.89-3.72,7.17-6.86,11.56-9.16,1.48-.78,11.13-5.66,22.46-2.62,3.27.88,8.12,2.18,11.56,6.54,3.12,4,3.62,8.59,4.14,13.31A46.12,46.12,0,0,1,659.9,551.35ZM908.45,367.69H662.6V484l3.12.81a38.9,38.9,0,0,1,5.63,1.85V398.44H751v43.9l5.16,8.51v27.53a51.11,51.11,0,0,1,11.32-1c3.56.11,3.33.49,6.43.56a48,48,0,0,0,22.92-6.15c3.66-2.2,4.45-3.52,7.12-5.45,5.65-4.07,11.54-4.94,15.94-5.59a39.67,39.67,0,0,1,19.42,1.4A59.92,59.92,0,0,1,850.76,468c4.68,2.89,6.2,4.52,10.34,6,1.65.59,2.54.74,8.67,1.81,12.61,2.22,12.13,2.18,12.72,2.24a89.68,89.68,0,0,0,16.49.14c5.5-.36,4.2-.69,10.2-1.12a11.6,11.6,0,0,0,4.05-.7c1-.39,3-1.43,5.73-5.45V414ZM1016,226.53c-1.11-2.08-2.63-3.26-5.45-5.45a43.93,43.93,0,0,0-7.13-4.47,104.81,104.81,0,0,0-17.47-6.74H974.34l-71,133H585v8h336l14,57.79v28.05c2.59-5.74,5.89-13,9.9-21.75,9.29-20.25,18.1-35.65,20.68-40.11,0,0,13.76-23.75,24.32-45.56a47.59,47.59,0,0,0,3.78-11c.08-.41,2.24-8.2,6.56-23.76,2.38-8.55,2.51-8.77,10.77-37.6,2.48-8.68,2.46-8.6,2.65-9.22,1.95-6.17,2.74-7.53,3.22-11S1017.7,229.82,1016,226.53ZM986.62,556.69l-52.57-17.3v-29c-1.74.92-3.23,1.59-4.3,2.06a64.52,64.52,0,0,1-20,5.09c-6.81.81-17.67,2.09-27,0a21.22,21.22,0,0,0-8.23-.39,18,18,0,0,0-7.83,3.13,18.61,18.61,0,0,0-5.48,7.05c-4.85,9-15.7,13-20.76,14.88A43,43,0,0,1,820.1,545c-8.91-1-15.18-4.8-19.58-7.44-5.43-3.26-4.29-3.69-15.67-11.75-5.52-3.92-9.73-6.61-15.67-7.84-4.87-1-7.52-.33-8.61,0-3.93,1.22-6.14,4-8.62,7a32.43,32.43,0,0,0-5.87,11.36,38.48,38.48,0,0,0-1.18,5.48,40.37,40.37,0,0,0-.39,7c.13,4.73.09,29.13,0,63H985.66V566.75h29.49V556.69Zm110.75-346.82a56.09,56.09,0,0,0-23.49,6.14c-5.31,2.75-13.34,6.91-17.24,15.67a28.91,28.91,0,0,0-2,7c-1.78,9.1-4.62,18-6.66,27-5.93,26.28-7.58,24.54-12.14,46.61-2.34,11.3-3.62,20-9.4,31.72a95.87,95.87,0,0,1-6.66,11.36c-7.18,10.71-11,19.56-28.59,57.57-10.6,22.88-25,44.18-32.9,68.14A50.53,50.53,0,0,1,950,497.34v29.74L988,536.73h27.2V433.57h95.23V209.87Z"/>
      <path id="sunglasses" className="store-area" d="M530.31,530l-18.58,17.74H432.87l-18.22-11.25H384.09v-48.8h46.3c1.45,1.91,2.69,3.36,3.55,4.35a85.61,85.61,0,0,0,27.26,20.72,103.44,103.44,0,0,0,24,7.64c8.79,1.89,9.52,1.11,19.19,2.83A182.08,182.08,0,0,1,530.31,530Z"/>
      <path id="fashion-and-luxury" className="store-area" d="M384.09,487.67V432.82H323.42v-13.2h89.42c0,1.73,0,3.61-.06,5.66-.16,11.65-.5,21,3.06,33.37a88.52,88.52,0,0,0,14.55,29Z"/>
    </g>
  </g>
</svg>
`,
}

export { basement, groundFloor, levelOneFloor, levelTwoFloor, styles }
