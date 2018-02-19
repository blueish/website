import React, {Component} from 'react';

class ParagraphText extends Component {
    render() {
        return (
            <div>
                <h2>Algorithm Description</h2>
                <p>
                BVPDates is a problem trying to pair people in a club together weekly, while maximizing the amount
                of time that has passed since their last pairing.
                </p>

                <h3>The problem instance</h3>
                <p>Set of n names</p>
                <p>A positive non-zero number W of weeks that have passed.</p>
                <p>Set of m previous pairings, with each pairing having an associated week (1..W)</p>

                <h3>The problem solution</h3>
                <p>{'A partition of the set of n names  { (p1, p2), (p3, p4) ... }.'}</p>
                <p>A good solution will try to maximize the amount of time since each pair has already occurred.</p>


                <h3>Problem representation</h3>
                <p>
                    {'We can choose to represent this as a '}
                    <a href={'https://en.wikipedia.org/wiki/Bipartite_graph'}>bipartite graph</a>
                    {' with each person being represented once in each half of the graph, and with weighted edges going to each '}
                    other name except for itself. The weights will be the number of weeks since they were last matched.
                    If a pair have never been matched, they will be given a weight of W + 1(this should probably be tweaked
                    if too many matches are repeated to accommodate more pairings).
                </p>

                <h3>The reduction to Maximum Network Flow</h3>
                <p>
                    With our bipartite graph, we can now try to reduce to an instance of the Network Flow Problem, by
                    linking a new source node to each node of one half of the bipartite graph, and a destination node to
                    each of the nodes in the other half.
                </p>
            </div>
        );
    }
}

export default ParagraphText;