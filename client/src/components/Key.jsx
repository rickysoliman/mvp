import React from 'react';
import styled from 'styled-components';

const WhiteKey = styled.div`
    width: 100px;
    height: 400px;
    background-color: ${props => props.selected ? '#EE82EE' : 'white'};
    border: ${props => props.selected ? '5px solid #FF00FF' : '1px solid black'};
    &:hover {
        cursor: pointer;
        background-color: #D3D3D3;
    }
`;

const BlackKey = styled.div`
    width: 60px;
    height: 240px;
    background-color: ${props => props.selected ? '#EE82EE' : 'black'};
    margin-left: -30px;
    margin-right: -30px;
    z-index: 2;
    border: ${props => props.selected ? '5px solid #FF00FF' : '2px solid black'};
    &:hover {
        cursor: pointer;
        background-color: #D3D3D3;
    }
`;

class Key extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            selected: false
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ 
            selected: nextProps.selected
        });
    }

    handleClick() {
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        return (this.props.color === 'white') ?
            <WhiteKey selected={this.state.selected} onClick={this.props.onClick} id={this.props.id} class={`key ${this.props.color}`}></WhiteKey> :
            <BlackKey selected={this.state.selected} onClick={this.props.onClick} id={this.props.id} class={`key ${this.props.color}`}></BlackKey>;
        
    }
}

export default Key;