

const SOURCE_SINK = 'source_sink';
const DEST_SINK = 'dest_sink';

// TODO: change this all to be adjacency matrix
export function createGraph(names, previousPairs) {
    // the matrix must have size for each of the names left and right partite node, and one source and one sink node
    const matrixSize = (names * 2) + 2;

    const graph = Array(matrixSize).fill(Array(matrixSize).fill(0));

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


