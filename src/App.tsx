import 'normalize.css'
import './styles/App.scss'
import HeadPannel from './HeadPannel'
import MainPannel from './MainPannel'
import { useEffect, useState } from 'react'
import { CampaignService } from './services/CampaignService'
import type { Campaign } from './interfaces/Campaign'
import useFetchCampaigns from './hooks/useFetchCampaigns'
import Creator from './Creator.tsx';

function App() {
  const [service] = useState(new CampaignService());
  const {data, loading, error} = useFetchCampaigns("mock", 8000);
  const [campaigns, setCampaigns] = useState<Map<number, Campaign>>(new Map());
  const [balance, setBalance] = useState<number>(25000);
  const [activeCamps, setActiveCamps] = useState<Map<number,Campaign>>(new Map());
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);

  useEffect(()=>{
    if(error){
      console.log(error);
    }
    data.forEach((campaign)=>{
      const id = service.createNew(campaign);
      if(campaign.status){
        setActiveCamps(prev =>{
          const newActiveCamps = new Map(prev);
          newActiveCamps.set(id, campaign);
          return newActiveCamps
        });
      }
    })
    
    setCampaigns(new Map(service.getCamps()))
  }, [data, error])

  function showCreator(){
    setCreatorVisibility(!creatorVisibility);
  }
  function handleDelete(id:number){
    if(service.getSpecific(id)?.status){
      const updatedActiveCamps = activeCamps;
      updatedActiveCamps.delete(id);
      setActiveCamps(new Map(updatedActiveCamps));
    }
    service.delete(id);
    setCampaigns(new Map(service.getCamps())) 
  }

  return (
    <>
      <HeadPannel balance={balance} showCreator={showCreator}/>
      {creatorVisibility && <Creator/>}
      {loading && "Loading..."}
      {campaigns && <MainPannel handleDelete={handleDelete} campaigns={campaigns}/>}
    </>
  )
}

export default App
