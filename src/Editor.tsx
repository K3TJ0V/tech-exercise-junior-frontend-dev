import CampaignForm from './CampaignForm';
import type { Campaign } from './interfaces/Campaign';

interface EditorProps{
    balance : number,
    handleEdit : (updated: Campaign) => void
    edited : Campaign | undefined;
}

function Editor({balance, handleEdit, edited} : EditorProps){
    return <CampaignForm initValues={edited} balance={balance} onSubmit={handleEdit}/>
}

export default Editor;