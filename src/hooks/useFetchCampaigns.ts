import { useState, useEffect } from "react";
import type { Campaign } from "../interfaces/Campaign";
import mockedData from '../mocks/fetchedCampaigns.json';

function useFetchCampaigns(url: string, port: number) {
    const [data, setData] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                // mocked data fetch
                const response = await new Promise<Campaign[]>((resolve) => {
                    setTimeout(() => {
                        resolve(mockedData as unknown as Campaign[]) 
                    }, 500) 
                });
                setData(response);
            } catch (err: any) {
                const Err = new Error(err);
                setError(Err);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])
    return { data, loading, error }
}

export default useFetchCampaigns;