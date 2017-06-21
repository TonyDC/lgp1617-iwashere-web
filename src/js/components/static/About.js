import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import AnimateComponent from '../utils/AnimateComponent';

import logoImage from 'img/logo.png';
import teamImage from 'img/team/team.jpg';
import ackImage from 'img/team/ack.jpg';

import casimiroImage from 'img/team/antonio-casimiro.jpg';
import pontesImage from 'img/team/pedro-pontes.jpg';
import azevedoImage from 'img/team/ana-azevedo.jpg';
import pintoImage from 'img/team/duarte-pinto.jpg';
import maiaImage from 'img/team/andre-maia.png';
import estradaImage from 'img/team/joao-estrada.png';
import costaImage from 'img/team/luis-costa.jpg';
import konkolImage from 'img/team/lukas-konkol.jpg';
import giraoImage from 'img/team/beatriz-girao.png';
import camposImage from 'img/team/rita-campos.jpg';
import abreuImage from 'img/team/valter-abreu.jpg';
import rochaImage from 'img/team/margarida-rocha.jpg';

import 'styles/utils.scss';
import 'styles/about-page.scss';

const TEAM_MEMBERS = [
    {
        background: "Computer Engineer",
        email: "antonio.casimiro@fe.up.pt",
        img: casimiroImage,
        name: "António Casimiro"
    },
    {
        background: "Computer Engineer",
        email: "pedro.martins.pontes@fe.up.pt",
        img: pontesImage,
        linkedIn: "https://www.linkedin.com/in/pedrompontes/",
        name: "Pedro Pontes"
    },
    {
        background: "Services Engineer",
        email: "anacmonteiroazevedo@gmail.com",
        img: azevedoImage,
        linkedIn: "https://www.linkedin.com/in/anacmazevedo/",
        name: "Ana Azevedo"
    },
    {
        background: "Computer Engineer",
        email: "pinto.duarte@fe.up.pt",
        img: pintoImage,
        linkedIn: "https://www.linkedin.com/in/duartemrpinto/",
        name: "Duarte Pinto"
    },
    {
        background: "Computer Engineer",
        email: "andrecmmaia@gmail.com",
        img: maiaImage,
        linkedIn: "https://www.linkedin.com/in/andrecmmaia/",
        name: "André Maia"
    },
    {
        background: "Computer Engineer",
        email: "up201303988@fe.up.pt",
        img: estradaImage,
        linkedIn: "https://www.linkedin.com/in/jestradagouveia/",
        name: "João Estrada"
    },
    {
        background: "Computer Engineer",
        email: "luistelmocosta@gmail.com",
        img: costaImage,
        linkedIn: "https://www.linkedin.com/in/luistelmocosta/",
        name: "Luís Costa"
    },
    {
        background: "Computer Engineer",
        email: "luk.konkol@gmail.com",
        img: konkolImage,
        name: "Lukáš Konkoľ"
    },
    {
        background: "Communication Designer",
        email: "bea.girao.ribeiro@gmail.com",
        img: giraoImage,
        name: "Beatriz Girão"
    },
    {
        background: "Communication Designer",
        email: "ritacampos@hotmail.com",
        img: camposImage,
        name: "Rita Campos"
    },
    {
        background: "Multimedia",
        email: "up201607866@fe.up.pt",
        img: abreuImage,
        linkedIn: "https://www.linkedin.com/in/valter-abreu-592661116/",
        name: "Valter Abreu"
    },
    {
        background: "Multimedia",
        email: "up201607866@fe.up.pt",
        img: rochaImage,
        linkedIn: "https://www.linkedin.com/in/margaridapereirarocha/",
        name: "Margarida Rocha"
    }
];

const PAGE_TOP_X_COORD = 0;
const PAGE_TOP_Y_COORD = 0;

const TWO_VALUE = 2;
const ZERO_REMAINDER = 0;

export default class AboutUs extends Component {

    componentDidMount() {
        window.scrollTo(PAGE_TOP_X_COORD, PAGE_TOP_Y_COORD);
    }

    goToPage(url) {
        if (typeof url !== 'string' || this.props.router.getCurrentLocation().pathname === url) {
            return;
        }

        this.props.router.push(url);
    }

    memberElement(memberInfo, index) {
        const linkedIn = memberInfo.linkedIn
            ? <li className="contact">
                <a href={memberInfo.linkedIn} target="_blank"><i className="fa fa-linkedin" /></a>
            </li>
            : null;

        return (
            <AnimateComponent onHideClassName={`animation start-${index % TWO_VALUE === ZERO_REMAINDER ? 'left' : 'right'}-animation`} onShowClassName="animation show-animation" key={memberInfo.name}>
                <li className="member vert-align" >
                    <div className="thumbnail">
                        <img src={memberInfo.img} className="portrait" alt={memberInfo.name} />
                    </div>

                    <div className="text-box">
                        <h1 className="member-name">
                            {memberInfo.name}
                        </h1>
                        <div>
                            <em>{memberInfo.background}</em>
                            <br/>
                            <div className="social-holder">
                                <ul>
                                    {linkedIn}
                                    <li className="contact">
                                        <a href={`mailto:${memberInfo.email}`} target="_blank"><i className="fa fa-envelope" /></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </AnimateComponent>);
    }

    render() {
        const teamMembers = TEAM_MEMBERS.map(this.memberElement);

        return (
            <div className="about-page-container">
                <Helmet>
                    <title>#iwashere - About</title>
                </Helmet>

                <div className="about-page-column">
                    <div className="about-image-container">
                        <img src={teamImage} className="about-image"/>
                        <img src={logoImage} className="about-logo"/>
                        <div className="about-partners">
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                            <i className="fa fa-picture-o" aria-hidden="true"/>
                        </div>
                        <div className="about-logo-bottom-bar">
                            <h2 className="tag-line">
                                We left our mark. Leave yours.
                            </h2>
                            <span>
                            <RaisedButton label="Start Now" backgroundColor="#012935" labelColor="#FFF" onTouchTap={ this.goToPage.bind(this, '/map') }/>
                        </span>
                        </div>
                    </div>

                    <section className="team">
                        <AnimateComponent onHideClassName="animation start-left-animation" onShowClassName="animation show-animation">
                            <article>
                                <header>The team</header>
                                <div>
                                    #iwashere was developed by a team of students from different backgrounds: Computer Engineering, Communication and Design, Services Engineering, and Multimedia.
                                </div>
                            </article>
                        </AnimateComponent>
                    </section>

                    <hr/>

                    <section className="team-members hor-align">
                        <ul className="flex-box">
                            {teamMembers}
                        </ul>
                    </section>

                    <hr/>

                    <section className="ack">
                        <AnimateComponent onHideClassName="animation start-right-animation" onShowClassName="animation show-animation">
                            <article>
                                <header>Acknowledgements</header>
                                <div>
                                    As a content oriented project, #iwashere counted with the contribute of several people, responsible for collecting the contents now made available to you.
                                </div>

                                <div className="hor-align">
                                    <img src={ackImage} className="ack-img" alt="Acknowledgements" />
                                </div>
                            </article>
                        </AnimateComponent>
                    </section>
                </div>
            </div>
        );
    }
}

AboutUs.propTypes = { router: PropTypes.object.isRequired };
