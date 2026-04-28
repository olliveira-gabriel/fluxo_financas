import React from 'react'
import NavBar from '../../components/NavBar/NavBar'
import ImgDepesas from '../../assets/despesa.png'
import ImgReceita from '../../assets/receita.png'
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import "../TelaInicial/TelaInicial.css"
import CardRC from '../../components/CardRC.jsx'
import CardDP from '../../components/CardDP.jsx'
import CardVT from '../../components/CardVT.jsx'

function TelaInicial() {
  return (
    <>
        <NavBar/>
        <Container>
          <div className="cards-container">
            <CardRC />
            <CardDP />
            <CardVT />
          </div>
        </Container>
    </>
  )
}

export default TelaInicial
