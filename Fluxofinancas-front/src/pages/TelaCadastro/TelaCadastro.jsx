import React from 'react'
import FormCadastro from '../../components/FormCadastro'
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import CardSejaBenvido from '../../components/CardSejaBenvido'

function TelaCadastro() {
  return (
      <Container >
        <Row className='container-cadastro'>
          <Col xs={12} md={6} className='card-bemvindo'>
            <CardSejaBenvido/>
          </Col>
          <Col xs={12} md={6} className='card-formcadastro'>
            <FormCadastro/>
          </Col>
        </Row>

        
      </Container>
  )
}

export default TelaCadastro
