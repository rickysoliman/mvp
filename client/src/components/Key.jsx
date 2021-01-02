import React from 'react';
import styled from 'styled-components';

const WhiteKey = styled.div`
    width: 100px;
    height: 400px;
    background-color: ${props => props.selected ? '#D3D3D3' : 'white'};
    border: 1px solid black;
    &:hover {
        cursor: pointer;
    }
`;

const BlackKey = styled.div`
    width: 60px;
    height: 240px;
    background-color: ${props => props.selected ? '#D3D3D3' : 'black'};
    margin-left: -30px;
    margin-right: -30px;
    z-index: 2;
    border: 1px solid black;
    &:hover {
        cursor: pointer;
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
        if (this.props.color === 'white') {
            return <WhiteKey selected={this.state.selected} onClick={this.props.onClick} id={this.props.id} class={`key ${this.props.color}`}></WhiteKey>
        } else if (this.props.color === 'black') {
            return <BlackKey selected={this.state.selected} onClick={this.props.onClick} id={this.props.id} class={`key ${this.props.color}`}></BlackKey>
        }
    }
}

export default Key;