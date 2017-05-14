import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class POITypes extends Component {

    constructor(props) {
        super(props);
        this.state = { dataSource: [] }
    }

    componentDidMount() {
        this.componentIsMounted = true;
        this.fetchPOITypes();

    }

    componentWillUnmount() {
        this.componentIsMounted = false;
    }

    fetchPOITypes() {
        fetch('/api/poi/types').
        then((response) => {
            response.json();
        }).
        then((content) => {
            if (this.componentIsMounted) {
                this.setState({ dataSource: content });
            }
        }).
        catch((err) => {

        })
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    handleUpdateI

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                />
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="Full width"
                    fullWidth={true}
                />
            </div>
        );
    }
}
