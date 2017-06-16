import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';
import MapsPlace from 'material-ui/svg-icons/maps/place';

import landingPageImage from 'img/landing.jpg';
import logoImage from 'img/logo.png';
import iwashereTag from 'img/iwashere-icon.svg';

const iwashereTagStyle = {
    height: 20,
    width: 20
};

const containerStyle = { backgroundColor: '#FFF' };

const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
};

const logoImageStyle = {
    width: '30vw',
    top: 40,
    left: 40,
    position: 'absolute',
    objectFit: 'contain'
};

const partnersStyle = {
    top: 40,
    right: 40,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'space-around',
};

const imageBottomBar = {
    position: 'absolute',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
};

const platformContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around'
};

export default class LandingPage extends Component {

    goToPage(url) {
        if (typeof url !== 'string' || this.props.router.getCurrentLocation().pathname === url) {
            return;
        }

        this.props.router.push(url);
    }

    render() {
        return (
            <div style={containerStyle}>
            <div style={{position: 'relative'}}>
                <img src={landingPageImage} style={imageStyle}/>
                <img src={logoImage} style={logoImageStyle}/>
                <div style={partnersStyle}>
                    <i className="fa fa-picture-o" aria-hidden="true"/>
                    <i className="fa fa-picture-o" aria-hidden="true"/>
                    <i className="fa fa-picture-o" aria-hidden="true"/>
                </div>
                <div style={imageBottomBar}>
                    <h2>
                        Leave your mark
                    </h2>
                    <span>
                        <RaisedButton label="Start Route" backgroundColor="#012935" labelColor="#FFF" onTouchTap={ this.goToPage.bind(this, '/route/1') }/>
                    </span>
                </div>
            </div>

                <h4>WHAT IS #IWASHERE</h4>
                <div>
                    #iwashere is a social network that encourages the U.Porto community
                    to actively share their knowledge and experiences about certain places of interest,
                    about something they did or visited, by posting photos, videos, audios or text.
                </div>

                <h4>WHAT WE AIM FOR</h4>
                <div>
                    The product to be developed will also act like a 'mobile
                    companion' that will suggest itineraries with places,
                    pieces/artifacts of the museums to discover, depending on the
                    user's current location.
                </div>
                <hr/>

                <MapsPlace/>
                <h4>POINTS OF INTEREST</h4>
                <div>
                    Point of Interest refers to something or someone which is
                    relevant to this city.
                    By clicking on a specific point in the map, you access the side bar,
                    with a brief description of what you selected.
                    From this sidebar, you will also access to more information, as other
                    posts and opinions.
                </div>
                <hr/>

                <EditorLinearScale/>
                <h4>ROUTES</h4>
                <div>
                    This system creates a list of Points of Interest related between
                    them. In the future, there will be the possibility of following the
                    route and its Points of Interest in real time.
                </div>
                <hr/>

                <h5>COMING SOON</h5>

                <i className="fa fa-picture-o" aria-hidden="true"/>
                <h4>DIGITAL MUSEUM</h4>
                <div>
                    #iwashere gives the user the opportunity to revisit museums.
                    Using a QR-code, the visitor can upload the digital data related to
                    the museum he visited.
                </div>
                <hr/>

                <img src={iwashereTag} style={iwashereTagStyle}/>
                <h4>POSTS</h4>
                <div>
                    By the possibility making posts, it creates the opportunity of
                    collaboration in the platform from the user, leaving their opinions,
                    taking photos, videos or audio.
                </div>
                <hr/>

                <i className="fa fa-gamepad" aria-hidden="true"/>
                <h4>GAMIFICATION</h4>
                <div>
                    #iwashere will have fun allied to culture. We want to make the
                    experience as entertaining as possible, adding a little competition
                    between players.
                </div>
                <hr/>

                <h4>BADGES</h4>
                <div>
                    All players will be awarded with badges once they have completed
                    tasks, quests and contests. This badges can be obtained in single-play or
                    multi-play mode.
                </div>
                <hr/>

                <div>
                    <h4>SOON AVAILABLE FOR</h4>

                    <div style={platformContainerStyle}>
                        <div>
                            <ActionLanguage style={{display: 'block'}}/>
                            WEB
                        </div>
                        <div>
                            <div className="hor-align">
                                <ActionAndroid style={{display: 'block', height: 100, width: 100}}/>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                ANDROID
                            </div>
                        </div>
                        <div>
                            <div className="hor-align" style={{fontSize: 80}}>
                            <i className="fa fa-apple" aria-hidden="true" style={{display: 'block'}}/>
                            </div>
                            iOS
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LandingPage.propTypes = {
    router: PropTypes.object.isRequired,
    disableButtons: PropTypes.bool,
    handleFacebook: PropTypes.func,
    handleForgotPassword: PropTypes.func,
    handleGoogle: PropTypes.func,
    handleLogin: PropTypes.func,
    handleRegister: PropTypes.func
};
