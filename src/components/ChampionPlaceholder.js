import React from 'react'

function ChampionPlaceholder(props) {

    const masteryIcon = `/images/Mastery/Champion_Mastery_Level_${props.champion.mastery}_Flair.webp`;
    const championIcon = `/images/Champions/${props.champion.name}.png`
    return (
        <>
            <tr>
                <td>
                    <img className='champion__icon' src={championIcon} alt={props.champion.name} />
                    <h5>{props.champion.name}</h5>
                </td>
                <td>
                    <div className='masterypoints__container'>
                        <img src={masteryIcon} alt="Mastery level" />
                        <p>{props.champion.masteryPoints.toLocaleString()}</p>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default ChampionPlaceholder