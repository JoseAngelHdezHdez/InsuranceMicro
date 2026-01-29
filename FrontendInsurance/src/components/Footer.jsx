import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// styles
import './styles/Footer.css';

const FooterExpress = () => {

    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => {
        setShowModal(true)
    }

    return (
        <footer className="mt-5" style={{ background: 'linear-gradient(to right, #0d6efd, #00bcd4)' }}>
            <Container style={{ padding: '2rem' }} fluid>
                <Row>
                    {/* <Col>
                        <img
                            alt="logo"
                            src={LogoFooter}
                            className="d-inline-block align-top"
                        />
                    </Col>
                    <Col className='footer-first-text'>
                        <h4>Unidad especializada de atención a usuarios</h4>
                        <div>
                            <p>Av. De los Virreyes 80, Col. Lomas de Chapultepec, Miguel hidalgo, CP 11000.</p>
                            <p>Tel. 55 12 04 72 60</p>
                            <p>atencion@factorexpres.com </p> 
                            <p>Horario de atención de lunes a viernes de 9:00 a 18:00 hrs.</p>
                        </div>
                        <Button style={{color: '#0d6efd'}} onClick={handleOpenModal} variant="light">Aviso de PTU 2022</Button>
                        <NoticePtuModal show={showModal} onHide={() => setShowModal(false)} />
                    </Col>
                    <Col>
                        <p style={{textAlign: 'justify', color: 'white', fontFamily: 'Raleway', fontSize: '12px'}}>
                            En cumplimiento al Artículo 87-J vigente a la fecha, de la Ley General de 
                            Organizaciones y Actividades Auxiliares del Crédito, se indica lo siguiente: La 
                            Sociedad opera como SOFOM, E.N.R., quien para su constitución y operación con tal 
                            carácter no requiere de la autorización de la Secretaría de Hacienda y 
                            Crédito Público, y está sujeta a la supervisión y vigilancia de la Comisión 
                            Nacional Bancaria y de Valores únicamente para efectos del artículo 56 de la 
                            mencionada Ley.
                        </p>
                    </Col>
                    <Col className='footer-logos'>
                        <img
                            style={{ display: 'block' }}
                            alt="Buro"
                            src={Buro}
                        />
                        <img
                            style={{ display: 'block' }}
                            alt="EsrFooter"
                            src={Sello}
                        />
                        <img
                            style={{ display: 'block' }}
                            alt="EsrFooter"
                            src={EsrFooter}
                        />
                    </Col> */}
                </Row>
            </Container>
            <div style={{color: 'white'}}>© Factor Exprés SAPI de CV SOFOM ENR 2013 - 2024 Developed by 2beOnline.net</div>
        </footer>
    )
}

export default FooterExpress
