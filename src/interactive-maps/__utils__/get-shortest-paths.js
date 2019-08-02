/**
 * For logging message
 *
 * @param {string} message
 */
const log = (message) => {
  const logging = false;
  if (logging) {
    console.log(message);
  }
};

/**
 * Getting the lowest cost node
 *
 * @param {object} costs
 * @param {array} processed
 */
const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

/**
 * Function that returns the minimum cost and path to reach finish
 * References:
 * Codes - https://repl.it/repls/ClientsideElaborateComments
 * Blog about algo - https://hackernoon.com/how-to-implement-dijkstras-algorithm-in-javascript-abdfd1702d04
 *
 * @param {object} graph
 * @param {string} startNodeName
 * @param {string} endNodeName
 */
const getShortestPaths = (graph, startNodeName, endNodeName) => {
  // track the lowest cost to reach each node
  let costs = {};
  costs[endNodeName] = 'Infinity';
  costs = Object.assign(costs, graph[startNodeName]);

  // track paths
  const parents = { endNodeName: null };
  for (let child in graph[startNodeName]) {
    parents[child] = startNodeName;
  }

  // track nodes that have already been processed
  const processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      if (String(n) === String(startNodeName)) {
        log("WE DON'T GO BACK TO endNode");
      } else {
        log('startNodeName: ' + startNodeName);
        log('Evaluating cost to node ' + n + ' (looking from node ' + node + ')');
        log('Last Cost: ' + costs[n]);
        let newCost = cost + children[n];
        log('New Cost: ' + newCost);
        if (!costs[n] || costs[n] > newCost) {
          costs[n] = newCost;
          parents[n] = node;
          log('Updated cost und parents');
        } else {
          log('A shorter path already exists');
        }
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = [endNodeName];
  let parent = parents[endNodeName];
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

  const results = {
    distance: costs[endNodeName],
    route: {
      startingPoint: startNodeName,
      destination: endNodeName,
    },
    paths: optimalPath,
  };

  return results;
};

export default getShortestPaths;
