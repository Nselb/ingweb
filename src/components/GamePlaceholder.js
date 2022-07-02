import React from 'react';

function GamePlaceholder(props) {

    const championIcon = `/images/Champions/${props.game.championName}.png`
    const summoner1 = `/images/Summoners/${props.game.advStats.summoner1Id}.png`
    const summoner2 = `/images/Summoners/${props.game.advStats.summoner2Id}.png`
    const kda = `${props.game.stats.kills}/${props.game.stats.deaths}/${props.game.stats.assists}`
    const kdaverage = `${((props.game.stats.kills + props.game.stats.assists) / props.game.stats.deaths).toFixed(2)}`
    const itemPath = 'http://ddragon.leagueoflegends.com/cdn/12.11.1/img/item/'
    const noItemPath = '/images/NoItem.png'
    const item1 = `${props.game.stats.items1}.png`
    const item2 = `${props.game.stats.items2}.png`
    const item3 = `${props.game.stats.items3}.png`
    const item4 = `${props.game.stats.items4}.png`
    const item5 = `${props.game.stats.items5}.png`
    const item6 = `${props.game.stats.items6}.png`
    const item7 = `${props.game.stats.items7}.png`
    const perksPath = '/images/perk-images/'
    const perks = [
        `${props.game.stats.perkPStyle}`,
        `${props.game.stats.perkP1}`,
        `${props.game.stats.perkP2}`,
        `${props.game.stats.perkP3}`,
        `${props.game.stats.perkP4}`,
        `${props.game.stats.perkSStyle}`,
        `${props.game.stats.perkS1}`,
        `${props.game.stats.perkS2}`,
        `${props.game.stats.perkOffense}`,
        `${props.game.stats.perkFlex}`,
        `${props.game.stats.perkDefense}`
    ]
    

    return (
        <>
            <tr className={`game__row ${props.game.stats.win === true ? 'game__win' : 'game__lose'}`}>
                <td className='row__container' onClick={() => props.onClick(props.game)}>
                    <div className='row__flex'>
                        <div>
                            <h2 className='game__result'>
                                {props.game.stats.win === true ? 'Victoria' : 'Derrota'}
                            </h2>
                        </div>
                        <div className='row__data'>
                            <div className='game__champion'>
                                <img className='champion__icon' src={championIcon} alt="" />
                                <h4 className='game__champlevel'>
                                    {`${props.game.stats.champLevel}`}
                                </h4>
                            </div>
                            <div className='game__kda'>
                                <p>{kda}</p>
                                <p>KDA = {kdaverage}</p>
                                <div className='kda__summoners'>
                                    <img className='summoner' src={summoner1} alt="" />
                                    <img className='summoner' src={summoner2} alt="" />
                                </div>
                            </div>
                            <div className='game__items'>
                                <img className='items__item' src={props.game.stats.items1 !== 0 ? itemPath + item1 : noItemPath} alt='' />
                                <img className='items__item' src={props.game.stats.items2 !== 0 ? itemPath + item2 : noItemPath} alt='' />
                                <img className='items__item' src={props.game.stats.items3 !== 0 ? itemPath + item3 : noItemPath} alt='' />
                                <img className='items__item' src={props.game.stats.items4 !== 0 ? itemPath + item4 : noItemPath} alt='' />
                                <img className='items__item' src={props.game.stats.items5 !== 0 ? itemPath + item5 : noItemPath} alt='' />
                                <img className='items__item' src={props.game.stats.items6 !== 0 ? itemPath + item6 : noItemPath} alt='' />
                                <img className='items__item items__baratija' src={props.game.stats.items7 !== 0 ? itemPath + item7 : noItemPath} alt='' />
                            </div>
                            <div className='runes__container'>
                                <img className='rune__icon' src={'/images/perk-images/Styles/RunesIcon.png'} alt="a" />
                                <div className="runes__primary">
                                    <img className='primary__style' src={`${perksPath + 'Styles/' + perks[0]}.png`} alt="" />
                                    <img className='rune__key' src={`${perksPath + 'Styles/' + perks[0] + '/' + perks[1]}.png`} alt="" />
                                    <img className='primary__rune' src={`${perksPath + 'Styles/' + perks[0] + '/' + perks[2]}.png`} alt="" />
                                    <img className='primary__rune' src={`${perksPath + 'Styles/' + perks[0] + '/' + perks[3]}.png`} alt="" />
                                    <img className='primary__rune' src={`${perksPath + 'Styles/' + perks[0] + '/' + perks[4]}.png`} alt="" />
                                </div>
                                <div className='secondary__container'>
                                    <div className="runes__secondary">
                                        <img className='secondary__style' src={`${perksPath + 'Styles/' + perks[5]}.png`} alt="" />
                                        <img className='secondary__rune' src={`${perksPath + 'Styles/' + perks[5] + '/' + perks[6]}.png`} alt="" />
                                        <img className='secondary__rune' src={`${perksPath + 'Styles/' + perks[5] + '/' + perks[7]}.png`} alt="" />
                                    </div>
                                    <div className="runes__mods">
                                        <img className='secondary__rune' src={`${perksPath + 'StatMods/' + perks[8]}.png`} alt="" />
                                        <img className='secondary__rune' src={`${perksPath + 'StatMods/' + perks[9]}.png`} alt="" />
                                        <img className='secondary__rune' src={`${perksPath + 'StatMods/' + perks[10]}.png`} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default GamePlaceholder