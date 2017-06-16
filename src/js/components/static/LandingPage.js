import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';
import MapsPlace from 'material-ui/svg-icons/maps/place';

import landingPageImage from 'img/landing.jpg';
import logoImage from 'img/logo.png';
import iwashereTag from 'img/iwashere-icon.svg';

import 'styles/utils.scss';
import 'styles/landing-page.scss';

export default class LandingPage extends Component {

    goToPage(url) {
        if (typeof url !== 'string' || this.props.router.getCurrentLocation().pathname === url) {
            return;
        }

        this.props.router.push(url);
    }

    render() {
        return (
            <div className="landing-page-container">
                <Helmet>
                    <title>#iwashere</title>
                </Helmet>


                    <div className="landing-image-container">
                        <img src={landingPageImage} className="landing-image"/>
                        <img src={logoImage} className="landing-logo"/>
                        <div className="landing-partners">
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                        </div>
                        <div className="landing-logo-bottom-bar">
                            <h2 className="tag-line">
                                Leave your mark
                            </h2>
                            <span>
                            <RaisedButton label="Start Route" backgroundColor="#012935" labelColor="#FFF" onTouchTap={ this.goToPage.bind(this, '/route/1') }/>
                        </span>
                        </div>
                    </div>

                <div className="landing-page-content">
                    <section className="product-description">
                        <article>
                            <header>What is #iwashere</header>
                            <div>
                                #iwashere is a social network that encourages the U.Porto community
                                to actively share their knowledge and experiences about certain places of interest,
                                about something they did or visited, by posting photos, videos, audios or text.
                            </div>
                        </article>
                    </section>

                    <section className="implemented-features">
                        <article>
                            <header>What we are aiming for</header>
                            <div>
                                The product to be developed will also act like a 'mobile
                                companion' that will suggest itineraries with places,
                                pieces/artifacts of the museums to discover, depending on the
                                user's current location.
                            </div>
                        </article>

                        <hr/>

                        <article>
                            <div className="landing-page-section-icon">
                                <MapsPlace/>
                            </div>
                            <header>Points of Interest</header>
                            <div>
                                Point of Interest refers to something or someone which is
                                relevant to this city.
                                By clicking on a specific point in the map, you access the side bar,
                                with a brief description of what you selected.
                                From this sidebar, you will also access to more information, as other
                                posts and opinions.
                            </div>
                        </article>

                        <hr/>

                        <article>
                            <div className="landing-page-section-icon">
                                <EditorLinearScale/>
                            </div>
                            <header>Routes</header>
                            <div>
                                This system creates a list of Points of Interest related between
                                them. In the future, there will be the possibility of following the
                                route and its Points of Interest in real time.
                            </div>
                        </article>

                        <hr/>
                    </section>

                    <section className="future-features">
                        <h5 className="section-header">Coming soon</h5>

                        <article>
                            <div className="landing-page-section-icon">
                                <i className="fa fa-picture-o" aria-hidden="true"/>
                            </div>
                            <header>Digital Museum</header>
                            <div>
                                #iwashere gives the user the opportunity to revisit museums.
                                Using a QR-code, the visitor can upload the digital data related to
                                the museum he visited.
                            </div>
                        </article>

                        <hr/>

                        <article>
                            <div className="landing-page-section-icon">
                                <img src={iwashereTag}/>
                            </div>
                            <header>Posts</header>
                            <div>
                                By the possibility making posts, it creates the opportunity of
                                collaboration in the platform from the user, leaving their opinions,
                                taking photos, videos or audio.
                            </div>
                        </article>

                        <hr/>

                        <article>
                            <div className="landing-page-section-icon">
                                <i className="fa fa-gamepad" aria-hidden="true"/>
                            </div>
                            <header>Gamification</header>
                            <div>
                                #iwashere will have fun allied to culture. We want to make the
                                experience as entertaining as possible, adding a little competition
                                between players.
                            </div>
                        </article>

                        <hr/>

                        <article>
                            <div className="landing-page-section-icon">
                                icon
                            </div>
                            <header>Badges</header>
                            <div>
                                All players will be awarded with badges once they have completed
                                tasks, quests and contests. This badges can be obtained in single-play or
                                multi-play mode.
                            </div>
                        </article>

                        <hr/>

                    </section>

                    <section className="platforms">
                        <h4 className="section-header">Soon available for</h4>

                        <ul className="platforms-listing">
                            <li>
                                <div className="platform-icon">
                                    <ActionLanguage/>
                                </div>
                                <div className="platform-description">
                                    Web
                                </div>
                            </li>
                            <li>
                                <div className="platform-icon">
                                    <ActionAndroid/>
                                </div>
                                <div className="platform-description">
                                    Android
                                </div>
                            </li>
                            <li>
                                <div className="platform-icon">
                                    <i className="fa fa-apple" aria-hidden="true" style={{display: 'block'}}/>
                                </div>
                                <div className="platform-description">
                                    iOS
                                </div>
                            </li>
                        </ul>
                    </section>
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
