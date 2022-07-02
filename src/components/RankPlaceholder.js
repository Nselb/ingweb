import React from 'react'

function RankPlaceholder(props) {

    const tier = props.league.tier.toLowerCase();
    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <>
            <div className={`emblem__data__container`}>
                <img src={`images/RankedEmblems/Emblem_${Capitalize(tier)}.png`} alt="" className={"ranked__emblem"} />
                <div className="ranked__data">
                    <p>{props.league.queueId === 1 ? 'Flexible' : 'Solo'}</p>
                    <p>{props.league.rank}</p>
                    <p>{props.league.tier}</p>
                    <p>{props.league.leaguePoints}</p>
                </div>
            </div>
        </>
    )
}

export default RankPlaceholder