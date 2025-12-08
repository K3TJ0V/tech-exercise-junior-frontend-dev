import type { Campaign } from '../interfaces/Campaign.ts';

export class CampaignService {
    private campaigns = new Map<number, Campaign>();
    private nextID = 0;

    getCamps() {
        return this.campaigns;
    }
    getSpecific(id:number){
        return this.campaigns.get(id);
    }
    createNew(campaign: Campaign) {
        const id = this.nextID;
        this.campaigns.set(this.nextID, campaign);
        this.nextID++;
        return id;
    }
    update(index:number, updated:Partial<Campaign>){
        if(!this.campaigns.has(index)) return;
        const updatedCampaign = {...this.campaigns.get(index), ...updated} as Campaign;
        this.campaigns.set(index, updatedCampaign);
    }
    delete(index:number){
        this.campaigns.delete(index);
    }
}