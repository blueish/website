

/** This function creates the adjacency matrix for a weighted, directed bipartite graph with a source node and sink node
 * for reduction to the Network Bandwidth Problem.
 *
 * A few assumptions this function makes:
 * 1) names are an array of lowercase, unique strings
 * 2) previousPairMap is an object with keys representing 2 names, in order alphabetically, with the week number
 *      that that pair was matched on (lower weeks is further in the past). both names must exist in the names array,
 *      or that matching will be skipped.
 * @param names [String]
 * @param previousPairMap { String -> int}
 * @param maxWeek
 */
export function createGraph(names, previousPairMap, maxWeek) {
    // the matrix must have size for each of the names left and right partite node, and one source and one sink node
    const matrixSize = (names.length * 2) + 2;
    const UNPAIRED_EDGE_WEIGHT = maxWeek + 1; // TODO: validate this choice vs 2x maxWeek, etc.

    // Have to fill with 0's and then map, otherwise array will hold same reference to 1 array
    const graph = Array(matrixSize)
        .fill(0)
        .map(() =>
            Array(matrixSize).fill(0)
        );



    // We'll represent the adjacency matrix as the source node, followed by each name's left representation, right
    // representation, and then the sink node. E.g. if N=2, [ source, n1_left, n1_right, n2_left, n2_right, sink ]
    // This has the handy property that any odd node index is the left, an even node index is the right, etc.

    // we'll make a name map to make it easier to access any given name's idx, and vice versa, have to iterate through names,
    // but constantly update the matrix idx since we're skipping
    const nameMap = {};
    let matrixIdx = 1;
    for (let nameIdx = 0; nameIdx < names.length; nameIdx++) {
        const name = names[nameIdx];

        nameMap[name] = matrixIdx;
        nameMap[matrixIdx] = name;
        matrixIdx += 2;
    }


    // TODO: we might want an adjacency list instead, since this graph is actually pretty sparse with the left/right nodes
    // and those right nodes are almost all empty.
    // Let's finish this implementation and then slot in the adjacency list implementation later on

    // We can populate the source node by making it point to every left node (odd index) until the last one, skip it
    // because we don't have an edge from source to sink
    for (let i = 1; i < matrixSize - 1; i += 2) {
        graph[0][i] = Infinity;
    }

    // We have to go through the entire matrix to populate the edges, which is n^2, but I don't think there's a better way
    // Now populate the rest of the matrix using the previous pairs, inverting them (since we are aiming for maximum flow,
    // and we want to avoid pairings that have happened recently (older/higher number is 'better')
    // and if there doesn't exist an edge yet, we make that weight UNPAIRED_EDGE_WEIGHT (if it's not the same node idx)
    debugger;
    for (let sourceNodeIdx = 1; sourceNodeIdx < matrixSize; sourceNodeIdx++) {
        if (sourceNodeIdx % 2 === 1) {
            // this is a left node, we'll check the names to find a mapping to look at right listings
            for (let i = 0; i < names.length; i++) {
                const name = names[i];
                const targetNodeIdx = nameMap[name];

                // skip if same node (no self-edges)
                if (targetNodeIdx !== sourceNodeIdx) {
                    const sourceName = nameMap[sourceNodeIdx];
                    const [first, second] = orderedPair(name, sourceName);


                    let edgeWeight = previousPairMap[`${first}_${second}`];
                    if (!edgeWeight) {
                        edgeWeight = UNPAIRED_EDGE_WEIGHT;
                    }
                    debugger;

                    graph[sourceNodeIdx][targetNodeIdx] = edgeWeight
                }
            }
        } else {
            // it's a right node, the only direction it points is the sink
            graph[sourceNodeIdx][matrixSize - 1] = Infinity;
        }
    }

    debugger;
    console.log(graph);



    /*
    // Generate a bipartite graph by taking all of the names, making nodes marked with ${name}_left or ${name}_right
    // All of the 'left' nodes will have an incoming edge from the source sink,
    // and all the 'right' nodes will have an outgoing edge to the destination sink
    let nodes = [];

    for (let i = 0; i < names.length; i++) {
        const name = names[i];

        nodes.push({ name: `${name}_left`, edges: [] });
        nodes.push({ name: `${name}_right`, edges: [DEST_SINK] });
        nodes[`${name}_left`] = [];
        nodes[`${name}_right`] = [DEST_SINK];
    }


    // make all of the directed edges by assigning all of the
    // const leftNodes = nodes.entries.filter(node => node[0].contains('_left'));
    // const rightNodes = nodes.entries.filter(node => node[0].contains('_right'));

    const sourceSinkNode = { name: SOURCE_SINK, edges: [] };
    const destSinkNode = { name: DEST_SINK, edges: [] };

    nodes.map(node => {
        if (node.name.contains('_left')) {
            sourceSinkNode.edges.push(node.name);
        }
    })
    */
}


// Adapted from the python Ford-Fulkerson implementation here: https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm
// Assumes the graph is passed as an adjacency matrix representation
export class Graph {
    constructor(graph) {
        this.graph = graph;
        this.ROW = graph.length
    }

    BFS(source, target, parent) {
        const visited = Array(this.ROW).fill(false);

        // Regular arrays can be used as queues using .push and .splice(0,1) as the append and pop operations, respectively
        const queue = [];

        queue.push(source);
        visited[source] = true;


        while (queue.length > 0) {
            const u = queue.splice(0, 1);

            for (let idx = 0; idx < this.ROW; idx++) {
                const val = this.graph[u][idx];
                if (val > 0 && !visited[idx]) {
                    queue.push(idx);
                    visited[idx] = true;
                    parent[idx] = u;
                }
            }
        }

        return visited[target];
    }


    EdmondsKarp(source, sink) {
        const parent = Array(this.ROW).fill(-1);

        let maxFlow = 0;

        // Keep iterating while there's a valid path from source to sink
        while (this.BFS(source, sink, parent)) {
            let pathFlow = Infinity;
            let s = sink;

            while (s !== source) {
                pathFlow = min(pathFlow, this.graph[parent[s]][s]);
                s = parent[s];
            }

            maxFlow += pathFlow;

            let v = sink;
            while (v !== source) {
                const u = parent[v];
                this.graph[u][v] -= pathFlow;
                this.graph[v][u] += pathFlow;
                v = parent[v];
            }
        }

        return [maxFlow, parent];
    }
}

const min = (a, b) => a < b ? a : b;
const orderedPair = (a, b) => a < b
    ? [a, b]
    : [b, a];


