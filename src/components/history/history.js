import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Table} from 'semantic-ui-react';
import './history.css';

export default class History extends Component {

    static propTypes = {
        history: PropTypes.arrayOf(
            PropTypes.shape({
                blockHash: PropTypes.string.isRequired,
                blockNumber: PropTypes.number.isRequired,
                from: PropTypes.string.isRequired,
                to: PropTypes.string.isRequired,
                transactionHash: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                value: PropTypes.object.isRequired
            })
        ).isRequired
    };

    render() {
        return this.renderContent();
    };

    renderContent() {
        return (
            <div>
                <Table basic='very' celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>TxHash</Table.HeaderCell>
                            <Table.HeaderCell>BlockHash</Table.HeaderCell>
                            <Table.HeaderCell>From</Table.HeaderCell>
                            <Table.HeaderCell>To</Table.HeaderCell>
                            <Table.HeaderCell>Value</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>12</Table.Cell>
                            <Table.Cell>12</Table.Cell>
                            <Table.Cell>12</Table.Cell>
                            <Table.Cell>12</Table.Cell>
                            <Table.Cell>22</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}
