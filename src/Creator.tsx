import type { Campaign } from "./interfaces/Campaign";
import CampaignForm from "./CampaignForm";

interface CreatorProps {
    balance: number;
    handleCreation: (camp: Campaign) => void;
    handleCancel: () => void;
}

function Creator({ balance, handleCreation, handleCancel }: CreatorProps) {
    return <CampaignForm balance={balance} onSubmit={handleCreation} onCancel={handleCancel}/>
}

export default Creator;