import CampaignForm from './CampaignForm';
import type { Campaign } from './interfaces/Campaign';

interface EditorProps{
    balance : number,
    handleEdit : (updated: Campaign) => void,
    handleCancel: () => void;
    edited : Campaign | undefined;
}

function Editor({balance, handleEdit, handleCancel, edited} : EditorProps){
    return <CampaignForm initValues={edited} balance={balance} onSubmit={handleEdit} onCancel={handleCancel}/>
}

export default Editor;