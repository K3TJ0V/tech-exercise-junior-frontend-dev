import type { Campaign } from './interfaces/Campaign';
import './styles/MainPannel.scss'

interface MainPannelProps {
    campaigns: Map<number, Campaign>;
    handleDelete: (id: number) => void;
    handleEdit: (id: number) => void;
}

function MainPannel({ campaigns, handleDelete, handleEdit }: MainPannelProps) {
    return (
        <main className='main'>
            <h1 className="header__h1">Your campaigns</h1>
            {Array.from(campaigns.entries()).map(([id, campaign]) => {
                return (
                    <article key={id} className='main__campaign'>
                        <h3 className="main__campaign--name">{campaign.name}</h3>
                        <span className='main__campaign--fund'>${campaign.fund}</span>
                        <span className='main__campaign--bid'> ${campaign.bidAmount}</span>
                        <ul className='main__campaign--keywords'>
                            {campaign.keywords.map((keyword) => {
                                return (
                                    <li key={keyword} className='main__campaign--keywordItem'>{keyword}</li>
                                )
                            })}
                        </ul>
                        <p className='main__campaign--status'>{campaign.status ? "aktywna" : "nie aktywna"}</p>
                        <strong className='main__campaign--town'>{campaign.town}</strong>
                        <strong className='main__campaign--radius'> {campaign.radius}km</strong>
                        <button className="main__campaign--delete" onClick={()=>{handleDelete(id)}}>delete</button>
                        <button className='main__campaign--edit' onClick={()=>{handleEdit(id)}}>edit</button>
                    </article>
                )
            })}
        </main>
    )
}

export default MainPannel;