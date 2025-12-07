import type { Campaign } from './interfaces/Campaign';
import './styles/MainPannel.scss'

interface MainPannelProps {
    campaigns: Map<number, Campaign>;
}

function MainPannel({ campaigns }: MainPannelProps) {
    return (
        <main className='main'>
            <h2 className="main__h2"></h2>
            {Array.from(campaigns.entries()).map(([id, campaign]) => {
                return (
                    <article key={id} className='main__campaign'>
                        <h3 className="main__campaign--name">{campaign.name}</h3>
                        <span className='main__campaign--fund'>{campaign.fund}</span>
                        <span className='main__campaign--bid'> {campaign.bidAmount}</span>
                        <ul className='main__campaign--keywords'>
                            {campaign.keywords.map((keyword) => {
                                return (
                                    <li key={keyword} className='main__campaign--keywordItem'>{keyword}</li>
                                )
                            })}
                        </ul>
                        <p className='main__campaign--status'>{campaign.status && "aktywna"}</p>
                        <strong className='main__campaign--town'>{campaign.town}</strong>
                        <strong className='main__campaign--radius'> {campaign.radius}</strong>
                        <span></span>
                    </article>
                )
            })}
        </main>
    )
}

export default MainPannel;