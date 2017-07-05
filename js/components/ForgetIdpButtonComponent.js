import React from 'react';


import { Button} from 'react-bootstrap';
import ForgetIdpMutation from './ForgetIdpMutation';


 class ForgetIdpButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoading: false};

        this.handleClick = this.handleClick.bind(this);

     }

     handleClick() {
         this.setState({isLoading : true});


         ForgetIdpMutation.commit(
             this.props.relay.environment,
             {idpId: this.props.idpId},
             this.props.viewer.id,
         );

     }

    render() {
        return (

        <Button bsStyle="danger" disabled={this.state.isLoading} onClick={this.handleClick}>
            Forget
        </Button>
        );
    }
};

 export default ForgetIdpButton;