import 'normalize.css'
import './styles/App.scss'
import HeadPannel from './HeadPannel'
import MainPannel from './MainPannel'
import { useEffect, useState } from 'react'
import { CampaignService } from './services/CampaignService'
import type { Campaign } from './interfaces/Campaign'
import useFetchCampaigns from './hooks/useFetchCampaigns'
import Creator from './Creator.tsx';
import Editor from './Editor.tsx'

function App() {
  const { data, loading, error } = useFetchCampaigns("mock", 8000);
  const [service] = useState(new CampaignService());
  const [balance, setBalance] = useState<number>(25000);
  const [campaigns, setCampaigns] = useState<Map<number, Campaign>>(new Map());
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);
  const [editVisibility, setEditVisibility] = useState<boolean>(false);
  const [editedCamp, setEditedCamp] = useState<Campaign | undefined>(undefined);
  const [editedIndex, setEditedIndex] = useState<number>(-1);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    data.forEach((campaign) => {
      service.createNew(campaign);
      if (campaign.status) {
        setBalance(prev => prev - campaign.fund);
      }
    })

    setCampaigns(new Map(service.getCamps()))
  }, [data, error])

  function showCreator() {
    setCreatorVisibility(!creatorVisibility);
  }
  function showEditor(index: number) {
    const edited = service.getSpecific(index)
    if (edited) {
      setEditedCamp(edited);
    }
    setEditedIndex(index);
    setEditVisibility(!editVisibility);
  }
  function handleDelete(id: number) {
    const camp = service.getSpecific(id)
    if (camp?.status) {
      setBalance(balance + camp.fund);
    }
    service.delete(id);
    setCampaigns(new Map(service.getCamps()))
  }
  function handleCreation(camp: Campaign) {
    service.createNew(camp);
    if (camp.status) {
      setBalance(balance - camp.fund)
    }
    setCampaigns(new Map(service.getCamps()));
    setCreatorVisibility(!creatorVisibility);
  }
  function handleEdit(updated: Campaign) {
    if (!editedCamp) return;

    const previousFund = editedCamp.status ? editedCamp.fund : 0;
    const newFund = updated.status ? updated.fund : 0;
    const diff = previousFund - newFund;

    setBalance(balance + diff);

    service.update(editedIndex, updated);
    setCampaigns(new Map(service.getCamps()));
    setEditedIndex(-1);
    setEditVisibility(false);
  }

  return (
    <>
      <HeadPannel balance={balance} showCreator={showCreator} />
      {creatorVisibility && <Creator balance={balance} handleCreation={handleCreation} />}
      {editVisibility && <Editor edited={editedCamp} balance={balance} handleEdit={handleEdit} />}
      {loading && "Loading..."}
      {campaigns && <MainPannel handleDelete={handleDelete} handleEdit={showEditor} campaigns={campaigns} />}
    </>
  )
}

export default App
