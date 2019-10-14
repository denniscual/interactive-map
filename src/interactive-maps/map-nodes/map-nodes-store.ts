import createStateManager from 'easy-react-state';
import { createError } from '../__utils__';
import * as types from '../types';

const helpers = {
  checkNode<T>(id: string, collection: Map<string, T>) {
    const foundNode = collection.get(id);
    if (!foundNode) {
      throw createError(`The given ID ${id} cannot be found.`);
    }
    return foundNode;
  },
  /**
   * Get the array from arrays, Iterable type, which the keys, array type, are equal into arr elements.
   */
  getArrayWithSameElements<T>(arrays: IterableIterator<T[]>, arr: T[]): T[] | undefined {
    let existingArray;
    for (const array of arrays) {
      const allElementsAreIncludedInArr = array.every(
        (element, idx) => element === arr[idx],
      );
      if (allElementsAreIncludedInArr) {
        existingArray = array;
        break;
      }
    }
    return existingArray;
  },
};

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// NodeCollection
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
export type NodeCollection = Map<string, types.MapNodesProps>;

const createNodeCollectionSetters = (state: NodeCollection) => ({
  addNodeCollection(nodeCollection: NodeCollection) {
    return nodeCollection;
  },
  addNode(node: types.MapNodesProps) {
    const newCollection = new Map(state);
    if (newCollection.get(node.id)) {
      throw createError(`The given node ID ${node.id} is already exist.`);
    }
    return newCollection.set(node.id, node);
  },
  updateDirectNodes(id: string, directNodes: string[]) {
    const newCollection = new Map(state);
    const foundNode = helpers.checkNode(id, newCollection);
    // we only add a unique direct nodes
    const newDirectNodes = new Set();
    directNodes.forEach((directNode) => newDirectNodes.add(directNode));
    return newCollection.set(
      id,
      Object.assign({}, foundNode, { 'data-direct-nodes': newDirectNodes }),
    );
  },
  updateNode(id: string, node: types.MapNodesProps) {
    const newCollection = new Map(state);
    helpers.checkNode(id, newCollection);
    return newCollection.set(id, node);
  },
  deleteNode(id: string) {
    const newCollection = new Map(state);
    helpers.checkNode(id, newCollection);
    newCollection.delete(id);
    return newCollection;
  },
});

const nodeCollectionCreateState = {
  initialState: new Map(),
  setters: createNodeCollectionSetters,
};

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// NodeWithDirectionsCollection
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export type DirectionType = 'LEFT' | 'RIGHT';
export type DirectionCollection = Map<string[], DirectionType>;
export type NodeWithDirectionsCollection = Map<
  // this is the keyID of the node
  string,
  DirectionCollection
>;

const createNodeCollectionWithDirectionsSetters = (
  state: NodeWithDirectionsCollection,
) => ({
  addNodeWithDirections(keyID: string, nodeDirections: DirectionCollection) {
    const newCollection = new Map(state);
    if (newCollection.get(keyID)) {
      throw createError(`The given node key ID ${keyID} is already exist.`);
    }
    return newCollection.set(keyID, nodeDirections);
  },
  deleteNodeWithDirection(keyID: string) {
    const newCollection = new Map(state);
    helpers.checkNode(keyID, newCollection);
    newCollection.delete(keyID);
    return newCollection;
  },
  updateDirection(keyID: string, directionKey: string[], directionValue: DirectionType) {
    const newCollection = new Map(state);
    const directionCollection = helpers.checkNode(keyID, newCollection);
    const existingDirections = helpers.getArrayWithSameElements(
      directionCollection.keys(),
      directionKey,
    );
    if (existingDirections) {
      // we need to use the `existingDirections` to be able that we can
      // overwrite the existing value.
      directionCollection.set(
        existingDirections, // we gonna pass the existingNodeDirection
        directionValue,
      );
    } else {
      // create a new row
      directionCollection.set(
        directionKey, // we gonna pass the existingNodeDirection
        directionValue,
      );
    }
    return newCollection.set(keyID, directionCollection);
  },
  deleteDirection(keyID: string, directionKey: string[]) {
    const newCollection = new Map(state);
    const directionCollection = helpers.checkNode(keyID, newCollection);
    directionCollection.delete(directionKey);
    return newCollection.set(keyID, directionCollection);
  },
});

const nodeWithDirectionCollectionCreateState = {
  initialState: new Map(),
  setters: createNodeCollectionWithDirectionsSetters,
};

// ----------------------------------------------------------- //
// ----------------------------------------------------------- //
// Create store
// ----------------------------------------------------------- //
// ----------------------------------------------------------- //

export type MapNodes = {
  nodeCollection: NodeCollection;
  nodeWithDirectionCollection: NodeWithDirectionsCollection;
};

const configStore = {
  nodeCollection: nodeCollectionCreateState,
  nodeWithDirectionCollection: nodeWithDirectionCollectionCreateState,
};

const [useNodesSelector, nodesSetters] = createStateManager(configStore, {
  label: 'MapNodes',
  logging: true,
});

export { useNodesSelector, nodesSetters };
