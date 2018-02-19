import React, {Component} from 'react';
import ParagraphText from "./ParagraphText";
import {createGraph} from "../../utils";


class MatchingNamesInput extends Component {
    handleSubmit() {
        // TODO: write a validation function for both inputs (and eventually csv)
        const names = document.getElementById('names').value
            .trim()
            .replace(/\n/g, ',')
            .split(',')
            .map(s => s.trim().toLowerCase()) // trim each in case they have extra whitespace in between commas
            .sort(); // to make accessing any node easier
        const rawPreviousPairings = document.getElementById('previous-pairings').value;
        // const userFile = document.getElementById('userfile');
        // console.log(userFile.value);


        // Make a pairing map populated with an empty array for each
        const previousPairings = [];
        let maxWeek = 0;

        // Split the previous pairings into an object: { pair: [name1, name2], week: num }
        // Assume they are split by lines into comma delimited pairs and week: name1, name2, num
        rawPreviousPairings.split('\n').map(str => {
            const delimited = str.split(',');

            // Sorts the names so alphabetically the first will be in first
            const [first, second] = delimited[0] < delimited[1]
                ? [delimited[0], delimited[1]]
                : [delimited[1], delimited[0]];

            const weekNumber = Number(delimited[2]);

            if (weekNumber > maxWeek) {
                maxWeek = weekNumber;
            }

            previousPairings.push([
                first.trim().toLowerCase(),
                second.trim().toLowerCase(),
                weekNumber
            ]);
        });

        const graph = createGraph(names, previousPairings, maxWeek);
        // console.log(graph);
    }

    render() {
        return (
            <div>
                <div>Enter the names to pair (comma delimited):</div>
                <textarea id="names" name="names"/>

                <div> Enter pairings that have happened before (comma delimited pairings separated by newlines)</div>
                <textarea id="previous-pairings" name="previous-pairings"/>


                {/*<div> Or upload a CSV file</div>*/}
                {/*<input type="file" id="userfile" name="userfile"/>*/}

                <div>
                    <input onClick={this.handleSubmit} type="submit" value="Generate pairings!" />
                </div>

                <hr />
                <ParagraphText />
            </div>
        );
    }
}

export default MatchingNamesInput;