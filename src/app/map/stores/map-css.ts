export default {
  map: `
    width: 100%;

    .white-area {
      fill: #fff;
    }

    .non-reachable-area {
      fill: #ecf0f1;
      stroke: #f6cf65;
      stroke-width: 9px;
    }

    .walkable-area {
      fill: #fff;
    }

    .map-outer-border {
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

    .portal-area, .portal-area-line-bold, .store-area, .map-outer-border {
      stroke-miterlimit: 10;
    }

    .portal-area, .store-area, .map-outer-border {
      stroke-width: 9px;
    } 
  `,
  activeArea: `
    transition: 0.4s;
    fill: #E49999;
    stroke: #BA0000;
  `,
}
