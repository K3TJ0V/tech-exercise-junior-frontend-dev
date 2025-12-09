import type { Campaign } from "./interfaces/Campaign";
import CampaignForm from "./CampaignForm";

interface CreatorProps {
    balance: number;
    handleCreation: (camp: Campaign) => void;
}

function Creator({ balance, handleCreation }: CreatorProps) {
    return <CampaignForm balance={balance} onSubmit={handleCreation}/>
}

export default Creator;