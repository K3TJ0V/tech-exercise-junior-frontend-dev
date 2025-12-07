import 'normalize.css'
import './styles/App.scss'
import HeadPannel from './HeadPannel'
import MainPannel from './MainPannel'
import { useEffect, useState } from 'react'
import { CampaignService } from './services/CampaignService'
import type { Campaign } from './interfaces/Campaign'
import useFetchCampaigns from './hooks/useFetchCampaigns'

function App() {
  const [service] = useState(new CampaignService());
  const {data, loading, error} = useFetchCampaigns("mock", 8000);
  const [campaigns, setCampaigns] = useState<Map<number, Campaign>>(new Map());
  const [balance, setBalance] = useState<number>(25000);
  const [activeCamps, setActiveCamps] = useState<Partial<Campaign>[]>([]);

  useEffect(()=>{
    if(error){
      console.log(error);
    }
    data.forEach((campaign)=>{
      service.createNew(campaign);
    })
    setCampaigns(new Map(service.getCamps()))
  }, [data, error])

  return (
    <>
      <HeadPannel balance={balance}/>
      {loading && "Loading..."}
      {campaigns && <MainPannel campaigns={campaigns}/>}
    </>
  )
}

export default App
