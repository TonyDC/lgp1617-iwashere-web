import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Login extends Component {

    render() {
        return (
            <div className="wrapper-fill">
                <Helmet>
                    <title>#iwashere - Content Editor Login</title>
                </Helmet>

                <div className="container">
                    <Card>
                        <CardTitle title="Card title" subtitle="Card subtitle" />
                        <CardText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                        </CardText>
                        <CardActions>
                            <FlatButton label="Action1" />
                            <FlatButton label="Action2" />
                        </CardActions>
                    </Card>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    params: PropTypes.object,
    router: PropTypes.object
};

// To access Redux store
Login.contextTypes = { store: PropTypes.object };
