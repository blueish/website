

const SOURCE_SINK = 'source_sink';
const DEST_SINK = 'dest_sink';

// TODO: change this all to be adjacency matrix
export function createGraph(names, previousPairs) {
    // Generate a bipartite graph by taking all of the names, making nodes marked with ${name}_left or ${name}_right
    // All of the 'left' nodes will have an incoming edge from the source sink,
    // and all the 'right' nodes will have an outgoing edge to the destination sink
    let nodes = [];

    for (let i = 0; i < names.length; i++) {
        const name = names[i];

        nodes.push({ name: `${name}_left`, edges: [] });
        nodes.push({ name: `${name}_right`, edges: [DEST_SINK] });
        /*
        nodes[`${name}_left`] = [];
        nodes[`${name}_right`] = [DEST_SINK];
        */
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
}


// Adapted from the python Ford-Fulkerson implementation here: https://en.wikipedia.org/wiki/Ford%E2%80%93Fulkerson_algorithm
// Assumes the graph is passed as an adjacency matrix representation
class Graph {
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
        }
    }
}




