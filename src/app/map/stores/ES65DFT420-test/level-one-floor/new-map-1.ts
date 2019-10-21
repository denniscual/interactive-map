export default `
<svg 
xmlns="http://www.w3.org/2000/svg" 
viewBox="0 0 4000 3000" 
>
<g id="map-area"
>
<g id="floor-non-reachable" className="non-walkable-area">
  <path id="storage" className="white-area" d="M1825.66,590.21v690.38H1719.3v-59.43s110.77-114,86.3-257.4C1795.25,903,1760.6,837,1683,772.07l-3.28-105.7Z"/>
  <path id="installations-3" className="white-area" d="M2085.77,1523.31v401.6a402.06,402.06,0,0,1-80,6.34A442.18,442.18,0,0,1,1902,1915.34a200.79,200.79,0,0,1-20.58-6.55V1523.31Z"/>
  <rect id="installations-2" className="white-area" x="3254.78" y="2258.74" width="128.86" height="197.41"/>
  <rect id="installations-1" className="white-area" x="626.23" y="2267.26" width="119.51" height="188.89"/>
  <polygon id="office-1" className="white-area" points="399.06 795.14 278.64 1315.32 200.3 1315.32 200.3 795.14 399.06 795.14"/>
  <polygon id="non-reachable_2" className="white-area" data-name="non-reachable 2" points="3205.36 543.85 3205.36 699.36 2894.91 1280.54 2533.51 1280.54 2533.51 543.85 3205.36 543.85"/>
  <polygon id="non-reachable_1" className="white-area" data-name="non-reachable 1" points="2533.51 543.85 2533.51 1280.54 1825.7 1280.54 1825.7 590.21 2092.24 543.85 2533.51 543.85"/>
</g>
<path id="floor-walkable" className="walkable-area" d="M3742.9,699.36c-4.76,0-10,.57-15.6,1.13,5.59-.56,10.84-.91,15.6-1.13H3205.45L2895.22,1280.5H1719.83v-59.43s110.77-114,86.3-257.4c-10.36-60.78-45-126.72-122.66-191.69l-3.27-105.7-129.34,59.86L1447.3,774.21l-44.91,20.84H399L278.6,1315H200.25v358.3h426v593.94H745.74v188.89h2509V2258.74h128.86V1676.81h416.11V699.36ZM2005.81,1931.25A442.18,442.18,0,0,1,1902,1915.34a200.79,200.79,0,0,1-20.58-6.55V1523.31h204.36v401.6A402.06,402.06,0,0,1,2005.81,1931.25Z"/>
<g id="stores">
  <path id="point-of-sale" className="area store-area" d="M1683,772l-56.5,70.39h-75.59V726.14l128.81-59.82Z"/>
  <path id="woc" className="area store-area" d="M1770.25,1502.86v383a253.3,253.3,0,0,0-27,0,192,192,0,0,1-21.85.61,187.92,187.92,0,0,1-49.9-8.43V1502.73Z"/>
  <path id="souvenirs" className="area store-area" d="M1805.6,963.71l-35.35,6.08-29.45,64.4H1620.38v-98H1447.3v-162L1551,726.14V842.41h75.46L1683,772C1760.6,836.91,1795.25,902.93,1805.6,963.71Z"/>
  <path id="contentainment" className="area store-area" d="M2251.94,1752.32v120.29a268.83,268.83,0,0,0-51.91,17.08s-40.85,16.21-80.61,27.49c-5.81,1.66-17.48,4.8-33.65,7.73v-401.6h143.67v191.82Z"/>
  <path id="toys" className="area store-area" d="M750.68,1539.52H634.58V1406.78H746C746.13,1487.7,749,1506,750.68,1539.52Z"/>
  <rect id="cigarettes" className="area store-area" x="745.74" y="2267.26" width="156.78" height="188.89"/>
  <path id="tobacco" className="area store-area" d="M1550.86,2160.25v295.9H902.52V2267.26H626.23V2223H756.36l49.15,27.13h406.67l122.35-124.22c20.4,9.87,32.07,17,66.2,27.44,60.16,18.39,91.75,16.91,107.7,15.2A189.28,189.28,0,0,0,1550.86,2160.25Z"/>
  <path id="perfumes-and-cosmetics-promotion" className="area store-area" d="M2658.09,1978.26a96.13,96.13,0,1,1-96.13-96.13A96.13,96.13,0,0,1,2658.09,1978.26Z"/>
  <path id="liquor-promotion" className="area store-area" d="M1560.91,1978.26a96.13,96.13,0,1,1-96.13-96.13A96.13,96.13,0,0,1,1560.91,1978.26Z"/>
  <polygon id="alcoholic-beverages-promotion" className="area store-area" points="1171.55 1078.76 1171.55 1315.32 1094.21 1315.32 1077.82 1325.42 1029.19 1325.42 1029.19 1078.76 1171.55 1078.76"/>
  <path id="alcoholic-beverages" className="area store-area" d="M745.87,1340.36c-.22,26.22-.22,48.07,0,66.42H634.58v132.74H263.17v134H200.25V1315.24H278.6l193.26,55L634.58,821a199.7,199.7,0,0,1,67.68,68.6,249.6,249.6,0,0,1,32.43,78.17,305.33,305.33,0,0,1,8.73,88.61C738.88,1150.94,746.66,1245.72,745.87,1340.36ZM1805.6,963.71l-35.35,6.08-29.45,64.4H1620.38v-98H1447.3v-162l-44.91,20.84H1040.33a482.9,482.9,0,0,0-78,110.24,434,434,0,0,0-22.63,52.44,410.8,410.8,0,0,0-18.31,75.11c-8.3,55.45-6,103.25-4.89,150.83,2,83,.87,179.94-1.23,241.85l162.68-100.19h-48.77V1078.76h142.41v236.56h332.56v-35h215.37v-59.43S1830.07,1107.07,1805.6,963.71Z"/>
  <path id="liquor" className="area store-area" d="M1770.25,1389v113.91h-98.88v375.3l-2-.66c-22.2-7.78-25.65-15.9-52.43-33a322.4,322.4,0,0,0-67.82-32.38,223.14,223.14,0,0,0-86.08-13.41c-41.86,2.27-73.8,17.08-92.24,25.65-14.59,6.77-13.1,7.47-32.33,17.08a496.34,496.34,0,0,1-81.84,32.38,354.86,354.86,0,0,1-109.94,16.47c-27.35-.43-57.06-.91-92.19-15.86a208.42,208.42,0,0,1-71.44-51.29c-15.25-16.08-45.88-48.42-55-96.48-2.4-12.63.48-6.29-3.06-76.34-1.4-27.31-2.88-48.89-3.67-59.86-2.62-36.31-4.11-46.67-5.51-65.94-.21-3.23-.43-6.37-.61-9.48L1104.87,1389Z"/>
  <path id="gift-boxes" className="area store-area" d="M634.58,821,471.86,1370.34l-193.26-55L399,795.36H537.93A189.78,189.78,0,0,1,634.58,821Z"/>
  <path id="madrid-t1-nsh-perfumeria" className="area store-area" d="M1831.38,2191.45c-3.28,27.61-5.2,95,0,264.7H1550.86v-295.9a108.22,108.22,0,0,0,33.73-18.35c11.06-9.05,11.19-13.11,29.54-30.59,17-16.25,31.33-30,50.51-40,6.47-3.41,48.63-24.73,98.14-11.45,14.29,3.85,35.48,9.53,50.51,28.58,13.63,17.47,15.82,37.53,18.09,58.15A201.65,201.65,0,0,1,1831.38,2191.45Zm1086-802.5H1843.18v508.21l13.63,3.54a169.77,169.77,0,0,1,24.6,8.09V1523.31h348v191.82l22.55,37.19v120.29a223.11,223.11,0,0,1,49.46-4.37c15.56.48,14.55,2.14,28.1,2.45a209.75,209.75,0,0,0,100.14-26.88c16-9.61,19.45-15.38,31.12-23.81,24.68-17.78,50.42-21.59,69.64-24.43a173.33,173.33,0,0,1,84.86,6.12,261.56,261.56,0,0,1,50,25.56c20.45,12.63,27.09,19.75,45.18,26.22,7.21,2.58,11.1,3.23,37.89,7.91,55.09,9.7,53,9.52,55.57,9.79a392.44,392.44,0,0,0,72.06.61c24-1.58,18.35-3,44.57-4.9a50.36,50.36,0,0,0,17.69-3.06c4.37-1.7,13.11-6.24,25-23.81V1591.3Zm469.93-616.8c-4.85-9.09-11.49-14.24-23.81-23.81a192.61,192.61,0,0,0-31.15-19.53,457.83,457.83,0,0,0-76.34-29.45h-50.73L2895.09,1280.5h-1391v35H2972.25L3033.43,1568v122.56q17-37.62,43.25-95c40.6-88.49,79.09-155.78,90.37-175.26,0,0,60.12-103.78,106.26-199.08a208,208,0,0,0,16.52-48.06c.35-1.79,9.79-35.83,28.66-103.82,10.4-37.36,11-38.32,47.06-164.29,10.84-37.93,10.75-37.58,11.58-40.29,8.52-27,12-32.9,14.07-48.07S3394.78,786.53,3387.35,772.15ZM3259,2214.78l-229.7-75.59V2012.47c-7.61,4-14.12,7-18.79,9a282.19,282.19,0,0,1-87.39,22.24c-29.76,3.54-77.21,9.13-118,0a92.7,92.7,0,0,0-36-1.71,78.72,78.72,0,0,0-34.21,13.68,81.28,81.28,0,0,0-23.95,30.8c-21.19,39.33-68.6,56.81-90.71,65a187.84,187.84,0,0,1-88.92,12.19c-38.93-4.37-66.33-21-85.55-32.51-23.73-14.24-18.75-16.12-68.47-51.34-24.12-17.13-42.52-28.88-68.47-34.25-21.28-4.37-32.86-1.45-37.62,0-17.17,5.33-26.83,17.47-37.67,30.58a141.65,141.65,0,0,0-25.65,49.64,168.67,168.67,0,0,0-5.15,23.94,175.84,175.84,0,0,0-1.71,30.59c.57,20.67.4,127.28,0,275.28h1053.7V2258.74h128.86v-44ZM3742.9,699.36a245,245,0,0,0-102.64,26.83c-23.2,12-58.29,30.19-75.33,68.47a126.13,126.13,0,0,0-8.74,30.58c-7.78,39.76-20.19,78.65-29.1,118-25.91,114.83-33.12,107.23-53.05,203.66-10.22,49.38-15.81,87.39-41.07,138.6a418.61,418.61,0,0,1-29.1,49.64c-31.37,46.79-48.06,85.46-124.92,251.55-46.32,100-109.24,193-143.76,297.74a220.62,220.62,0,0,1-36.22,71v130l166,42.17h118.85V1676.81H3800V699.36Z"/>
  <path id="sunglasses" className="area store-area" d="M1265.14,2098.16,1184,2175.67H839.38l-79.61-49.15H626.23V1913.29H828.54c6.34,8.34,11.76,14.68,15.51,19a374,374,0,0,0,119.12,90.54A451.58,451.58,0,0,0,1068,2056.21c38.41,8.26,41.6,4.85,83.85,12.37A795.65,795.65,0,0,1,1265.14,2098.16Z"/>
  <path id="fashion-and-luxury" className="area store-area" d="M626.23,1913.2V1673.53H361.14v-57.67H751.86c0,7.56,0,15.77-.26,24.73-.7,50.9-2.19,91.76,13.37,145.81a386.67,386.67,0,0,0,63.57,126.71Z"/>
</g>
<path 
id="floor-outer-border" 
className="map-outer-boarder" 
d="M3799.75,646.92H3257.93V491.41H2087.7l-4.37.79-266.54,46.36-8,1.4-7.21,3.76L1656.6,619.27,1528.88,678.6l-103.69,48.07-34.38,16h-1243v983.13h426v782.84H3436.07V1729.24h416.11V646.92Zm0,1029.89H3383.64v779.34H626.23V1673.53h-426V795.27h1202l45-21.06L1551,726.14l128.81-59.82,146-76.11,266.54-46.36h1113V699.36h594.25Z"
/>
</g>
</svg>
`