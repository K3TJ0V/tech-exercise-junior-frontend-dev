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
            <h1 className="main__h1">Your campaigns</h1>
            <div className="main__grid-wrapper">
            {Array.from(campaigns.entries()).map(([id, campaign]) => {
                return (
                    <article key={id} className='main__campaign'>
                        <h3 className="main__campaign--name">{campaign.name}</h3>
                        <div className='fund-bid-wrapper'>
                            <div className="main__campaign--fund-wrapper">
                                <span className="main__campaign--fund">Fund</span>
                                <span className='main__campaign--fund'>${campaign.fund}</span>
                            </div>
                            <div className="main__campaign--bid-wrapper">
                                <span>Bid amount</span>
                                <span className='main__campaign--bid'> ${campaign.bidAmount}</span>
                            </div>
                            <div className="main__campaign--status-wrapper">
                                <span>Status</span>
                                {campaign.status ? <span className='main__campaign--status active'>Active</span> : <span className='main__campaign--status inactive'>Inactive</span>}
                            </div>
                        </div>
                        <p className='main__campaign-key'>Keywords</p>
                        <ul className='main__campaign--keywords'>
                            {campaign.keywords.map((keyword) => {
                                return (
                                    <li key={keyword} className='main__campaign--keywordItem'>{keyword}</li>
                                )
                            })}
                        </ul>
                        <p className='main__campaign--location'>Location</p>
                        <div className="main__campaign--location-wrapper"> 
                            <span className='main__campaign--town'>{campaign.town}</span>
                            <span className="main__campaign--location-separator">+</span>
                            <strong className='main__campaign--radius'>{campaign.radius}km</strong>
                        </div>
                        <hr className='hr'/>
                        <div className="main__campaign--buttons-wrapper">
                            <button className="main__campaign--delete" onClick={()=>{handleDelete(id)}}>Delete</button>
                            <button className='main__campaign--edit' onClick={()=>{handleEdit(id)}}>Edit</button>
                        </div>
                    </article>
                )
            })}
            </div>
        </main>
    )
}

export default MainPannel;