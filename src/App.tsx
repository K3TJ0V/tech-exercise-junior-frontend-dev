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
        setBalance(prev => prev - campaign.fund);
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
    const camp = service.getSpecific(id) 
    if(camp?.status){
      setBalance(balance + camp.fund);
      const updatedActiveCamps = activeCamps;
      updatedActiveCamps.delete(id);
      setActiveCamps(new Map(updatedActiveCamps));
    }
    service.delete(id);
    setCampaigns(new Map(service.getCamps())) 
  }
  function handleCreation(camp : Campaign){
    console.log(camp);
    service.createNew(camp);
    if(camp.status){
      setBalance(balance - camp.fund)
    }
    setCampaigns(new Map(service.getCamps()));
    setCreatorVisibility(!creatorVisibility);
  }

  return (
    <>
      <HeadPannel balance={balance} showCreator={showCreator}/>
      {creatorVisibility && <Creator balance={balance} handleCreation={handleCreation}/>}
      {loading && "Loading..."}
      {campaigns && <MainPannel handleDelete={handleDelete} campaigns={campaigns}/>}
    </>
  )
}

export default App
