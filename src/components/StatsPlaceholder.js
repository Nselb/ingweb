import React from 'react'

function StatsPlaceholder(props) {

    return (
        <>
            <p>Daño a objetivos = {props.data.advStats.damagDealtToObjectives}</p>
            <p>Daño a estructuras = {props.data.advStats.damageDealtToBuildings}</p>
            <p>Daño a torretas = {props.data.advStats.damageDealtToTowers}</p>
            <p>Daño bloqueado = {props.data.advStats.damageSelfMitigated}</p>
            <p>Centinelas de control colocados = {props.data.advStats.detectorWardsPlaced}</p>
            <p>Asesinatos a dragones = {props.data.advStats.dragonKills}</p>
            <p>Primera sangre = {props.data.advStats.firstBloodAssit ? 'Si' : 'No'}</p>
            <p>Asistencia en primera sangre = {props.data.advStats.firstBloodKill ? 'Si' : 'No'}</p>
            <p>Derribo de primera torre = {props.data.advStats.firstTowerKill ? 'Si' : 'No'}</p>
            <p>Asistencia de primera torre = {props.data.advStats.firstTowerAssits ? 'Si' : 'No'}</p>
            <p>Oro ganado = {props.data.advStats.goldEarned}</p>
            <p>Oro gastado = {props.data.advStats.goldSpent}</p>
            <p>Inhibidores destruidos = {props.data.advStats.inhibitorKills}</p>
            <p>Inhibidores derribados = {props.data.advStats.inhibitorTakedowns}</p>
            <p>Inhibidores perdidos = {props.data.advStats.inhibitorsLost}</p>
            <p>Golpe critico mas grande = {props.data.advStats.largetstCriticalStrike}</p>
            <p>Daño magico a campeones = {props.data.advStats.magicDamageDealtToChampions}</p>
            <p>Daño magico recibido = {props.data.advStats.magicDamageTaken}</p>
            <p>Objetivos robados = {props.data.advStats.objectivesStolen}</p>
            <p>Daño fisico a campeones = {props.data.advStats.physicalDamagDealtToChampions}</p>
            <p>Daño fisico recibido = {props.data.advStats.physicalDamageTaken}</p>
            <p>Q's usadas = {props.data.advStats.spell1Casts}</p>
            <p>W's usadas = {props.data.advStats.spell2Casts}</p>
            <p>E's usadas = {props.data.advStats.spell3Casts}</p>
            <p>R's usadas = {props.data.advStats.spell4Casts}</p>
            <p>{props.data.advStats.summoner1Id} usado = {props.data.advStats.summoner1Casts}</p>
            <p>{props.data.advStats.summoner2Id} usado = {props.data.advStats.summoner2Cast}</p>
            <p>Posicion jugada = {props.data.advStats.teamPosition}</p>
            <p>Tiempo de CC sobre otros = {props.data.advStats.timeCCingOthers}</p>
            <p>Escudos a aliados = {props.data.advStats.totalDamageShieldedOnTeammates}</p>
            <p>Daño verdadero a campeones = {props.data.advStats.trueDamageDealtToChampions}</p>
            <p>Daño verdadero recibido = {props.data.advStats.trueDamageTaken}</p>
            <p>Torretas destruidas = {props.data.advStats.turretKills}</p>
            <p>Torretas derribadas = {props.data.advStats.turretTakedowns}</p>
            <p>Torretas perdidas = {props.data.advStats.turretsLost}</p>
            <p>Puntuacion de vision = {props.data.advStats.visionScore}</p>
            <p>Centinelas eliminados = {props.data.advStats.wardsKilled}</p>
            <p>Centinelas puestos = {props.data.advStats.wardsPlaced}</p>
        </>
    )
}

export default StatsPlaceholder