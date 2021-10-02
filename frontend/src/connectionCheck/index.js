import React, {Component} from 'react';
import backend from '../api/backend';

class ConnectionCheck extends Component {
    state = {
        hackathon: '',
        location: ''
    }

    componentDidMount() {
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };

        backend.get('/check', config)
            .then(response => {
                const hackathon = response.data["hackathon"]
                const location = response.data["location"]
                
                this.setState({hackathon, location})
            })
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default ConnectionCheck;