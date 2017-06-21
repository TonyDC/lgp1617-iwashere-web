import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import AnimateComponent from '../utils/AnimateComponent';

import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionLanguage from 'material-ui/svg-icons/action/language';
import EditorLinearScale from 'material-ui/svg-icons/editor/linear-scale';
import MapsPlace from 'material-ui/svg-icons/maps/place';

import landingPageImage from 'img/landing.jpg';
import logoImage from 'img/iwh-alpha.png';
import iwashereTag from 'img/iwashere-logo-inverted.svg';
import badgeImage from 'img/badge.svg';
import gamepadImage from 'img/gamepad.svg';
import pictureImage from 'img/picture.svg';

import LGPImage from 'img/partners/LGP.png';
import MDmage from 'img/partners/MD.png';
import ODEImage from 'img/partners/ODE.png';

import 'styles/utils.scss';
import 'styles/landing-page.scss';

const TEAM_BUTTON_COLOR = '#E43F2A';

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

                <div className="landing-page-column">
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
                            <RaisedButton label="Start Route" backgroundColor="#012935" labelColor="#FFF" onTouchTap={ this.goToPage.bind(this, '/route/4') }/>
                        </span>
                        </div>
                    </div>

                    <div className="landing-page-content-margin">
                        <AnimateComponent>
                            <section className="product-description">
                                <article>
                                    <header>What is #iwashere</header>
                                    <div>
                                        #iwashere is a network that encourages the U.Porto community
                                        to actively share their knowledge and experiences about certain places of
                                        interest,
                                        about something they did or visited, by posting photos, videos, audios or
                                        text.
                                    </div>
                                </article>
                            </section>
                        </AnimateComponent>

                        <section className="implemented-features">
                            <AnimateComponent>
                                <article>
                                    <header>What we are aiming for</header>
                                    <div>
                                        The product to be developed will also act like a 'mobile
                                        companion' that will suggest itineraries with places,
                                        pieces/artifacts of the museums to discover, depending on the
                                        user's current location.
                                    </div>
                                </article>
                            </AnimateComponent>

                            <hr/>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <MapsPlace/>
                                </div>
                                <header>Points of Interest</header>
                                <div>
                                    Point of Interest refers to something or someone which is relevant to this city.
                                    By clicking on a specific point in the map, you access the side bar,
                                    with a brief description of what you selected.
                                    From this sidebar, you will also access to more information,
                                    as other posts and opinions.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <EditorLinearScale/>
                                </div>
                                <header>Routes</header>
                                <div>
                                    This system creates a list with “Points of Interest” which are inter-related.
                                    In the future, it will be possibility to follow a route and its Points of Interest in real time.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>
                        </section>

                        <section className="future-features">
                            <h5 className="section-header">Coming soon</h5>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <img src={pictureImage}/>
                                </div>
                                <header>Digital Museum</header>
                                <div>
                                    #iwashere gives the user the opportunity to revisit museums.
                                    By using a QR Code, the visitor can upload the digital data related to the museum they have visited.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <img src={iwashereTag}/>
                                </div>
                                <header>Posts</header>
                                <div>
                                    Due to the possibility of making posts, it creates the opportunity of collaboration among different users
                                    within the platform by allowing them to state their opinions, take photos, or files with video or audio.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <img src={gamepadImage}/>
                                </div>
                                <header>Gamification</header>
                                <div>
                                    #iwashere will add fun to culture. We want to make the experience as entertaining as possible,
                                    and therefore we will be adding a bit of competition among players.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>

                            <AnimateComponent>
                            <article>
                                <div className="landing-page-section-icon">
                                    <img src={badgeImage}/>
                                </div>
                                <header>Badges</header>
                                <div>
                                    All players will be awarded with badges once they have completed tasks, quests and contests.
                                    These badges can be won in either singleplay or multiplay mode.
                                </div>
                            </article>
                            </AnimateComponent>

                            <hr/>

                        </section>
                    </div>

                    <section className="hor-align team-button">
                        <RaisedButton label="Meet the team" backgroundColor={TEAM_BUTTON_COLOR} labelColor="#FFF" onTouchTap={ this.goToPage.bind(this, '/about') }/>
                    </section>

                    <section className="platforms">
                        <h4 className="section-header">Soon available for:</h4>

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
                                    <i className="fa fa-apple" aria-hidden="true"/>
                                </div>
                                <div className="platform-description">
                                    iOS
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section className="partners">
                        <h4 className="section-header">Partners:</h4>
                        <ul className="partners-listing">
                            <li>
                                <div className="partner-icon">
                                    <img src={LGPImage}/>
                                </div>
                            </li>
                            <li>
                                <div className="partner-icon">
                                    <img src={MDmage}/>
                                </div>
                            </li>
                            <li>
                                <div className="partner-icon">
                                    <img src={ODEImage}/>
                                </div>
                            </li>
                        </ul>
                    </section>

                </div>
            </div>
        );
    }
}

LandingPage.propTypes = { router: PropTypes.object.isRequired };
